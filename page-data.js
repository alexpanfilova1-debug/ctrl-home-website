(function () {
  var PRODUCTS = {
    1: {
      name: 'CTRL № 1 — Рассвет', price: 6900, note: 'бергамот · нероли · белый чай', img: 'images/aromat-1.png',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '6–8 ч', article: 'CTL-01', badge: 'NEW',
      desc: 'Лёгкий цитрусовый старт: бергамот и нероли по утренней прохладе, мягкий белый чай в основе. Аромат «включить день» — собраться и проснуться без лишнего шума.',
      volumes: [ { ml: 30, price: 4300 }, { ml: 50, price: 6900 }, { ml: 100, price: 11400 } ],
      gallery: ['images/aromat-1.png']
    },
    2: {
      name: 'CTRL № 2 — Полдень', price: 7400, note: 'инжир · кедр · морская соль', img: 'images/aromat-2.png',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '6–8 ч', article: 'CTL-02', badge: '',
      desc: 'Инжир и кедр с солёной свежестью — собранный рабочий аромат в самый разгар дня. Держит фокус и не перетягивает внимание на себя.',
      volumes: [ { ml: 30, price: 4600 }, { ml: 50, price: 7400 }, { ml: 100, price: 12200 } ],
      gallery: ['images/aromat-2.png']
    },
    3: {
      name: 'CTRL № 3 — Сумерки', price: 8200, note: 'ирис · сандал · амбра', img: 'images/aromat-3.png',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '8–10 ч', article: 'CTL-03', badge: '',
      desc: 'Ирис, сандал и амбра — тёплый, чуть дымный переход в вечер. Для момента, когда дела закрыты и можно наконец выдохнуть.',
      volumes: [ { ml: 30, price: 5100 }, { ml: 50, price: 8200 }, { ml: 100, price: 13500 } ],
      gallery: ['images/aromat-3.png']
    },
    4: {
      name: 'CTRL № 4 — Полночь', price: 9100, note: 'уд · ваниль · чёрный перец', img: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=900&q=75&auto=format&fit=crop',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '10–12 ч', article: 'CTL-04', badge: 'NEW',
      desc: 'Уд, ваниль и чёрный перец: плотный вечерний шлейф с характером. Для свиданий, выходов и уверенного входа в комнату.',
      volumes: [ { ml: 30, price: 5700 }, { ml: 50, price: 9100 }, { ml: 100, price: 15000 } ],
      gallery: ['https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=900&q=75&auto=format&fit=crop']
    }
  };
  // Доступ к товарам со страницы товара (product.html)
  window.CTRL_PRODUCTS = PRODUCTS;

  var PAGES = {
    novinki: {
      kicker: 'Новинки',
      title: 'Новые запуски <em>CTRL home</em>',
      lead: 'Свежие ароматы, лимитированные форматы и первые партии, которые стоит смотреть раньше, чем они уйдут в общий каталог.',
      tags: ['новые форматы', 'лимитированные партии', 'сезонные сочетания'],
      cards: [
        { title: 'Эра розы', text: 'Цветочный старт коллекции: чистая роза без нафталина и театральной пыли.', img: 'images/aromat-1.png', href: 'parfumeriya.html' },
        { title: 'Сахарный вихрь', text: 'Спрей для тела с мягкой сладостью, когда хочется легкого облака, а не парфюмерного заявления.', img: 'images/aromat-2.png', href: 'sprei-dlya-tela.html' },
        { title: 'Взбитые сливки', text: 'Уходовая текстура и уютный аромат для вечернего ритуала после длинного дня.', img: 'images/aromat-3.png', href: 'uhod-za-telom.html' }
      ],
      splitTitle: 'Как развивать раздел дальше',
      splitText: 'Когда появятся реальные SKU, сюда логично добавить дату запуска, бейдж “скоро”, количество в наличии и быстрый сбор waitlist.',
      list: [
        ['Первый экран', 'Новинки должны продавать ощущение свежего запуска, а не просто повторять каталог.'],
        ['Карточки', 'Для каждого товара стоит добавить статус: новый, скоро, лимитка или вернулся в продажу.'],
        ['Конверсия', 'Хорошая следующая кнопка — “Сообщить о запуске”, если товара еще нет.']
      ],
      cta: ['Смотреть каталог', 'catalog.html']
    },
    parfumeriya: {
      kicker: 'Парфюмерия',
      title: 'Парфюмерия <em>настроения</em>',
      lead: 'Основная линейка CTRL home: ароматы как переключатели состояния — от чистого утра до глубокого вечернего шлейфа.',
      tags: ['30 мл', '10 мл', 'пробники', 'наборы'],
      cards: [
        { title: 'Фруктовые и цветочные', text: 'Легкие, понятные, но не плоские композиции для дневного звучания.', img: 'images/aromat-1.png', href: 'catalog.html' },
        { title: 'Сладкие и теплые', text: 'Ваниль, карамель, мед и мягкие гурманские ноты без липкой перегрузки.', img: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Чистота и комфорт', text: 'Белый мускус, хлопок, чай и свежесть — когда нужно звучать спокойно.', img: 'images/aromat-3.png', href: 'catalog.html' }
      ],
      splitTitle: 'Смысл раздела',
      splitText: 'Парфюмерия должна быть главным продающим разделом: здесь нужен фильтр по настроению, стойкости, нотам и формату.',
      list: [
        ['По настроению', 'утро, день, вечер, шлейф'],
        ['По нотам', 'цитрус, цветы, древесные, гурманика, мускус'],
        ['По формату', 'полный флакон, миниатюра, пробник, набор']
      ],
      cta: ['Перейти в общий каталог', 'catalog.html']
    },
    sprei: {
      kicker: 'Спреи для тела',
      title: 'Легкие спреи <em>для тела</em>',
      lead: 'Ароматы для быстрых ежедневных сценариев: после душа, перед выходом, в сумку, в спортзал, в жизнь без лишней драмы.',
      tags: ['50 мл', '100 мл', 'бандлы', 'после душа', 'в сумку'],
      cards: [
        { title: 'Сахарный вихрь', text: 'Сладкий, мягкий, воздушный. Не спорит с парфюмом, если хочется наслаивания.', img: 'images/aromat-2.png', href: 'catalog.html' },
        { title: 'Фруктовый коктейль', text: 'Более яркий дневной сценарий: сочность, чистота и настроение отпуска.', img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Солнечный загар', text: 'Теплый телесный аромат для лета, кожи и белой рубашки.', img: 'https://images.unsplash.com/photo-1592842232655-e5d345cbc2d0?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' }
      ],
      splitTitle: 'Что важно покупателю',
      splitText: 'Спрей покупают за легкость. Тут лучше не обещать стойкость парфюма, а честно продавать частоту использования и комфорт.',
      list: [
        ['Наслаивание', 'Покажи, с какими духами спрей сочетается.'],
        ['Сценарии', 'После душа, перед сном, после тренировки, в поездку.'],
        ['По типу', '50 мл, 100 мл и бандлы должны быть видны сразу.']
      ],
      cta: ['Смотреть ароматы', 'catalog.html']
    },
    super: {
      kicker: 'Супер-ароматы',
      title: 'Супер-ароматы <em>с характером</em>',
      lead: 'Раздел для более ярких композиций: плотнее, заметнее, смелее. Не для всех — и в этом как раз смысл.',
      tags: ['яркий шлейф', 'вечер', 'акцент', 'лимитки'],
      cards: [
        { title: 'Полночь', text: 'Уд, ваниль и черный перец: теплый шлейф для вечера и уверенного входа.', img: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Ванильный порок', text: 'Гурманская сладость, которую нужно держать в балансе, а не лить ведром.', img: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Медовый люкс', text: 'Теплый медовый профиль для тех, кто хочет звучать дороже, чем “просто сладко”.', img: 'images/aromat-3.png', href: 'catalog.html' }
      ],
      splitTitle: 'Позиционирование',
      splitText: 'Эти продукты лучше продавать через характер и повод: вечер, свидание, мероприятие, образ, подарок.',
      list: [
        ['Не всем', 'Это нормально. Разделу нужна более смелая подача.'],
        ['Сильный текст', 'Тут работают названия, описания и визуальная драматургия.'],
        ['Пробники', 'Для ярких ароматов пробник снижает страх покупки.']
      ],
      cta: ['Подобрать аромат', 'catalog.html']
    },
    uhod: {
      kicker: 'Уход за телом',
      title: 'Уход с ароматом <em>CTRL home</em>',
      lead: 'Текстуры для ежедневного ритуала: кремы, бальзамы и масла, которые поддерживают ароматную линию бренда.',
      tags: ['кремы', 'бальзам-масло', 'после душа', 'наборы'],
      cards: [
        { title: 'Взбитые сливки', text: 'Мягкая текстура и сливочный аромат для ухода без ощущения тяжести.', img: 'images/aromat-3.png', href: 'catalog.html' },
        { title: 'Коко-шайн', text: 'Теплый кокосовый профиль: отпуск, кожа, сияние, но без пляжного клише.', img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Бережная забота', text: 'Нейтральный уходовый продукт для тех, кому важна текстура и спокойствие.', img: 'images/aromat-1.png', href: 'catalog.html' }
      ],
      splitTitle: 'Логика раздела',
      splitText: 'Уход стоит связывать с парфюмерией: “сначала крем, потом аромат” — это повышает средний чек без ощущения навязчивой продажи.',
      list: [
        ['Ритуал', 'Покажи порядок использования.'],
        ['Слои аромата', 'Добавь блок “сочетается с”.'],
        ['Наборы', 'Собери пары: уход + парфюм + мини.']
      ],
      cta: ['Собрать набор', 'sobrat-nabor.html']
    },
    svechi: {
      kicker: 'Свечи',
      title: 'Все свечи <em>CTRL home</em>',
      lead: 'Свечи для пространства, настроения и маленьких личных ритуалов: от мягкой перезагрузки до сезонных лимитированных запусков.',
      tags: ['основная коллекция', 'лимитки', 'мини 6 oz', 'классика 8.5 oz', 'подарочные наборы'],
      cards: [
        { title: 'Мгновенная перезагрузка', text: 'Основная свеча для быстрого переключения атмосферы: зажгла — и комната уже не спорит с нервной системой.', img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Сладкий дым', text: 'Теплый, плотный, чуть соблазнительный профиль для вечера и режима “я сегодня не объясняюсь”.', img: 'https://images.unsplash.com/photo-1602874801006-e26e8be3e8f4?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Вне сети', text: 'Свеча для паузы без уведомлений, лишнего шума и попыток мира срочно что-то от вас получить.', img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' }
      ],
      splitTitle: 'Коллекция свечей',
      splitText: 'Раздел лучше держать не просто списком товаров, а системой выбора: основная линейка, сезонные лимитки и форматы под разные сценарии покупки.',
      list: [
        ['Основная коллекция', 'Мгновенная перезагрузка, Сладкий дым, Вне сети, Тихий лес, Ветер в комнате.'],
        ['Сезонные и лимитированные', 'Утро после хаоса, Исцели пространство, До обещаний, Момент “да”, Побег к морю, Маленькая слабость, Большой флирт, Секретный ритуал.'],
        ['Форматы', 'Мини-свечи 6 oz, классические свечи 8.5 oz, большие свечи 50 oz, наборы мини-свечей, подарочные наборы.']
      ],
      cta: ['Смотреть каталог', 'catalog.html']
    },
    stirka: {
      kicker: 'Для стирки',
      title: 'Всё для <em>стирки</em>',
      lead: 'Средства, наборы и арома-усилители для белья, шкафа и дома под контролем: чисто, свежо, спокойно, без бытового хаоса.',
      tags: ['стартовые наборы', 'гели для стирки', 'арома-усилители', 'свежий шкаф', 'дом под контролем'],
      cards: [
        { title: 'Первый ритуал чистоты', text: 'Стартовый набор для знакомства с линейкой: всё нужное, чтобы бельё и шкаф начали звучать как CTRL home.', img: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Тихая роскошь', text: 'Гель или усилитель с чистым, дорогим и спокойным ощущением. Без крика, но с характером.', img: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'После дождя', text: 'Свежий профиль для повседневной стирки: воздух, ткань, чистота и ощущение открытого окна.', img: 'images/aromat-1.png', href: 'catalog.html' }
      ],
      splitTitle: 'Линейка для стирки',
      splitText: 'Раздел лучше строить как понятный бытовой ритуал: сначала наборы, потом средства для регулярной стирки, затем усилители аромата для тех, кто хочет больше шлейфа на ткани.',
      list: [
        ['Стартовые наборы', 'Первый ритуал чистоты, Набор “Дом под контролем”, Стирка без хаоса, Чистый старт, Набор для свежего шкафа, Средство для стирки + усилитель аромата.'],
        ['Гели / средства', 'Тихая роскошь, Фирменная стирка, После дождя, Сладкий дым, Кислая эстетика, Ночной ритм.'],
        ['Арома-усилители', 'Тихая роскошь, Фирменный цикл, После дождя, Сладкий дым, Кислая эстетика, Ночной ритм.']
      ],
      cta: ['Перейти в каталог', 'catalog.html']
    },
    merch: {
      kicker: 'Мерч и аксессуары',
      title: 'Мерч, который <em>не стыдно носить</em>',
      lead: 'Аксессуары бренда: косметички, мини-флаконы, travel-атомайзеры и вещи, которые поддерживают ритуал, а не просто несут логотип.',
      tags: ['атомайзеры', 'косметички', 'travel', 'подарки'],
      cards: [
        { title: 'Travel-атомайзер', text: 'Формат для сумки и поездок: удобно брать любимый аромат без большого флакона.', img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Косметичка CTRL', text: 'Спокойный аксессуар для ухода, миниатюр и пробников.', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Подарочный мешочек', text: 'Деталь, которая делает покупку более подарочной без лишней упаковочной суеты.', img: 'images/aromat-2.png', href: 'catalog.html' }
      ],
      splitTitle: 'Зачем разделу жить',
      splitText: 'Мерч должен помогать продаже основного продукта: хранение, travel, подарочная упаковка, наборы.',
      list: [
        ['Не плодить сувенирку', 'Лучше меньше, но функциональнее.'],
        ['Повышать чек', 'Добавлять аксессуар к набору.'],
        ['Поддерживать бренд', 'Вещи должны выглядеть как CTRL home, а не как случайный принт.']
      ],
      cta: ['Собрать набор', 'sobrat-nabor.html']
    },
    gift: {
      kicker: 'Подарочные карты',
      title: 'Подарочная карта <em>без угадайки</em>',
      lead: 'Когда хочется подарить аромат, но не хочется играть в экстрасенса. Карта дает выбор, а бренд оставляет впечатление.',
      tags: ['электронная карта', 'подарок', 'любой номинал', 'быстро'],
      cards: [
        { title: 'Для знакомства', text: 'Небольшой номинал для пробников, миниатюр или первого аромата.', img: 'images/aromat-1.png', href: 'catalog.html' },
        { title: 'Для набора', text: 'Средний номинал, чтобы собрать персональный комплект.', img: 'images/aromat-2.png', href: 'sobrat-nabor.html' },
        { title: 'Для щедрого жеста', text: 'Когда подарок должен сказать “я подумал”, но без риска промахнуться с нотами.', img: 'images/aromat-3.png', href: 'catalog.html' }
      ],
      splitTitle: 'Что нужно доделать',
      splitText: 'Позже здесь понадобится выбор номинала, ввод email получателя, дата отправки и красивый preview открытки.',
      list: [
        ['Номиналы', '3 000, 5 000, 10 000 ₽ или произвольная сумма.'],
        ['Сообщение', 'Короткий текст от дарителя.'],
        ['Срок действия', 'Нужно прописать честно и заметно.']
      ],
      cta: ['Смотреть каталог', 'catalog.html']
    },
    sale: {
      kicker: 'Распродажа',
      title: 'Распродажа <em>без ощущения склада</em>',
      lead: 'Скидки, последние экземпляры, сезонные наборы и продукты, которые уходят из линейки.',
      tags: ['последние штуки', 'сезонные наборы', 'минус процент', 'лимитки'],
      cards: [
        { title: 'Последний шанс', text: 'Товары, которые скоро уйдут из продажи или меняют формат.', img: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Сет недели', text: 'Готовые сочетания по более мягкой цене.', img: 'images/aromat-2.png', href: 'sobrat-nabor.html' },
        { title: 'Пробники', text: 'Хороший способ познакомить нового покупателя с брендом без большого входного чека.', img: 'images/aromat-1.png', href: 'catalog.html' }
      ],
      splitTitle: 'Тон раздела',
      splitText: 'Распродажа не должна выглядеть как “нам надо срочно избавиться”. Лучше: редкие предложения, последние партии, сезонная ротация.',
      list: [
        ['Срок', 'Добавить дедлайн акции.'],
        ['Остаток', 'Показывать “осталось мало”, если это правда.'],
        ['Наборы', 'Скидки лучше работают на комплекты.']
      ],
      cta: ['Выбрать аромат', 'catalog.html']
    },
    delivery: {
      kicker: 'Доставка и возврат',
      title: 'Доставка, оплата <em>и возврат</em>',
      lead: 'Служебная страница, которая должна отвечать на скучные, но важные вопросы до того, как они сорвут покупку.',
      tags: ['доставка', 'оплата', 'возврат', 'поддержка'],
      cards: [
        { title: 'Доставка', text: 'Курьером или в пункт выдачи. Сроки и стоимость лучше привязать к городу на следующем этапе.', img: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=900&q=75&auto=format&fit=crop', href: 'catalog.html' },
        { title: 'Оплата', text: 'Банковской картой на сайте. Позже можно добавить оплату частями или подарочные карты.', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=75&auto=format&fit=crop', href: 'podarochnye-karty.html' },
        { title: 'Возврат', text: 'Косметику и парфюмерию важно описывать аккуратно: правила зависят от состояния товара и упаковки.', img: 'images/aromat-3.png', href: 'kachestvo.html' }
      ],
      splitTitle: 'Что обязательно уточнить',
      splitText: 'Перед публикацией юридическую часть лучше привести к реальным условиям бизнеса: сроки, регионы, правила возврата, контакты поддержки.',
      list: [
        ['Сроки', 'Москва, регионы, самовывоз, пункты выдачи.'],
        ['Стоимость', 'Порог бесплатной доставки.'],
        ['Поддержка', 'Email, Telegram или форма обращения.']
      ],
      cta: ['Вернуться к покупкам', 'catalog.html']
    },
    account: {
      kicker: 'Аккаунт',
      title: 'Личный кабинет <em>CTRL home</em>',
      lead: 'Будущая зона клиента: заказы, избранное, бонусы, адреса и быстрый повтор любимого аромата.',
      tags: ['заказы', 'избранное', 'бонусы', 'адреса'],
      cards: [
        { title: 'История заказов', text: 'Покупатель должен быстро найти, что уже брал, и повторить заказ.', img: 'images/aromat-1.png', href: 'catalog.html' },
        { title: 'Избранное', text: 'Сохраненные ароматы, пробники и наборы для будущей покупки.', img: 'images/aromat-2.png', href: 'catalog.html' },
        { title: 'Бонусы', text: 'Логика клуба: баллы, ранний доступ к новинкам, закрытые предложения.', img: 'images/aromat-3.png', href: 'soobshestvo.html' }
      ],
      splitTitle: 'Пока без авторизации',
      splitText: 'Для статичного сайта честнее показать будущий сценарий, чем имитировать вход. Когда появится бэкенд, сюда можно подключать форму и реальные данные.',
      list: [
        ['MVP', 'Email-вход и список заказов.'],
        ['Следующий слой', 'Избранное и повтор покупки.'],
        ['Клуб', 'Бонусы и ранний доступ к запускам.']
      ],
      cta: ['Вступить в сообщество', 'soobshestvo.html']
    }
  };

  var root = document.querySelector('[data-page]');
  if (!root) return;
  var SAMPLE_PACK_KEY = 'ctrlHomeSamplePacks';

  function money(n) {
    return n.toLocaleString('ru-RU') + ' ₽';
  }

  function readCart() {
    try { return JSON.parse(localStorage.getItem('ctrlHomeCart') || '[]'); }
    catch (e) { return []; }
  }

  function writeCart(items) {
    try { localStorage.setItem('ctrlHomeCart', JSON.stringify(items)); }
    catch (e) {}
  }

  function readBundles() {
    try { return JSON.parse(localStorage.getItem(SAMPLE_PACK_KEY) || '[]'); }
    catch (e) { return []; }
  }

  function writeBundles(items) {
    try { localStorage.setItem(SAMPLE_PACK_KEY, JSON.stringify(items)); }
    catch (e) {}
  }

  function syncCartCount() {
    var count = document.getElementById('cartCount');
    if (count) count.textContent = readCart().length + readBundles().length;
  }

  function renderCommon(page) {
    var tags = page.tags.map(function (tag) { return '<span>' + tag + '</span>'; }).join('');
    var cards = page.cards.map(function (card, i) {
      return '<article class="page-card reveal" data-delay="' + Math.min(i, 3) + '">' +
        '<a class="page-card-media" href="' + card.href + '">' +
          '<img src="' + card.img + '" alt="' + card.title + '" loading="lazy" onerror="this.src=\'https://picsum.photos/seed/ctrl-page-' + i + '/900/700\'">' +
        '</a>' +
        '<div class="page-card-body">' +
          '<h3>' + card.title + '</h3>' +
          '<p>' + card.text + '</p>' +
          '<a href="' + card.href + '">Открыть</a>' +
        '</div>' +
      '</article>';
    }).join('');
    var items = page.list.map(function (item) {
      return '<li><strong>' + item[0] + '</strong>' + item[1] + '</li>';
    }).join('');

    root.innerHTML =
      '<div class="philosophy-label">' + page.kicker + '</div>' +
      '<h1 class="section-title">' + page.title + '</h1>' +
      '<p class="page-lead">' + page.lead + '</p>' +
      '<div class="page-tags reveal" data-delay="2">' + tags + '</div>' +
      '<div class="page-grid">' + cards + '</div>' +
      '<div class="page-split reveal" data-delay="1">' +
        '<div><h2>' + page.splitTitle + '</h2><p>' + page.splitText + '</p></div>' +
        '<ul class="page-list">' + items + '</ul>' +
      '</div>' +
      '<div class="page-actions reveal" data-delay="2">' +
        '<a class="btn" href="' + page.cta[1] + '">' + page.cta[0] + '</a>' +
      '</div>';
  }

  function renderCart() {
    var ids = readCart();
    var bundles = readBundles().filter(function (pack) { return pack && pack.scents && pack.scents.length; });
    var valid = ids.filter(function (id) { return PRODUCTS[id]; });
    var total = valid.reduce(function (sum, id) { return sum + PRODUCTS[id].price; }, 0) +
      bundles.reduce(function (sum, pack) { return sum + (Number(pack.price) || 0); }, 0);
    var rows = valid.map(function (id, i) {
      var p = PRODUCTS[id];
      return '<div class="cart-page-item">' +
        '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">' +
        '<div><div class="product-name">' + p.name + '</div><div class="product-note">' + p.note + '</div><div class="product-price">' + money(p.price) + '</div></div>' +
        '<button class="cart-page-remove" data-remove="' + i + '">Убрать</button>' +
      '</div>';
    }).join('') + bundles.map(function (pack, i) {
      return '<div class="cart-page-item cart-page-item--bundle">' +
        '<div class="cart-page-bundle-media">6</div>' +
        '<div><div class="product-name">' + (pack.title || 'Пробный набор CTRL home') + '</div>' +
          '<div class="product-note">' + pack.scents.join(' · ') + '</div>' +
          '<div class="product-price">' + money(Number(pack.price) || 0) + '</div></div>' +
        '<button class="cart-page-remove" data-remove-bundle="' + i + '">Убрать</button>' +
      '</div>';
    }).join('');

    root.innerHTML =
      '<div class="philosophy-label">Корзина</div>' +
      '<h1 class="section-title">Ваша <em>корзина</em></h1>' +
      '<p class="page-lead">Здесь собираются товары, добавленные с внутренних страниц. На главной корзина по-прежнему открывается выезжающей панелью.</p>' +
      (valid.length || bundles.length
        ? '<div class="cart-page-panel reveal" data-delay="2">' + rows + '<div class="cart-page-total"><span>Итого</span><span>' + money(total) + '</span></div></div>' +
          '<div class="page-actions reveal" data-delay="3"><a class="btn" href="catalog.html">Продолжить покупки</a><button class="btn" data-clear-cart>Очистить корзину</button></div>'
        : '<div class="cart-page-empty reveal" data-delay="2">Пока пусто. Красиво, но коммерчески бессмысленно.</div><div class="page-actions reveal" data-delay="3"><a class="btn" href="catalog.html">Выбрать аромат</a></div>');

    root.querySelectorAll('[data-remove]').forEach(function (button) {
      button.addEventListener('click', function () {
        var items = readCart();
        items.splice(Number(button.getAttribute('data-remove')), 1);
        writeCart(items);
        renderCart();
        initPage();
        syncCartCount();
      });
    });
    root.querySelectorAll('[data-remove-bundle]').forEach(function (button) {
      button.addEventListener('click', function () {
        var items = readBundles();
        items.splice(Number(button.getAttribute('data-remove-bundle')), 1);
        writeBundles(items);
        renderCart();
        initPage();
        syncCartCount();
      });
    });
    var clear = root.querySelector('[data-clear-cart]');
    if (clear) {
      clear.addEventListener('click', function () {
        writeCart([]);
        writeBundles([]);
        renderCart();
        initPage();
        syncCartCount();
      });
    }
  }

  function initPage() {
    var header = document.getElementById('header');
    if (header) {
      var toggleHeader = function () { header.classList.toggle('scrolled', window.scrollY > 40); };
      window.addEventListener('scroll', toggleHeader, { passive: true });
      toggleHeader();
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: .15 });
      document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
    }
  }

  var key = root.getAttribute('data-page');
  if (key === 'korzina') {
    renderCart();
  } else if (PAGES[key]) {
    renderCommon(PAGES[key]);
  }
  syncCartCount();
  initPage();
})();
