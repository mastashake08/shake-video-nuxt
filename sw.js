if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const a=e=>r(e,o),c={module:{uri:o},exports:l,require:a};s[o]=Promise.all(i.map((e=>c[e]||a(e)))).then((e=>(n(...e),l)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"200",revision:"8e850b2e6d0d44aafc2031378eba463e"},{url:"404",revision:"8e850b2e6d0d44aafc2031378eba463e"},{url:"apple-touch-icon-180x180.png",revision:"97e704aca3f2bde41168543f6d762bf5"},{url:"assets/entry.ab033c50.css",revision:null},{url:"assets/entry.cabe923e.js",revision:null},{url:"assets/error-404.7fc72018.css",revision:null},{url:"assets/error-404.86245bad.js",revision:null},{url:"assets/error-500.4a2c5413.js",revision:null},{url:"assets/error-500.c5df6088.css",revision:null},{url:"assets/workbox-window.prod.es5.a7b12eab.js",revision:null},{url:"favicon.ico",revision:"401204f145a049915874ea32bb36f80f"},{url:"/shake-video-nuxt/",revision:"a4c9c7935cbeb17c2d5c512382d74c1a"},{url:"logo.svg",revision:"ae99d18425dd0b69612313966f8cea6b"},{url:"maskable-icon-512x512.png",revision:"062b2c64ec3d83fe2ac582f4006fbd3b"},{url:"pwa-192x192.png",revision:"6d067333e60da0aefa5fbe2d863567c5"},{url:"pwa-512x512.png",revision:"96df43dc29a0dbd640f13ed7e9df708b"},{url:"pwa-64x64.png",revision:"a8be1800b8b32598c31102adf8466ef4"},{url:"video2.png",revision:"99b9a6b583cbbb477fb1454e85356e94"},{url:"_payload.json",revision:"2557e6512f31c6c7cdcba6a874e7ed68"},{url:"assets/builds/latest.json",revision:null},{url:"assets/builds/meta/3032b3df-c242-4951-b29f-87e115ec521f.json",revision:null},{url:"manifest.webmanifest",revision:"4d3bc3a63d043f43c8b78ea1c4d6da99"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/shake-video-nuxt/")))}));
