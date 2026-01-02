import type { Metadata } from 'next';
import './globals.css';
import ServiceWorkerRegister from '../components/ServiceWorkerRegister';
import NavBar from '../components/NavBar';
import PWAInstallHint from '../components/PWAInstallHint';

export const metadata: Metadata = {
  title: '体面研究生饭（PWA）',
  description: '一键生成一荤一素+米饭的健康家常菜单，支持离线和收藏',
  manifest: '/manifest.webmanifest'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body>
        <ServiceWorkerRegister />
        <PWAInstallHint />
        <header style={{ padding: '12px 16px' }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>体面研究生饭（PWA）</div>
          <div className="small">一键生成一荤一素+米饭 · 控油 · 可收藏 · 离线可用</div>
        </header>
        <main>{children}</main>
        <NavBar />
      </body>
    </html>
  );
}
