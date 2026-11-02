/* رشفة كوفي | Rishfa Coffee — website by VELIX Web Solutions.
   Bilingual (العربية / English). Rishfa's own cups, a pinned drinks section where every drink takes
   the screen in its own colour, a full price menu, kinetic type with a landing cup, visit and contact. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 860px)').matches;
  gsap.registerPlugin(ScrollTrigger);
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const root = document.documentElement;

  /* ---------- contact details: fill phone / whatsapp when the cafe confirms them ---------- */
  const CONTACT = { phone: '', whatsapp: '' }; // e.g. phone: '0790000000', whatsapp: '962790000000'

  /* ---------- language ---------- */
  let L = 'ar';
  try { const q = new URLSearchParams(location.search).get('lang'); L = q === 'en' || q === 'ar' ? q : (localStorage.getItem('rishfa-lang') || 'ar'); } catch (e) {}
  if (L !== 'en') L = 'ar';
  const t = o => (o && typeof o === 'object' ? o[L] : o);
  const arrow = () => (L === 'ar' ? '←' : '→');

  const T = {
    ar: {
      title: 'رشفة كوفي | Rishfa Coffee — عمّان',
      desc: 'رشفة كوفي بعمّان: قهوة، لاتيه، ماتشا، فرابتشينو ومشروبات ساخنة وباردة. شوف المنيو والأسعار، ومفتوحين يومياً من 8 الصبح لـ 12 بالليل.',
      nDrinks: 'مشروباتنا', nMenu: 'المنيو', nVisit: 'زورونا', nContact: 'تواصل', cta: 'المنيو والأسعار',
      kick: 'Coffee &amp; More · عمّان',
      h1: '<span class="ln"><span>الحب</span></span><span class="ln"><span>من <em>أول رشفة.</em></span></span>',
      heroP: 'قهوة، لاتيه، ماتشا وفرابتشينو، ساخن وبارد، بأسعار بتبدأ من ربع دينار. مفتوحين كل يوم من 8 الصبح لـ 12 بالليل.',
      bMenu: 'شوف المنيو', bWhere: 'وين موقعنا', cue: 'مرّر',
      rKick: 'مشروباتنا',
      mKick: 'المنيو', mH: 'كل الأسعار، <em>بوضوح.</em>', mSub: 'الأسعار بالدينار الأردني.',
      k1: 'الحب', k2: 'من أول', k3: 'رشفة.',
      vKick: 'زورونا', vH: 'مستنيينكم <em>كل يوم.</em>', vDays: 'كل أيام الأسبوع', vMap: 'افتح الموقع على الخريطة',
      cKick: 'تواصلوا معنا', cH: 'خلّينا <em>على تواصل.</em>',
      cIg: 'إنستغرام', cIgGo: 'تابعونا وراسلونا ←', cLoc: 'الموقع', cCity: 'عمّان، الأردن', cLocGo: 'افتح الاتجاهات ←', cHours: 'ساعات الدوام', cDays: 'كل أيام الأسبوع',
      fT: 'الحب من أول رشفة.', fS: 'Rishfa Coffee · عمّان', fBy: 'تصميم وتطوير <b>VELIX</b>',
      open: 'مفتوحين هلأ، لحد 12 بالليل', closed: 'مسكّرين هلأ، بنفتح الساعة 8 الصبح',
      cur: 'د.أ', ask: 'اسألونا بالمحل', from: 'من',
      wa: 'واتساب', waGo: 'ابعتولنا رسالة ←', ph: 'اتصلوا فينا', phGo: 'اتصال مباشر ←',
      switchTo: 'English', switchLabel: 'Switch to English',
    },
    en: {
      title: 'Rishfa Coffee | رشفة كوفي — Amman',
      desc: 'Rishfa Coffee in Amman: coffee, lattes, matcha, frappuccino and more, hot and iced. See the full menu and prices. Open daily from 8 AM to midnight.',
      nDrinks: 'Drinks', nMenu: 'Menu', nVisit: 'Visit', nContact: 'Contact', cta: 'Menu &amp; prices',
      kick: 'Coffee &amp; More · Amman',
      h1: '<span class="ln"><span>Love at</span></span><span class="ln"><span>first <em>sip.</em></span></span>',
      heroP: 'Coffee, lattes, matcha and frappuccino, hot and iced, starting from just 0.25 JD. Open every day from 8 AM to midnight.',
      bMenu: 'See the menu', bWhere: 'Find us', cue: 'Scroll',
      rKick: 'Our drinks',
      mKick: 'Menu', mH: 'Every price, <em>clearly.</em>', mSub: 'Prices in Jordanian Dinar.',
      k1: 'Love', k2: 'at first', k3: 'sip.',
      vKick: 'Visit us', vH: 'See you <em>every day.</em>', vDays: 'Every day', vMap: 'Open in Google Maps',
      cKick: 'Get in touch', cH: 'Let’s <em>stay in touch.</em>',
      cIg: 'Instagram', cIgGo: 'Follow &amp; message us →', cLoc: 'Location', cCity: 'Amman, Jordan', cLocGo: 'Get directions →', cHours: 'Opening hours', cDays: 'Every day',
      fT: 'Love at first sip.', fS: 'رشفة كوفي · Amman', fBy: 'Design &amp; development by <b>VELIX</b>',
      open: 'Open now, until midnight', closed: 'Closed now, we open at 8 AM',
      cur: 'JD', ask: 'Ask in store', from: 'From',
      wa: 'WhatsApp', waGo: 'Send us a message →', ph: 'Call us', phGo: 'Call now →',
      switchTo: 'العربية', switchLabel: 'التبديل للعربية',
    },
  };
  const S = {
    s: { ar: 'صغير', en: 'Small' }, l: { ar: 'كبير', en: 'Large' }, one: { ar: '', en: '' },
    hot: { ar: 'ساخن', en: 'Hot' }, iced: { ar: 'بارد', en: 'Iced' },
  };

  /* ---------- featured drinks (prices from Rishfa's menu) ---------- */
  const SL = [[S.s, '1.50'], [S.l, '2.00']];
  const ASK = [];
  const P = [
    { img: 'p_latte', c: '#855433', name: { ar: 'آيس لاتيه', en: 'Iced Latte' }, word: { ar: 'لاتيه', en: 'LATTE' }, tag: S.iced,
      desc: { ar: 'إسبريسو على حليب بارد وثلج، الطبقة الغامقة فوق والكريمي تحت.', en: 'Espresso poured over cold milk and ice, the dark layer on top and creamy below.' }, price: [[S.s, '1.25'], [S.l, '1.50']] },
    { img: 'p_spanish', c: '#6e472d', name: { ar: 'آيس سبانيش لاتيه', en: 'Iced Spanish Latte' }, word: { ar: 'سبانيش', en: 'SPANISH' }, tag: { ar: 'الأكثر طلباً', en: 'Best seller' },
      desc: { ar: 'لاتيه بارد بالحليب المحلّى، ناعم وكريمي ومن أكثر الطلبات حباً.', en: 'Iced latte with sweetened milk, smooth, creamy and a customer favourite.' }, price: SL },
    { img: 'p_caramel', c: '#a66221', name: { ar: 'آيس كراميل لاتيه', en: 'Iced Caramel Latte' }, word: { ar: 'كراميل', en: 'CARAMEL' }, tag: S.iced,
      desc: { ar: 'صوص الكراميل على جوانب الكاسة مع لاتيه بارد.', en: 'Caramel sauce drizzled down the cup with a cold latte.' }, price: SL },
    { img: 'p_hazelnut', c: '#5d3921', name: { ar: 'آيس بندق لاتيه', en: 'Iced Hazelnut Latte' }, word: { ar: 'بندق', en: 'HAZELNUT' }, tag: S.iced,
      desc: { ar: 'نكهة البندق الدافية مع لاتيه بارد، أغمق وأغنى.', en: 'Warm hazelnut flavour in an iced latte, deeper and richer.' }, price: SL },
    { img: 'p_matcha', c: '#446633', name: { ar: 'آيس ماتشا لاتيه', en: 'Iced Matcha Latte' }, word: { ar: 'ماتشا', en: 'MATCHA' }, tag: S.iced,
      desc: { ar: 'ماتشا خضرا فوق حليب بارد، منعشة وهادية.', en: 'Green matcha floating on cold milk, fresh and mellow.' }, price: SL },
    { img: 'p_pistachio', c: '#77844b', name: { ar: 'آيس بستاشيو لاتيه', en: 'Iced Pistachio Latte' }, word: { ar: 'بستاشيو', en: 'PISTACHIO' }, tag: S.iced,
      desc: { ar: 'حليب بنكهة الفستق الحلبي وطبقة قهوة على الوجه.', en: 'Pistachio milk with a layer of espresso on top.' }, price: SL },
    { img: 'p_vanilla', c: '#967d5b', name: { ar: 'آيس فانيلا لاتيه', en: 'Iced Vanilla Latte' }, word: { ar: 'فانيلا', en: 'VANILLA' }, tag: S.iced,
      desc: { ar: 'لاتيه بارد خفيف بنكهة الفانيلا، للي بحب الطعم الهادي.', en: 'A light iced latte with vanilla, for a softer taste.' }, price: SL },
    { img: 'p_frappe', c: '#4a2f26', name: { ar: 'فرابتشينو', en: 'Frappuccino' }, word: { ar: 'فرابيه', en: 'FRAPPE' }, tag: S.iced,
      desc: { ar: 'قهوة مثلّجة ومخفوقة مع كريمة وصوص شوكولاتة على الوجه.', en: 'Blended iced coffee topped with whipped cream and chocolate sauce.' }, price: [[S.s, '2.00'], [S.l, '2.50']] },
    { img: 'p_mojito', c: '#f0ddc4', light: true, name: { ar: 'موهيتو', en: 'Mojito' }, word: { ar: 'موهيتو', en: 'MOJITO' }, tag: { ar: 'منعش', en: 'Refresher' },
      desc: { ar: 'ليمون ونعنع فريش مع صودا وثلج، أبرد اشي بالصيف.', en: 'Fresh lime and mint with soda and ice, the coolest thing all summer.' }, price: ASK },
    { img: 'p_berry', c: '#f0dcc2', light: true, name: { ar: 'موهيتو فراولة', en: 'Strawberry Mojito' }, word: { ar: 'فراولة', en: 'BERRY' }, tag: { ar: 'منعش', en: 'Refresher' },
      desc: { ar: 'فراولة مع ليمون ونعنع وصودا، حلو ومنعش.', en: 'Strawberry with lime, mint and soda, sweet and refreshing.' }, price: ASK },
    { img: 'hot', c: '#33241b', name: { ar: 'القهوة الساخنة', en: 'Hot Coffee' }, word: { ar: 'ساخن', en: 'HOT' }, tag: S.hot,
      desc: { ar: 'إسبريسو، أمريكانو، لاتيه، سبانيش، لاتيه بالنكهات و V60، بكاسة رشفة الكرافت.', en: 'Espresso, americano, latte, Spanish latte, flavoured lattes and V60, in our kraft cup.' }, price: [[{ ar: 'من', en: 'From' }, '1.00']] },
  ];

  /* ---------- full menu ---------- */
  const FLAV_HOT = { ar: 'كراميل · سولتد كراميل · بندق · فانيلا · كوكيز · بمبكين · توفي نت · بستاشيو · ماتشا', en: 'Caramel · Salted caramel · Hazelnut · Vanilla · Cookies · Pumpkin · Toffee nut · Pistachio · Matcha' };
  const FLAV_ICE = { ar: 'سبانيش · كراميل · بندق · توفي نت · فانيلا · سولتد كراميل · ماتشا · بستاشيو', en: 'Spanish · Caramel · Hazelnut · Toffee nut · Vanilla · Salted caramel · Matcha · Pistachio' };
  const it = (ar, en, p, img, d) => ({ n: { ar, en }, p, img, d });
  const MENU = [
    { id: 'hot', t: { ar: 'القهوة الساخنة', en: 'Hot coffee' }, items: [
      it('إسبريسو', 'Espresso', [[S.one, '1.00']], 'hot'),
      it('لونجو', 'Lungo', [[S.one, '1.00']], 'hot'),
      it('أمريكانو', 'Americano', [[S.one, '1.00']], 'hot'),
      it('لاتيه', 'Latte', [[S.one, '1.50']], 'hot'),
      it('سبانيش لاتيه', 'Spanish Latte', [[S.one, '2.00']], 'hot'),
      it('لاتيه بالنكهات', 'Flavoured Latte', [[S.one, '2.00']], 'hot', FLAV_HOT),
      it('V60', 'V60 Pour Over', [[S.one, '2.00']], 'hot'),
    ] },
    { id: 'cold', t: { ar: 'البارد', en: 'Iced' }, items: [
      it('آيس لاتيه', 'Iced Latte', [[S.s, '1.25'], [S.l, '1.50']], 'p_latte'),
      it('آيس لاتيه بالنكهات', 'Flavoured Iced Latte', SL, 'p_caramel', FLAV_ICE),
      it('آيس ماتشا لاتيه', 'Iced Matcha Latte', SL, 'p_matcha'),
      it('آيس بستاشيو لاتيه', 'Iced Pistachio Latte', SL, 'p_pistachio'),
      it('فرابتشينو', 'Frappuccino', [[S.s, '2.00'], [S.l, '2.50']], 'p_frappe'),
      it('موهيتو', 'Mojito', ASK, 'p_mojito'),
      it('موهيتو فراولة', 'Strawberry Mojito', ASK, 'p_berry'),
    ] },
    { id: 'classic', t: { ar: 'الكلاسيك', en: 'Classics' }, items: [
      it('قهوة تركي', 'Turkish Coffee', [[S.one, '0.75']], 'hot'),
      it('هوت شوكلت', 'Hot Chocolate', [[S.one, '1.00']], 'hot'),
      it('سحلب', 'Sahlab', [[S.one, '1.00']], 'hot'),
      it('شاي كرك', 'Karak Tea', [[S.one, '0.50']], 'hot'),
      it('نسكافيه', 'Nescafé', [[S.one, '0.50']], 'hot'),
      it('كابتشينو Good Day', 'Good Day Cappuccino', [[S.one, '0.50']], 'hot'),
      it('زهورات وأعشاب', 'Herbal Tea', [[S.one, '0.50']], 'hot'),
      it('شاي', 'Tea', [[S.one, '0.25']], 'hot'),
      it('مياه', 'Water', [[S.one, '0.25']]),
    ] },
  ];
  // Admin-managed menu additions (local browser preview; shared production DB required).
  try {
    const adminItems = JSON.parse(localStorage.getItem('rishfa-admin-items-v1') || '[]');
    const adminCategories = JSON.parse(localStorage.getItem('rishfa-admin-categories-v1') || '[]');
    const grouped = {};
    adminItems.forEach(x => {
      if (!x.available) return;
      const id = 'admin-' + (x.category || 'other');
      const category = adminCategories.find(c => c.id === x.category);
      if (!grouped[id]) grouped[id] = { id, t: { ar: category?.ar || x.category || 'إضافات', en: category?.en || x.category || 'More' }, items: [] };
      grouped[id].items.push({ n: { ar: x.ar, en: x.en }, p: [[S.one, String(x.price)]], img: x.photo || null });
    });
    MENU.push(...Object.values(grouped));
  } catch (e) {}
  const jd = v => `<b dir="ltr">${v}</b><small>${T[L].cur}</small>`;
  const cupImg = (src, alt = '', cls = 'cup', lazy = false) => `<img class="${cls}" src="img/${src}.webp" alt="${alt}" decoding="async"${lazy ? ' loading="lazy"' : ''}>`;

  /* ---------- menu ---------- */
  let tab = 'hot';
  function renderMenu() {
    const tabs = $('#tabs'), panels = $('#panels');
    tabs.innerHTML = MENU.map(m => `<button type="button" role="tab" id="t-${m.id}" aria-controls="p-${m.id}" aria-selected="${m.id === tab}" class="${m.id === tab ? 'on' : ''}">${t(m.t)}</button>`).join('');
    const other = L === 'ar' ? 'en' : 'ar';
    panels.innerHTML = MENU.map(m => `<div class="panel${m.id === tab ? ' on' : ''}" role="tabpanel" id="p-${m.id}" aria-labelledby="t-${m.id}">${m.items.map(x => `
      <article class="item">${x.img ? `<span class="item__img${x.img === 'hot' ? '' : ' item__img--photo'}">${x.img.startsWith('data:image/') ? `<img class="thumb" src="${x.img}" alt="" loading="lazy">` : cupImg('t_' + x.img, '', 'thumb', true)}</span>` : '<span class="item__img item__img--none"></span>'}
      <div class="item__n"><h3>${t(x.n)}</h3><span dir="${other === 'ar' ? 'rtl' : 'ltr'}" lang="${other}">${x.n[other]}</span>${x.d ? `<p>${t(x.d)}</p>` : ''}</div>
      <div class="item__p">${x.p.length ? x.p.map(([s, v]) => `<span class="pp">${t(s) ? `<i>${t(s)}</i>` : ''}${jd(v)}</span>`).join('') : `<span class="pp pp--ask">${T[L].ask}</span>`}</div></article>`).join('')}</div>`).join('');
  }
  function menu() {
    renderMenu();
    $('#tabs').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      tab = b.id.slice(2);
      $$('#tabs button').forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-selected', on); });
      $$('.panel').forEach(p => p.classList.toggle('on', p.id === 'p-' + tab));
      if (!reduced) gsap.fromTo('.panel.on .item', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .04, ease: 'power3.out' });
    });
    if (reduced) return;
    gsap.from('.menu__head > *', { opacity: 0, y: 40, stagger: .1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.menu', start: 'top 75%' } });
    gsap.from('.tabs', { opacity: 0, y: 30, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.tabs', start: 'top 88%' } });
  }

  /* ---------- open now (Amman time) ---------- */
  function openNow() {
    const el = $('#openNow'); if (!el) return;
    const h = +new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Asia/Amman' }).format(new Date());
    const open = h >= 8 && h < 24;
    el.innerHTML = open ? `<i class="on"></i>${T[L].open}` : `<i></i>${T[L].closed}`;
  }

  /* ---------- preloader ---------- */
  function preloader(done) {
    const pre = $('#pre'), bar = $('#preBar');
    root.classList.add('wait'); bar.style.width = '35%';
    const first = new Image(); first.src = 'img/p_hero.webp';
    Promise.race([Promise.all([document.fonts ? document.fonts.ready : 0, first.decode ? first.decode().catch(() => {}) : 0]), new Promise(r => setTimeout(r, 2800))]).then(() => {
      bar.style.width = '100%';
      setTimeout(() => {
        root.classList.remove('wait');
        if (reduced) { pre.remove(); return done(); }
        gsap.timeline({ onComplete: () => pre.remove() })
          .to('.pre img', { scale: .8, rotation: -20, opacity: 0, duration: .45, ease: 'power2.in' })
          .to(pre, { yPercent: -100, duration: .85, ease: 'power4.inOut' }, .2);
        setTimeout(done, 400);
      }, 280);
    });
  }

  /* ---------- hero ---------- */
  function hero() {
    $('#heroCup').innerHTML = cupImg('p_hero', 'Iced Latte — Rishfa', 'cup cup--photo');
    if (reduced) return;
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .from('#heroCup', { y: 220, rotation: -16, scale: .7, opacity: 0, duration: 1.5, ease: 'expo.out' }, 0)
      .from('.hero__word', { scale: 1.2, opacity: 0, duration: 1.6 }, 0)
      .from('.hero__t .ln > span', { yPercent: 110, duration: 1.2, stagger: .12 }, .2)
      .from('.hero .kick, .hero__p, .hero__btns', { opacity: 0, y: 24, duration: .9, stagger: .1 }, .5);
    gsap.to('#heroCup .cup', { y: -14, rotation: 2, duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    const cup = $('#heroCup');
    const toCenter = () => mobile ? 0 : innerWidth / 2 - (cup.getBoundingClientRect().left - gsap.getProperty(cup, 'x') + cup.offsetWidth / 2);
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: .8, invalidateOnRefresh: true } });
    tl.to('.hero__copy', { y: -80, opacity: 0, duration: .3, ease: 'none' }, 0)
      .to('.scrollcue', { opacity: 0, duration: .1 }, 0)
      .to(cup, { x: toCenter, scale: mobile ? 1.1 : 1.18, y: mobile ? innerHeight * .1 : 0, duration: .6, ease: 'power1.inOut' }, 0)
      .to('#heroCup .cup', { rotation: -8, duration: 1, ease: 'none' }, 0)
      .to('.hero__word', { xPercent: 30, duration: 1, ease: 'none' }, 0)
      .to(cup, { y: innerHeight * .9, rotation: 18, duration: .4, ease: 'power2.in' }, .6);
    if (!mobile) addEventListener('pointermove', e => {
      const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
      gsap.to('#heroCup', { rotationY: nx * 14, rotationX: -ny * 8, transformPerspective: 1200, duration: 1 });
    });
  }

  /* ---------- drinks: pinned, one drink per scroll step ---------- */
  let fillRange = () => {};
  function range() {
    const pin = $('#rangePin'), stage = $('#stage'), dots = $('#rDots');
    $('#rTot').textContent = String(P.length).padStart(2, '0');
    const cups = P.map(p => { const d = document.createElement('div'); d.className = 'anim'; d.innerHTML = cupImg(p.img, p.name.en, p.img === 'hot' ? 'cup' : 'cup cup--photo'); d.style.opacity = 0; stage.appendChild(d); return d; });
    dots.innerHTML = P.map(() => '<i></i>').join(''); const dd = [...dots.children];
    const nameEl = $('#rName'), enEl = $('#rEn'), descEl = $('#rDesc'), tagEl = $('#rTag'), priceEl = $('#rPrice'), word = $('#rWord'), num = $('#rNum');
    let cur = -1;
    fillRange = () => {
      if (cur < 0) return; const p = P[cur], other = L === 'ar' ? 'en' : 'ar';
      nameEl.textContent = t(p.name); enEl.textContent = p.name[other]; enEl.dir = other === 'ar' ? 'rtl' : 'ltr';
      descEl.textContent = t(p.desc); tagEl.textContent = t(p.tag); word.textContent = t(p.word);
      priceEl.innerHTML = p.price.length ? p.price.map(([s, v]) => `<span>${t(s) ? `<i>${t(s)}</i>` : ''}${jd(v)}</span>`).join('') : `<span class="ask">${T[L].ask}</span>`;
    };
    function show(k, dir) {
      if (k === cur) return; const prev = cur; cur = k; const p = P[k];
      pin.style.backgroundColor = p.c; pin.classList.toggle('light', !!p.light); $('#nav').classList.toggle('onLight', !!p.light); num.textContent = String(k + 1).padStart(2, '0');
      dd.forEach((d, j) => d.classList.toggle('on', j === k));
      if (reduced) { cups.forEach((c, j) => c.style.opacity = j === k ? 1 : 0); fillRange(); return; }
      if (prev >= 0) gsap.to(cups[prev], { x: dir > 0 ? -innerWidth * .45 : innerWidth * .45, rotation: dir > 0 ? -25 : 25, scale: .7, opacity: 0, duration: .7, ease: 'power3.in', overwrite: true });
      gsap.fromTo(cups[k], { x: dir > 0 ? innerWidth * .5 : -innerWidth * .5, y: 60, rotation: dir > 0 ? 30 : -30, scale: .7, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out', delay: prev >= 0 ? .15 : 0, overwrite: true });
      const info = [tagEl, nameEl, enEl, descEl, priceEl];
      gsap.timeline().to(info, { y: -20, opacity: 0, duration: .25, stagger: .03 }).add(fillRange).fromTo(info, { y: 30 }, { y: 0, opacity: 1, duration: .6, stagger: .06, ease: 'power3.out' });
      gsap.fromTo(word, { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .9, ease: 'power3.out' });
    }
    ScrollTrigger.create({ trigger: '.range', pin: '#rangePin', start: 'top top', end: () => '+=' + innerHeight * P.length * .7, anticipatePin: 1,
      onUpdate: s => show(Math.min(P.length - 1, Math.floor(s.progress * P.length * .9999)), s.direction) });
    show(0, 1);
    if (!reduced) gsap.to(stage, { y: -14, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  }

  /* ---------- kinetic type: the cup lands right after the last word ---------- */
  function kinetic() {
    const cup = $('#kCup'), k3 = $('#k3'), pinEl = $('.kinetic__pin');
    cup.innerHTML = cupImg('p_frappe', 'Frappuccino — Rishfa', 'cup cup--photo');
    const narrow = () => innerWidth < 700;
    const rtl = () => root.dir === 'rtl';
    const endX = () => narrow() ? (pinEl.offsetWidth - cup.offsetWidth) / 2
      : rtl() ? k3.offsetLeft - cup.offsetWidth * .9 : k3.offsetLeft + k3.offsetWidth - cup.offsetWidth * .1;
    const endY = () => narrow() ? k3.offsetTop + k3.offsetHeight + 6 : k3.offsetTop + k3.offsetHeight - cup.offsetHeight * .96;
    if (reduced) { const place = () => gsap.set(cup, { x: endX(), y: endY() }); place(); addEventListener('resize', place); window.__placeK = place; return; }
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.kinetic', start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true } });
    tl.fromTo('#k1', { xPercent: -60 }, { xPercent: 0, ease: 'power1.out', duration: .8 }, 0)
      .fromTo('#k2', { xPercent: 60 }, { xPercent: 0, ease: 'power1.out', duration: .8 }, 0)
      .fromTo('#k3', { xPercent: -45, scale: .8 }, { xPercent: 0, scale: 1, ease: 'power1.out', duration: .8 }, 0)
      .fromTo(cup, { x: () => narrow() ? endX() : (rtl() ? -cup.offsetWidth : innerWidth), y: () => innerHeight + 40, rotation: () => rtl() ? -32 : 32 },
        { x: endX, y: endY, rotation: 0, ease: 'power2.out', duration: .8 }, 0)
      .to(cup, { rotation: () => rtl() ? 5 : -5, duration: .08, ease: 'sine.out' }, .8)
      .to(cup, { rotation: 0, duration: .12, ease: 'sine.inOut' }, .88);
  }

  function visit() {
    openNow(); setInterval(openNow, 60000);
    $('#yr').textContent = new Date().getFullYear();
    if (reduced) return;
    gsap.from('.visit__info > *', { opacity: 0, y: 40, stagger: .08, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.visit', start: 'top 75%' } });
    gsap.from('.visit__map', { opacity: 0, scale: .94, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.visit', start: 'top 70%' } });
  }

  /* ---------- contact ---------- */
  const IC_WA = '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8c-1-.5-2-1.5-2.5-2.5l.8-1-1-2L9 8.5Z" fill="currentColor"/></svg>';
  const IC_PH = '<svg viewBox="0 0 24 24"><path d="M6.5 3h3l1.5 4.5-2 1.5a11 11 0 0 0 6 6l1.5-2L21 14.5v3A2.5 2.5 0 0 1 18.5 20C10.5 20 4 13.5 4 5.5A2.5 2.5 0 0 1 6.5 3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  function renderContactExtra() {
    const grid = $('#cGrid'); if (!grid) return;
    grid.querySelectorAll('.ccard--x').forEach(n => n.remove());
    const x = [];
    if (CONTACT.whatsapp) x.push(`<a class="ccard ccard--x" href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener"><span class="ccard__ic">${IC_WA}</span><small>${T[L].wa}</small><b dir="ltr">+${CONTACT.whatsapp}</b><em>${T[L].waGo}</em></a>`);
    if (CONTACT.phone) x.push(`<a class="ccard ccard--x" href="tel:${CONTACT.phone}"><span class="ccard__ic">${IC_PH}</span><small>${T[L].ph}</small><b dir="ltr">${CONTACT.phone}</b><em>${T[L].phGo}</em></a>`);
    grid.insertAdjacentHTML('afterbegin', x.join(''));
    grid.style.setProperty('--n', grid.children.length);
  }
  function contact() {
    renderContactExtra();
    if (reduced) return;
    gsap.from('.contact__head > *', { opacity: 0, y: 40, stagger: .1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.contact', start: 'top 75%' } });
    gsap.from('.ccard', { opacity: 0, y: 50, stagger: .08, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '#cGrid', start: 'top 88%' } });
  }

  function nav() {
    const n = $('#nav');
    const f = () => n.classList.toggle('solid', scrollY > 40); addEventListener('scroll', f, { passive: true }); f();
    ['.range', '.kinetic', '.contact'].forEach(sel => ScrollTrigger.create({ trigger: sel, start: 'top 60px', end: 'bottom 60px', onToggle: s => { n.classList.toggle('onColor', s.isActive); if (sel === '.range' && !s.isActive) n.classList.remove('onLight'); } }));
  }

  /* ---------- apply language ---------- */
  function applyLang(first) {
    root.lang = L; root.dir = L === 'ar' ? 'rtl' : 'ltr';
    document.title = T[L].title;
    const md = $('meta[name="description"]'); if (md) md.content = T[L].desc;
    $$('[data-i18n]').forEach(el => { const v = T[L][el.dataset.i18n]; if (v != null) el.innerHTML = v; });
    const b = $('#langBtn'); b.textContent = T[L].switchTo; b.setAttribute('aria-label', T[L].switchLabel); b.lang = L === 'ar' ? 'en' : 'ar';
    if (first) return;
    renderMenu(); fillRange(); openNow(); renderContactExtra();
    if (window.__placeK) window.__placeK();
    ScrollTrigger.refresh();
  }
  applyLang(true);
  $('#langBtn').addEventListener('click', () => {
    L = L === 'ar' ? 'en' : 'ar';
    try { localStorage.setItem('rishfa-lang', L); } catch (e) {}
    applyLang(false);
  });

  preloader(() => { hero(); range(); menu(); kinetic(); visit(); contact(); nav(); ScrollTrigger.refresh(); });
})();
