/* ============================================================================
   PODPISKA.JS v3 — конфигуратор наборов по подписке (страница podpiska.html).
   ----------------------------------------------------------------------------
   • Три набора с фиксированной СТРУКТУРОЙ (решение Alex 04.07.2026):
       CTRL+S    — 3 вещи  — 6 900 ₽ за доставку
       CTRL+A    — 5 вещей — 10 000 ₽ за доставку (популярный)
       CTRL+HOME — 10 вещей — 17 900 ₽ за доставку
     Ароматы КАЖДОЙ вещи выбирает клиент.
   • v3 (запрос Alex 26.07.2026 — «меньше слов, больше визуала»):
       — выбор ароматов = ПЛИТКИ-ТОВАРЫ (силуэт флакона/свечи/спрея в цвете
         аромата, № и имя), а не абстрактные цветные квадратики;
       — в панели — визуальные СЛОТЫ «твой набор»: видно, что уже выбрано
         и что осталось; клик по пустому слоту ведёт к нужному ряду;
       — карточки наборов показывают состав «полкой» силуэтов, без списков.
   • Частота: раз в 1 / 2 / 3 месяца. Подписка = членство: безлимит докупок
     по ценам подписчика −20% + дискавери-сет к первому заказу.
   • В корзину уходит бандл ctrlHomeSamplePacks (см. cart.js):
     { kind:'podpiska', title, price, scents[], sub, plan, gift, img }.
   • Требует window.CTRL_PRODUCTS (page-data.js) и window.CTRLCart (cart.js).
   ========================================================================== */
(function () {
  var root = document.getElementById('pdApp');
  if (!root) return;
  var P = window.CTRL_PRODUCTS || {};

  /* ---------- конфигурация ---------- */
  var PARFUM_IDS = [5, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
  var CANDLE_IDS = [11, 12, 13, 14, 15];
  var SPRAY_IDS  = [21, 22, 23, 24, 25, 26, 27];
  var GIFT_NAME  = 'Дискавери-сет: 14 пробников × 1,5 мл';

  /* цвета ароматов — как в get-started.js; у «Эры розы» (id 5) — розы на флаконе */
  var SW_P = {
    5: '#F3C9D6',
    30: '#F2E7D6', 31: '#F2E88F', 32: '#8E2F44', 33: '#E3B75C', 34: '#F4C08A',
    35: '#F0E3C9', 36: '#C98A4B', 37: '#A9683C', 38: '#E8D3E8', 39: '#6E3B4B',
    40: '#F2F1EC', 41: '#D9D7D2', 42: '#CFE3C8'
  };
  var SW_C = { 11: '#E4EDD3', 12: '#C79B72', 13: '#7E8F6E', 14: '#5F7B62', 15: '#EEF0EA' };
  var SW_S = { 21: '#F5D8E8', 22: '#D9A566', 23: '#F4EAD7', 24: '#B08154', 25: '#F6B25E', 26: '#E8C39A', 27: '#C2597B' };

  var CATS = {
    p30:    { ids: PARFUM_IDS, sw: SW_P, label: 'Парфюм · 30 мл',      unit: 'парфюм 30 мл',  slot: 'парфюм', ml: 30 },
    p10:    { ids: PARFUM_IDS, sw: SW_P, label: 'Мини-парфюм · 10 мл', unit: 'мини 10 мл',    slot: 'мини',   ml: 10 },
    candle: { ids: CANDLE_IDS, sw: SW_C, label: 'Свеча',               unit: 'свеча',         slot: 'свеча' },
    spray:  { ids: SPRAY_IDS,  sw: SW_S, label: 'Спрей · 50 мл',       unit: 'спрей',         slot: 'спрей' }
  };
  var CAT_ORDER = ['p30', 'p10', 'candle', 'spray'];

  var SETS = [
    { key: 's',    cap: 'CTRL+S',    mood: 'сохрани базу',           count: 3,  price: 6900,
      slots: { p30: 1, p10: 0, candle: 1, spray: 1 },
      sub: 'парфюм 30 мл + свеча + спрей' },
    { key: 'a',    cap: 'CTRL+A',    mood: 'выбери всё нужное',      count: 5,  price: 10000, popular: true,
      slots: { p30: 1, p10: 1, candle: 1, spray: 2 },
      sub: 'парфюм 30 мл + мини 10 мл + свеча + 2 спрея' },
    { key: 'home', cap: 'CTRL+HOME', mood: 'весь дом под контролем', count: 10, price: 17900,
      slots: { p30: 1, p10: 3, candle: 3, spray: 3 },
      sub: 'парфюм 30 мл + 3 мини + 3 свечи + 3 спрея' }
  ];

  var DEFAULTS = { p30: [5, 33, 36], p10: [30, 31, 32], candle: [15, 11, 12], spray: [27, 21, 22] };

  var state = { set: 'a', freq: 1, picks: {} };

  /* ---------- утилиты ---------- */
  function money(n) { return (Number(n) || 0).toLocaleString('ru-RU') + ' ₽'; }
  function setObj() {
    for (var i = 0; i < SETS.length; i++) if (SETS[i].key === state.set) return SETS[i];
    return SETS[1];
  }
  function priceVol(p, ml) {
    if (p && p.volumes) {
      for (var i = 0; i < p.volumes.length; i++) {
        if (Number(p.volumes[i].ml) === Number(ml)) return Number(p.volumes[i].price) || 0;
      }
    }
    return p ? (Number(p.price) || 0) : 0;
  }
  function priceOf(cat, id) {
    var p = P[id];
    if (!p) return 0;
    return CATS[cat].ml ? priceVol(p, CATS[cat].ml) : (Number(p.price) || 0);
  }
  function shortName(p) { return p.name.replace(/^CTRL № \d+ — /, ''); }
  function num(p) { var m = p.name.match(/№ (\d+)/); return m ? m[1] : ''; }
  function catLabelName(cat, id) {
    var p = P[id];
    if (!p) return '';
    return (cat === 'p30' || cat === 'p10') ? '№ ' + num(p) + ' · ' + shortName(p) : p.name;
  }
  function initPicks() {
    var s = setObj();
    state.picks = {};
    CAT_ORDER.forEach(function (cat) {
      var need = s.slots[cat] || 0;
      if (need) state.picks[cat] = DEFAULTS[cat].slice(0, need);
    });
  }
  function retail() {
    var t = 0;
    Object.keys(state.picks).forEach(function (cat) {
      state.picks[cat].forEach(function (id) { t += priceOf(cat, id); });
    });
    return t;
  }
  function complete() {
    var s = setObj();
    var ok = true;
    CAT_ORDER.forEach(function (cat) {
      var need = s.slots[cat] || 0;
      if (need && (!state.picks[cat] || state.picks[cat].length !== need)) ok = false;
    });
    return ok;
  }
  function freqText(f) { return f === 1 ? 'раз в месяц' : 'раз в ' + f + ' месяца'; }

  /* ============================================================
     ГЛИФЫ ТОВАРОВ — силуэты продуктов в фирменном stroke-стиле.
     cat: p30 | p10 | candle | spray;  o: {fill, h, ghost, rose}
     ============================================================ */
  var INK = '#1A1916';
  function glyph(cat, o) {
    o = o || {};
    var h = o.h || 52;
    var w = Math.round(h * 48 / 64);
    var ghost = !!o.ghost;
    var ink   = ghost ? '#A39F96' : INK;
    var metal = ghost ? '#EFEDE6' : '#DFDCD3';
    var lime  = ghost ? '#DDDAD0' : '#CCF400';
    var pink  = ghost ? '#C8C5BC' : '#FF2D9E';
    var fill  = o.fill || '#EFEDE6';
    var sw = 2.2, inner = '';

    if (cat === 'p30') {
      inner =
        '<rect x="18" y="9" width="12" height="12" rx="2" fill="' + metal + '" stroke="' + ink + '" stroke-width="' + sw + '"/>' +
        '<line x1="24" y1="9" x2="24" y2="5.5" stroke="' + ink + '" stroke-width="' + sw + '"/>' +
        '<rect x="9" y="21" width="30" height="38" rx="4" fill="' + fill + '" stroke="' + ink + '" stroke-width="' + sw + '"/>' +
        (o.rose ? rosebud(13.5, 26.5, ghost) : '') +
        '<rect x="14.5" y="32" width="19" height="16" rx="1.5" fill="#fff" stroke="' + ink + '" stroke-width="1.5"/>' +
        '<line x1="17.5" y1="36.5" x2="27" y2="36.5" stroke="' + lime + '" stroke-width="2"/>' +
        (o.rose ? rosebud(31, 53, ghost) : '');
    } else if (cat === 'p10') {
      inner =
        '<rect x="19.5" y="12" width="9" height="10" rx="2" fill="' + metal + '" stroke="' + ink + '" stroke-width="' + sw + '"/>' +
        '<rect x="15" y="22" width="18" height="37" rx="3.5" fill="' + fill + '" stroke="' + ink + '" stroke-width="' + sw + '"/>' +
        '<rect x="18.5" y="33" width="11" height="13" rx="1" fill="#fff" stroke="' + ink + '" stroke-width="1.4"/>' +
        '<line x1="20.5" y1="36.5" x2="27" y2="36.5" stroke="' + lime + '" stroke-width="1.8"/>' +
        (o.rose ? rosebud(21, 27, ghost) : '');
    } else if (cat === 'candle') {
      inner =
        '<path d="M24 10.5 c-2.9 3.3 -1.5 7 0 7 s2.9 -3.7 0 -7 z" fill="' + pink + '" stroke="' + ink + '" stroke-width="1.4"/>' +
        '<line x1="24" y1="19" x2="24" y2="24" stroke="' + ink + '" stroke-width="' + sw + '"/>' +
        '<rect x="8" y="24" width="32" height="35" rx="4" fill="' + fill + '" stroke="' + ink + '" stroke-width="' + sw + '"/>' +
        '<line x1="8" y1="30.5" x2="40" y2="30.5" stroke="' + ink + '" stroke-width="1.4"/>' +
        '<rect x="13" y="36" width="22" height="15" rx="1.5" fill="#fff" stroke="' + ink + '" stroke-width="1.5"/>' +
        '<line x1="16.5" y1="40.5" x2="27.5" y2="40.5" stroke="' + lime + '" stroke-width="2"/>';
    } else { /* spray */
      inner =
        '<rect x="18" y="10" width="12" height="8" rx="2" fill="' + metal + '" stroke="' + ink + '" stroke-width="' + sw + '"/>' +
        '<path d="M30 13.5 h4.5" stroke="' + ink + '" stroke-width="' + sw + '"/>' +
        '<circle cx="38" cy="11" r="1.7" fill="' + pink + '"/>' +
        '<circle cx="41" cy="15.5" r="1.4" fill="' + pink + '"/>' +
        '<rect x="20" y="18" width="8" height="6" fill="' + metal + '" stroke="' + ink + '" stroke-width="1.6"/>' +
        '<rect x="13" y="24" width="22" height="35" rx="4" fill="' + fill + '" stroke="' + ink + '" stroke-width="' + sw + '"/>' +
        '<rect x="17" y="33" width="14" height="14" rx="1" fill="#fff" stroke="' + ink + '" stroke-width="1.4"/>' +
        '<line x1="19.5" y1="37" x2="26.5" y2="37" stroke="' + lime + '" stroke-width="1.8"/>';
    }
    return '<svg viewBox="0 0 48 64" width="' + w + '" height="' + h + '" aria-hidden="true" ' +
      'style="stroke-linecap:round;stroke-linejoin:round">' + inner + '</svg>';
  }
  /* маленькая роза для «Эры розы» */
  function rosebud(x, y, ghost) {
    var c = ghost ? '#B9B5AB' : '#C2597B';
    return '<path d="M' + x + ' ' + y + ' a2.6 2.6 0 1 1 2.6 2.6 a1.6 1.6 0 1 1 -1.6 -1.6" ' +
      'fill="none" stroke="' + c + '" stroke-width="1.5"/>';
  }
  /* нейтральные тона «полки» в карточках наборов */
  var GHOST_FILL = { p30: '#E8E4D8', p10: '#EDEAE0', candle: '#E3DFD2', spray: '#EAE6DB' };
  var SHELF_H = { s: 58, a: 47, home: 31 };
  function shelfHtml(s) {
    var out = [];
    CAT_ORDER.forEach(function (cat) {
      for (var i = 0; i < (s.slots[cat] || 0); i++) {
        out.push(glyph(cat, { fill: GHOST_FILL[cat], h: SHELF_H[s.key] || 44 }));
      }
    });
    return '<span class="pd-set-shelf" aria-hidden="true">' + out.join('') + '</span>';
  }

  /* ---------- SVG-заглушка широкого хиро (если нет ни одного фото) ---------- */
  function heroSvg() {
    var ink = '#0E0E0E';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="700" viewBox="0 0 1600 700">' +
      '<rect width="1600" height="700" fill="#F1EFE8"/>' +
      '<circle cx="1130" cy="360" r="250" fill="#EAF0BE"/>' +
      '<g fill="none" stroke="' + ink + '" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="952" y="240" width="104" height="180" rx="14"/><rect x="986" y="204" width="34" height="38" rx="5"/>' +
      '<line x1="1003" y1="204" x2="1003" y2="188"/><circle cx="1003" cy="328" r="24" fill="#FF2D9E" stroke="' + ink + '"/>' +
      '<rect x="1086" y="266" width="118" height="154" rx="16"/><line x1="1086" y1="294" x2="1204" y2="294"/>' +
      '<line x1="1145" y1="266" x2="1145" y2="242"/>' +
      '<path d="M1145 190 C 1113 224 1129 256 1145 256 C 1161 256 1178 228 1145 190 Z" fill="#CCF400" stroke="' + ink + '"/>' +
      '<rect x="1234" y="252" width="88" height="168" rx="18"/><rect x="1254" y="220" width="48" height="34" rx="6"/>' +
      '<path d="M1322 228 h38 M1322 242 h38"/>' +
      '<circle cx="1378" cy="224" r="8" fill="#FF2D9E" stroke="none"/><circle cx="1398" cy="240" r="7" fill="#FF2D9E" stroke="none"/>' +
      '<path d="M914 418 L 1306 418 L 1282 570 L 938 570 Z" fill="#F7F5EF" stroke="' + ink + '"/>' +
      '<path d="M914 418 L 870 376 M1306 418 L 1350 376"/>' +
      '<line x1="1110" y1="418" x2="1110" y2="570"/>' +
      '</g>' +
      '<text x="330" y="310" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="52" font-weight="700" letter-spacing="5" fill="' + ink + '">CTRL home</text>' +
      '<text x="330" y="368" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="4" fill="' + ink + '">твой набор по подписке</text>' +
      '<text x="330" y="416" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" letter-spacing="3" fill="#8C8C84">фото скоро</text>' +
      '</svg>');
  }

  /* ---------- SVG-заглушка дискавери-сета (как в get-started) ---------- */
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

  /* ---------- рендер ---------- */
  function setCard(s) {
    var per = Math.round(s.price / s.count / 10) * 10;
    return '<button class="pd-set" type="button" aria-pressed="false" data-set="' + s.key + '">' +
      (s.popular ? '<span class="pd-set-strip">выбирают чаще</span>' : '') +
      '<span class="pd-set-cap">' + s.cap + '</span>' +
      '<span class="pd-set-count">' + s.count + ' ' + (s.count < 5 ? 'вещи' : 'вещей') + '</span>' +
      '<span class="pd-set-mood">' + s.mood + '</span>' +
      shelfHtml(s) +
      '<span class="pd-set-price">' + money(s.price) + ' <small>за доставку</small></span>' +
      '<span class="pd-set-per">≈ ' + money(per) + ' за вещь</span>' +
    '</button>';
  }

  function tile(cat, id) {
    var p = P[id];
    if (!p) return '';
    var label = catLabelName(cat, id);
    var isParf = (cat === 'p30' || cat === 'p10');
    return '<button class="pd-tile" type="button" aria-pressed="false" data-pick="' + cat + ':' + id + '" ' +
      'title="' + label + (p.note ? ' · ' + p.note : '') + '" aria-label="' + label + '">' +
      (isParf ? '<span class="pd-tile-num">№' + num(p) + '</span>' : '') +
      glyph(cat, { fill: CATS[cat].sw[id] || '#EFEDE6', h: 52, rose: isParf && id === 5 }) +
      '<span class="pd-tile-name">' + (isParf ? shortName(p) : p.name) + '</span>' +
    '</button>';
  }

  function rowsHtml() {
    var s = setObj();
    return CAT_ORDER.map(function (cat) {
      var need = s.slots[cat] || 0;
      if (!need) return '';
      return '<div class="pd-prod" data-cat-row="' + cat + '">' +
        '<span class="pd-prod-label">' + CATS[cat].label +
          (need > 1 ? '<span class="pd-prod-need" data-need="' + cat + '">выбери ' + need + '</span>' : '') +
        '</span>' +
        '<div class="pd-tiles" role="group" aria-label="' + CATS[cat].label + '">' +
          CATS[cat].ids.map(function (id) { return tile(cat, id); }).join('') +
        '</div>' +
        '<p class="pd-row-name" data-names="' + cat + '"></p>' +
      '</div>';
    }).join('');
  }

  function render() {
    root.innerHTML =
      '<div class="pd-stephead reveal"><span class="pd-stepnum">1/</span><h3>Выбери размер набора</h3></div>' +
      '<p class="pd-stepsub reveal">Цена фиксированная за каждую доставку: чем больше набор, тем дешевле вещь.</p>' +
      '<div class="pd-sets reveal">' + SETS.map(setCard).join('') + '</div>' +

      '<div class="pd-once reveal">' +
        '<p><b>Можно и без подписки</b> — разово, но без выгоды набора, без дискавери-сета и без −20% на докупки.</p>' +
        '<a class="btn btn--ghost" href="sobrat-nabor.html">Собрать разово</a>' +
      '</div>' +

      '<div class="pd-config">' +
        '<div class="pd-steps">' +
          '<div class="pd-stephead reveal"><span class="pd-stepnum">2/</span><h3>Выбери ароматы — на каждую вещь</h3></div>' +
          '<p class="pd-stepsub reveal">Жми на товар — он встаёт в слот твоего набора. Перед следующей доставкой всё можно поменять.</p>' +
          '<div id="pdRows">' + rowsHtml() + '</div>' +
        '</div>' +

        '<aside class="pd-panel reveal" id="pdPanel">' +
          '<div class="pd-panel-kicker">⌃ подписка ctrl home</div>' +
          '<h3 class="pd-panel-title" id="pdTitle"></h3>' +
          '<p class="pd-panel-sub" id="pdSub"></p>' +
          '<div class="pd-slots-head"><span>Твой набор</span><span class="pd-slots-count" id="pdSlotsCount"></span></div>' +
          '<div class="pd-slots" id="pdSlots"></div>' +
          '<div class="pd-gift">' +
            '<img src="images/nabor-probnikov.png" alt="Дискавери-сет в подарок" loading="lazy" ' +
                 'onerror="this.onerror=null;this.src=this.getAttribute(\'data-ph\')" data-ph="' + vialsSvg() + '">' +
            '<div>' +
              '<div class="pd-gift-title">' + GIFT_NAME + ' — в подарок</div>' +
              '<div class="pd-gift-note">к первому заказу подписки · вся линейка в мини-формате</div>' +
            '</div>' +
          '</div>' +
          '<div class="pd-prod-label" style="margin-bottom:.6rem">Ритм доставки</div>' +
          '<div class="pd-freq" role="group" aria-label="Частота доставки">' +
            [1, 2, 3].map(function (f) {
              return '<button class="pd-freq-btn" type="button" aria-pressed="false" data-freq="' + f + '">' + freqText(f) + '</button>';
            }).join('') +
          '</div>' +
          '<div class="pd-price-wrap">' +
            '<div class="pd-price">' +
              '<span class="pd-price-new" id="pdPriceNew"></span>' +
              '<span class="pd-price-old" id="pdPriceOld"></span>' +
              '<span class="pd-save" id="pdSave"></span>' +
            '</div>' +
            '<p class="pd-per" id="pdPer"></p>' +
            '<p class="pd-next" id="pdNext"></p>' +
          '</div>' +
          '<button class="pd-cta" type="button" id="pdCta">Оформить подписку</button>' +
          '<ul class="pd-trust">' +
            '<li>Пауза, пропуск или отмена — в любой момент, как CTRL+Z</li>' +
            '<li>Ароматы можно поменять перед каждой доставкой</li>' +
            '<li>Доставка входит в цену набора</li>' +
          '</ul>' +
          '<div class="pd-acc">' +
            '<details><summary>Как проходит оплата</summary><p>Онлайн-оплата подключается позже: после оформления менеджер подтвердит заказ, настроит подписку и пришлёт ссылку на оплату. Состав и цена фиксируются на момент заказа.</p></details>' +
            '<details><summary>Хочу два одинаковых аромата</summary><p>Сейчас выбор — без повторов. Если хочется, например, две одинаковые свечи — напиши это комментарием к заказу, соберём как нужно.</p></details>' +
          '</div>' +
        '</aside>' +
      '</div>';

    bindSets();
    bindRows();
    root.querySelectorAll('[data-freq]').forEach(function (b) {
      b.addEventListener('click', function () { state.freq = Number(b.getAttribute('data-freq')); update(); });
    });
    document.getElementById('pdCta').addEventListener('click', addToCart);

    /* клик по пустому слоту — подводим к нужному ряду */
    document.getElementById('pdSlots').addEventListener('click', function (e) {
      var b = e.target.closest('[data-goto]');
      if (!b) return;
      var row = root.querySelector('[data-cat-row="' + b.getAttribute('data-goto') + '"]');
      if (!row) return;
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      row.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      var label = row.querySelector('.pd-prod-label');
      if (label) {
        label.classList.remove('is-hint');
        void label.offsetWidth;
        label.classList.add('is-hint');
        setTimeout(function () { label.classList.remove('is-hint'); }, 1200);
      }
    });
  }

  function bindSets() {
    root.querySelectorAll('[data-set]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-set');
        if (k === state.set) return;
        state.set = k;
        initPicks();
        document.getElementById('pdRows').innerHTML = rowsHtml();
        bindRows();
        update();
      });
    });
  }

  function bindRows() {
    root.querySelectorAll('[data-pick]').forEach(function (b) {
      b.addEventListener('click', function () {
        var parts = b.getAttribute('data-pick').split(':');
        var cat = parts[0], id = Number(parts[1]);
        var need = setObj().slots[cat] || 0;
        var q = state.picks[cat] || [];
        var at = q.indexOf(id);
        if (at !== -1) {
          if (q.length > 1) q.splice(at, 1);              /* убрать выбранный (для мульти-рядов) */
        } else if (q.length < need) {
          q.push(id);                                      /* добрать до нужного количества */
        } else if (need === 1) {
          q[0] = id;                                       /* одиночный ряд — обычное переключение */
        } else {
          q.shift(); q.push(id);                           /* полный мульти-ряд — заменяем самый давний */
        }
        state.picks[cat] = q;
        update();
      });
    });
  }

  /* ---------- слоты «твой набор» в панели ---------- */
  function slotsHtml() {
    var s = setObj();
    var out = [];
    CAT_ORDER.forEach(function (cat) {
      var need = s.slots[cat] || 0;
      if (!need) return;
      var q = state.picks[cat] || [];
      var isParf = (cat === 'p30' || cat === 'p10');
      for (var i = 0; i < need; i++) {
        var id = q[i];
        if (id && P[id]) {
          var p = P[id];
          var caption = isParf ? '№ ' + num(p) : p.name;
          out.push('<div class="pd-slot" title="' + CATS[cat].unit + ' — ' + catLabelName(cat, id) + '">' +
            glyph(cat, { fill: CATS[cat].sw[id] || '#EFEDE6', h: 44, rose: isParf && id === 5 }) +
            '<span class="pd-slot-name">' + caption + '</span>' +
          '</div>');
        } else {
          out.push('<button class="pd-slot pd-slot--empty" type="button" data-goto="' + cat + '" ' +
            'aria-label="Выбрать: ' + CATS[cat].unit + '">' +
            glyph(cat, { fill: 'none', h: 44, ghost: true }) +
            '<span class="pd-slot-name">+ ' + CATS[cat].slot + '</span>' +
          '</button>');
        }
      }
    });
    return out.join('');
  }

  /* ---------- обновление состояния ---------- */
  function update() {
    var s = setObj();
    var base = retail();
    var ok = complete();

    root.querySelectorAll('[data-set]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === state.set));
    });
    root.querySelectorAll('[data-freq]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-freq')) === state.freq));
    });
    root.querySelectorAll('[data-pick]').forEach(function (b) {
      var parts = b.getAttribute('data-pick').split(':');
      var q = state.picks[parts[0]] || [];
      b.setAttribute('aria-pressed', String(q.indexOf(Number(parts[1])) !== -1));
    });

    /* подписи под рядами + счётчики «выбери ещё N» */
    CAT_ORDER.forEach(function (cat) {
      var need = s.slots[cat] || 0;
      if (!need) return;
      var q = state.picks[cat] || [];
      var namesEl = root.querySelector('[data-names="' + cat + '"]');
      if (namesEl) {
        if (!q.length) {
          namesEl.innerHTML = '<span>ничего не выбрано</span>';
        } else if (need === 1) {
          var p = P[q[0]];
          namesEl.innerHTML = '<b>' + catLabelName(cat, q[0]) + '</b> — <span>' + (p.note || '') + '</span>';
        } else {
          namesEl.innerHTML = '<b>' + q.map(function (id) { return catLabelName(cat, id); }).join('</b> · <b>') + '</b>';
        }
      }
      var needEl = root.querySelector('[data-need="' + cat + '"]');
      if (needEl) {
        var left = need - q.length;
        needEl.textContent = left > 0 ? 'выбери ещё ' + left : need + ' из ' + need + ' ✓';
        needEl.classList.toggle('is-short', left > 0);
      }
    });

    /* панель: заголовок + визуальные слоты */
    document.getElementById('pdTitle').textContent = 'Набор ' + s.cap;
    document.getElementById('pdSub').textContent = s.count + ' ' + (s.count < 5 ? 'вещи' : 'вещей') + ' · ' + s.sub;

    var picked = 0;
    CAT_ORDER.forEach(function (cat) { picked += (state.picks[cat] || []).length; });
    var cnt = document.getElementById('pdSlotsCount');
    cnt.textContent = ok ? picked + ' из ' + s.count + ' ✓' : picked + ' из ' + s.count;
    cnt.classList.toggle('is-full', ok);
    document.getElementById('pdSlots').innerHTML = slotsHtml();

    var save = base - s.price;
    var pct = base ? Math.round(save / base * 100) : 0;
    document.getElementById('pdPriceNew').textContent = money(s.price);
    document.getElementById('pdPriceOld').textContent = base > s.price ? money(base) : '';
    document.getElementById('pdSave').textContent = save > 0 ? 'выгода ' + money(save) + ' · −' + pct + '%' : '';
    document.getElementById('pdPer').textContent = '= ' + money(Math.round(s.price / s.count / 10) * 10) + ' за вещь · ' + freqText(state.freq);
    document.getElementById('pdNext').innerHTML = 'Между доставками — <b>безлимит докупок</b> по ценам подписчика <b>−20%</b>.';

    var cta = document.getElementById('pdCta');
    cta.disabled = !ok;
    if (!cta.classList.contains('is-added') && !cta.classList.contains('is-error')) {
      cta.textContent = ok ? 'Оформить подписку' : 'Сначала выбери все ароматы';
    }
  }

  /* ---------- корзина ---------- */
  function addToCart() {
    if (!complete()) return;
    var s = setObj();
    var scents = [];
    CAT_ORDER.forEach(function (cat) {
      (state.picks[cat] || []).forEach(function (id) {
        scents.push(CATS[cat].unit + ' — ' + catLabelName(cat, id));
      });
    });
    var pack = {
      kind: 'podpiska',
      title: 'Подписка CTRL home · набор ' + s.cap,
      price: s.price,
      scents: scents,
      sub: s.count + ' ' + (s.count < 5 ? 'вещи' : 'вещей') + ' · ' + s.sub,
      plan: 'Доставка ' + freqText(state.freq) + ' · безлимит докупок −20% · пауза и отмена в любой момент',
      gift: GIFT_NAME,
      img: 'images/nabor-ritual.jpg'
    };

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

    var cta = document.getElementById('pdCta');
    if (saved) {
      if (window.CTRLCart) { window.CTRLCart.refresh(); window.CTRLCart.open(); }
      cta.classList.add('is-added');
      cta.textContent = 'Набор в корзине ✓';
    } else {
      cta.classList.add('is-error');
      cta.textContent = 'Не получилось — попробуй ещё раз';
    }
    setTimeout(function () {
      cta.classList.remove('is-added', 'is-error');
      cta.textContent = 'Оформить подписку';
    }, saved ? 1800 : 2600);
  }

  initPicks();
  render();
  update();

  /* ---------- хиро: цепочка фолбэков, пока нет своего фото ----------
     podpiska-hero-wide.jpg → hero.jpg (реальное фото главной) → SVG-заглушка */
  var heroImg = document.getElementById('pdHeroImg');
  if (heroImg) {
    var chain = ['images/hero.jpg', heroSvg()];
    var onErr = function () {
      if (chain.length) heroImg.src = chain.shift();
      else heroImg.removeEventListener('error', onErr);
    };
    heroImg.addEventListener('error', onErr);
    if (heroImg.complete && !heroImg.naturalWidth && heroImg.src) onErr();
  }

  /* ---------- маркиза: дублируем контент для бесшовной прокрутки ---------- */
  document.querySelectorAll('.marquee-track').forEach(function (t) { t.innerHTML += t.innerHTML; });

  /* ---------- reveal-анимации всей страницы ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();
