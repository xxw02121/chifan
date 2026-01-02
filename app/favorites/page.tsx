"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFavorites, loadCustomRecipes, toggleFavorite } from '../../lib/storage';
import { getRecipeById } from '../../lib/recipes';
import { Recipe } from '../../lib/types';

export default function FavoritesPage() {
  const [list, setList] = useState<Recipe[]>([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    const favIds = getFavorites();
    const custom = loadCustomRecipes();
    const base = favIds
      .map(id => getRecipeById(id))
      .filter(Boolean) as Recipe[];
    const customFav = custom.filter(c => favIds.includes(c.id));
    const combined = [...customFav, ...base];
    setList(combined);
  };

  const removeFav = (id: string) => {
    toggleFavorite(id);
    refresh();
  };

  return (
    <div>
      <div className="card">
        <div style={{ fontSize: 18, fontWeight: 800 }}>我的收藏</div>
        <div className="small">收藏的菜保存在当前设备，AI 生成并保存的菜也会出现在这里。</div>
      </div>
      {list.length === 0 && (
        <div className="card">
          <div style={{ fontWeight: 700 }}>还没有收藏</div>
          <div className="small" style={{ marginTop: 6 }}>在“今日推荐”或“菜谱详情”里点“收藏”即可加入。</div>
          <Link href="/" className="btn secondary" style={{ marginTop: 10, width: '100%' }}>去看看今日推荐</Link>
        </div>
      )}
      {list.map(r => (
        <div className="card" key={r.id}>
          <div className="row" style={{ marginBottom: 6 }}>
            <div style={{ fontWeight: 700 }}>{r.name}</div>
            <div className="row" style={{ gap: 8 }}>
              <Link href={`/recipe/${r.id}`} className="btn secondary" style={{ padding: '8px 10px' }}>详情</Link>
              <button className="btn secondary" style={{ padding: '8px 10px' }} onClick={() => removeFav(r.id)}>移出收藏</button>
            </div>
          </div>
          <div className="small">用油 {r.oil_tsp} 茶匙 · 约 {r.time_min} 分钟</div>
          <div style={{ marginTop: 6 }}>
            {r.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
          <div style={{ fontWeight: 700, marginTop: 8 }}>主要食材</div>
          <ul className="list">
            {r.ingredients.slice(0, 4).map(ing => (
              <li key={ing.item}>{ing.item} {ing.amount}{ing.unit}</li>
            ))}
            {r.ingredients.length > 4 && <li className="small">... 共 {r.ingredients.length} 种</li>}
          </ul>
        </div>
      ))}
    </div>
  );
}
