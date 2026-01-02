"use client";

import { useEffect, useState } from 'react';

function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone() {
  if (typeof window === 'undefined') return false;
  // iOS Safari
  // @ts-ignore
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
}

export default function PWAInstallHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isIOS() && !isStandalone()) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="card" style={{ position: 'fixed', bottom: 90, left: 12, right: 12, zIndex: 50 }}>
      <div className="row">
        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>添加到主屏幕</div>
          <div className="small">在 Safari 点击分享按钮，再点“添加到主屏幕”，即可像小程序一样一键打开。</div>
        </div>
        <button className="btn secondary" style={{ padding: '8px 12px' }} onClick={() => setShow(false)}>知道了</button>
      </div>
    </div>
  );
}
