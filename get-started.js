/* ============================================================================
   GET-STARTED.JS — «Начни с CTRL» v2: стартовый ритуал + CTRL Unlimited.
   ----------------------------------------------------------------------------
   • Набор: парфюм 50 мл + свеча + спрей. ТЕПЕРЬ выбираются все три —
     тремя рядами свотчей с подписями продуктов. При смене парфюма свеча
     и спрей автоподбираются под его настроение (можно переопределить).
   • «?» у парфюма = сюрприз-режим: собираем всё сами (свеча/спрей заблокированы).
   • Тарифы: «Подписка CTRL Unlimited» (первый набор −57% + бесплатная доставка
     + дискавери-сет; дальше — БЕЗЛИМИТ refill-наборов в месяц подписки;
     детали 2-го+ набора — на отдельной странице позже) и «Разовая покупка»
     (фактическая стоимость набора, без бонусов).
   • В корзину уходит бандл (ctrlHomeSamplePacks, см. cart.js):
     { title, price, scents[], sub, plan, gift, img, kind:'ritual' }.
   • Требует window.CTRL_PRODUCTS (page-data.js) и window.CTRLCart (cart.js).
   ========================================================================== */
(function () {
  var root = document.getElementById('gsApp');
  if (!root) return;
  var P = window.CTRL_PRODUCTS || {};

  /* ---------- конфигурация ---------- */
  var PARFUM_IDS = [5, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
  var CANDLE_IDS = [11, 12, 13, 14, 15];
  var SPRAY_IDS  = [21, 22, 23, 24, 25, 26, 27];
  var CANDLE_BY_MOOD = { focus: 11, night: 12, calm: 13, energy: 14, bloom: 15 };
  var SPRAY_BY_MOOD  = { focus: 24, night: 22, calm: 23, energy: 21, bloom: 27 };
  var FIRST_MULT = 0.43;   /* −57% на первый набор по подписке */
  var GIFT_NAME  = 'Дискавери-сет: 14 пробников × 1,5 мл';
  var MYSTERY = 'mystery';

  /* цвета-свотчи (по нотам); у «Эры розы» — паттерн, отдельно */
  var SW_P = {
    30: '#F2E7D6', 31: '#F2E88F', 32: '#8E2F44', 33: '#E3B75C', 34: '#F4C08A',
    35: '#F0E3C9', 36: '#C98A4B', 37: '#A9683C', 38: '#E8D3E8', 39: '#6E3B4B',
    40: '#F2F1EC', 41: '#D9D7D2', 42: '#CFE3C8'
  };
  var SW_C = { 11: '#E4EDD3', 12: '#C79B72', 13: '#7E8F6E', 14: '#5F7B62', 15: '#EEF0EA' };
  var SW_S = { 21: '#F5D8E8', 22: '#D9A566', 23: '#F4EAD7', 24: '#B08154', 25: '#F6B25E', 26: '#E8C39A', 27: '#C2597B' };

  var PLANS = [
    { key: 'sub', title: 'Подписка CTRL Unlimited', cad: '−57% на старт · дальше безлимит', sub: true, popular: true },
    { key: 'once', title: 'Разовая покупка', cad: 'Без подписки · фактическая стоимость набора', sub: false }
  ];

  var state = { parf: 5, candle: 15, spray: 27, plan: 'sub' };

  /* ---------- утилиты ---------- */
  function money(n) { return (Number(n) || 0).toLocaleString('ru-RU') + ' ₽'; }
  function round10(n) { return Math.round(n / 10) * 10; }
  function price50(p) {
    if (p.volumes) {
      for (var i = 0; i < p.volumes.length; i++) {
        if (Number(p.volumes[i].ml) === 50) return Number(p.volumes[i].price) || 0;
      }
    }
    return Number(p.price) || 0;
  }
  function shortName(p) { return p.name.replace(/^CTRL № \d+ — /, ''); }
  function num(p) { var m = p.name.match(/№ (\d+)/); return m ? m[1] : ''; }
  function isMystery() { return state.parf === MYSTERY; }
  function avg(arr) { var s = 0; arr.forEach(function (v) { s += v; }); return arr.length ? s / arr.length : 0; }
  function basePrice() {
    if (isMystery()) {
      var parf = avg(PARFUM_IDS.map(function (id) { return price50(P[id]); }));
      var candles = avg(CANDLE_IDS.map(function (id) { return Number(P[id].price) || 0; }));
      var sprays = avg(SPRAY_IDS.map(function (id) { return Number(P[id].price) || 0; }));
      return round10(parf + candles + sprays);
    }
    return price50(P[state.parf]) + (Number(P[state.candle].price) || 0) + (Number(P[state.spray].price) || 0);
  }
  function planObj() { return state.plan === 'once' ? PLANS[1] : PLANS[0]; }

  /* ---------- фирменные SVG-заглушки ---------- */
  function trioSvg() {
    var ink = '#0E0E0E';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">' +
      '<rect width="800" height="1000" fill="#F1EFE8"/>' +
      '<circle cx="400" cy="430" r="230" fill="#EAF0BE"/>' +
      '<g fill="none" stroke="' + ink + '" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="216" y="392" width="100" height="176" rx="14"/><rect x="250" y="358" width="32" height="36" rx="5"/>' +
      '<line x1="266" y1="358" x2="266" y2="344"/><circle cx="266" cy="478" r="24" fill="#FF2D9E" stroke="' + ink + '"/>' +
      '<rect x="350" y="420" width="124" height="150" rx="16"/><line x1="350" y1="448" x2="474" y2="448"/>' +
      '<line x1="412" y1="420" x2="412" y2="396"/>' +
      '<path d="M412 342 C 378 378 396 412 412 412 C 428 412 446 382 412 342 Z" fill="#CCF400" stroke="' + ink + '"/>' +
      '<rect x="508" y="404" width="88" height="164" rx="18"/><rect x="528" y="372" width="48" height="34" rx="6"/>' +
      '<path d="M596 380 h40 M596 394 h40"/>' +
      '<circle cx="656" cy="376" r="8" fill="#FF2D9E" stroke="none"/><circle cx="678" cy="392" r="7" fill="#FF2D9E" stroke="none"/>' +
      '</g>' +
      '<text x="400" y="700" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="4" fill="' + ink + '">парфюм + свеча + спрей</text>' +
      '<text x="400" y="892" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="5" fill="' + ink + '">CTRL home</text>' +
      '<text x="400" y="932" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" letter-spacing="3" fill="#8C8C84">фото скоро</text>' +
      '</svg>');
  }
  function vialsSvg() {
    var ink = '#0E0E0E', vial =
      '<rect x="0" y="26" width="34" height="88" rx="8" fill="none" stroke="' + ink + '" stroke-width="7"/>' +
      '<rect x="7" y="6" width="20" height="20" rx="4" fill="none" stroke="' + ink + '" stroke-width="7"/>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">' +
      '<rect width="400" height="400" fill="#F6CFE0"/>' +
      '<g transform="translate(84,120)">' + vial + '</g>' +
      '<g transform="translate(144,120)"><rect x="0" y="26" width="34" height="88" rx="8" fill="#CCF400" stroke="' + ink + '" stroke-width="7"/><rect x="7" y="6" width="20" height="20" rx="4" fill="none" stroke="' + ink + '" stroke-width="7"/></g>' +
      '<g transform="translate(204,120)">' + vial + '</g>' +
      '<g transform="translate(264,120)"><rect x="0" y="26" width="34" height="88" rx="8" fill="#FF2D9E" stroke="' + ink + '" stroke-width="7"/><rect x="7" y="6" width="20" height="20" rx="4" fill="none" stroke="' + ink + '" stroke-width="7"/></g>' +
      '<text x="200" y="300" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="' + ink + '">14 пробников</text>' +
      '<text x="200" y="336" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" letter-spacing="2" fill="#8C8C84">фото скоро</text>' +
      '</svg>');
  }
  function rosePattern() {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 92 92">' +
      '<rect width="92" height="92" fill="#F3C9D6"/>' +
      '<g fill="none" stroke="#C2597B" stroke-width="3" stroke-linecap="round">' +
      '<path d="M24 26 a8 8 0 1 1 8 8 a5 5 0 1 1 -5 -5"/>' +
      '<path d="M62 56 a8 8 0 1 1 8 8 a5 5 0 1 1 -5 -5"/>' +
      '<path d="M58 18 q6 4 2 10 M18 62 q6 4 2 10"/>' +
      '</g>' +
      '<g fill="#9BB864"><ellipse cx="40" cy="42" rx="4" ry="2" transform="rotate(35 40 42)"/>' +
      '<ellipse cx="54" cy="74" rx="4" ry="2" transform="rotate(-25 54 74)"/></g>' +
      '</svg>');
  }

  /* ---------- рендер ---------- */
  function swatch(group, id, bg, label) {
    return '<button class="gs-scent" type="button" aria-pressed="false" data-pick="' + group + ':' + id + '" ' +
      'title="' + label + '" aria-label="' + label + '" style="' + bg + '"></button>';
  }
  function parfRow() {
    return PARFUM_IDS.map(function (id) {
      var p = P[id];
      if (!p) return '';
      var label = '№ ' + num(p) + ' · ' + shortName(p);
      var bg = id === 5 ? 'background-image:url(&quot;' + rosePattern() + '&quot;)' : 'background-color:' + (SW_P[id] || '#EFEDE6');
      return swatch('p', id, bg, label);
    }).join('') +
    '<button class="gs-scent gs-scent--q" type="button" aria-pressed="false" data-pick="p:' + MYSTERY + '" ' +
      'title="Сюрприз-аромат — выберем за тебя" aria-label="Сюрприз-аромат — выберем за тебя">?</button>';
  }
  function idsRow(group, ids, colors) {
    return ids.map(function (id) {
      var p = P[id];
      if (!p) return '';
      return swatch(group, id, 'background-color:' + (colors[id] || '#EFEDE6'), p.name);
    }).join('');
  }

  function planCard(pl) {
    var perks = pl.sub
      ? '<li><b>−57%</b> на первый набор</li>' +
        '<li><b>Доставка</b> — бесплатно</li>' +
        '<li><b>Дискавери-сет</b> — 14 пробников в подарок</li>' +
        '<li><b>Безлимит</b> refill-наборов — весь месяц подписки</li>' +
        '<li><b>Отмена</b> — в один клик, без штрафов</li>'
      : '<li class="once">Платишь фактическую стоимость выбранного набора</li>' +
        '<li class="once">Без дискавери-сета и бесплатной доставки</li>' +
        '<li class="once">Подходит, чтобы просто познакомиться с CTRL</li>';
    return '<button class="gs-plan" type="button" aria-pressed="false" data-plan="' + pl.key + '">' +
      '<span class="gs-plan-top">' +
        '<span>' +
          '<span class="gs-plan-title">' + pl.title + '</span>' +
          '<span class="gs-plan-cad">' + pl.cad + '</span>' +
        '</span>' +
        '<span class="gs-plan-radio" aria-hidden="true"></span>' +
      '</span>' +
      '<ul class="gs-perks">' + perks + '</ul>' +
      (pl.popular ? '<span class="gs-plan-strip">Unlimited · безлимит наборов по подписке</span>' : '') +
    '</button>';
  }

  function render() {
    root.innerHTML =
      '<div class="gs-grid">' +

        '<div class="gs-media reveal">' +
          '<div class="gs-photo">' +
            '<img src="images/nabor-ritual.jpg" alt="Стартовый ритуал CTRL: парфюм, свеча и спрей" loading="lazy" ' +
                 'onerror="this.onerror=null;this.src=this.getAttribute(\'data-ph\')" data-ph="' + trioSvg() + '">' +
          '</div>' +
        '</div>' +

        '<div class="gs-config">' +

          '<div class="gs-step reveal">' +
            '<div class="gs-stephead"><span class="gs-stepnum">1/</span><h3>Собери свой ритуал</h3></div>' +
            '<p class="gs-stepsub">Выбери аромат каждого продукта — или доверься автоподбору под настроение парфюма.</p>' +

            '<div class="gs-prod" id="gsProdP">' +
              '<span class="gs-prod-label">Парфюм · 50 мл</span>' +
              '<div class="gs-scents" role="group" aria-label="Аромат парфюма">' + parfRow() + '</div>' +
              '<p class="gs-row-name" id="gsNameP"></p>' +
            '</div>' +

            '<div class="gs-prod" id="gsProdC">' +
              '<span class="gs-prod-label">Свеча</span>' +
              '<div class="gs-scents gs-scents--few" role="group" aria-label="Аромат свечи">' + idsRow('c', CANDLE_IDS, SW_C) + '</div>' +
              '<p class="gs-row-name" id="gsNameC"></p>' +
            '</div>' +

            '<div class="gs-prod" id="gsProdS">' +
              '<span class="gs-prod-label">Спрей · 50 мл</span>' +
              '<div class="gs-scents gs-scents--few" role="group" aria-label="Аромат спрея">' + idsRow('s', SPRAY_IDS, SW_S) + '</div>' +
              '<p class="gs-row-name" id="gsNameS"></p>' +
            '</div>' +
          '</div>' +

          '<div class="gs-step reveal">' +
            '<div class="gs-stephead"><span class="gs-stepnum">2/</span><h3>Как покупаем?</h3></div>' +
            '<p class="gs-stepsub">Подписка открывает безлимит наборов. Разовая — просто по фактической цене.</p>' +
            '<div class="gs-plans" role="group" aria-label="Способ покупки">' +
              PLANS.map(planCard).join('') +
            '</div>' +
          '</div>' +

          '<div class="gs-panel reveal" id="gsPanel">' +
            '<div class="gs-panel-kicker">⌃ стартовый набор</div>' +
            '<div class="gs-gift" id="gsGift">' +
              '<div class="gs-gift-media">' +
                '<img src="images/nabor-probnikov.png" alt="Набор пробников парфюма в подарок" loading="lazy" ' +
                     'onerror="this.onerror=null;this.src=this.getAttribute(\'data-ph\')" data-ph="' + vialsSvg() + '">' +
              '</div>' +
              '<div>' +
                '<div class="gs-gift-title">' + GIFT_NAME + ' — в подарок</div>' +
                '<div class="gs-gift-note" id="gsGiftNote"></div>' +
              '</div>' +
            '</div>' +
            '<h3 class="gs-panel-title">Стартовый ритуал CTRL</h3>' +
            '<p class="gs-items-label">В составе — 3 полных формата:</p>' +
            '<ul class="gs-items" id="gsItems"></ul>' +
            '<div class="gs-price-wrap">' +
              '<div class="gs-price">' +
                '<span class="gs-price-new" id="gsPriceNew"></span>' +
                '<span class="gs-price-old" id="gsPriceOld"></span>' +
                '<span class="gs-save" id="gsSave"></span>' +
              '</div>' +
              '<p class="gs-per" id="gsPer"></p>' +
              '<p class="gs-next" id="gsNext"></p>' +
            '</div>' +
            '<button class="gs-cta" type="button" id="gsCta">Добавить ритуал в корзину</button>' +
            '<div class="gs-trust">' +
              '<span class="gs-trust-item">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="9" width="5" height="11" rx="1.5"/><rect x="9.8" y="12" width="4.4" height="8" rx="1.2"/><path d="M12 12v-1.5"/><rect x="16.5" y="7" width="4" height="13" rx="1.2"/><path d="M17.5 7V5h2v2"/></svg>' +
                'Три продукта — одно состояние</span>' +
              '<span class="gs-trust-item">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="8" height="13" rx="1.5"/><rect x="10.5" y="4.5" width="3" height="3.5" rx="1"/><line x1="12" y1="4.5" x2="12" y2="3"/><line x1="8" y1="12.5" x2="16" y2="12.5"/></svg>' +
                'Полные форматы, не миниатюры</span>' +
              '<span class="gs-trust-item">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.3-6.4M21 12a9 9 0 0 1-15.3 6.4"/><path d="M18.5 2v4h-4M5.5 22v-4h4"/></svg>' +
                'Состав можно менять перед доставкой</span>' +
            '</div>' +
            '<div class="gs-acc">' +
              '<details><summary>Что такое CTRL Unlimited?</summary><ul>' +
                '<li>Подписка активна → заказывай refill-наборы без ограничений по количеству.</li>' +
                '<li>Первый набор приходит с −57%, бесплатной доставкой и дискавери-сетом.</li>' +
                '<li>Пауза или отмена в любой момент — как CTRL+Z.</li>' +
                '<li>Механику второго и следующих наборов покажем на отдельной странице — скоро.</li>' +
              '</ul></details>' +
              '<details><summary>Как это работает</summary><p>Выбираешь аромат парфюма — свечу и спрей мы подбираем под то же состояние, но каждый можно поменять вручную. Собираем набор и привозим. Состав следующего набора меняется перед любой доставкой — одним сообщением.</p></details>' +
              '<details><summary>Что важно знать</summary><p>Онлайн-оплата подключается позже: после оформления менеджер подтвердит заказ и настроит подписку. Отмена в любой момент, без объяснений и штрафов. Состав и цена фиксируются на момент заказа.</p></details>' +
            '</div>' +
          '</div>' +

        '</div>' +
      '</div>';

    root.querySelectorAll('[data-pick]').forEach(function (b) {
      b.addEventListener('click', function () {
        var parts = b.getAttribute('data-pick').split(':');
        var group = parts[0], val = parts[1];
        if (group === 'p') {
          state.parf = (val === MYSTERY) ? MYSTERY : Number(val);
          if (!isMystery()) {
            /* автоподбор под настроение нового парфюма (можно переопределить кликом) */
            var mood = P[state.parf].mood || 'focus';
            state.candle = CANDLE_BY_MOOD[mood] || 11;
            state.spray = SPRAY_BY_MOOD[mood] || 21;
          }
        } else if (group === 'c') { state.candle = Number(val); }
        else if (group === 's') { state.spray = Number(val); }
        update();
      });
    });
    root.querySelectorAll('[data-plan]').forEach(function (b) {
      b.addEventListener('click', function () { state.plan = b.getAttribute('data-plan'); update(); });
    });
    document.getElementById('gsCta').addEventListener('click', addToCart);
  }

  /* ---------- обновление состояния ---------- */
  function update() {
    var myst = isMystery();
    var pl = planObj();
    var base = basePrice();
    var first = pl.sub ? round10(base * FIRST_MULT) : base;

    root.querySelectorAll('[data-pick]').forEach(function (b) {
      var parts = b.getAttribute('data-pick').split(':');
      var cur = parts[0] === 'p' ? String(state.parf) : parts[0] === 'c' ? String(state.candle) : String(state.spray);
      b.setAttribute('aria-pressed', String(parts[1] === cur));
    });
    root.querySelectorAll('[data-plan]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-plan') === state.plan));
    });

    /* сюрприз-режим: свеча и спрей заблокированы */
    document.getElementById('gsProdC').classList.toggle('is-locked', myst);
    document.getElementById('gsProdS').classList.toggle('is-locked', myst);

    var pp = myst ? null : P[state.parf];
    document.getElementById('gsNameP').innerHTML = myst
      ? '<b>Сюрприз-аромат</b> — <span>выберем за тебя, секрет до вскрытия коробки</span>'
      : '<b>№ ' + num(pp) + ' · ' + shortName(pp) + '</b> — <span>' + pp.note + '</span>';
    document.getElementById('gsNameC').innerHTML = myst
      ? '<b>Свеча-сюрприз</b> — <span>под настроение аромата</span>'
      : '<b>«' + P[state.candle].name + '»</b> — <span>' + P[state.candle].note + '</span>';
    document.getElementById('gsNameS').innerHTML = myst
      ? '<b>Спрей-сюрприз</b> — <span>под настроение аромата</span>'
      : '<b>«' + P[state.spray].name + '»</b> — <span>' + P[state.spray].note + '</span>';

    document.getElementById('gsItems').innerHTML = myst
      ? '<li>1× <b>парфюм-сюрприз CTRL</b> (50 мл)</li>' +
        '<li>1× <b>свеча-сюрприз</b> — под настроение аромата</li>' +
        '<li>1× <b>спрей-сюрприз</b> (50 мл)</li>'
      : '<li>1× парфюм <b>' + pp.name + '</b> (50 мл)</li>' +
        '<li>1× свеча <b>«' + P[state.candle].name + '»</b></li>' +
        '<li>1× спрей <b>«' + P[state.spray].name + '»</b> (50 мл)</li>';

    var gift = document.getElementById('gsGift');
    gift.classList.toggle('is-off', !pl.sub);
    document.getElementById('gsGiftNote').textContent = pl.sub
      ? 'к первому заказу подписки · вся линейка в мини-формате'
      : 'только по подписке — при разовой покупке не входит';

    document.getElementById('gsPriceNew').textContent = money(first) + (pl.sub ? ' первый набор' : ' всего');
    document.getElementById('gsPriceOld').textContent = pl.sub ? money(base) : '';
    document.getElementById('gsSave').textContent = pl.sub ? 'выгода ' + money(base - first) : 'фактическая стоимость';
    document.getElementById('gsPer').textContent = '≈ ' + money(Math.round(first / 3)) + ' за продукт';
    document.getElementById('gsNext').innerHTML = pl.sub
      ? 'Дальше — <b>безлимит</b>: refill-наборы без ограничений весь месяц подписки.'
      : 'Разовая покупка без подписки и бонусов.';
  }

  /* ---------- корзина ---------- */
  function addToCart() {
    var myst = isMystery();
    var pl = planObj();
    var base = basePrice();
    var pack = {
      kind: 'ritual',
      title: 'Стартовый ритуал CTRL',
      price: pl.sub ? round10(base * FIRST_MULT) : base,
      scents: myst
        ? ['Парфюм-сюрприз CTRL', 'свеча-сюрприз', 'спрей-сюрприз']
        : [P[state.parf].name, 'свеча «' + P[state.candle].name + '»', 'спрей «' + P[state.spray].name + '»'],
      sub: 'парфюм 50 мл + свеча + спрей',
      plan: pl.sub
        ? 'Подписка CTRL Unlimited: первый набор −57%, дальше — безлимит refill-наборов'
        : 'Разовая покупка · фактическая стоимость',
      gift: pl.sub ? GIFT_NAME : '',
      img: 'images/nabor-ritual.jpg'
    };

    /* пишем в корзину и ПРОВЕРЯЕМ, что запись удалась */
    var saved = false;
    try {
      var packs = JSON.parse(localStorage.getItem('ctrlHomeSamplePacks') || '[]');
      if (!Array.isArray(packs)) packs = [];
      var was = packs.length;
      packs.push(pack);
      localStorage.setItem('ctrlHomeSamplePacks', JSON.stringify(packs));
      var check = JSON.parse(localStorage.getItem('ctrlHomeSamplePacks') || '[]');
      saved = Array.isArray(check) && check.length === was + 1;
    } catch (e) { saved = false; }

    var cta = document.getElementById('gsCta');
    if (saved) {
      if (window.CTRLCart) { window.CTRLCart.refresh(); window.CTRLCart.open(); }
      cta.classList.add('is-added');
      cta.textContent = 'Ритуал в корзине ✓';
    } else {
      cta.classList.add('is-error');
      cta.textContent = 'Не получилось — попробуй ещё раз';
    }
    setTimeout(function () {
      cta.classList.remove('is-added', 'is-error');
      cta.textContent = 'Добавить ритуал в корзину';
    }, saved ? 1800 : 2600);
  }

  render();
  update();
})();
