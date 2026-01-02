"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="navbar">
      <Link className={pathname === '/' ? 'active' : ''} href="/">
        <span>今日</span>
      </Link>
      <Link className={pathname.startsWith('/weekly') ? 'active' : ''} href="/weekly">
        <span>本周计划</span>
      </Link>
      <Link className={pathname.startsWith('/favorites') ? 'active' : ''} href="/favorites">
        <span>收藏</span>
      </Link>
      <Link className={pathname.startsWith('/recipe') ? 'active' : ''} href="/recipe/stirfried-egg-tomato">
        <span>菜谱库</span>
      </Link>
    </nav>
  );
}
