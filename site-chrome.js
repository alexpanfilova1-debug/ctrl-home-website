(function () {
  var chrome = document.querySelector('[data-site-chrome]');
  if (!chrome) return;

  chrome.innerHTML =
    '<div class="topbar"><span><b>Бесплатная доставка</b> от 3000&nbsp;₽.</span><a href="dostavka-i-vozvrat.html">Подробнее →</a></div>' +
    '<header class="header" id="header">' +
      '<div class="header-left">' +
        '<button class="menu-trigger" id="menuTrigger" aria-label="Открыть меню">' +
          '<span class="menu-ico"><span></span><span></span><span></span></span>' +
          '<span class="menu-trigger-text">Каталог</span>' +
        '</button>' +
        '<nav class="header-nav">' +
          '<a href="o-nas.html" class="rlink" data-text="О нас"><span class="roll">О нас</span></a>' +
          '<a href="podpiska.html" class="rlink" data-text="Подписка"><span class="roll">Подписка</span></a>' +
          '<a href="soobshestvo.html" class="rlink" data-text="Сообщество"><span class="roll">Сообщество</span></a>' +
        '</nav>' +
      '</div>' +
      '<a class="logo" href="index.html">CTRL <span>home</span></a>' +
      '<div class="header-right">' +
        '<a href="account.html" class="hide-m rlink" data-text="Аккаунт"><span class="roll">Аккаунт</span></a>' +
        '<button class="cart-btn" id="cartOpen"><span class="rlink" data-text="Корзина"><span class="roll">Корзина</span></span><span class="cart-count" id="cartCount">0</span></button>' +
      '</div>' +
    '</header>' +
    '<div class="nav-overlay" id="navOverlay"></div>' +
    '<aside class="nav-drawer" id="navDrawer" aria-label="Меню">' +
      '<div class="nav-drawer-head">' +
        '<a class="nav-drawer-logo" href="index.html">CTRL <span>home</span></a>' +
        '<button class="nav-close" id="navClose" aria-label="Закрыть">Закрыть</button>' +
      '</div>' +
      '<nav class="nav-drawer-body">' +
        '<a class="nav-link" href="catalog.html">Все ароматы</a>' +
        '<a class="nav-link" href="novinki.html">Новинки <span class="nav-arrow">›</span></a>' +
        '<a class="nav-link" href="parfumeriya.html">Парфюмерия <span class="nav-arrow">›</span></a>' +
        '<a class="nav-link" href="sprei-dlya-tela.html">Спреи для тела <span class="nav-arrow">›</span></a>' +
        '<a class="nav-link" href="super-aromaty.html">Супер-ароматы <span class="nav-arrow">›</span></a>' +
        '<a class="nav-link" href="uhod-za-telom.html">Уход за телом <span class="nav-arrow">›</span></a>' +
        '<a class="nav-link" href="svechi.html">Свечи <span class="nav-arrow">›</span></a>' +
        '<a class="nav-link" href="dlya-stirki.html">Для стирки <span class="nav-arrow">›</span></a>' +
        '<a class="nav-link" href="merch.html">Мерч и аксессуары</a>' +
        '<a class="nav-link" href="sobrat-nabor.html">Собрать свой набор <span class="nav-arrow">›</span></a>' +
        '<a class="nav-link" href="podarochnye-karty.html">Подарочные карты <span class="nav-arrow">›</span></a>' +
        '<a class="nav-link" href="rasprodazha.html">Распродажа <span class="nav-arrow">›</span></a>' +
        '<a class="nav-link nav-link--accent" href="o-nas.html">О нас <span class="nav-arrow">›</span></a>' +
        '<a class="nav-link nav-link--accent" href="soobshestvo.html">Сообщество <span class="nav-arrow">›</span></a>' +
      '</nav>' +
      '<div class="nav-drawer-foot">' +
        '<a href="account.html">Аккаунт</a>' +
        '<a href="#">Instagram</a>' +
        '<a href="#">Telegram</a>' +
      '</div>' +
    '</aside>';

  /* шапка при скролле: класс .scrolled (фон/тень). Бар-объявление уезжает сам — он в обычном потоке. */
  var header = document.getElementById('header');
  if (header) {
    var scrolledState = false;
    var onScrollHeader = function () {
      var s = window.scrollY > 40;
      if (s !== scrolledState) { header.classList.toggle('scrolled', s); scrolledState = s; }
    };
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
  }

  var footer = document.querySelector('[data-site-footer]');
  if (!footer) return;
  footer.innerHTML =
    '<footer class="footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div><div class="footer-logo">CTRL <span>home</span></div></div>' +
          '<div>' +
            '<h5>Навигация</h5>' +
            '<nav class="footer-nav">' +
              '<a href="catalog.html">Все ароматы</a>' +
              '<a href="novinki.html">Новинки</a>' +
              '<a href="sobrat-nabor.html">Собрать набор</a>' +
              '<a href="dostavka-i-vozvrat.html">Доставка и возврат</a>' +
              '<a href="o-nas.html">О нас</a>' +
            '</nav>' +
          '</div>' +
          '<div>' +
            '<h5>Подпишитесь на новости</h5>' +
            '<form class="subscribe" onsubmit="return false">' +
              '<input type="email" placeholder="ваш@email.ru" aria-label="Email">' +
              '<button type="submit">Отправить</button>' +
            '</form>' +
            '<div class="subscribe-msg"></div>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<div>© 2026 CTRL home. Все права защищены.</div>' +
          '<div>Политика конфиденциальности · Оферта</div>' +
        '</div>' +
      '</div>' +
    '</footer>';
})();
