(function () {
  var PRODUCTS = {
    1: {
      name: 'CTRL № 1 — Рассвет', price: 6900, note: 'бергамот · нероли · белый чай', img: 'images/aromat-1.png',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '6–8 ч', article: 'CTL-01', badge: 'NEW', mood: 'focus', moodLabel: 'CTRL+FOCUS',
      desc: 'Лёгкий цитрусовый старт: бергамот и нероли по утренней прохладе, мягкий белый чай в основе. Аромат «включить день» — собраться и проснуться без лишнего шума.',
      volumes: [ { ml: 30, price: 4300 }, { ml: 50, price: 6900 }, { ml: 100, price: 11400 } ],
      gallery: ['images/aromat-1.png']
    },
    2: {
      name: 'CTRL № 2 — Полдень', price: 7400, note: 'инжир · кедр · морская соль', img: 'images/aromat-2.png',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '6–8 ч', article: 'CTL-02', badge: '', mood: 'energy', moodLabel: 'CTRL+ENERGY',
      desc: 'Инжир и кедр с солёной свежестью — собранный рабочий аромат в самый разгар дня. Держит фокус и не перетягивает внимание на себя.',
      volumes: [ { ml: 30, price: 4600 }, { ml: 50, price: 7400 }, { ml: 100, price: 12200 } ],
      gallery: ['images/aromat-2.png']
    },
    3: {
      name: 'CTRL № 3 — Сумерки', price: 8200, note: 'ирис · сандал · амбра', img: 'images/aromat-3.png',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '8–10 ч', article: 'CTL-03', badge: '', mood: 'calm', moodLabel: 'CTRL+CALM',
      desc: 'Ирис, сандал и амбра — тёплый, чуть дымный переход в вечер. Для момента, когда дела закрыты и можно наконец выдохнуть.',
      volumes: [ { ml: 30, price: 5100 }, { ml: 50, price: 8200 }, { ml: 100, price: 13500 } ],
      gallery: ['images/aromat-3.png']
    },
    4: {
      name: 'CTRL № 4 — Полночь', price: 9100, note: 'уд · ваниль · чёрный перец', img: 'images/aromat-4.png',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '10–12 ч', article: 'CTL-04', badge: 'NEW', mood: 'night', moodLabel: 'CTRL+NIGHT',
      desc: 'Уд, ваниль и чёрный перец: плотный вечерний шлейф с характером. Для свиданий, выходов и уверенного входа в комнату.',
      volumes: [ { ml: 30, price: 5700 }, { ml: 50, price: 9100 }, { ml: 100, price: 15000 } ],
      gallery: ['images/aromat-4.png']
    },
    5: {
      name: 'CTRL № 1 — Эра розы', price: 7900, note: 'малина · дамасская роза · пачули', img: 'images/aromat-1.png', href: 'era-rozy.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '8–10 ч', article: 'CTL-05', badge: 'NEW', mood: 'bloom', moodLabel: 'CTRL+BLOOM',
      desc: 'Дерзкая роза без пудры и нафталина: сочная малина и розовый перец на входе, живая дамасская роза в сердце, тёплые пачули и белый мускус в основе.',
      volumes: [ { ml: 10, price: 2200 }, { ml: 30, price: 4900 }, { ml: 50, price: 7900 } ],
      gallery: ['images/aromat-1.png', 'images/aromat-2.png', 'images/aromat-3.png', 'images/sample-vial-10ml.png']
    },

    /* ——— Парфюмерия: расширенная линейка (кастомные страницы, id 30–42; временные цены/фото-заглушки) ——— */
    30: {
      name: 'CTRL № 2 — Коко-шайн', price: 7200, note: 'кокос · тиаре · белый мускус', img: 'images/koko-shine-1.png', href: 'koko-shine.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '6–8 ч', article: 'CTL-06', badge: 'NEW', mood: 'energy', moodLabel: 'CTRL+GLOW',
      desc: 'Кокос, который сияет, а не пахнет пляжным маслом: прохладная кокосовая вода и бергамот сверху, солнечные тиаре и иланг-иланг в сердце, сливочная кокосово-мускусная база.',
      volumes: [ { ml: 10, price: 2100 }, { ml: 30, price: 4600 }, { ml: 50, price: 7200 } ],
      gallery: ['images/koko-shine-1.png', 'images/koko-shine-2.png', 'images/koko-shine-3.png']
    },
    31: {
      name: 'CTRL № 3 — Цитрусовая фантазия', price: 6900, note: 'лимон · нероли · кедр', img: 'images/citrusovaya-fantaziya-1.png', href: 'citrusovaya-fantaziya.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '5–7 ч', article: 'CTL-07', badge: '', mood: 'focus', moodLabel: 'CTRL+ZEST',
      desc: 'Газированная цитрусовая свежесть: сицилийский лимон и грейпфрут сверху, медовый нероли в сердце, лёгкая кедрово-мускусная база. Аромат «умытого» дня.',
      volumes: [ { ml: 10, price: 2000 }, { ml: 30, price: 4400 }, { ml: 50, price: 6900 } ],
      gallery: ['images/citrusovaya-fantaziya-1.png', 'images/citrusovaya-fantaziya-2.png', 'images/citrusovaya-fantaziya-3.png']
    },
    32: {
      name: 'CTRL № 4 — Тарт-деко', price: 8600, note: 'ревень · роза · пачули', img: 'images/tart-deko-1.png', href: 'tart-deko.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '8–10 ч', article: 'CTL-08', badge: 'NEW', mood: 'night', moodLabel: 'CTRL+CHIC',
      desc: 'Терпкий фруктовый шипр в стиле ар-деко: ревень и чёрная смородина сверху, прохладная роза и ирис в сердце, пачули и дубовый мох в основе. Строго и модно.',
      volumes: [ { ml: 10, price: 2500 }, { ml: 30, price: 5300 }, { ml: 50, price: 8600 } ],
      gallery: ['images/tart-deko-1.png', 'images/tart-deko-2.png', 'images/tart-deko-3.png']
    },
    33: {
      name: 'CTRL № 5 — Медовый люкс', price: 9200, note: 'мёд · жасмин · амбра', img: 'images/medovyy-lyuks-1.png', href: 'medovyy-lyuks.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '8–10 ч', article: 'CTL-09', badge: '', mood: 'calm', moodLabel: 'CTRL+LUXE',
      desc: 'Золотой медовый люкс: густой мёд и шафран сверху, роза и жасмин самбак в сердце, амбра с сандалом в основе. Звучит дороже, чем «просто сладко».',
      volumes: [ { ml: 10, price: 2600 }, { ml: 30, price: 5600 }, { ml: 50, price: 9200 } ],
      gallery: ['images/medovyy-lyuks-1.png', 'images/medovyy-lyuks-2.png', 'images/medovyy-lyuks-3.png']
    },
    34: {
      name: 'CTRL № 6 — Солнечный день', price: 6800, note: 'груша · фрезия · мускус', img: 'images/solnechnyy-den-1.png', href: 'solnechnyy-den.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '5–7 ч', article: 'CTL-10', badge: '', mood: 'focus', moodLabel: 'CTRL+SUN',
      desc: 'Аромат хорошего настроения: сочная груша и мандарин сверху, воздушные фрезия и пион в сердце, чистый мускус в основе. Лёгкий, солнечный, на каждый день.',
      volumes: [ { ml: 10, price: 2000 }, { ml: 30, price: 4400 }, { ml: 50, price: 6800 } ],
      gallery: ['images/solnechnyy-den-1.png', 'images/solnechnyy-den-2.png', 'images/solnechnyy-den-3.png']
    },
    35: {
      name: 'CTRL № 7 — Ванильный порок', price: 8800, note: 'ваниль · гелиотроп · тонка', img: 'images/vanilnyy-porok-1.png', href: 'vanilnyy-porok.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '8–10 ч', article: 'CTL-11', badge: 'NEW', mood: 'night', moodLabel: 'CTRL+VICE',
      desc: 'Гурманская ваниль с характером: сочная груша и розовый перец сверху, кремовая ваниль и гелиотроп в сердце, тонка и бензоин в основе. Сладко, но в балансе.',
      volumes: [ { ml: 10, price: 2500 }, { ml: 30, price: 5400 }, { ml: 50, price: 8800 } ],
      gallery: ['images/vanilnyy-porok-1.png', 'images/vanilnyy-porok-2.png', 'images/vanilnyy-porok-3.png']
    },
    36: {
      name: 'CTRL № 8 — Горячая карамель', price: 7600, note: 'карамель · ирис · тонка', img: 'images/goryachaya-karamel-1.png', href: 'goryachaya-karamel.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '7–9 ч', article: 'CTL-12', badge: '', mood: 'night', moodLabel: 'CTRL+MELT',
      desc: 'Тягучая солёная карамель: карамель и апельсин сверху, пудровый ирис и кофе в сердце, тонка с ванилью в основе. Гурманика с горячим характером.',
      volumes: [ { ml: 10, price: 2200 }, { ml: 30, price: 4800 }, { ml: 50, price: 7600 } ],
      gallery: ['images/goryachaya-karamel-1.png', 'images/goryachaya-karamel-2.png', 'images/goryachaya-karamel-3.png']
    },
    37: {
      name: 'CTRL № 9 — Тёплый пряник', price: 7400, note: 'имбирь · корица · ваниль', img: 'images/teplyy-pryanik-1.png', href: 'teplyy-pryanik.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '7–9 ч', article: 'CTL-13', badge: '', mood: 'calm', moodLabel: 'CTRL+SPICE',
      desc: 'Аромат имбирного пряника: имбирь, корица и кардамон сверху, мёд и мускат в сердце, ваниль с тонка в основе. Тёплый, пряный, уютный.',
      volumes: [ { ml: 10, price: 2200 }, { ml: 30, price: 4700 }, { ml: 50, price: 7400 } ],
      gallery: ['images/teplyy-pryanik-1.png', 'images/teplyy-pryanik-2.png', 'images/teplyy-pryanik-3.png']
    },
    38: {
      name: 'CTRL № 10 — Сахарная дымка', price: 7000, note: 'сахарная вата · ирис · мускус', img: 'images/saharnaya-dymka-1.png', href: 'saharnaya-dymka.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '6–8 ч', article: 'CTL-14', badge: '', mood: 'bloom', moodLabel: 'CTRL+HAZE',
      desc: 'Пудрово-сахарное облако: сахарная вата и малина сверху, ирис и фиалка в сердце, белый мускус с ванилью в основе. Лёгкая сладкая дымка на каждый день.',
      volumes: [ { ml: 10, price: 2100 }, { ml: 30, price: 4500 }, { ml: 50, price: 7000 } ],
      gallery: ['images/saharnaya-dymka-1.png', 'images/saharnaya-dymka-2.png', 'images/saharnaya-dymka-3.png']
    },
    39: {
      name: 'CTRL № 11 — Медовый бархат', price: 8900, note: 'мёд · замша · сандал', img: 'images/medovyy-barhat-1.png', href: 'medovyy-barhat.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '8–10 ч', article: 'CTL-15', badge: '', mood: 'night', moodLabel: 'CTRL+VELVET',
      desc: 'Бархатный медовый аромат: тёмный мёд и слива сверху, роза и замша в сердце, сандал с амброй в основе. Плотный, тёплый, роскошный.',
      volumes: [ { ml: 10, price: 2600 }, { ml: 30, price: 5500 }, { ml: 50, price: 8900 } ],
      gallery: ['images/medovyy-barhat-1.png', 'images/medovyy-barhat-2.png', 'images/medovyy-barhat-3.png']
    },
    40: {
      name: 'CTRL № 12 — Чистый хлопок', price: 6600, note: 'хлопок · ландыш · мускус', img: 'images/chistyy-hlopok-1.png', href: 'chistyy-hlopok.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '5–7 ч', article: 'CTL-16', badge: '', mood: 'focus', moodLabel: 'CTRL+CLEAN',
      desc: 'Аромат свежего белья: альдегиды и бергамот сверху, ландыш и фрезия в сердце, хлопковый мускус в основе. Чисто, мягко, спокойно.',
      volumes: [ { ml: 10, price: 1900 }, { ml: 30, price: 4300 }, { ml: 50, price: 6600 } ],
      gallery: ['images/chistyy-hlopok-1.png', 'images/chistyy-hlopok-2.png', 'images/chistyy-hlopok-3.png']
    },
    41: {
      name: 'CTRL № 13 — Белый мускус', price: 7100, note: 'мускус · ирис · кашмеран', img: 'images/belyy-muskus-1.png', href: 'belyy-muskus.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '6–8 ч', article: 'CTL-17', badge: '', mood: 'calm', moodLabel: 'CTRL+SKIN',
      desc: 'Мускус как «вторая кожа»: бергамот и груша сверху, пудровый ирис в сердце, белый мускус с кашмераном в основе. Чистый, тёплый, обволакивающий.',
      volumes: [ { ml: 10, price: 2100 }, { ml: 30, price: 4600 }, { ml: 50, price: 7100 } ],
      gallery: ['images/belyy-muskus-1.png', 'images/belyy-muskus-2.png', 'images/belyy-muskus-3.png']
    },
    42: {
      name: 'CTRL № 14 — Свежее утро', price: 6700, note: 'мята · зелёный чай · мускус', img: 'images/svezhee-utro-1.png', href: 'svezhee-utro.html',
      type: 'Eau de Parfum', gender: 'унисекс', longevity: '5–7 ч', article: 'CTL-18', badge: 'NEW', mood: 'focus', moodLabel: 'CTRL+DAWN',
      desc: 'Аромат умытого утра: мята и лимон сверху, зелёный чай и фрезия в сердце, мускус с ветивером в основе. Свежо, ясно, бодро.',
      volumes: [ { ml: 10, price: 1900 }, { ml: 30, price: 4300 }, { ml: 50, price: 6700 } ],
      gallery: ['images/svezhee-utro-1.png', 'images/svezhee-utro-2.png', 'images/svezhee-utro-3.png']
    },

    /* ——— Свечи (имена из меню; временные цены-заглушки, реальные фото позже) ——— */
    11: {
      name: 'Мгновенная перезагрузка', price: 2900, note: 'нероли · белый чай · кедр', img: 'images/svecha-perezagruzka.png',
      type: 'Ароматическая свеча', article: 'CTL-C01', badge: '', mood: 'focus', moodLabel: 'CTRL+RESET',
      desc: 'Чистый свежий аромат для быстрого ресета: зажги — и комната выдыхает вместе с тобой. Нероли и белый чай сверху, мягкий кедр в основе.',
      gallery: ['images/svecha-perezagruzka.png']
    },
    12: {
      name: 'Сладкий дым', price: 3200, note: 'амбра · ваниль · пало-санто', img: 'images/svecha-sladkiy-dym.png',
      type: 'Ароматическая свеча', article: 'CTL-C02', badge: '', mood: 'night', moodLabel: 'CTRL+NIGHT',
      desc: 'Тёплый, чуть дымный профиль для вечера в режиме «я сегодня не объясняюсь». Амбра и ваниль с копчёным пало-санто.',
      gallery: ['images/svecha-sladkiy-dym.png']
    },
    13: {
      name: 'Вне сети', price: 2900, note: 'мох · ветивер · дымка', img: 'images/svecha-vne-seti.png',
      type: 'Ароматическая свеча', article: 'CTL-C03', badge: '', mood: 'calm', moodLabel: 'CTRL+OFF',
      desc: 'Свеча для паузы без уведомлений: влажный мох, сухой ветивер и лёгкая дымка. Тихий режим для головы.',
      gallery: ['images/svecha-vne-seti.png']
    },
    14: {
      name: 'Тихий лес', price: 3100, note: 'сосна · кедр · хвоя', img: 'images/svecha-tihiy-les.png',
      type: 'Ароматическая свеча', article: 'CTL-C04', badge: '', mood: 'energy', moodLabel: 'CTRL+FOREST',
      desc: 'Хвойный, смолистый, спокойный — как открытое окно в лес после душного дня. Сосна и кедр с прохладной хвоей.',
      gallery: ['images/svecha-tihiy-les.png']
    },
    15: {
      name: 'Ветер в комнате', price: 3400, note: 'хлопок · озон · белый мускус', img: 'images/svecha-veter.png',
      type: 'Ароматическая свеча', article: 'CTL-C05', badge: '', mood: 'focus', moodLabel: 'CTRL+AIR',
      desc: 'Воздушный аромат «только что проветрили»: чистый хлопок, озон и белый мускус. Лёгкость без отдушечной приторности.',
      gallery: ['images/svecha-veter.png']
    },

    /* ——— Спреи для тела (имена из меню; объёмы 50/100 мл, временные цены) ——— */
    21: {
      name: 'Сахарный вихрь', price: 1700, note: 'сахарная вата · мускус', img: 'images/sprei-saharnyy-vihr.png',
      type: 'Спрей для тела', gender: 'унисекс', longevity: '4–6 ч', article: 'CTL-S01', badge: '', mood: 'energy', moodLabel: 'CTRL+SWEET',
      desc: 'Сладкое облако сахарной ваты с мягким мускусом. Лёгкий шлейф, который не спорит с парфюмом — можно слоями.',
      volumes: [ { ml: 50, price: 1700 }, { ml: 100, price: 2400 } ],
      gallery: ['images/sprei-saharnyy-vihr.png']
    },
    22: {
      name: 'Карамельный хруст', price: 1700, note: 'карамель · вафля · ваниль', img: 'images/sprei-karamelnyy-hrust.png',
      type: 'Спрей для тела', gender: 'унисекс', longevity: '4–6 ч', article: 'CTL-S02', badge: '', mood: 'night', moodLabel: 'CTRL+CARAMEL',
      desc: 'Карамельная вафля с ванилью — гурманский, но воздушный. Дневной сценарий «вкусно, но не приторно».',
      volumes: [ { ml: 50, price: 1700 }, { ml: 100, price: 2400 } ],
      gallery: ['images/sprei-karamelnyy-hrust.png']
    },
    23: {
      name: 'Взбитые сливки', price: 1800, note: 'крем · ваниль · миндаль', img: 'images/sprei-vzbitye-slivki.png',
      type: 'Спрей для тела', gender: 'унисекс', longevity: '4–6 ч', article: 'CTL-S03', badge: '', mood: 'calm', moodLabel: 'CTRL+CREAM',
      desc: 'Кремовый профиль: взбитая ваниль и миндаль. Уютное облако после душа и перед выходом.',
      volumes: [ { ml: 50, price: 1800 }, { ml: 100, price: 2500 } ],
      gallery: ['images/sprei-vzbitye-slivki.png']
    },
    24: {
      name: 'Лесной орех', price: 1700, note: 'фундук · какао · молоко', img: 'images/sprei-lesnoy-oreh.png',
      type: 'Спрей для тела', gender: 'унисекс', longevity: '4–6 ч', article: 'CTL-S04', badge: '', mood: 'focus', moodLabel: 'CTRL+NUTTY',
      desc: 'Тёплый ореховый аромат: фундук, какао и молоко. Мягкий, обволакивающий, чуть десертный.',
      volumes: [ { ml: 50, price: 1700 }, { ml: 100, price: 2400 } ],
      gallery: ['images/sprei-lesnoy-oreh.png']
    },
    25: {
      name: 'Фруктовый коктейль', price: 1900, note: 'манго · маракуйя · цитрус', img: 'images/sprei-fruktovyy-kokteyl.png',
      type: 'Спрей для тела', gender: 'унисекс', longevity: '4–6 ч', article: 'CTL-S05', badge: '', mood: 'energy', moodLabel: 'CTRL+FRESH',
      desc: 'Сочный фруктовый коктейль: манго, маракуйя и цитрус. Настроение отпуска в один пшик.',
      volumes: [ { ml: 50, price: 1900 }, { ml: 100, price: 2600 } ],
      gallery: ['images/sprei-fruktovyy-kokteyl.png']
    },
    26: {
      name: 'Солнечный загар', price: 1900, note: 'кокос · монои · ваниль', img: 'images/sprei-solnechnyy-zagar.png',
      type: 'Спрей для тела', gender: 'унисекс', longevity: '4–6 ч', article: 'CTL-S06', badge: '', mood: 'focus', moodLabel: 'CTRL+SUN',
      desc: 'Тёплый телесный аромат лета: кокос и монои с ванилью. Загар, белая рубашка, солнце на коже.',
      volumes: [ { ml: 50, price: 1900 }, { ml: 100, price: 2600 } ],
      gallery: ['images/sprei-solnechnyy-zagar.png']
    },
    27: {
      name: 'Ягодный стиль', price: 1800, note: 'малина · смородина · роза', img: 'images/sprei-yagodnyy-stil.png',
      type: 'Спрей для тела', gender: 'унисекс', longevity: '4–6 ч', article: 'CTL-S07', badge: '', mood: 'night', moodLabel: 'CTRL+BERRY',
      desc: 'Ягодный микс с розой: малина и чёрная смородина, чуть дерзко и стильно. Яркий дневной акцент.',
      volumes: [ { ml: 50, price: 1800 }, { ml: 100, price: 2500 } ],
      gallery: ['images/sprei-yagodnyy-stil.png']
    }
  };
  // Доступ к товарам со страницы товара (product.html)
  window.CTRL_PRODUCTS = PRODUCTS;

  var PAGES = {
    catalog: {
      kicker: 'Каталог',
      title: 'Все <em>ароматы</em>',
      sections: [
        { key: 'parfumeriya', label: 'Парфюмерия', href: 'parfumeriya.html', kind: 'bottle', ids: [5, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42] },
        { key: 'svechi', label: 'Свечи', href: 'svechi.html', kind: 'candle', ids: [11, 12, 13, 14, 15] },
        { key: 'sprei', label: 'Спреи для тела', href: 'sprei-dlya-tela.html', kind: 'spray', ids: [21, 22, 23, 24, 25, 26, 27] }
      ]
    },
    novinki: {
      kicker: 'Новинки',
      title: 'Новые запуски <em>CTRL home</em>',
      lead: 'Свежие ароматы и первые партии — раньше, чем они разойдутся по общему каталогу.',
      tags: ['NEW', 'первые партии', 'лимитки'],
      shelf: [5, 30, 32, 35, 42]
    },
    parfumeriya: {
      kicker: 'Парфюмерия',
      title: 'Парфюмерия <em>настроения</em>',
      lead: 'Основная линейка CTRL home: ароматы как переключатели состояния — от чистого утра до глубокого вечернего шлейфа.',
      tags: ['30 мл', '10 мл', 'пробники', 'наборы'],
      shelf: [5, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42]
    },
    sprei: {
      kicker: 'Спреи для тела',
      title: 'Легкие спреи <em>для тела</em>',
      lead: 'Ароматы для быстрых ежедневных сценариев: после душа, перед выходом, в сумку, в спортзал, в жизнь без лишней драмы.',
      tags: ['50 мл', '100 мл', 'бандлы', 'после душа', 'в сумку'],
      shelf: [21, 22, 23, 24, 25, 26, 27]
    },
    super: {
      kicker: 'Супер-ароматы',
      title: 'Супер-ароматы <em>с характером</em>',
      lead: 'Плотнее, заметнее, смелее. Не для всех — и в этом смысл.',
      tags: ['яркий шлейф', 'вечер', 'акцент'],
      shelf: [32, 33, 35, 36, 39]
    },
    uhod: {
      kicker: 'Уход за телом',
      title: 'Уход с ароматом <em>CTRL home</em>',
      lead: 'Текстуры для ежедневного ритуала: кремы, бальзамы и масла, которые поддерживают ароматную линию бренда.',
      tags: ['кремы', 'бальзам-масло', 'после душа', 'наборы'],
      cards: [
        { title: 'Взбитые сливки', text: 'Мягкая текстура и сливочный аромат для ухода без ощущения тяжести.', img: 'images/aromat-3.png', href: 'catalog.html' },
        { title: 'Коко-шайн', text: 'Теплый кокосовый профиль: отпуск, кожа, сияние, но без пляжного клише.', img: 'images/uhod-koko.jpg', href: 'catalog.html' },
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
      shelf: [11, 12, 13, 14, 15],
      cards: [
        { title: 'Мгновенная перезагрузка', text: 'Основная свеча для быстрого переключения атмосферы: зажгла — и комната уже не спорит с нервной системой.', img: 'images/svecha-perezagruzka.png', href: 'catalog.html' },
        { title: 'Сладкий дым', text: 'Теплый, плотный, чуть соблазнительный профиль для вечера и режима “я сегодня не объясняюсь”.', img: 'images/svecha-sladkiy-dym.png', href: 'catalog.html' },
        { title: 'Вне сети', text: 'Свеча для паузы без уведомлений, лишнего шума и попыток мира срочно что-то от вас получить.', img: 'images/svecha-vne-seti.png', href: 'catalog.html' }
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
        { title: 'Первый ритуал чистоты', text: 'Стартовый набор для знакомства с линейкой: всё нужное, чтобы бельё и шкаф начали звучать как CTRL home.', img: 'images/stirka-nabor.jpg', href: 'catalog.html' },
        { title: 'Тихая роскошь', text: 'Гель или усилитель с чистым, дорогим и спокойным ощущением. Без крика, но с характером.', img: 'images/stirka-gel.jpg', href: 'catalog.html' },
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
        { title: 'Travel-атомайзер', text: 'Формат для сумки и поездок: удобно брать любимый аромат без большого флакона.', img: 'images/merch-atomayzer.jpg', href: 'catalog.html' },
        { title: 'Косметичка CTRL', text: 'Спокойный аксессуар для ухода, миниатюр и пробников.', img: 'images/merch-kosmetichka.jpg', href: 'catalog.html' },
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
        { title: 'Последний шанс', text: 'Товары, которые скоро уйдут из продажи или меняют формат.', img: 'images/rasprodazha-1.jpg', href: 'catalog.html' },
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
        { title: 'Доставка', text: 'Курьером или в пункт выдачи. Сроки и стоимость лучше привязать к городу на следующем этапе.', img: 'images/dostavka-kurer.jpg', href: 'catalog.html' },
        { title: 'Оплата', text: 'Банковской картой на сайте. Позже можно добавить оплату частями или подарочные карты.', img: 'images/dostavka-oplata.jpg', href: 'podarochnye-karty.html' },
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

  /* Корзина (выезжающая панель, счётчик, страница korzina) — целиком в cart.js */

  function renderCommon(page) {
    var kind = phKind(page);
    var tags = page.tags.map(function (tag) { return '<span>' + tag + '</span>'; }).join('');
    var cards = page.cards.map(function (card, i) {
      var ph = phData(kind, i, 600);
      return '<article class="page-card reveal" data-delay="' + Math.min(i, 3) + '">' +
        '<a class="page-card-link" href="' + card.href + '" aria-label="' + card.title + '"></a>' +
        '<div class="page-card-media">' +
          '<img src="' + card.img + '" alt="' + card.title + '" loading="lazy" data-ph="' + ph + '" onerror="this.onerror=null;this.src=this.getAttribute(\'data-ph\')">' +
        '</div>' +
        '<div class="page-card-body">' +
          '<h3>' + card.title + '</h3>' +
          '<p>' + card.text + '</p>' +
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

  // Фирменная заглушка-плитка (бренд-цвета) — пока нет реального фото.
  // h = высота холста: 1000 (4:5, товарные полки) или 600 (4:3, редакционные карточки).
  function phSvg(kind, wash, pop, h) {
    h = h || 1000;
    var paper = '#F1EFE8', ink = '#0E0E0E', muted = '#8C8C84', icon;
    if (kind === 'candle') {
      icon = '<g fill="none" stroke="' + ink + '" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="338" y="424" width="124" height="168" rx="16"/>' +
        '<line x1="338" y1="452" x2="462" y2="452"/>' +
        '<line x1="400" y1="424" x2="400" y2="398"/>' +
        '<path d="M400 344 C 366 380 384 414 400 414 C 416 414 434 384 400 344 Z" fill="' + pop + '" stroke="' + ink + '"/>' +
        '</g>';
    } else if (kind === 'spray') {
      icon = '<g fill="none" stroke="' + ink + '" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="356" y="430" width="96" height="160" rx="18"/>' +
        '<rect x="378" y="398" width="52" height="34" rx="6"/>' +
        '<path d="M430 406 h44 M430 420 h44"/>' +
        '<circle cx="496" cy="402" r="8" fill="' + pop + '" stroke="none"/>' +
        '<circle cx="520" cy="416" r="7" fill="' + pop + '" stroke="none"/>' +
        '<circle cx="506" cy="434" r="6" fill="' + pop + '" stroke="none"/>' +
        '</g>';
    } else if (kind === 'jar') {
      icon = '<g fill="none" stroke="' + ink + '" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="330" y="452" width="140" height="120" rx="18"/>' +
        '<rect x="322" y="414" width="156" height="38" rx="12"/>' +
        '<circle cx="400" cy="512" r="20" fill="' + pop + '" stroke="' + ink + '"/>' +
        '</g>';
    } else if (kind === 'drop') {
      icon = '<g fill="none" stroke="' + ink + '" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M400 356 C 362 424 350 462 350 496 A 50 50 0 0 0 450 496 C 450 462 438 424 400 356 Z"/>' +
        '<path d="M366 508 q 11 -13 23 0 q 11 -13 22 0 q 11 -13 23 0" stroke="' + pop + '"/>' +
        '</g>';
    } else if (kind === 'box') {
      icon = '<g fill="none" stroke="' + ink + '" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="332" y="440" width="136" height="132" rx="12"/>' +
        '<line x1="400" y1="440" x2="400" y2="572"/>' +
        '<path d="M400 440 c -14 -32 -48 -34 -50 -12 c -2 20 26 18 50 12 c 24 6 52 8 50 -12 c -2 -22 -36 -20 -50 12 z" fill="' + pop + '"/>' +
        '</g>';
    } else {
      icon = '<g fill="none" stroke="' + ink + '" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="350" y="436" width="100" height="156" rx="14"/>' +
        '<rect x="384" y="404" width="32" height="34" rx="5"/>' +
        '<line x1="400" y1="404" x2="400" y2="392"/>' +
        '<circle cx="400" cy="512" r="22" fill="' + pop + '" stroke="' + ink + '"/>' +
        '</g>';
    }
    var cy = Math.round(h * 0.43);                 // центр вош-круга
    var dy = Math.round((h - 1000) * 0.43);        // смещение иконки (нарисована под h=1000)
    return '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="' + h + '" viewBox="0 0 800 ' + h + '">' +
      '<rect width="800" height="' + h + '" fill="' + paper + '"/>' +
      '<circle cx="400" cy="' + cy + '" r="' + (h === 1000 ? 196 : 170) + '" fill="' + wash + '"/>' +
      '<g transform="translate(0,' + dy + ')">' + icon + '</g>' +
      '<text x="400" y="' + (h - 108) + '" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="5" fill="' + ink + '">CTRL home</text>' +
      '<text x="400" y="' + (h - 68) + '" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" letter-spacing="3" fill="' + muted + '">фото скоро</text>' +
      '</svg>';
  }
  function phData(kind, i, h) {
    var combos = [['#EAF0BE', '#FF2D9E'], ['#F6CFE0', '#CCF400']]; // [фон-вош, акцент], чередуем
    var c = combos[i % combos.length];
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(phSvg(kind, c[0], c[1], h));
  }
  function phKind(page) {
    var k = (page && page.kicker) || '';
    if (/Свеч/i.test(k)) return 'candle';
    if (/Спре/i.test(k)) return 'spray';
    if (/Уход/i.test(k)) return 'jar';
    if (/стирк/i.test(k)) return 'drop';
    if (/Мерч|Подароч/i.test(k)) return 'box';
    return 'bottle';
  }

  // Карточки товарной «полки» (общая разметка) — используются и здесь (renderShelf),
  // и на главной странице (карусель «Бестселлеры», window.CTRL_SHELF_CARDS)
  function shelfCardsHTML(ids, kind) {
    return (ids || []).map(function (id, i) {
      var p = PRODUCTS[id];
      if (!p) return '';
      var price = Number(p.price).toLocaleString('ru-RU');
      var ph = phData(kind, i);
      return '<article class="product reveal" data-id="' + id + '">' +
        (p.moodLabel ? '<span class="product-badge" data-state="' + (p.mood || '') + '">' + p.moodLabel + '</span>' : '') +
        '<a class="product-link" href="' + (p.href || ('product.html?id=' + id)) + '" aria-label="' + p.name + '"></a>' +
        '<div class="product-img">' +
          '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" data-ph="' + ph + '" onerror="this.onerror=null;this.src=this.getAttribute(\'data-ph\')">' +
          '<button class="product-add" data-add="' + id + '" aria-label="В корзину">В корзину</button>' +
        '</div>' +
        '<div class="product-info">' +
          '<div>' +
            '<div class="product-name">' + p.name + '</div>' +
            '<div class="product-note">' + p.note + '</div>' +
          '</div>' +
          '<div class="product-price">' + price + ' ₽</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }
  window.CTRL_SHELF_CARDS = shelfCardsHTML;

  // Товарная «полка»: интро + реальная сетка товаров из PRODUCTS по списку page.shelf
  function renderShelf(page) {
    var cards = shelfCardsHTML(page.shelf, phKind(page));
    var tags = (page.tags || []).map(function (tag) { return '<span>' + tag + '</span>'; }).join('');
    root.innerHTML =
      '<div class="philosophy-label">' + page.kicker + '</div>' +
      '<h1 class="section-title">' + page.title + '</h1>' +
      '<p class="page-lead">' + page.lead + '</p>' +
      (tags ? '<div class="page-tags reveal" data-delay="2">' + tags + '</div>' : '') +
      '<div class="products">' + cards + '</div>' +
      '<div class="page-actions reveal" data-delay="2" style="margin-top:2.5rem">' +
        '<a class="btn" href="catalog.html">Весь каталог</a>' +
      '</div>';
  }

  // Мини-глифы категорий (штриховой стиль фирменных заглушек) для чипов-якорей каталога
  function chipGlyph(kind) {
    var s;
    if (kind === 'candle') {
      s = '<rect x="4.5" y="9.5" width="13" height="10" rx="1.6"/>' +
          '<line x1="4.5" y1="12" x2="17.5" y2="12"/>' +
          '<line x1="11" y1="9.5" x2="11" y2="7.6"/>' +
          '<path d="M11 3 C 9.2 5.1 10.1 6.9 11 6.9 C 11.9 6.9 12.8 5.2 11 3 Z"/>';
    } else if (kind === 'spray') {
      s = '<rect x="6.4" y="8.2" width="8.2" height="11.8" rx="1.6"/>' +
          '<rect x="8.2" y="5.2" width="4.6" height="3"/>' +
          '<path d="M12.8 6 h3.2 M12.8 7.3 h3.2"/>' +
          '<circle cx="18" cy="4.6" r=".8" fill="currentColor" stroke="none"/>' +
          '<circle cx="19.3" cy="6.4" r=".65" fill="currentColor" stroke="none"/>';
    } else {
      s = '<rect x="6.6" y="8.4" width="8.8" height="11.6" rx="1.4"/>' +
          '<rect x="9.3" y="5.2" width="3.4" height="3.2" rx=".6"/>' +
          '<line x1="11" y1="5.2" x2="11" y2="3.9"/>' +
          '<circle cx="11" cy="14.4" r="2.1"/>';
    }
    return '<svg viewBox="0 0 22 22" width="20" height="20" aria-hidden="true">' +
      '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + s + '</g></svg>';
  }

  // ОБЩИЙ КАТАЛОГ: весь ассортимент секциями + чипы-якоря по категориям
  function renderCatalog(page) {
    var chips = page.sections.map(function (s) {
      return '<a class="cat-chip" href="#cat-' + s.key + '" data-key="' + s.key + '">' +
        chipGlyph(s.kind) + '<span>' + s.label + '</span><b>' + s.ids.length + '</b></a>';
    }).join('');
    var sections = page.sections.map(function (s) {
      return '<section class="cat-sec" id="cat-' + s.key + '" data-key="' + s.key + '">' +
        '<div class="cat-sec-head">' +
          '<h2>' + s.label + ' <b>' + s.ids.length + '</b></h2>' +
          '<a class="cat-sec-all" href="' + s.href + '">Весь раздел <span aria-hidden="true">→</span></a>' +
        '</div>' +
        '<div class="products">' + shelfCardsHTML(s.ids, s.kind) + '</div>' +
      '</section>';
    }).join('');
    root.innerHTML =
      '<div class="philosophy-label">' + page.kicker + '</div>' +
      '<h1 class="section-title">' + page.title + '</h1>' +
      '<nav class="cat-nav" aria-label="Категории каталога">' + chips + '</nav>' +
      sections;

    // подсветка чипа текущей секции при скролле
    if ('IntersectionObserver' in window) {
      var chipMap = {};
      root.querySelectorAll('.cat-chip').forEach(function (c) { chipMap[c.getAttribute('data-key')] = c; });
      var secObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          Object.keys(chipMap).forEach(function (k) { chipMap[k].classList.remove('is-active'); });
          var key = en.target.getAttribute('data-key');
          if (chipMap[key]) chipMap[key].classList.add('is-active');
        });
      }, { rootMargin: '-25% 0px -65% 0px' });
      root.querySelectorAll('.cat-sec').forEach(function (sec) { secObs.observe(sec); });
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
  /* hasOwnProperty — иначе key='constructor' (промо-карточка на главной) достаёт
     Object.prototype.constructor и роняет рендер TypeError'ом */
  if (Object.prototype.hasOwnProperty.call(PAGES, key)) {
    if (PAGES[key].sections) { renderCatalog(PAGES[key]); }
    else if (PAGES[key].shelf) { renderShelf(PAGES[key]); }
    else { renderCommon(PAGES[key]); }
  }
  initPage();
})();
