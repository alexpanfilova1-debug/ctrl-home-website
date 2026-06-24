/* ============ БОКОВОЕ МЕНЮ-ШТОРКА + ВТОРОЙ УРОВЕНЬ (общее для всех страниц) ============ */
(function () {
  var drawer  = document.getElementById('navDrawer'),
      overlay = document.getElementById('navOverlay'),
      trigger = document.getElementById('menuTrigger'),
      closeBtn= document.getElementById('navClose');
  if (!drawer) return;

  /* --- конфигурация подменю второго уровня (flyout). Чтобы добавить новый раздел — допиши объект сюда --- */
  var SUBS = [
    {
      trigger: 'Парфюмерия', id: 'subFragrance',
      feature: 'Эра розы', kicker: 'парфюм', img: 'images/aromat-1.png',
      allHref: 'catalog.html', allLabel: 'Посмотреть все ароматы',
      groups: [
        { title: 'Фруктовые и цветочные', items: ['Эра розы', 'Коко-шайн', 'Цитрусовая фантазия', 'Тарт-деко', 'Медовый люкс', 'Солнечный день'] },
        { title: 'Сладкие и тёплые', items: ['Ванильный порок', 'Горячая карамель', 'Тёплый пряник', 'Сахарная дымка', 'Медовый бархат'] },
        { title: 'Ароматы чистоты и комфорта', items: ['Чистый хлопок', 'Белый мускус', 'Свежее утро', 'Лёгкий бриз'] }
      ],
      sizes: ['30 мл', '10 мл', 'Пробники']
    },
    {
      trigger: 'Спреи для тела', id: 'subMists',
      feature: 'Сахарный вихрь', kicker: 'спрей для тела', img: 'images/aromat-2.png',
      allHref: 'catalog.html', allLabel: 'Посмотреть все спреи',
      groups: [
        { title: 'Сладкие и аппетитные', items: ['Сахарный вихрь', 'Карамельный хруст', 'Взбитые сливки', 'Лесной орех'] },
        { title: 'Фруктовые и тёплые', items: ['Фруктовый коктейль', 'Солнечный загар', 'Ягодный стиль'] }
      ],
      sizes: ['50 мл', '150 мл', 'Наборы']
    },
    {
      trigger: 'Уход за телом', id: 'subCare',
      feature: 'Взбитые сливки', kicker: 'уход за телом', img: 'images/aromat-3.png',
      allHref: 'catalog.html', allLabel: 'Посмотреть весь уход',
      groups: [
        { title: 'По аромату', items: ['Коко-шайн', 'Ванильный порок', 'Взбитые сливки', 'Сахарная дымка', 'Эра розы'] },
        { title: 'Бальзам-масло', items: ['Бережная забота'] }
      ],
      sizes: ['50 мл', '200 мл', 'Наборы']
    }
  ];

  function buildSub(cfg) {
    var groups = cfg.groups.map(function (g) {
      return '<div class="nav-sub-group"><h5>' + g.title + '</h5>' +
        g.items.map(function (n) { return '<a href="#">' + n + '</a>'; }).join('') + '</div>';
    }).join('');
    var sizes = cfg.sizes.map(function (s) { return '<a href="#">' + s + '</a>'; }).join('');
    return '<div class="nav-subpanel" id="' + cfg.id + '">' +
        '<button class="nav-sub-back" data-back>‹ Назад</button>' +
        '<a class="nav-sub-feature" href="' + cfg.allHref + '">' +
          '<img src="' + cfg.img + '" alt="" onerror="this.style.display=\'none\'">' +
          '<div class="nm">' + cfg.feature + '</div><div class="tp">' + cfg.kicker + '</div>' +
        '</a>' +
        '<div class="nav-sub-divider"></div>' +
        '<a class="nav-sub-all" href="' + cfg.allHref + '">' + cfg.allLabel + '</a>' +
        groups +
        '<div class="nav-sub-sizes"><h5>Купить по объёму</h5><div class="row">' + sizes + '</div></div>' +
      '</div>';
  }

  var triggerMap = {};
  SUBS.forEach(function (cfg) {
    document.body.insertAdjacentHTML('beforeend', buildSub(cfg));
    triggerMap[cfg.trigger] = cfg.id;
  });

  function openMenu()    { drawer.classList.add('open');    if (overlay) overlay.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function closeAllSubs(){ document.querySelectorAll('.nav-subpanel.open').forEach(function (p) { p.classList.remove('open'); }); }
  function closeMenu()   { drawer.classList.remove('open'); if (overlay) overlay.classList.remove('open'); document.body.style.overflow = ''; closeAllSubs(); }
  function openSub(id)   { closeAllSubs(); var p = document.getElementById(id); if (p) p.classList.add('open'); }

  if (trigger)  trigger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay)  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* кнопки «Назад» во всех подменю — возвращают к списку (закрывают flyout) */
  document.querySelectorAll('.nav-subpanel [data-back]').forEach(function (b) {
    b.addEventListener('click', closeAllSubs);
  });

  /* пункты верхнего уровня: с подменю — открывают flyout рядом; остальные — переходят и закрывают меню */
  drawer.querySelectorAll('.nav-drawer-body .nav-link').forEach(function (a) {
    var txt = a.textContent.trim(), matched = null;
    Object.keys(triggerMap).forEach(function (t) { if (txt.indexOf(t) === 0) matched = triggerMap[t]; });
    if (matched) {
      a.addEventListener('click', function (e) { e.preventDefault(); openSub(matched); });
    } else {
      a.addEventListener('click', closeMenu);
    }
  });

  /* ссылки внутри flyout и в подвале закрывают всё меню */
  document.querySelectorAll('.nav-subpanel a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  drawer.querySelectorAll('.nav-drawer-foot a').forEach(function (a) { a.addEventListener('click', closeMenu); });
})();
