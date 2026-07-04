/* ============================================================================
   PODPISKA.JS — конфигуратор наборов по подписке (страница podpiska.html).
   ----------------------------------------------------------------------------
   • Три набора с фиксированной СТРУКТУРОЙ (решение Alex 04.07.2026):
       CTRL+S    — 3 вещи  — 6 900 ₽ за доставку
       CTRL+A    — 5 вещей — 10 000 ₽ за доставку (популярный)
       CTRL+HOME — 10 вещей — 17 900 ₽ за доставку
     Ароматы КАЖДОЙ вещи выбирает клиент (свотчи, как в «Начни с CTRL»).
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

  /* свотчи-цвета — как в get-started.js; у «Эры розы» (id 5) — паттерн */
  var SW_P = {
    30: '#F2E7D6', 31: '#F2E88F', 32: '#8E2F44', 33: '#E3B75C', 34: '#F4C08A',
    35: '#F0E3C9', 36: '#C98A4B', 37: '#A9683C', 38: '#E8D3E8', 39: '#6E3B4B',
    40: '#F2F1EC', 41: '#D9D7D2', 42: '#CFE3C8'
  };
  var SW_C = { 11: '#E4EDD3', 12: '#C79B72', 13: '#7E8F6E', 14: '#5F7B62', 15: '#EEF0EA' };
  var SW_S = { 21: '#F5D8E8', 22: '#D9A566', 23: '#F4EAD7', 24: '#B08154', 25: '#F6B25E', 26: '#E8C39A', 27: '#C2597B' };

  var CATS = {
    p30:    { ids: PARFUM_IDS, sw: SW_P, label: 'Парфюм · 30 мл',      unit: 'парфюм 30 мл',  ml: 30 },
    p10:    { ids: PARFUM_IDS, sw: SW_P, label: 'Мини-парфюм · 10 мл', unit: 'мини 10 мл',    ml: 10 },
    candle: { ids: CANDLE_IDS, sw: SW_C, label: 'Свеча',               unit: 'свеча' },
    spray:  { ids: SPRAY_IDS,  sw: SW_S, label: 'Спрей · 50 мл',       unit: 'спрей' }
  };
  var CAT_ORDER = ['p30', 'p10', 'candle', 'spray'];

  var SETS = [
    { key: 's',    cap: 'CTRL+S',    mood: 'сохрани базу',        count: 3,  price: 6900,
      slots: { p30: 1, p10: 0, candle: 1, spray: 1 },
      sub: 'парфюм 30 мл + свеча + спрей' },
    { key: 'a',    cap: 'CTRL+A',    mood: 'выбери всё нужное',   count: 5,  price: 10000, popular: true,
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

  /* ---------- пиктограммы состава (стиль stroke-иконок get-started) ---------- */
  var ICONS = {
    p30:    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="9" width="8" height="11" rx="1.5"/><rect x="10.4" y="5.2" width="3.2" height="3.4" rx="1"/><line x1="12" y1="5.2" x2="12" y2="3.8"/><line x1="8" y1="13" x2="16" y2="13"/></svg>',
    p10:    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9.8" y="8" width="4.4" height="12" rx="1.2"/><rect x="10.7" y="4.6" width="2.6" height="2.6" rx=".8"/></svg>',
    candle: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="10.5" width="10" height="9.5" rx="1.5"/><line x1="12" y1="10.5" x2="12" y2="8.6"/><path d="M12 3.6c-1.5 1.7-.8 3.4 0 3.4s1.5-1.7 0-3.4z" fill="#FF2D9E" stroke="none"/></svg>',
    spray:  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8.6" y="10" width="7" height="10" rx="1.5"/><rect x="9.8" y="6.4" width="3.4" height="3" rx=".8"/><path d="M13.2 7.4h2.2"/><circle cx="18.6" cy="5.6" r="1" fill="#FF2D9E" stroke="none"/><circle cx="20.2" cy="8" r=".9" fill="#FF2D9E" stroke="none"/></svg>'
  };
  function iconsRow(s) {
    var out = [];
    CAT_ORDER.forEach(function (cat) {
      for (var i = 0; i < (s.slots[cat] || 0); i++) out.push(ICONS[cat]);
    });
    return '<span class="pd-set-icons" aria-hidden="true">' + out.join('') + '</span>';
  }

  /* ---------- SVG-заглушка хиро: набор в коробке (фирменный стиль «фото скоро») ---------- */
  function heroSvg() {
    var ink = '#0E0E0E';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">' +
      '<rect width="800" height="1000" fill="#F1EFE8"/>' +
      '<circle cx="400" cy="450" r="260" fill="#EAF0BE"/>' +
      '<g fill="none" stroke="' + ink + '" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">' +
      /* парфюм */
      '<rect x="242" y="330" width="104" height="180" rx="14"/><rect x="276" y="294" width="34" height="38" rx="5"/>' +
      '<line x1="293" y1="294" x2="293" y2="278"/><circle cx="293" cy="418" r="24" fill="#FF2D9E" stroke="' + ink + '"/>' +
      /* свеча */
      '<rect x="376" y="356" width="118" height="154" rx="16"/><line x1="376" y1="384" x2="494" y2="384"/>' +
      '<line x1="435" y1="356" x2="435" y2="332"/>' +
      '<path d="M435 280 C 403 314 419 346 435 346 C 451 346 468 318 435 280 Z" fill="#CCF400" stroke="' + ink + '"/>' +
      /* спрей */
      '<rect x="524" y="342" width="88" height="168" rx="18"/><rect x="544" y="310" width="48" height="34" rx="6"/>' +
      '<path d="M612 318 h38 M612 332 h38"/>' +
      '<circle cx="668" cy="314" r="8" fill="#FF2D9E" stroke="none"/><circle cx="688" cy="330" r="7" fill="#FF2D9E" stroke="none"/>' +
      /* коробка, в которой стоит набор */
      '<path d="M204 508 L 596 508 L 572 660 L 228 660 Z" fill="#F7F5EF" stroke="' + ink + '"/>' +
      '<path d="M204 508 L 160 466 M596 508 L 640 466"/>' +
      '<line x1="400" y1="508" x2="400" y2="660"/>' +
      '</g>' +
      '<text x="400" y="742" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="4" fill="' + ink + '">твой набор по подписке</text>' +
      '<text x="400" y="906" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="5" fill="' + ink + '">CTRL home</text>' +
      '<text x="400" y="946" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" letter-spacing="3" fill="#8C8C84">фото скоро</text>' +
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
  function setCard(s) {
    var per = Math.round(s.price / s.count / 10) * 10;
    var parts = [];
    CAT_ORDER.forEach(function (cat) {
      var n = s.slots[cat] || 0;
      if (n) parts.push((n > 1 ? n + '× ' : '') + CATS[cat].unit);
    });
    return '<button class="pd-set" type="button" aria-pressed="false" data-set="' + s.key + '">' +
      (s.popular ? '<span class="pd-set-strip">выбирают чаще</span>' : '') +
      '<span class="pd-set-cap">' + s.cap + '</span>' +
      '<span class="pd-set-count">' + s.count + ' ' + (s.count < 5 ? 'вещи' : 'вещей') + '</span>' +
      '<span class="pd-set-mood">' + s.mood + '</span>' +
      '<span class="pd-set-price">' + money(s.price) + ' <small>за доставку</small></span>' +
      '<span class="pd-set-per">≈ ' + money(per) + ' за вещь</span>' +
      iconsRow(s) +
      '<ul class="pd-set-list">' + parts.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
    '</button>';
  }

  function swatch(cat, id) {
    var label = catLabelName(cat, id);
    var bg = (cat === 'p30' || cat === 'p10') && id === 5
      ? 'background-image:url(&quot;' + rosePattern() + '&quot;)'
      : 'background-color:' + (CATS[cat].sw[id] || '#EFEDE6');
    return '<button class="pd-scent" type="button" aria-pressed="false" data-pick="' + cat + ':' + id + '" ' +
      'title="' + label + '" aria-label="' + label + '" style="' + bg + '"></button>';
  }

  function rowsHtml() {
    var s = setObj();
    return CAT_ORDER.map(function (cat) {
      var need = s.slots[cat] || 0;
      if (!need) return '';
      var few = CATS[cat].ids.length <= 7;
      return '<div class="pd-prod" data-cat-row="' + cat + '">' +
        '<span class="pd-prod-label">' + CATS[cat].label +
          (need > 1 ? '<span class="pd-prod-need" data-need="' + cat + '">выбери ' + need + '</span>' : '') +
        '</span>' +
        '<div class="pd-scents' + (few ? ' pd-scents--few' : '') + '" role="group" aria-label="' + CATS[cat].label + '">' +
          CATS[cat].ids.map(function (id) { return swatch(cat, id); }).join('') +
        '</div>' +
        '<p class="pd-row-name" data-names="' + cat + '"></p>' +
      '</div>';
    }).join('');
  }

  function render() {
    root.innerHTML =
      '<div class="pd-stephead reveal"><span class="pd-stepnum">1/</span><h3>Выбери размер набора</h3></div>' +
      '<p class="pd-stepsub reveal">Структура и цена фиксированные — платишь одну и ту же сумму за каждую доставку. Чем больше набор, тем дешевле каждая вещь.</p>' +
      '<div class="pd-sets reveal">' + SETS.map(setCard).join('') + '</div>' +

      '<div class="pd-once reveal">' +
        '<div class="pd-once-title">Можно и без подписки — но тогда:</div>' +
        '<ul>' +
          '<li>обычные цены каталога, без выгоды набора</li>' +
          '<li>без дискавери-сета в подарок</li>' +
          '<li>без цен подписчика −20% на докупки</li>' +
        '</ul>' +
        '<a class="btn btn--ghost" href="sobrat-nabor.html">Собрать разово</a>' +
      '</div>' +

      '<div class="pd-config">' +
        '<div class="pd-steps">' +
          '<div class="pd-stephead reveal"><span class="pd-stepnum">2/</span><h3>Выбери ароматы — на каждую вещь</h3></div>' +
          '<p class="pd-stepsub reveal">В этом и смысл: набор один, а ароматы каждый раз твои. Перед следующей доставкой их можно поменять.</p>' +
          '<div id="pdRows">' + rowsHtml() + '</div>' +
        '</div>' +

        '<aside class="pd-panel reveal" id="pdPanel">' +
          '<div class="pd-panel-kicker">⌃ подписка ctrl home</div>' +
          '<h3 class="pd-panel-title" id="pdTitle"></h3>' +
          '<p class="pd-panel-sub" id="pdSub"></p>' +
          '<ul class="pd-items" id="pdItems"></ul>' +
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

    /* панель */
    document.getElementById('pdTitle').textContent = 'Набор ' + s.cap;
    document.getElementById('pdSub').textContent = s.count + ' ' + (s.count < 5 ? 'вещи' : 'вещей') + ' · ' + s.sub;

    document.getElementById('pdItems').innerHTML = CAT_ORDER.map(function (cat) {
      var need = s.slots[cat] || 0;
      if (!need) return '';
      var q = state.picks[cat] || [];
      var names = q.map(function (id) { return catLabelName(cat, id); }).join(' · ');
      return '<li>' + need + '× <b>' + CATS[cat].unit + '</b><br><span>' + (names || '—') + '</span></li>';
    }).join('');

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
      img: 'images/podpiska-nabor.jpg'
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

  /* ---------- хиро: фирменный фоллбек, пока нет фото ---------- */
  var heroImg = document.getElementById('pdHeroImg');
  if (heroImg) {
    var ph = heroSvg();
    var toPh = function () { if (heroImg.src !== ph) heroImg.src = ph; };
    heroImg.addEventListener('error', toPh);
    if (heroImg.complete && !heroImg.naturalWidth) toPh();
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
