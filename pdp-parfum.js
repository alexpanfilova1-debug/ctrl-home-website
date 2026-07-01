/* ============================================================================
   PDP-PARFUM.JS — общий скрипт страницы товара «Парфюмерия» (структура «Эры розы»)
   ----------------------------------------------------------------------------
   Обобщённая версия инлайн-скрипта era-rozy.html. Один файл на все страницы.
   • PID берётся из <body data-pid="NN"> — id товара в page-data.js (CTRL_PRODUCTS)
   • Артикул — из CTRL_PRODUCTS[PID].article (+ «-<объём>»)
   • Требует, чтобы page-data.js и cart.js были подключены раньше этого файла.
   Управляет: объём + подписка + цена, подарок, «в корзину», избранное,
   аккордеон, флип-карточки нот, апселл, мягкое появление при скролле.
   ========================================================================== */
(function () {
  var PID = Number(document.body.getAttribute('data-pid'));
  var PROD = (window.CTRL_PRODUCTS && window.CTRL_PRODUCTS[PID]) || {};
  var ART = PROD.article || 'CTL';
  var fmt = function (n) { return Number(n).toLocaleString('ru-RU') + ' ₽'; };

  /* ---------- объём + тип покупки + цена ---------- */
  var vols = Array.prototype.slice.call(document.querySelectorAll('#erVols .pdp-vol-btn'));
  if (!vols.length) return;
  var sel = vols.find(function (b) { return b.classList.contains('is-active'); }) || vols[vols.length - 1];
  var addBtn = document.getElementById('erAdd');
  var priceEl = document.getElementById('erPrice');
  var artEl = document.getElementById('erArt');
  var segOnce = document.getElementById('erSegOnce');
  var segSub = document.getElementById('erSegSub');
  var subType = 'once';

  function curML() { return Number(sel.getAttribute('data-ml')); }
  function curPrice() { return Number(sel.getAttribute('data-price')); }

  function render() {
    var price = curPrice();
    if (priceEl) priceEl.textContent = fmt(price);
    if (artEl) artEl.textContent = 'арт. ' + ART + '-' + curML();
    if (segOnce) segOnce.textContent = fmt(price);
    if (segSub) segSub.textContent = fmt(Math.round(price * 0.9)) + ' / повтор';
    if (addBtn && !addBtn.classList.contains('is-added')) {
      addBtn.textContent = 'В корзину — ' + fmt(subType === 'sub' ? Math.round(price * 0.9) : price);
    }
  }

  vols.forEach(function (b) {
    b.addEventListener('click', function () {
      vols.forEach(function (x) { x.classList.remove('is-active'); });
      b.classList.add('is-active'); sel = b; render();
    });
  });

  document.querySelectorAll('#erSeg .er-seg-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('#erSeg .er-seg-btn').forEach(function (x) { x.classList.remove('is-active'); });
      b.classList.add('is-active'); subType = b.getAttribute('data-type'); render();
    });
  });
  render();

  /* ---------- подарок ---------- */
  var giftToggle = document.getElementById('erGiftToggle');
  var giftFields = document.getElementById('erGiftFields');
  if (giftToggle && giftFields) {
    giftToggle.addEventListener('change', function () { giftFields.classList.toggle('is-open', giftToggle.checked); });
  }

  /* ---------- в корзину (общая корзина cart.js) ---------- */
  if (addBtn) addBtn.addEventListener('click', function () {
    var price = subType === 'sub' ? Math.round(curPrice() * 0.9) : curPrice();
    if (window.CTRLCart) window.CTRLCart.add(PID, curML(), price);
    addBtn.classList.add('is-added');
    addBtn.textContent = 'Добавлено ✓';
    setTimeout(function () { addBtn.classList.remove('is-added'); render(); }, 1500);
  });

  /* ---------- апселл ---------- */
  document.querySelectorAll('.er-up-add').forEach(function (b) {
    b.addEventListener('click', function () {
      if (window.CTRLCart) window.CTRLCart.add(Number(b.getAttribute('data-add-id')), Number(b.getAttribute('data-add-ml')), Number(b.getAttribute('data-add-price')));
      b.classList.add('is-added'); var t = b.textContent; b.textContent = 'Добавлено ✓';
      setTimeout(function () { b.classList.remove('is-added'); b.textContent = t; }, 1400);
    });
  });

  /* ---------- избранное ---------- */
  var fav = document.getElementById('erFav');
  function readFav() { try { return JSON.parse(localStorage.getItem('ctrlHomeWishlist') || '[]'); } catch (e) { return []; } }
  function paintFav() { var on = readFav().indexOf(PID) !== -1; fav.textContent = on ? '♥' : '♡'; fav.classList.toggle('is-on', on); fav.setAttribute('aria-pressed', on ? 'true' : 'false'); }
  if (fav) {
    fav.addEventListener('click', function () {
      var list = readFav(), i = list.indexOf(PID);
      if (i === -1) list.push(PID); else list.splice(i, 1);
      try { localStorage.setItem('ctrlHomeWishlist', JSON.stringify(list)); } catch (e) {}
      paintFav();
    });
    paintFav();
  }

  /* ---------- аккордеон ---------- */
  function setAcc(item, open) {
    var body = item.querySelector('.er-acc-body');
    item.classList.toggle('is-open', open);
    body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
  }
  document.querySelectorAll('#erAcc .er-acc-item').forEach(function (item) {
    setAcc(item, item.classList.contains('is-open'));
    item.querySelector('.er-acc-head').addEventListener('click', function () {
      setAcc(item, !item.classList.contains('is-open'));
    });
  });

  /* ---------- карточки нот: флип по клику + перетаскивание мышью вбок ---------- */
  var cardsRow = document.getElementById('erCards');
  var dragMoved = false;
  if (cardsRow) {
    var down = false, startX = 0, startScroll = 0;
    cardsRow.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 || e.pointerType !== 'mouse') return;
      down = true; dragMoved = false; startX = e.clientX; startScroll = cardsRow.scrollLeft;
    });
    cardsRow.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 6) dragMoved = true;
      cardsRow.scrollLeft = startScroll - dx;
    });
    var endDrag = function () { down = false; };
    cardsRow.addEventListener('pointerup', endDrag);
    cardsRow.addEventListener('pointerleave', endDrag);
    cardsRow.addEventListener('pointercancel', endDrag);
    cardsRow.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }
  document.querySelectorAll('#erCards .er-card').forEach(function (card) {
    card.addEventListener('click', function () {
      if (dragMoved) { dragMoved = false; return; }
      card.classList.add('is-flipped');
    });
    var back = card.querySelector('.er-card-back-btn');
    if (back) back.addEventListener('click', function (e) { e.stopPropagation(); card.classList.remove('is-flipped'); });
  });

  /* ---------- появление при скролле ---------- */
  var rev = document.querySelectorAll('.er-reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('er-in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    rev.forEach(function (el) { io.observe(el); });
  } else {
    rev.forEach(function (el) { el.classList.add('er-in'); });
  }
})();
