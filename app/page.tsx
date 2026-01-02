"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DailyPlan, Preferences, Recipe } from '../lib/types';
import { daily } from '../lib/planner';
import { addDislike, addHistory, getActiveDislikes, getFavorites, getHistory, loadPreferences, savePreferences, toggleFavorite, loadCustomRecipes, addCustomRecipe } from '../lib/storage';
import { generateRecipe } from '../lib/llm';

export default function HomePage() {
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [prefOpen, setPrefOpen] = useState(false);
  const [pref, setPref] = useState<Preferences>({ noSpicy: false, noBeef: false, noFish: false, moreBudget: false });
  const [customProtein, setCustomProtein] = useState<Recipe[]>([]);
  const [customVeg, setCustomVeg] = useState<Recipe[]>([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiIdea, setAiIdea] = useState('');
  const [aiType, setAiType] = useState<'protein' | 'veg'>('protein');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<Recipe | null>(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setDislikes(getActiveDislikes());
    setHistory(getHistory());
    setPref(loadPreferences());
    const custom = loadCustomRecipes();
    setCustomProtein(custom.filter(c => c.type === 'protein'));
    setCustomVeg(custom.filter(c => c.type === 'veg'));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!plan && history !== undefined && ready) {
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, ready]);

  const handleGenerate = () => {
    const next = daily({ recentIds: history.slice(-6), dislikedIds: dislikes, preferences: pref, customProtein, customVeg });
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

  const runAiGenerate = async () => {
    if (!aiIdea.trim()) {
      alert('请先输入想要的口味/食材');
      return;
    }
    setAiLoading(true);
    const res = await generateRecipe(aiIdea.trim(), aiType);
    if (!res) {
      alert('AI 生成失败，稍后再试');
      setAiLoading(false);
      return;
    }
    setAiResult(res);
    setAiLoading(false);
  };

  const saveAiRecipe = () => {
    if (!aiResult) return;
    addCustomRecipe(aiResult);
    const custom = loadCustomRecipes();
    setCustomProtein(custom.filter(c => c.type === 'protein'));
    setCustomVeg(custom.filter(c => c.type === 'veg'));
    alert('已保存到本地菜谱，下次抽取会参与随机');
    setAiOpen(false);
    setAiResult(null);
    setAiIdea('');
    handleGenerate();
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
        <button className="btn" style={{ marginTop: 10 }} onClick={() => setAiOpen(true)}>AI 生成一份新菜谱</button>
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

      {aiOpen && (
        <div>
          <div className="drawer-backdrop" onClick={() => setAiOpen(false)} />
          <div className="drawer">
            <div className="row">
              <div style={{ fontWeight: 700 }}>AI 生成菜谱</div>
              <button className="btn secondary" onClick={() => setAiOpen(false)}>关闭</button>
            </div>
            <div style={{ marginTop: 10 }}>
              <div className="small">输入你想吃的口味/食材/风格，AI 会生成一份≤2.5 茶匙油、≤25 分钟的菜谱。</div>
              <input
                style={{ width: '100%', marginTop: 8, padding: 10, borderRadius: 10, border: '1px solid var(--border)' }}
                placeholder="例：蒜香鸡腿、番茄风味、清淡素菜"
                value={aiIdea}
                onChange={e => setAiIdea(e.target.value)}
              />
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <button className={`btn secondary`} style={{ flex: 1, background: aiType === 'protein' ? '#e0f2fe' : '#fff' }} onClick={() => setAiType('protein')}>荤菜</button>
                <button className={`btn secondary`} style={{ flex: 1, background: aiType === 'veg' ? '#e0f2fe' : '#fff' }} onClick={() => setAiType('veg')}>素菜</button>
              </div>
              <button className="btn" style={{ width: '100%', marginTop: 10 }} onClick={runAiGenerate} disabled={aiLoading}>{aiLoading ? '生成中…' : '生成菜谱'}</button>
              {aiResult && (
                <div className="card" style={{ marginTop: 10 }}>
                  <div className="row" style={{ marginBottom: 4 }}>
                    <div style={{ fontWeight: 700 }}>{aiResult.name}</div>
                    <div className="badge">约 {aiResult.time_min} 分钟 · {aiResult.oil_tsp} 茶匙</div>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    {aiResult.tags?.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div style={{ fontWeight: 700, marginTop: 8 }}>食材</div>
                  <ul className="list">
                    {aiResult.ingredients.map(ing => <li key={ing.item}>{ing.item} {ing.amount}{ing.unit}</li>)}
                  </ul>
                  <div style={{ fontWeight: 700 }}>步骤</div>
                  <ol className="list">
                    {aiResult.steps.map((s, idx) => <li key={idx}>{s}</li>)}
                  </ol>
                  <button className="btn" style={{ width: '100%' }} onClick={saveAiRecipe}>保存到我的菜谱</button>
                </div>
              )}
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
