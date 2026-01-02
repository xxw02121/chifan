import { NextRequest } from 'next/server';

const DEFAULT_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
const BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const API_KEY = process.env.DEEPSEEK_API_KEY;

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dishName, oil_tsp, time_min, ingredients, steps, userPreference } = body;

    if (!API_KEY) {
      return new Response(JSON.stringify({ rewrittenSteps: steps, tips: '未配置 API Key，已使用本地步骤。' }), { status: 200 });
    }

    const prompt = `你是家庭厨艺助理，请在不改变食材和用油上限的前提下，把步骤写得更生活化、更易懂。菜名：${dishName}，总用油<=${oil_tsp}茶匙，总耗时${time_min}分钟。食材：${JSON.stringify(ingredients)}。原步骤：${steps.join(' | ')}。偏好：${userPreference || '无'}。返回简短步骤列表和一条技巧。`;

    const resp = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: '保持家常口吻，避免夸张，不能增加用油或额外食材。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    if (!resp.ok) {
      return new Response(JSON.stringify({ rewrittenSteps: steps, tips: 'AI 返回异常，使用本地步骤。' }), { status: 200 });
    }

    const data = await resp.json();
    const text: string = data.choices?.[0]?.message?.content || '';
    const lines = text.split(/\n|；|。/).map((s: string) => s.trim()).filter(Boolean);
    const rewrittenSteps = lines.slice(0, 8);
    const tips = lines.slice(8).join(' ') || '火候保持中火，别糊锅。';

    return new Response(JSON.stringify({ rewrittenSteps, tips }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'bad request' }), { status: 400 });
  }
}
