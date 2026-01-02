"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DailyPlan, Preferences, Recipe } from '../lib/types';
import { daily } from '../lib/planner';
import { addDislike, addHistory, getActiveDislikes, getFavorites, getHistory, loadPreferences, savePreferences, toggleFavorite } from '../lib/storage';

export default function HomePage() {
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [prefOpen, setPrefOpen] = useState(false);
  const [pref, setPref] = useState<Preferences>({ noSpicy: false, noBeef: false, noFish: false, moreBudget: false });

  useEffect(() => {
    setFavorites(getFavorites());
    setDislikes(getActiveDislikes());
    setHistory(getHistory());
    setPref(loadPreferences());
  }, []);

  useEffect(() => {
    if (!plan && history !== undefined) {
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const handleGenerate = () => {
    const next = daily({ recentIds: history.slice(-6), dislikedIds: dislikes, preferences: pref });
    setPlan(next);
    const newHistory = addHistory(next);
    setHistory(newHistory);
  };

  const handleFavorite = (id: string) => {
    const next = toggleFavorite(id);
    setFavorites(next);
  };

  const handleDislike = (id: string) => {
    const next = addDislike(id);
    setDislikes(next.map(x => x.id));
  };

  const totalOil = (plan?.protein.oil_tsp || 0) + (plan?.veg.oil_tsp || 0);
  const totalTime = (plan?.protein.time_min || 0) + (plan?.veg.time_min || 0);

  const updatePref = (key: keyof Preferences) => {
    const next = { ...pref, [key]: !pref[key] };
    setPref(next);
    savePreferences(next);
  };

  return (
    <div>
      <div className="card">
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>今日一荤一素</div>
            <div className="small">总耗时 ≤ 25 分钟 · 总用油约 {totalOil.toFixed(1)} 茶匙 · 久坐研究生友好</div>
          </div>
          <button className="btn secondary" onClick={handleGenerate}>换一组</button>
        </div>
        <div style={{ marginTop: 10 }} className="row">
          <div className="badge">预计耗时：{totalTime} 分钟</div>
          <div className="badge">米饭：电饭煲提前焖好</div>
        </div>
        <button className="btn secondary" style={{ marginTop: 10 }} onClick={() => setPrefOpen(true)}>偏好设置</button>
      </div>

      {plan && (
        <div className="grid-two">
          <DishCard
            title="荤菜"
            recipe={plan.protein}
            favored={favorites.includes(plan.protein.id)}
            onFavorite={handleFavorite}
            onDislike={handleDislike}
          />
          <DishCard
            title="素菜"
            recipe={plan.veg}
            favored={favorites.includes(plan.veg.id)}
            onFavorite={handleFavorite}
            onDislike={handleDislike}
          />
        </div>
      )}

      {prefOpen && (
        <div>
          <div className="drawer-backdrop" onClick={() => setPrefOpen(false)} />
          <div className="drawer">
            <div className="row">
              <div style={{ fontWeight: 700 }}>偏好设置</div>
              <button className="btn secondary" onClick={() => setPrefOpen(false)}>完成</button>
            </div>
            <div style={{ marginTop: 12 }}>
              <label className="row" style={{ justifyContent: 'flex-start', gap: 10 }}>
                <input type="checkbox" checked={pref.noSpicy} onChange={() => updatePref('noSpicy')} /> 不吃辣 / 减辣
              </label>
              <label className="row" style={{ justifyContent: 'flex-start', gap: 10 }}>
                <input type="checkbox" checked={pref.noBeef} onChange={() => updatePref('noBeef')} /> 不吃牛
              </label>
              <label className="row" style={{ justifyContent: 'flex-start', gap: 10 }}>
                <input type="checkbox" checked={pref.noFish} onChange={() => updatePref('noFish')} /> 不吃鱼
              </label>
              <label className="row" style={{ justifyContent: 'flex-start', gap: 10 }}>
                <input type="checkbox" checked={pref.moreBudget} onChange={() => updatePref('moreBudget')} /> 预算省一点（少抽牛/虾）
              </label>
              <div className="small" style={{ marginTop: 6 }}>设置只影响权重，不会绝对排除，保证可玩性。</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DishCard({ title, recipe, favored, onFavorite, onDislike }: { title: string; recipe: Recipe; favored: boolean; onFavorite: (id: string) => void; onDislike: (id: string) => void; }) {
  return (
    <div className="card">
      <div className="row" style={{ marginBottom: 6 }}>
        <div style={{ fontWeight: 700 }}>{title} · {recipe.name}</div>
        <div>
          <button className="btn secondary" style={{ padding: '8px 10px', marginRight: 8 }} onClick={() => onFavorite(recipe.id)}>{favored ? '已收藏' : '收藏'}</button>
          <button className="btn secondary" style={{ padding: '8px 10px' }} onClick={() => onDislike(recipe.id)}>不喜欢</button>
        </div>
      </div>
      <div className="small">用油 {recipe.oil_tsp} 茶匙 · 预计 {recipe.time_min} 分钟</div>
      <div style={{ marginTop: 8 }}>
        {recipe.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>
      <div style={{ marginTop: 10, fontWeight: 700 }}>食材</div>
      <ul className="list">
        {recipe.ingredients.map(ing => (
          <li key={ing.item}>{ing.item} {ing.amount}{ing.unit}</li>
        ))}
      </ul>
      <div style={{ fontWeight: 700 }}>步骤</div>
      <ol className="list">
        {recipe.steps.map((s, idx) => <li key={idx}>{s}</li>)}
      </ol>
      <Link href={`/recipe/${recipe.id}`} className="btn secondary" style={{ width: '100%', marginTop: 10 }}>查看详情 / AI 改写</Link>
    </div>
  );
}
