const C='training-os-black-live-v1';
const A=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A))));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
    const clone=resp.clone();caches.open(C).then(c=>c.put(e.request,clone));return resp;
  }).catch(()=>caches.match('./index.html'))));
});