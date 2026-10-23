(() => {
  'use strict';
  const match = location.pathname.match(/^\/(ai-[^/]+)\//);
  if (!match || document.getElementById('api-token-offer')) return;
  const site = match[1], key = '93api-token-offer-closed:' + site;
  try { if (sessionStorage.getItem(key) === '1') return; } catch (_) {}
  const host = document.createElement('div');host.id='api-token-offer';
  host.style.cssText='display:block;position:fixed;right:20px;bottom:26px;width:286px;max-width:calc(100vw - 28px);z-index:9990;';
  const shadow=host.attachShadow({mode:'open'});
  const css=document.createElement('style');css.textContent=`
    :host{color-scheme:light;animation:offer-float 8s ease-in-out infinite}*{box-sizing:border-box}.offer{position:relative;padding:24px 21px 20px;background:#f3f8ff;color:#163a60;border:1px solid #ccdef2;border-radius:14px;box-shadow:0 12px 35px #294d7120;font:14px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    .badge{font-size:10px;letter-spacing:1.1px;color:#6683a2;margin:0 28px 12px 0}.badge strong{font-weight:800;color:#2e679e;margin-right:9px}.title{font-size:22px;line-height:1.25;letter-spacing:-.5px;margin:0 0 12px;font-weight:750}.desc{font-size:12px;color:#587591;margin:0 0 17px}.close{position:absolute;right:0;top:0;width:44px;height:44px;background:transparent;border:0;border-radius:0 13px 0 10px;color:#6c88a3;font:25px/1 sans-serif;cursor:pointer}.close:hover{background:#e3eefb;color:#173b60}.cta{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 14px;background:#2c75d9;border:1px solid #2c75d9;color:#fff;text-decoration:none;border-radius:7px;font-size:13px;font-weight:650}.cta:hover{background:#1e65c6}.fine{font-size:10px;color:#6e87a0;margin:10px 0 0}a:focus-visible,button:focus-visible{outline:3px solid #215ead;outline-offset:3px}
    @keyframes offer-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}:host(:hover),:host(:focus-within){animation-play-state:paused}
    @media(max-width:700px){:host{width:226px!important;right:12px!important;bottom:16px!important;animation:none}.offer{padding:18px 16px 16px}.badge{font-size:9px;margin-bottom:9px}.title{font-size:19px;margin-bottom:8px}.desc{font-size:11px;margin-bottom:12px}.cta{padding:9px 11px;font-size:12px}.fine{display:none}}
    @media(prefers-reduced-motion:reduce){:host{animation:none}}
  `;
  const card=document.createElement('aside');card.className='offer';card.setAttribute('aria-label','93API token offers advertisement');
  const badge=document.createElement('p');badge.className='badge';badge.innerHTML='<strong>93API</strong> TOKEN OFFERS';
  const close=document.createElement('button');close.className='close';close.type='button';close.textContent='×';close.setAttribute('aria-label','Close token offer');close.onclick=()=>{try{sessionStorage.setItem(key,'1')}catch(_){}host.remove()};
  const title=document.createElement('p');title.className='title';title.textContent='Low-Cost AI Tokens';
  const desc=document.createElement('p');desc.className='desc';desc.textContent='Build more for your budget. Explore value-priced model access and current token offers at 93API.';
  const cta=document.createElement('a');cta.className='cta';cta.href='https://www.93api.com/';cta.target='_blank';cta.rel='sponsored noopener noreferrer';cta.setAttribute('aria-label','View 93API token offers, opens in a new tab');cta.innerHTML='<span>View Token Offers</span><span aria-hidden="true">↗</span>';
  const fine=document.createElement('p');fine.className='fine';fine.textContent='93api.com · Check current rates and availability.';
  card.append(badge,close,title,desc,cta,fine);shadow.append(css,card);document.body.append(host);
})();
