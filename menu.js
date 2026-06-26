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
      allHref: 'parfumeriya.html', allLabel: 'Посмотреть всю парфюмерию',
      groups: [
        { title: 'Фруктовые и цветочные', items: ['Эра розы', 'Коко-шайн', 'Цитрусовая фантазия', 'Тарт-деко', 'Медовый люкс', 'Солнечный день'] },
        { title: 'Сладкие и тёплые', items: ['Ванильный порок', 'Горячая карамель', 'Тёплый пряник', 'Сахарная дымка', 'Медовый бархат'] },
        { title: 'Ароматы чистоты и комфорта', items: ['Чистый хлопок', 'Белый мускус', 'Свежее утро', 'Лёгкий бриз'] }
      ],
      sizeTitle: 'Выбрать по типу',
      sizes: [
        { label: '50 мл', img: 'images/aromat-1.png' },
        { label: '100 мл', img: 'images/aromat-2.png' },
        { label: '10 мл', img: 'images/aromat-3.png' },
        { label: 'Наборы', img: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=220&q=70&auto=format&fit=crop' }
      ]
    },
    {
      trigger: 'Спреи для тела', id: 'subMists',
      feature: 'Сахарный вихрь', kicker: 'спрей для тела', img: 'images/aromat-2.png',
      allHref: 'sprei-dlya-tela.html', allLabel: 'Посмотреть все спреи',
      groups: [
        { title: 'Сладкие и аппетитные', items: ['Сахарный вихрь', 'Карамельный хруст', 'Взбитые сливки', 'Лесной орех'] },
        { title: 'Фруктовые и тёплые', items: ['Фруктовый коктейль', 'Солнечный загар', 'Ягодный стиль'] }
      ],
      sizeTitle: 'Выбрать по типу',
      sizes: [
        { label: '50 мл', img: 'images/aromat-2.png' },
        { label: '100 мл', img: 'images/aromat-3.png' },
        { label: 'Бандлы', img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=220&q=70&auto=format&fit=crop' }
      ]
    },
    {
      trigger: 'Уход за телом', id: 'subCare',
      feature: 'Взбитые сливки', kicker: 'уход за телом', img: 'images/aromat-3.png',
      allHref: 'uhod-za-telom.html', allLabel: 'Посмотреть весь уход',
      groups: [
        { title: 'По аромату', items: ['Коко-шайн', 'Ванильный порок', 'Взбитые сливки', 'Сахарная дымка', 'Эра розы'] },
        { title: 'Бальзам-масло', items: ['Бережная забота'] }
      ],
      sizes: ['50 мл', '200 мл', 'Наборы']
    },
    {
      trigger: 'Свечи', id: 'subCandles',
      feature: 'Мгновенная перезагрузка', kicker: 'свеча', img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=900&q=75&auto=format&fit=crop',
      allHref: 'svechi.html', allLabel: 'Посмотреть все свечи',
      groups: [
        { title: 'Основная коллекция свечей', items: ['Мгновенная перезагрузка', 'Сладкий дым', 'Вне сети', 'Тихий лес', 'Ветер в комнате'] },
        { title: 'Сезонные и лимитированные свечи', items: ['Утро после хаоса', 'Исцели пространство', 'До обещаний', 'Момент “да”', 'Побег к морю', 'Маленькая слабость', 'Большой флирт', 'Секретный ритуал'] }
      ],
      sizeTitle: 'Выбрать по формату',
      sizes: ['Мини-свечи 6 oz', 'Классические свечи 8.5 oz', 'Большие свечи 50 oz', 'Наборы мини-свечей', 'Подарочные наборы']
    },
    {
      trigger: 'Для стирки', id: 'subLaundry',
      feature: 'Первый ритуал чистоты', kicker: 'для стирки', img: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=900&q=75&auto=format&fit=crop',
      allHref: 'dlya-stirki.html', allLabel: 'Посмотреть всё для стирки',
      groups: [
        { title: 'Стартовые наборы для стирки', items: ['Первый ритуал чистоты', 'Набор “Дом под контролем”', 'Стирка без хаоса', 'Чистый старт', 'Набор для свежего шкафа', 'Средство для стирки + усилитель аромата'] },
        { title: 'Гели / средства для стирки', items: ['Тихая роскошь', 'Фирменная стирка', 'После дождя', 'Сладкий дым', 'Кислая эстетика', 'Ночной ритм'] },
        { title: 'Арома-усилители для стирки', items: ['Тихая роскошь', 'Фирменный цикл', 'После дождя', 'Сладкий дым', 'Кислая эстетика', 'Ночной ритм'] }
      ],
      sizeTitle: 'Выбрать раздел',
      sizes: ['Стартовые наборы', 'Гели / средства', 'Арома-усилители', 'Подарочные наборы']
    }
  ];

  function buildSub(cfg) {
    var groups = cfg.groups.map(function (g) {
      return '<div class="nav-sub-group"><h5>' + g.title + '</h5>' +
        g.items.map(function (n) { return '<a href="' + cfg.allHref + '">' + n + '</a>'; }).join('') + '</div>';
    }).join('');
    var sizes = cfg.sizes.map(function (s) {
      var item = typeof s === 'string' ? { label: s } : s;
      var img = item.img ? '<img src="' + item.img + '" alt="" onerror="this.style.display=\'none\'">' : '';
      return '<a class="' + (item.img ? 'has-img' : 'no-img') + '" href="' + cfg.allHref + '">' + img + '<span>' + item.label + '</span></a>';
    }).join('');
    return '<div class="nav-subpanel" id="' + cfg.id + '">' +
        '<button class="nav-sub-back" data-back>‹ Назад</button>' +
        '<div class="nav-sub-scroll">' +
          '<a class="nav-sub-feature" href="' + cfg.allHref + '">' +
            '<img src="' + cfg.img + '" alt="" onerror="this.style.display=\'none\'">' +
            '<div class="nm">' + cfg.feature + '</div><div class="tp">' + cfg.kicker + '</div>' +
          '</a>' +
          '<div class="nav-sub-divider"></div>' +
          '<a class="nav-sub-all" href="' + cfg.allHref + '">' + cfg.allLabel + '</a>' +
          groups +
          '<div class="nav-sub-sizes"><h5>' + (cfg.sizeTitle || 'Купить по объёму') + '</h5><div class="row">' + sizes + '</div></div>' +
        '</div>' +
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

  /* активный пункт меню на текущей странице */
  var currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link,.header-nav a,.header-right a,.footer-nav a,.nav-subpanel a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    var test = document.createElement('a');
    test.href = href;
    var linkPage = test.pathname.split('/').pop() || 'index.html';
    if (linkPage === currentPage) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* Корзина (счётчик, выезжающая панель, data-add) теперь целиком в cart.js,
     который подключён на каждой странице раньше menu.js. */
})();
