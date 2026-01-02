"use client";

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    const register = async () => {
      try {
        await navigator.serviceWorker.register('/service-worker.js');
      } catch (err) {
        console.error('SW 注册失败', err);
      }
    };
    register();
  }, []);
  return null;
}
