"use client";

import { useEffect, useState } from 'react';
import { WeeklyPlan } from '../../lib/types';
import { weekly } from '../../lib/planner';
import { getActiveDislikes, getHistory, loadPreferences, loadWeekly, saveWeekly } from '../../lib/storage';
import Link from 'next/link';

export default function WeeklyPage() {
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = loadWeekly();
    if (stored) setPlan(stored);
    if (!stored) generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generate = () => {
    const recent = getHistory();
    const dislikes = getActiveDislikes();
    const prefs = loadPreferences();
    const next = weekly({ recentIds: recent, dislikedIds: dislikes, preferences: prefs });
    setPlan(next);
    saveWeekly(next);
  };

  const copyList = async () => {
    if (!plan) return;
    const text = plan.shoppingList
      .map(g => `${g.category}:\n` + g.items.map(i => `- ${i.item} ${i.amount}${i.unit}`).join('\n'))
      .join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      alert('购物清单已复制');
    } catch {
      alert('复制失败，手动选择复制试试');
    }
  };

  if (!plan) return <div>加载中...</div>;

  return (
    <div>
      <div className="card">
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>未来 7 天</div>
            <div className="small">尽量复用食材，避免浪费；符合控油时间规则</div>
          </div>
          <button className="btn secondary" onClick={generate}>重新生成</button>
        </div>
      </div>

      {plan.days.map(d => (
        <div key={d.day} className="card">
          <div className="row">
            <div style={{ fontWeight: 700 }}>{d.day}</div>
            <button className="btn secondary" style={{ padding: '6px 10px' }} onClick={() => setExpanded(p => ({ ...p, [d.day]: !p[d.day] }))}>
              {expanded[d.day] ? '收起' : '展开'}
            </button>
          </div>
          <div className="small">荤：{d.protein.name} · {d.protein.oil_tsp} 茶匙 · {d.protein.time_min} 分钟</div>
          <div className="small">素：{d.veg.name} · {d.veg.oil_tsp} 茶匙 · {d.veg.time_min} 分钟</div>
          {expanded[d.day] && (
            <div style={{ marginTop: 8 }}>
              {[d.protein, d.veg].map(r => (
                <div key={r.id} style={{ marginTop: 8 }}>
                  <div className="row">
                    <div style={{ fontWeight: 700 }}>{r.name}</div>
                    <Link href={`/recipe/${r.id}`} className="btn secondary" style={{ padding: '6px 10px' }}>详情</Link>
                  </div>
                  <div className="small">用油 {r.oil_tsp} 茶匙 · 约 {r.time_min} 分钟</div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>步骤</div>
                  <ol className="list">
                    {r.steps.map((s, idx) => <li key={idx}>{s}</li>)}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="card">
        <div className="row">
          <div style={{ fontWeight: 800 }}>一周购物清单（合并同类项）</div>
          <button className="btn secondary" onClick={copyList}>复制</button>
        </div>
        {plan.shoppingList.map(group => (
          <div key={group.category} style={{ marginTop: 10 }}>
            <div style={{ fontWeight: 700 }}>{group.category}</div>
            <ul className="list">
              {group.items.map(item => (
                <li key={item.item + item.unit}>{item.item} {item.amount}{item.unit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
