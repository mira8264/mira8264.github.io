(() => {
  'use strict';
  if (document.getElementById('dexun-idc-floating-ad')) return;
  const site = ['hongkong-server','overseas-server','ddos-server'].find(name => location.pathname.startsWith('/' + name + '/')) || 'ai-tools';
  const closeKey = 'dexun-idc-ad-closed:' + site;
  try { if (sessionStorage.getItem(closeKey) === '1') return; } catch (_) {}
  const copy = {
    'ai-tools': ['让创意，拥有可靠算力', '云服务器 · GPU算力 · 云桌面', '开发、部署与远程办公，咨询德讯电讯。'],
    'hongkong-server': ['香港服务器，选德讯电讯', '云服务器 · 独立服务器 · 多IP', '查看香港线路与配置，获取适合业务的方案。'],
    'overseas-server': ['海外部署，连接更多市场', '香港 · 台湾 · 日本 · 美国', '海外服务器与裸金属，按业务需求选型。'],
    'ddos-server': ['高防服务器，守护业务运行', 'DDoS防护 · 大带宽 · 独享资源', '了解防护方案，咨询配置、线路与报价。']
  }[site];
  const host = document.createElement('div');
  host.id = 'dexun-idc-floating-ad';
  host.style.cssText = 'position:fixed;right:20px;bottom:88px;z-index:9990;width:290px;max-width:calc(100vw - 32px);display:block;';
  const shadow = host.attachShadow({mode:'open'});
  const style = document.createElement('style');
  style.textContent = `
    :host { color-scheme:light; animation:dexun-float 7s ease-in-out infinite; }
    * {box-sizing:border-box} .ad{position:relative;font:14px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;background:#102a4b;color:#fff;border:1px solid #365777;border-radius:13px;box-shadow:0 12px 35px #10243c35;padding:23px 21px 20px;overflow:hidden}
    .badge{font-size:10px;letter-spacing:1px;color:#a9c5e7;margin-bottom:12px;padding-right:30px}.badge b{color:#fff;letter-spacing:1px;margin-right:10px;font-size:12px}.close{position:absolute;right:0;top:0;width:44px;height:44px;padding:0;background:transparent;border:0;color:#b9cee7;font:25px/1 sans-serif;cursor:pointer;border-radius:0 12px 0 8px}.close:hover{background:#ffffff12;color:#fff}.title{font-size:19px;line-height:1.5;font-weight:700;margin:0 0 11px}.products{font-size:12px;color:#9dc9ff;margin:0 0 7px}.desc{font-size:12px;color:#bdcce0;margin:0 0 17px}.link{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:10px 14px;background:#3479f2;color:white;text-decoration:none;border-radius:6px;font-weight:600;font-size:13px}.link:hover{background:#4689ff}.url{font-size:11px;color:#9fb4ce;margin-top:9px;display:block}a:focus-visible,button:focus-visible{outline:3px solid #a4ceff;outline-offset:-3px}
    @keyframes dexun-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
    :host(:hover),:host(:focus-within){animation-play-state:paused}
    @media(max-width:680px){:host{width:235px!important;right:12px!important;bottom:74px!important;animation:none}.ad{padding:16px}.badge{margin-bottom:8px}.title{font-size:16px;margin-bottom:6px}.products{font-size:11px}.desc,.url{display:none}.link{padding:9px 12px;margin-top:12px}}
    @media(prefers-reduced-motion:reduce){:host{animation:none}}
  `;
  const ad = document.createElement('aside');ad.className='ad';ad.setAttribute('aria-label','德讯电讯广告');
  const badge=document.createElement('div');badge.className='badge';badge.innerHTML='<b>德讯电讯</b>推广';
  const close=document.createElement('button');close.className='close';close.type='button';close.textContent='×';close.setAttribute('aria-label','关闭德讯电讯广告');
  close.onclick=()=>{try{sessionStorage.setItem(closeKey,'1')}catch(_){}host.remove()};
  const title=document.createElement('p');title.className='title';title.textContent=copy[0];
  const products=document.createElement('p');products.className='products';products.textContent=copy[1];
  const desc=document.createElement('p');desc.className='desc';desc.textContent=copy[2];
  const link=document.createElement('a');link.className='link';link.href='https://www.idc3.com/';link.target='_blank';link.rel='sponsored noopener noreferrer';link.setAttribute('aria-label','前往德讯电讯查看服务器方案，新窗口打开');link.innerHTML='<span>查看配置与报价</span><span aria-hidden="true">↗</span>';
  const url=document.createElement('span');url.className='url';url.textContent='www.idc3.com';
  ad.append(badge,close,title,products,desc,link,url);shadow.append(style,ad);document.body.append(host);
})();
