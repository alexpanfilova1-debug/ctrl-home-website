/* ============================================================
   ФИЛОСОФИЯ — логика v3.1 (matcha 5×3 + описания нот)
   15 плиток: часть с реальными фото ингредиентов (images/nota-*),
   часть — фирменные градиенты-заглушки. Наведение/фокус/тап на
   плитку раскрывает описание ноты в правом блоке. Номера
   периодически «падают». Морф вордмарка снизу — на CSS.
   ============================================================ */
(function () {
  'use strict';

  var root = document.querySelector('[data-philo]');
  if (!root) return;
  var gridEl  = root.querySelector('[data-philo-grid]');
  var panelEl = root.querySelector('[data-philo-panel]');
  if (!gridEl || !panelEl) return;

  /* img — реальное фото (грузится с боевого сайта); c1/c2 — фирменный
     градиент: заглушка для плиток без фото И фолбэк, если фото не нашлось */
  var data = [
    { name:'Дамасская роза', nameEn:'DAMASK ROSE', fam:'FLORAL',       famRu:'ЦВЕТЫ',      title:'Близость',               en:'CLOSENESS',           body:'Роза — про людей, а не про декор. Аромат, к которому хочется подойти ближе.', img:'images/nota-damasskaya-roza.png', c1:'#F2A0A0', c2:'#C13B4E' },
    { name:'Бергамот',       nameEn:'BERGAMOT',    fam:'CITRUS',       famRu:'ЦИТРУС',     title:'Ясность вместо шума',    en:'CLARITY OVER NOISE',  body:'Утро начинается не с уведомлений. Цитрус задаёт первую команду дню — трезвость и лёгкость в воздухе.', c1:'#EAF26B', c2:'#A6BE1C' },
    { name:'Малина',         nameEn:'RASPBERRY',   fam:'FRUITY',       famRu:'ФРУКТЫ',     title:'Дерзость',               en:'A LITTLE DEFIANCE',   body:'Малина добавляет искру нахальства — дом имеет право быть ярким и несерьёзным.', img:'images/nota-malina.png', c1:'#F26D8B', c2:'#8E1E3C' },
    { name:'Инжир',          nameEn:'FIG',         fam:'FRUITY',       famRu:'ФРУКТЫ',     title:'Дом помнит',             en:'THE HOME REMEMBERS',  body:'Аромат — это память места. Инжир и молочная зелень хранят ощущение возвращения, ещё до того, как снимешь пальто.', c1:'#8FA36A', c2:'#463A50' },
    { name:'Кедр',           nameEn:'CEDAR',       fam:'WOODY',        famRu:'ДЕРЕВО',     title:'Опора',                  en:'FOUNDATION',          body:'Под каждым домом есть основание. Кедр — это тишина, устойчивость и тёплое дерево под рукой.', c1:'#CFA070', c2:'#6E4A2C' },
    { name:'Пачули',         nameEn:'PATCHOULI',   fam:'EARTHY',       famRu:'ЗЕМЛЯ',      title:'Глубина',                en:'DEPTH',               body:'Пачули заземляет и держит глубину: тёмная тёплая основа, на которой стоит всё остальное.', img:'images/nota-pachuli.png', c1:'#8A7A5C', c2:'#3A2E22' },
    { name:'Нероли',         nameEn:'NEROLI',      fam:'WHITE FLORAL', famRu:'БЕЛЫЕ ЦВЕТЫ', title:'Свет в комнате',        en:'LIGHT IN THE ROOM',   body:'Белые цветы работают как окно: впускают воздух и свет даже там, где окон нет.', c1:'#FBEFCF', c2:'#E7C777' },
    { name:'Грейпфрут',      nameEn:'GRAPEFRUIT',  fam:'CITRUS',       famRu:'ЦИТРУС',     title:'Перезагрузка',           en:'RESET',               body:'Один вдох — и пространство обнуляется. Грейпфрут стирает вчерашний день из воздуха.', c1:'#FF9E7A', c2:'#E64F6B' },
    { name:'Пион',           nameEn:'PEONY',       fam:'FLORAL',       famRu:'ЦВЕТЫ',      title:'Мягкая власть',          en:'SOFT CONTROL',        body:'Контроль — это не жёсткость. Пион показывает, что управлять настроением комнаты можно нежно.', img:'images/nota-pion.png', c1:'#FFB6D3', c2:'#E45AA0' },
    { name:'Ирис',           nameEn:'IRIS',        fam:'POWDERY',      famRu:'ПУДРА',      title:'У тишины есть текстура', en:'SILENCE HAS TEXTURE', body:'Пудровый ирис — это пауза, оформленная в аромат. Ничего лишнего, только тон.', c1:'#C9BCD6', c2:'#7C6C95' },
    { name:'Смородина',      nameEn:'CASSIS',      fam:'FRUITY',       famRu:'ФРУКТЫ',     title:'Характер',               en:'CHARACTER',           body:'Дом не обязан быть удобным для всех. Чёрная смородина — терпкая честность вкуса.', c1:'#9A5CA8', c2:'#3E2247' },
    { name:'Розовый перец',  nameEn:'PINK PEPPER', fam:'SPICY',        famRu:'СПЕЦИИ',     title:'Искра',                  en:'THE SPARK',           body:'Розовый перец — первый импульс. Лёгкое покалывание, которое будит внимание.', img:'images/nota-rozovyy-perets.png', c1:'#F4A98C', c2:'#C0442E' },
    { name:'Ветивер',        nameEn:'VETIVER',     fam:'EARTHY',       famRu:'ЗЕМЛЯ',      title:'Заземление',             en:'GROUNDING',           body:'Ветивер возвращает к телу и к полу под ногами. Корень, а не облако.', c1:'#9AA36B', c2:'#4F5A2C' },
    { name:'Личи',           nameEn:'LYCHEE',      fam:'FRUITY',       famRu:'ФРУКТЫ',     title:'Радость без причины',    en:'JOY, NO REASON',      body:'Личи — это лёгкая дерзость. Дом имеет полное право быть несерьёзным.', c1:'#FFC2C6', c2:'#F26D8B' },
    { name:'Жасмин',         nameEn:'JASMINE',     fam:'WHITE FLORAL', famRu:'БЕЛЫЕ ЦВЕТЫ', title:'Ночной режим',          en:'NIGHT MODE',          body:'Жасмин раскрывается в темноте. Дом переходит в тихий режим вместе с вами.', c1:'#FBF3C2', c2:'#DDCB7E' }
  ];

  var pad = function (n) { return String(n).padStart(2, '0'); };
  var media = function (d) {
    var g = 'linear-gradient(150deg,' + d.c1 + ',' + d.c2 + ')';
    if (d.img) return "url('" + d.img + "') center/contain no-repeat";   // contain = фото видно ЦЕЛИКОМ, без обрезки (одинарные кавычки не рвут style="")
    return 'radial-gradient(120% 88% at 28% 16%, rgba(255,255,255,.30), rgba(255,255,255,0) 56%), ' + g;
  };

  var cells = [];
  var active = -1;

  data.forEach(function (d, i) {
    var num = pad(i + 1);
    var cell = document.createElement('div');
    cell.className = 'philo-cell';
    cell.setAttribute('role', 'button');
    cell.setAttribute('tabindex', '0');
    cell.setAttribute('aria-label', d.name + ' — ' + d.title);
    cell.innerHTML =
      '<div class="philo-cell-num">(<span class="d d1">' + num[0] + '</span><span class="d d2">' + num[1] + '</span>)</div>' +
      '<div class="philo-cell-square">' +
        '<div class="philo-cell-media" style="background:' + media(d) + '"></div>' +
        '<span class="philo-cell-name">' + d.name + '</span>' +
      '</div>';
    var set = function () { setActive(i); };
    cell.addEventListener('mouseenter', set);
    cell.addEventListener('focus', set);
    cell.addEventListener('click', set);
    cell.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(); }
    });
    gridEl.appendChild(cell);
    cells.push(cell);
  });

  function setActive(i) {
    if (i === active) return;
    if (active > -1) cells[active].classList.remove('is-active');
    active = i;
    cells[active].classList.add('is-active');
    var d = data[i];
    panelEl.innerHTML =
      '<div class="philo-note-card">' +
        '<div class="philo-note-kick">NOTE ' + pad(i + 1) + ' — ' + d.fam + ' · ' + d.famRu + '</div>' +
        '<div class="philo-note-name"><b>' + d.name + '</b><i>' + d.nameEn + '</i></div>' +
        '<div class="philo-note-rule"></div>' +
        '<h3 class="philo-note-title">' + d.title + '</h3>' +
        '<div class="philo-note-en">' + d.en + '</div>' +
        '<p class="philo-note-text">' + d.body + '</p>' +
      '</div>';
  }

  setActive(0);

  /* периодическая анимация «падающих» цифр */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    var reels = cells.map(function () { return { cool: 0 }; });
    setInterval(function () {
      var playing = 0;
      reels.forEach(function (r, i) {
        if (r.cool > 0) { r.cool -= 1; if (r.cool === 0) cells[i].classList.remove('is-drop'); else playing++; }
      });
      var guard = 0;
      while (playing < 4 && Math.random() < 0.5 && guard++ < 15) {
        var idle = [];
        reels.forEach(function (r, i) { if (r.cool === 0) idle.push(i); });
        if (!idle.length) break;
        var p = idle[Math.floor(Math.random() * idle.length)];
        reels[p].cool = 2;
        cells[p].classList.remove('is-drop');
        void cells[p].offsetWidth;
        cells[p].classList.add('is-drop');
        playing++;
      }
    }, 320);
  }
})();
