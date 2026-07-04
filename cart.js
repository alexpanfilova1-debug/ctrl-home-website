/* ============================================================================
   CART.JS — единая корзина CTRL home (общая для ВСЕХ страниц)
   ----------------------------------------------------------------------------
   • Модель: localStorage['ctrlHomeCart'] = [ { id, ml, price }, ... ]
     (+ миграция старого формата: число id → { id, ml:50, price: базовая цена })
   • Бандлы (наборы): localStorage['ctrlHomeSamplePacks'] = [ { title, price, scents[] } ]
   • Инжектит ОДНУ выезжающую панель #cartDrawer + overlay в <body> на каждой
     странице, открывает её по #cartOpen, рисует счётчик #cartCount.
   • Рендерит страницу-корзину (<main data-page="korzina">) и слушает изменения.
   • Публичный API: window.CTRLCart (add / open / close / clear / getItems / ...).
   • Требует window.CTRL_PRODUCTS (из page-data.js) — поэтому page-data.js
     подключается раньше cart.js на всех страницах.
   ========================================================================== */
(function () {
  var CART_KEY = 'ctrlHomeCart';
  var BUNDLE_KEY = 'ctrlHomeSamplePacks';
  var CHECKOUT_URL = 'oformlenie.html';
  var korzinaRoot = null;

  /* ---------- товары / форматирование ---------- */
  function products() { return window.CTRL_PRODUCTS || {}; }

  function basePrice(id) {
    var p = products()[id];
    if (!p) return 0;
    if (p.volumes && p.volumes.length) {
      for (var i = 0; i < p.volumes.length; i++) {
        if (Number(p.volumes[i].ml) === 50) return Number(p.volumes[i].price) || 0;
      }
      return Number(p.volumes[0].price) || 0;
    }
    return Number(p.price) || 0;
  }

  function money(n) {
    return (Number(n) || 0).toLocaleString('ru-RU') + ' ₽';
  }

  /* ---------- localStorage ---------- */
  function rawRead(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch (e) { return []; }
  }
  function rawWrite(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch (e) {}
  }

  /* Нормализация + миграция старого формата корзины (массив чисел-id). */
  function normalizeItems(items) {
    if (!Array.isArray(items)) return { items: [], changed: true };
    var changed = false;
    var out = [];
    items.forEach(function (it) {
      if (typeof it === 'number' || typeof it === 'string') {
        var oldId = Number(it);
        changed = true;
        if (!products()[oldId]) return;          // товара больше нет — выкидываем
        out.push({ id: oldId, ml: 50, price: basePrice(oldId) });
      } else if (it && typeof it === 'object') {
        var id = Number(it.id);
        if (!products()[id]) { changed = true; return; }
        var ml = Number(it.ml) || 50;
        var price = Number(it.price);
        if (!price) { price = basePrice(id); changed = true; }
        out.push({ id: id, ml: ml, price: price });
      } else {
        changed = true;
      }
    });
    return { items: out, changed: changed };
  }

  function getItems() {
    var res = normalizeItems(rawRead(CART_KEY));
    if (res.changed) rawWrite(CART_KEY, res.items);
    return res.items;
  }
  function setItems(items) { rawWrite(CART_KEY, items); }

  function getBundles() {
    var b = rawRead(BUNDLE_KEY);
    return Array.isArray(b) ? b.filter(function (p) { return p && p.scents && p.scents.length; }) : [];
  }
  function setBundles(b) { rawWrite(BUNDLE_KEY, b); }

  function count() { return getItems().length + getBundles().length; }

  function total() {
    var t = getItems().reduce(function (s, it) { return s + (Number(it.price) || 0); }, 0);
    t += getBundles().reduce(function (s, p) { return s + (Number(p.price) || 0); }, 0);
    return t;
  }

  /* ---------- мутации ---------- */
  function add(id, ml, price) {
    id = Number(id);
    if (!products()[id]) return;
    ml = Number(ml) || 50;
    price = Number(price);
    if (!price) price = basePrice(id);
    var items = getItems();
    items.push({ id: id, ml: ml, price: price });
    setItems(items);
    refresh();
    open();
  }
  function removeItem(i) {
    var items = getItems();
    items.splice(i, 1);
    setItems(items);
    refresh();
  }
  function removeBundle(i) {
    var b = getBundles();
    b.splice(i, 1);
    setBundles(b);
    refresh();
  }
  function clear() { setItems([]); setBundles([]); refresh(); }

  /* ---------- выезжающая панель ---------- */
  function injectDrawer() {
    if (document.getElementById('cartDrawer')) return;
    document.body.insertAdjacentHTML('beforeend',
      '<div class="cart-overlay" id="cartOverlay"></div>' +
      '<aside class="cart-drawer" id="cartDrawer" aria-label="Корзина" aria-hidden="true">' +
        '<div class="cart-head">' +
          '<h4>Корзина (<span id="cartHeadCount">0</span>)</h4>' +
          '<button class="cart-close" id="cartClose" type="button">Закрыть</button>' +
        '</div>' +
        '<div class="cart-items" id="cartItems"></div>' +
        '<div class="cart-foot">' +
          '<div class="cart-total"><span>Итого</span><span id="cartTotal">0 ₽</span></div>' +
          '<button class="checkout-btn" id="cartCheckout" type="button">Оформить заказ</button>' +
        '</div>' +
      '</aside>');
  }

  function itemRow(it, i) {
    var p = products()[it.id] || {};
    var img = p.img || (p.gallery && p.gallery[0]) || '';
    return '<div class="cart-item">' +
      '<img src="' + img + '" alt="' + (p.name || '') + '" onerror="this.style.visibility=\'hidden\'">' +
      '<div><div class="cart-item-name">' + (p.name || 'Товар') + '</div>' +
        '<div class="cart-item-price">' + it.ml + ' мл · ' + money(it.price) + '</div></div>' +
      '<button class="cart-remove" type="button" data-rm="' + i + '">Убрать</button>' +
    '</div>';
  }

  function bundleRow(pack, i) {
    var n = pack.scents ? pack.scents.length : 6;
    var sub = pack.sub || (n + ' × 10 мл');           // кастомный состав (напр. «парфюм 50 мл + свеча + спрей»)
    var img = pack.img || 'images/sample-vial-10ml.png';
    return '<div class="cart-item cart-item--bundle">' +
      '<img src="' + img + '" alt="" onerror="this.style.visibility=\'hidden\'">' +
      '<div><div class="cart-item-name">' + (pack.title || 'Пробный набор CTRL home') + '</div>' +
        '<div class="cart-item-price">' + sub + ' · ' + money(pack.price) + '</div>' +
        (pack.plan ? '<div class="cart-item-price">' + pack.plan + '</div>' : '') + '</div>' +
      '<button class="cart-remove" type="button" data-rm-bundle="' + i + '">Убрать</button>' +
    '</div>';
  }

  function renderDrawer() {
    var itemsEl = document.getElementById('cartItems');
    if (!itemsEl) return;
    var items = getItems();
    var bundles = getBundles();

    var headCount = document.getElementById('cartHeadCount');
    if (headCount) headCount.textContent = items.length + bundles.length;

    if (!items.length && !bundles.length) {
      itemsEl.innerHTML = '<div class="cart-empty">Ваша корзина<br>пока пуста</div>';
    } else {
      itemsEl.innerHTML =
        items.map(itemRow).join('') +
        bundles.map(bundleRow).join('');
    }

    var totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = money(total());

    var checkout = document.getElementById('cartCheckout');
    if (checkout) checkout.disabled = !(items.length || bundles.length);

    itemsEl.querySelectorAll('[data-rm]').forEach(function (b) {
      b.addEventListener('click', function () { removeItem(Number(b.getAttribute('data-rm'))); });
    });
    itemsEl.querySelectorAll('[data-rm-bundle]').forEach(function (b) {
      b.addEventListener('click', function () { removeBundle(Number(b.getAttribute('data-rm-bundle'))); });
    });
  }

  function open() {
    renderDrawer();
    var d = document.getElementById('cartDrawer'), o = document.getElementById('cartOverlay');
    if (d) { d.classList.add('open'); d.setAttribute('aria-hidden', 'false'); }
    if (o) o.classList.add('open');
  }
  function close() {
    var d = document.getElementById('cartDrawer'), o = document.getElementById('cartOverlay');
    if (d) { d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); }
    if (o) o.classList.remove('open');
  }

  /* ---------- счётчик в шапке ---------- */
  function syncCount() {
    var el = document.getElementById('cartCount');
    if (!el) return;
    el.textContent = count();
    el.classList.add('bump');
    setTimeout(function () { el.classList.remove('bump'); }, 300);
  }

  /* ---------- страница-корзина (data-page="korzina") ---------- */
  function renderKorzina() {
    if (!korzinaRoot) return;
    var items = getItems();
    var bundles = getBundles();
    var hasItems = items.length || bundles.length;

    var rows = items.map(function (it, i) {
      var p = products()[it.id] || {};
      var img = p.img || (p.gallery && p.gallery[0]) || '';
      return '<div class="cart-page-item">' +
        '<img src="' + img + '" alt="' + (p.name || '') + '" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
        '<div><div class="product-name">' + (p.name || 'Товар') + '</div>' +
          '<div class="product-note">' + (p.note || '') + '</div>' +
          '<div class="product-price">' + it.ml + ' мл · ' + money(it.price) + '</div></div>' +
        '<button class="cart-page-remove" type="button" data-rm="' + i + '">Убрать</button>' +
      '</div>';
    }).join('');

    var bundleRows = bundles.map(function (pack, i) {
      var n = pack.scents ? pack.scents.length : 6;
      var note = (pack.scents ? pack.scents.join(' · ') : '') +
                 (pack.plan ? (pack.scents && pack.scents.length ? ' · ' : '') + pack.plan : '');
      return '<div class="cart-page-item cart-page-item--bundle">' +
        '<div class="cart-page-bundle-media">' + n + '</div>' +
        '<div><div class="product-name">' + (pack.title || 'Пробный набор CTRL home') + '</div>' +
          '<div class="product-note">' + note + '</div>' +
          '<div class="product-price">' + money(pack.price) + '</div></div>' +
        '<button class="cart-page-remove" type="button" data-rm-bundle="' + i + '">Убрать</button>' +
      '</div>';
    }).join('');

    korzinaRoot.innerHTML =
      '<div class="philosophy-label">Корзина</div>' +
      '<h1 class="section-title">Ваша <em>корзина</em></h1>' +
      (hasItems
        ? '<div class="cart-page-panel">' + rows + bundleRows +
            '<div class="cart-page-total"><span>Итого</span><span>' + money(total()) + '</span></div></div>' +
          '<div class="page-actions">' +
            '<a class="btn" href="' + CHECKOUT_URL + '">Оформить заказ</a>' +
            '<a class="btn btn--ghost" href="catalog.html">Продолжить покупки</a>' +
            '<button class="cart-page-clear" type="button" data-clear>Очистить корзину</button>' +
          '</div>'
        : '<p class="page-lead">Пока пусто. Добавьте аромат — и он появится здесь.</p>' +
          '<div class="page-actions"><a class="btn" href="catalog.html">Выбрать аромат</a></div>');

    korzinaRoot.querySelectorAll('[data-rm]').forEach(function (b) {
      b.addEventListener('click', function () { removeItem(Number(b.getAttribute('data-rm'))); });
    });
    korzinaRoot.querySelectorAll('[data-rm-bundle]').forEach(function (b) {
      b.addEventListener('click', function () { removeBundle(Number(b.getAttribute('data-rm-bundle'))); });
    });
    var clr = korzinaRoot.querySelector('[data-clear]');
    if (clr) clr.addEventListener('click', clear);
  }

  /* ---------- общий перерисов ---------- */
  function refresh() {
    renderDrawer();
    syncCount();
    if (korzinaRoot) renderKorzina();
    // уведомляем сторонние страницы (напр. оформление) об изменении корзины
    try { document.dispatchEvent(new CustomEvent('ctrlcart:change')); } catch (e) {}
  }

  /* ---------- инициализация ---------- */
  function init() {
    injectDrawer();

    var opener = document.getElementById('cartOpen');
    if (opener) opener.addEventListener('click', function (e) { e.preventDefault(); open(); });

    var closer = document.getElementById('cartClose');
    if (closer) closer.addEventListener('click', close);

    var ov = document.getElementById('cartOverlay');
    if (ov) ov.addEventListener('click', close);

    var checkout = document.getElementById('cartCheckout');
    if (checkout) checkout.addEventListener('click', function () {
      if (count()) location.href = CHECKOUT_URL;
    });

    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    /* быстрые кнопки «В корзину» (data-add) — объём 50 мл / базовая цена */
    document.querySelectorAll('[data-add]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        add(Number(b.getAttribute('data-add')), 50, 0);
      });
    });

    var root = document.querySelector('[data-page="korzina"]');
    if (root) { korzinaRoot = root; renderKorzina(); }

    renderDrawer();
    syncCount();
  }

  /* ---------- публичный API ---------- */
  window.CTRLCart = {
    add: add,
    open: open,
    close: close,
    clear: clear,
    getItems: getItems,
    getBundles: getBundles,
    removeItem: removeItem,
    removeBundle: removeBundle,
    total: total,
    count: count,
    money: money,
    basePrice: basePrice,
    refresh: refresh
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
