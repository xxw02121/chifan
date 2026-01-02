"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getRecipeById } from '../../../lib/recipes';
import { Recipe } from '../../../lib/types';
import { rewriteRecipe, RewriteResponse } from '../../../lib/llm';
import { toggleFavorite, getFavorites, addDislike } from '../../../lib/storage';

export default function RecipePage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [rewrite, setRewrite] = useState<RewriteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    const r = getRecipeById(id);
    if (r) setRecipe(r);
  }, [id]);

  const handleRewrite = async () => {
    if (!recipe) return;
    setLoading(true);
    setError('');
    const res = await rewriteRecipe(recipe, '口味更家常一点');
    if (!res) {
      setError('AI 暂时不可用，已保留本地做法。');
    }
    setRewrite(res);
    setLoading(false);
  };

  if (!recipe) return <div style={{ padding: 16 }}>未找到该菜谱</div>;

  const favored = favorites.includes(recipe.id);

  return (
    <div>
      <div className="card">
        <div className="row">
          <div style={{ fontWeight: 800, fontSize: 18 }}>{recipe.name}</div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn secondary" style={{ padding: '8px 12px' }} onClick={() => { setFavorites(toggleFavorite(recipe.id)); }}>
              {favored ? '已收藏' : '收藏'}
            </button>
            <button className="btn secondary" style={{ padding: '8px 12px' }} onClick={() => addDislike(recipe.id)}>不喜欢</button>
          </div>
        </div>
        <div className="small">用油 {recipe.oil_tsp} 茶匙 · 预计 {recipe.time_min} 分钟</div>
        <div style={{ marginTop: 8 }}>
          {recipe.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div style={{ marginTop: 10, fontWeight: 700 }}>食材</div>
        <ul className="list">
          {recipe.ingredients.map(ing => <li key={ing.item}>{ing.item} {ing.amount}{ing.unit}</li>)}
        </ul>
        <div style={{ fontWeight: 700 }}>步骤</div>
        <ol className="list">
          {recipe.steps.map((s, idx) => <li key={idx}>{s}</li>)}
        </ol>
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={handleRewrite} disabled={loading}>{loading ? '改写中…' : '用 DeepSeek 改写成更家常'}</button>
          {error && <div className="small" style={{ color: '#f97316', marginTop: 6 }}>{error}</div>}
        </div>
        {rewrite && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 700 }}>改写版步骤</div>
            <ol className="list">
              {rewrite.rewrittenSteps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            {rewrite.tips && <div className="card" style={{ background: '#f8fafc', marginTop: 6 }}><div className="small">技巧：{rewrite.tips}</div></div>}
          </div>
        )}
      </div>
      <Link href="/" className="btn secondary" style={{ width: '100%' }}>返回首页</Link>
    </div>
  );
}
