import { NextRequest } from 'next/server';

const DEFAULT_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
const BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const API_KEY = process.env.DEEPSEEK_API_KEY;

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea, type } = body as { idea: string; type: 'protein' | 'veg' };
    if (!idea || (type !== 'protein' && type !== 'veg')) {
      return new Response(JSON.stringify({ error: 'bad request' }), { status: 400 });
    }

    if (!API_KEY) {
      return new Response(JSON.stringify(buildFallbackRecipe(idea, type)), { status: 200 });
    }

    const prompt = `请按 JSON 输出一道适合 ${type === 'protein' ? '荤菜' : '素菜'}、家庭快手、总油<=2.5茶匙、总时间<=25分钟的菜谱。字段：name, oil_tsp, time_min, ingredients[{item,amount,unit}], steps[], tags[]. 主题：${idea}。`;

    const resp = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: '请严格输出 JSON，避免多余文本，控制用油<=2.5茶匙，总时间<=25分钟，步骤简洁可执行。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    if (!resp.ok) {
      return new Response(JSON.stringify(buildFallbackRecipe(idea, type)), { status: 200 });
    }

    const data = await resp.json();
    const text: string = data.choices?.[0]?.message?.content || '';
    const json = safeParse(text);
    if (!json) {
      return new Response(JSON.stringify(buildFallbackRecipe(idea, type)), { status: 200 });
    }
    return new Response(JSON.stringify(json), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify(buildFallbackRecipe('家常', 'veg')), { status: 200 });
  }
}

function safeParse(text: string) {
  try {
    const trimmed = text.trim().replace(/^```json/i, '').replace(/```$/, '');
    return JSON.parse(trimmed);
  } catch {
    return null;
  }
}

function buildFallbackRecipe(idea: string, type: 'protein' | 'veg') {
  const id = `custom-${type}-${Date.now()}`;
  return {
    id,
    name: `${idea}家常${type === 'protein' ? '小炒' : '素炒'}`,
    type,
    oil_tsp: 1.2,
    time_min: 18,
    ingredients: [
      { item: type === 'protein' ? '去骨鸡腿肉' : '青椒', amount: type === 'protein' ? 200 : 2, unit: type === 'protein' ? 'g' : '个' },
      { item: '蒜', amount: 2, unit: '瓣' },
      { item: '生抽', amount: 1, unit: '汤匙' }
    ],
    steps: [
      '主要食材切块/丝，简单腌味（少量盐、生抽）。',
      '锅热下约1茶匙油，蒜末炒香后下主料大火快炒。',
      '沿锅边淋少量水，调入生抽，翻匀收汁即可。'
    ],
    tags: ['AI生成', '家常', '快手']
  };
}
