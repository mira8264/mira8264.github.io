(() => {
  'use strict';
  if (document.getElementById('dexun-idc-floating-ad')) return;
  const site = ['hongkong-server','overseas-server','ddos-server'].find(name => location.pathname.startsWith('/' + name + '/')) || 'ai-tools';
  const closeKey = 'dexun-ai-ad-closed:' + site;
  try { if (sessionStorage.getItem(closeKey) === '1') return; } catch (_) {}
  const copy = {
    'ai-tools': ['多模型 API，一处接入', 'AI 大模型 · API 聚合 · Token 用量', '从开发到应用，了解德讯 AI 接入方案。'],
    'hongkong-server': ['AI 大模型，统一 API 接入', 'OpenAI · Claude · Gemini · DeepSeek', '查看模型与计费，按应用需求选择接入方案。'],
    'overseas-server': ['用 Token，连接 AI 应用', '多模型调用 · 统一网关 · 用量管理', '了解模型 API 与 Token 计费，规划应用成本。'],
    'ddos-server': ['多模型调用，用量清晰管理', 'AI 大模型 · API 接入 · Token 计费', '为你的 AI 应用选择模型，查看用量与价格。']
  }[site];
  const host = document.createElement('div');
  host.id = 'dexun-idc-floating-ad';
  host.style.cssText = 'position:fixed;right:20px;bottom:88px;z-index:9990;width:290px;max-width:calc(100vw - 32px);display:block;';
  const shadow = host.attachShadow({mode:'open'});
  const style = document.createElement('style');
  style.textContent = `
    :host { color-scheme:light; animation:dexun-float 7s ease-in-out infinite; }
    * {box-sizing:border-box} .ad{position:relative;font:14px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;background:#f3f8ff;color:#183c63;border:1px solid #c8dbf2;border-radius:13px;box-shadow:0 12px 35px #405f8120;padding:23px 21px 20px;overflow:hidden}
    .badge{font-size:10px;letter-spacing:1px;color:#6d829b;margin-bottom:12px;padding-right:30px}.badge b{color:#214c7b;letter-spacing:1px;margin-right:10px;font-size:12px}.close{position:absolute;right:0;top:0;width:44px;height:44px;padding:0;background:transparent;border:0;color:#55708c;font:25px/1 sans-serif;cursor:pointer;border-radius:0 12px 0 8px}.close:hover{background:#dfebf9;color:#183c63}.title{font-size:19px;line-height:1.5;font-weight:700;margin:0 0 11px}.products{font-size:12px;color:#3975b7;margin:0 0 7px}.desc{font-size:12px;color:#617b96;margin:0 0 17px}.link{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:10px 14px;background:#3479f2;color:white;text-decoration:none;border-radius:6px;font-weight:600;font-size:13px}.link:hover{background:#4689ff}.url{font-size:11px;color:#758aa0;margin-top:9px;display:block}a:focus-visible,button:focus-visible{outline:3px solid #a4ceff;outline-offset:-3px}
    @keyframes dexun-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
    :host(:hover),:host(:focus-within){animation-play-state:paused}
    @media(max-width:680px){:host{width:235px!important;right:12px!important;bottom:74px!important;animation:none}.ad{padding:16px}.badge{margin-bottom:8px}.title{font-size:16px;margin-bottom:6px}.products{font-size:11px}.desc,.url{display:none}.link{padding:9px 12px;margin-top:12px}}
    @media(prefers-reduced-motion:reduce){:host{animation:none}}
  `;
  const ad = document.createElement('aside');ad.className='ad';ad.setAttribute('aria-label','德讯 AI 大模型与 Token 广告');
  const badge=document.createElement('div');badge.className='badge';badge.innerHTML='<b>德讯 AI</b>推广';
  const close=document.createElement('button');close.className='close';close.type='button';close.textContent='×';close.setAttribute('aria-label','关闭德讯 AI 广告');
  close.onclick=()=>{try{sessionStorage.setItem(closeKey,'1')}catch(_){}host.remove()};
  const title=document.createElement('p');title.className='title';title.textContent=copy[0];
  const products=document.createElement('p');products.className='products';products.textContent=copy[1];
  const desc=document.createElement('p');desc.className='desc';desc.textContent=copy[2];
  const link=document.createElement('a');link.className='link';link.href='https://www.93api.com/';link.target='_blank';link.rel='sponsored noopener noreferrer';link.setAttribute('aria-label','前往德讯 AI 查看模型与 Token 价格，新窗口打开');link.innerHTML='<span>查看模型与 Token 价格</span><span aria-hidden="true">↗</span>';
  const url=document.createElement('span');url.className='url';url.textContent='www.93api.com';
  ad.append(badge,close,title,products,desc,link,url);shadow.append(style,ad);document.body.append(host);
})();
