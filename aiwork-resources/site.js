(()=>{'use strict';const ad=document.querySelector('.ad');try{if(sessionStorage.getItem('aiwork-ad-closed'))ad.hidden=true}catch{}document.querySelector('#close-ad')?.addEventListener('click',()=>{ad.hidden=true;try{sessionStorage.setItem('aiwork-ad-closed','1')}catch{}});document.querySelectorAll('[role=tab]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[role=tab]').forEach(x=>x.setAttribute('aria-selected',String(x===b)));document.querySelectorAll('[role=tabpanel]').forEach(p=>p.hidden=p.id!==b.dataset.panel)}));const form=document.querySelector('#brief-form');if(form){const checks=[...document.querySelectorAll('.checks input')],progress=document.querySelector('#progress'),result=document.querySelector('#brief-output'),status=document.querySelector('#brief-status');const update=()=>progress.textContent=checks.filter(c=>c.checked).length+' / '+checks.length+' 项已核对';checks.forEach(c=>c.addEventListener('change',update));form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);result.value=['任务：'+document.querySelector('h1').textContent,'页面：'+location.href,'系统：'+d.get('os'),'地区：'+d.get('region'),'软件环境：'+d.get('tools'),'目标与观察：'+d.get('notes'),'月租预算：'+d.get('budget')+'（自定币种，不含平台订阅或API费用）',...checks.map(c=>(c.checked?'[已核对] ':'[待核对] ')+c.dataset.label),'下一步：按未完成项逐项确认；核对当前官方要求与产品交付范围。'].join('\n');status.textContent='需求简报已生成。表单内容保留在当前页面，未提交服务器。'});document.querySelector('#copy-brief').addEventListener('click',async()=>{if(!result.value){status.textContent='请先生成简报。';return}try{await navigator.clipboard.writeText(result.value);status.textContent='简报已复制。'}catch{result.focus();result.select();status.textContent='请按 Ctrl+C 复制选中文字。'}});document.querySelector('#reset-brief').addEventListener('click',()=>{form.reset();checks.forEach(c=>c.checked=false);result.value='';status.textContent='已重置。';update()});update()}const q=document.querySelector('#topic-search');if(q){q.addEventListener('input',()=>{const term=q.value.trim().toLowerCase();let n=0;document.querySelectorAll('.directory .card').forEach(c=>{c.hidden=!c.textContent.toLowerCase().includes(term);if(!c.hidden)n++});document.querySelectorAll('.directory-group').forEach(g=>g.hidden=![...g.querySelectorAll('.card')].some(c=>!c.hidden));document.querySelector('#shown-topics').textContent=n;document.querySelector('#no-result').hidden=n>0})}})();
// IDC3 promotions: one delegated activation handler, with no navigation interception.
(() => {
  'use strict';
  const topic = location.pathname.match(/^\/(codex|gpt)-topic-(0[1-9]|[1-4][0-9]|50)\/(?:index\.html)?$/);
  if (!topic || window.__aiworkIdc3Tracking) return;
  window.__aiworkIdc3Tracking = true;
  function trackPromotion(event) {
    if (event.defaultPrevented || (event.type === 'auxclick' ? event.button !== 1 : event.button !== 0)) return;
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    let target;
    try { target = new URL(link.href, location.href); } catch { return; }
    if (target.protocol !== 'https:' || !['www.idc3.com', 'idc3.com'].includes(target.hostname) || target.port || target.pathname !== '/pro/ydesktop.html') return;
    // Leave explicitly annotated links to Umami's built-in handler, never count both.
    if (link.closest('[data-umami-event]')) return;
    if (typeof window.umami?.track !== 'function') return;
    const position = link.closest('.ad') ? 'floating_ad'
      : link.closest('#sources') ? 'sources'
      : link.closest('header') ? 'header'
      : link.closest('footer') ? 'footer' : 'content';
    try {
      Promise.resolve(window.umami.track('idc3_ad_click', {
        topic_page: topic[1] + '-topic-' + topic[2],
        topic_family: topic[1],
        ad_position: position,
        target_product: 'ydesktop',
        target_url: target.origin + target.pathname
      })).catch(() => {});
    } catch { /* Analytics must never interrupt the product link. */ }
  }
  // Touch generates click; keyboard Enter also generates click. Do not bind touch/pointer events.
  document.addEventListener('click', trackPromotion);
  document.addEventListener('auxclick', trackPromotion);
})();
