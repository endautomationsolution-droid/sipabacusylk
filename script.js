// ---- Soroban interactive abacus ----
  (function(){
    const cols = document.querySelectorAll('.soroban-col');
    const totalEl = document.getElementById('soroban-total');
    function compute(){
      let total = 0;
      cols.forEach(col=>{
        const place = parseInt(col.dataset.place,10);
        let val = 0;
        col.querySelectorAll('.bead-heaven.active').forEach(()=>val+=5);
        col.querySelectorAll('.bead-earth.active').forEach(()=>val+=1);
        total += val*place;
      });
      totalEl.textContent = total.toLocaleString('en-IN');
    }
    // Heaven beads: simple single-bead toggle
    document.querySelectorAll('.bead-heaven').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        btn.classList.toggle('active');
        compute();
      });
    });
    // Earth beads: must move as a contiguous group toward the bar, or they'll overlap
    document.querySelectorAll('.earth-track').forEach(track=>{
      // visual order nearest-the-bar first (DOM is reversed by column-reverse)
      const visual = Array.from(track.querySelectorAll('.bead-earth')).reverse();
      visual.forEach((btn, idx)=>{
        btn.addEventListener('click', ()=>{
          const wasActive = btn.classList.contains('active');
          const newCount = wasActive ? idx : idx + 1;
          visual.forEach((b,i)=> b.classList.toggle('active', i < newCount));
          compute();
        });
      });
    });
    document.getElementById('soroban-reset').addEventListener('click', ()=>{
      document.querySelectorAll('.bead-btn.active').forEach(b=>b.classList.remove('active'));
      compute();
    });
  })();

  // ---- Nav mobile toggle ----
  (function(){
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if(!toggle || !links) return;
    toggle.addEventListener('click', ()=>{
      const isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>{
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
      });
    });
  })();

  // ---- Promo banner dismiss ----
  (function(){
    const banner = document.getElementById('promo-banner');
    const closeBtn = document.getElementById('promo-close');
    if(banner && closeBtn){
      closeBtn.addEventListener('click', ()=>{
        banner.classList.add('hidden');
      });
    }
  })();

  // ---- Quiz widget ----
  (function(){
    const box = document.getElementById('quiz-box');
    const step1 = document.getElementById('quiz-step-1');
    const result = document.getElementById('quiz-result');
    box.querySelectorAll('.quiz-opt').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const track = btn.dataset.track;
        step1.style.display = 'none';
        result.style.display = 'block';
        result.textContent = 'Great fit: the ' + track + ' Track. Scroll down to book a free demo!';
      });
    });
  })();

  // ---- Gallery tabs ----
  (function(){
    const tabs = document.querySelectorAll('.gtab');
    const photos = document.getElementById('gallery-photos');
    const videos = document.getElementById('gallery-videos');
    tabs.forEach(tab=>{
      tab.addEventListener('click', ()=>{
        tabs.forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        if(tab.dataset.tab === 'photos'){
          photos.classList.remove('hidden'); videos.classList.add('hidden');
        }else{
          videos.classList.remove('hidden'); photos.classList.add('hidden');
        }
      });
    });
  })();

  // ---- FAQ accordion ----
  (function(){
    document.querySelectorAll('.faq-item').forEach(item=>{
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      q.addEventListener('click', ()=>{
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(o=>{
          o.classList.remove('open');
          o.querySelector('.faq-a').style.maxHeight = null;
        });
        if(!isOpen){
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });
  })();

  // ---- Branch locator ----
  (function(){
    const tabs = document.querySelectorAll('.branch-tab');
    const cards = document.querySelectorAll('.branch-card');
    const marker = document.getElementById('map-marker');
    const pinSvg = document.getElementById('map-pin-svg');
    const label = document.getElementById('map-label');
    const positions = {
      indiranagar: { left:'30%', top:'38%', color:'#FF6B5B', name:'Indiranagar' },
      whitefield:  { left:'72%', top:'30%', color:'#2E9BE0', name:'Whitefield' },
      hsr:         { left:'56%', top:'64%', color:'#8B5FBF', name:'HSR Layout' }
    };
    function select(key){
      tabs.forEach(t=> t.classList.toggle('active', t.dataset.branch === key));
      cards.forEach(c=> c.classList.toggle('active', c.dataset.branch === key));
      const pos = positions[key];
      if(pos && marker){
        marker.style.left = pos.left;
        marker.style.top = pos.top;
        pinSvg.querySelector('path').setAttribute('fill', pos.color);
        label.textContent = pos.name;
        label.style.background = pos.color;
      }
    }
    tabs.forEach(tab=> tab.addEventListener('click', ()=> select(tab.dataset.branch)));
    select('indiranagar');
  })();


  // ---- Demo booking form ----
  (function(){
    const form = document.getElementById('demo-form');
    const success = document.getElementById('form-success');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      success.style.display = 'block';
      form.reset();
      success.scrollIntoView({behavior:'smooth', block:'nearest'});
    });
  })();
