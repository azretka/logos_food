export const categories = [
  { id: 'cold', label: 'Холодные закуски' },
  { id: 'hot', label: 'Горячие закуски' },
  { id: 'meat', label: 'Мясные блюда' },
  { id: 'soup', label: 'Супы' },
  { id: 'fish', label: 'Рыбные блюда' },
  { id: 'grill', label: 'Гриль меню' },
  { id: 'signature', label: 'Фирменные блюда' },
  { id: 'drinks', label: 'Напитки' },
];

export const products = [
  // Холодные закуски
  {
    id: 1, category: 'cold',
    name: 'Ягненок', weight: 225,
    description: 'Фаршированный гречневой кашей, курагой, апельсином и зелёным яблоком',
    fullDescription: 'Фаршируем, жарю, масло и соль-перченая, капуста пекинская, горчица с лавром на масле, сухари, семена чеа-свеклы.',
    price: 620,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    nutrition: { kcal: 638, carbs: 142, protein: 22.91, fat: 23.4, weight: 290 }
  },
  {
    id: 2, category: 'cold',
    name: 'Индейка', weight: 225,
    description: 'Фаршированный гречневой кашей, курагой, апельсином и зелёным яблоком',
    fullDescription: 'Фаршированная индейка с гречневой кашей и фруктами.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&h=300&fit=crop',
    nutrition: { kcal: 520, carbs: 130, protein: 20, fat: 18, weight: 280 }
  },
  {
    id: 3, category: 'cold',
    name: 'Гусь', weight: 225,
    description: 'Фаршированный яблоками',
    fullDescription: 'Гусь фаршированный яблоками, запечённый до золотистой корочки.',
    price: 7900,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    nutrition: { kcal: 720, carbs: 160, protein: 28, fat: 30, weight: 310 }
  },
  {
    id: 4, category: 'cold',
    name: 'Утка', weight: 225,
    description: 'Фаршированная рисом, курагой и айвой',
    fullDescription: 'Утка фаршированная ароматным рисом с курагой и айвой.',
    price: 3230,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
    nutrition: { kcal: 680, carbs: 150, protein: 25, fat: 27, weight: 300 }
  },
  // Горячие закуски
  {
    id: 5, category: 'hot',
    name: 'Гусь', weight: 225,
    description: 'Фаршированный яблоками',
    fullDescription: 'Горячий гусь с хрустящей корочкой.',
    price: 17900,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    nutrition: { kcal: 740, carbs: 165, protein: 29, fat: 32, weight: 315 }
  },
  {
    id: 6, category: 'hot',
    name: 'Утка', weight: 225,
    description: 'Фаршированная рисом, курагой и айвой',
    fullDescription: 'Горячая утка с ароматным рисом.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
    nutrition: { kcal: 700, carbs: 155, protein: 26, fat: 28, weight: 305 }
  },
  {
    id: 7, category: 'hot',
    name: 'Ягненок', weight: 225,
    description: 'Фаршированный гречневой кашей, курагой, апельсином и зелёным яблоком',
    fullDescription: 'Горячий ягнёнок с гречкой и фруктами.',
    price: 520,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    nutrition: { kcal: 650, carbs: 145, protein: 23, fat: 24, weight: 295 }
  },
  {
    id: 8, category: 'hot',
    name: 'Индейка', weight: 225,
    description: 'Фаршированная гречневой кашей, курагой, апельсином и зелёным яблоком',
    fullDescription: 'Горячая индейка с начинкой.',
    price: 1620,
    image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&h=300&fit=crop',
    nutrition: { kcal: 540, carbs: 135, protein: 21, fat: 19, weight: 285 }
  },
  // Мясные блюда
  {
    id: 9, category: 'meat',
    name: 'Ягненок', weight: 225,
    description: 'Фаршированный гречневой кашей, курагой, апельсином и зелёным яблоком',
    fullDescription: 'Мясное блюдо из ягнёнка.',
    price: 560,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    nutrition: { kcal: 660, carbs: 148, protein: 24, fat: 25, weight: 298 }
  },
  {
    id: 10, category: 'meat',
    name: 'Индейка', weight: 225,
    description: 'Фаршированная гречневой кашей, курагой, апельсином и зелёным яблоком',
    fullDescription: 'Мясное блюдо из индейки.',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&h=300&fit=crop',
    nutrition: { kcal: 530, carbs: 132, protein: 20.5, fat: 18.5, weight: 282 }
  },
  {
    id: 11, category: 'meat',
    name: 'Гусь', weight: 225,
    description: 'Фаршированный яблоками',
    fullDescription: 'Мясное блюдо из гуся.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    nutrition: { kcal: 730, carbs: 162, protein: 28.5, fat: 31, weight: 312 }
  },
  {
    id: 12, category: 'meat',
    name: 'Утка', weight: 225,
    description: 'Фаршированная рисом, курагой и айвой',
    fullDescription: 'Мясное блюдо из утки.',
    price: 1700,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
    nutrition: { kcal: 690, carbs: 152, protein: 25.5, fat: 27.5, weight: 302 }
  },
  // Супы
  {
    id: 13, category: 'soup',
    name: 'Борщ', weight: 350,
    description: 'Традиционный борщ со сметаной',
    fullDescription: 'Наваристый борщ с мясом, свеклой и сметаной.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
    nutrition: { kcal: 220, carbs: 42, protein: 12, fat: 8, weight: 400 }
  },
  {
    id: 14, category: 'soup',
    name: 'Уха', weight: 350,
    description: 'Рыбный суп из свежей рыбы',
    fullDescription: 'Ароматная уха из свежей рыбы с зеленью.',
    price: 420,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    nutrition: { kcal: 180, carbs: 35, protein: 15, fat: 6, weight: 400 }
  },
  // Рыбные блюда
  {
    id: 15, category: 'fish',
    name: 'Лосось', weight: 200,
    description: 'Запечённый лосось с лимоном и зеленью',
    fullDescription: 'Нежный лосось запечённый с лимоном.',
    price: 890,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    nutrition: { kcal: 420, carbs: 80, protein: 35, fat: 18, weight: 250 }
  },
  {
    id: 16, category: 'fish',
    name: 'Судак', weight: 300,
    description: 'Жареный судак с овощным гарниром',
    fullDescription: 'Хрустящий судак с овощами.',
    price: 650,
    image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&h=300&fit=crop',
    nutrition: { kcal: 380, carbs: 72, protein: 30, fat: 14, weight: 350 }
  },
  // Гриль
  {
    id: 17, category: 'grill',
    name: 'Шашлык из баранины', weight: 300,
    description: 'Сочный шашлык на углях',
    fullDescription: 'Шашлык из молодой баранины на мангале.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    nutrition: { kcal: 580, carbs: 120, protein: 40, fat: 22, weight: 350 }
  },
  {
    id: 18, category: 'grill',
    name: 'Рёбра гриль', weight: 400,
    description: 'Свиные рёбра с соусом BBQ',
    fullDescription: 'Рёбра на углях с фирменным соусом BBQ.',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
    nutrition: { kcal: 680, carbs: 140, protein: 45, fat: 28, weight: 450 }
  },
  // Фирменные
  {
    id: 19, category: 'signature',
    name: 'Авторский холодец', weight: 250,
    description: 'Фирменный холодец по рецепту шефа',
    fullDescription: 'Холодец по авторскому рецепту шеф-повара.',
    price: 480,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    nutrition: { kcal: 310, carbs: 60, protein: 22, fat: 12, weight: 300 }
  },
  {
    id: 20, category: 'signature',
    name: 'Фирменный пирог', weight: 200,
    description: 'Пирог с мясной начинкой',
    fullDescription: 'Воздушный пирог с сочной мясной начинкой.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&h=300&fit=crop',
    nutrition: { kcal: 480, carbs: 95, protein: 18, fat: 16, weight: 250 }
  },
  // Напитки
  {
    id: 21, category: 'drinks',
    name: 'Морс брусничный', weight: 500,
    description: 'Домашний морс из брусники',
    fullDescription: 'Натуральный морс из свежей брусники без консервантов.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    nutrition: { kcal: 85, carbs: 20, protein: 0.5, fat: 0.2, weight: 500 }
  },
  {
    id: 22, category: 'drinks',
    name: 'Квас домашний', weight: 500,
    description: 'Традиционный хлебный квас',
    fullDescription: 'Квас по старинному рецепту.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
    nutrition: { kcal: 70, carbs: 16, protein: 0.3, fat: 0.1, weight: 500 }
  },
];

export const promotions = [
  {
    id: 1,
    tag: 'БЕЗ МЯСА? ЕСТЬ!',
    tagColor: '#4a7c45',
    title: 'Без мяса? Здесь!',
    description: 'Богатый выбор блюд «Фаршмарш». Плов «Маргилан», гречневая и пшённая каши, долма, голубцы, сушёные овощи с картофелем и пр. Выбирай свой вкус!',
    expires: 'до 31 мая',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=260&fit=crop',
  },
  {
    id: 2,
    tag: 'КОМБО',
    tagColor: '#c9541b',
    title: 'Вместе вкуснее',
    description: 'Выгодная комба с напитками. Bogata vyborka blyud Farshmash. Plov Margilan, grechnevaya i pshenaya kashi, dolma, golubtsy.',
    expires: 'до 15 июня',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=260&fit=crop',
  },
  {
    id: 3,
    tag: 'ДОБАВЬ В ПИЦЦЕ',
    tagColor: '#b8a020',
    title: 'Сырный бортик с кедром',
    description: 'Сырный бортик. Saga Orders eto, Plop Margilan, grechnevaya i pshenaya kashi, dolma, golubtsy.',
    expires: 'до 20 мая',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=260&fit=crop',
  },
  {
    id: 4,
    tag: 'КОМБО',
    tagColor: '#c9541b',
    title: 'Вместе вкуснее',
    description: 'Выгодная комба с напитками.',
    expires: 'до 10 июня',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=260&fit=crop',
  },
  {
    id: 5,
    tag: 'ДОБАВЬ В ПИЦЦЕ',
    tagColor: '#b8a020',
    title: 'Сырный бортик',
    description: 'Сырный бортик с кедровым орехом.',
    expires: 'до 25 мая',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=260&fit=crop',
  },
  {
    id: 6,
    tag: 'БЕЗ МЯСА? ЕСТЬ!',
    tagColor: '#4a7c45',
    title: 'Без мяса? Здесь!',
    description: 'Богатый выбор вегетарианских блюд.',
    expires: 'до 31 мая',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=260&fit=crop',
  },
  {
    id: 7,
    tag: 'ДОБАВЬ В ПИЦЦЕ',
    tagColor: '#b8a020',
    title: 'Сырный бортик с кедром',
    description: 'Сырный бортик. Специальное предложение.',
    expires: 'до 5 июня',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=260&fit=crop',
  },
  {
    id: 8,
    tag: 'БЕЗ МЯСА? ЕСТЬ!',
    tagColor: '#4a7c45',
    title: 'Без мяса? Здесь!',
    description: 'Выбирай свой вкус среди вегетарианских блюд.',
    expires: 'до 31 мая',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=260&fit=crop',
  },
  {
    id: 9,
    tag: 'КОМБО',
    tagColor: '#c9541b',
    title: 'Вместе вкуснее',
    description: 'Выгодная комба с напитками и закусками.',
    expires: 'до 20 июня',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=260&fit=crop',
  },
];

export const deliveryFAQ = [
  {
    id: 1,
    question: 'У наших курьеров всегда должна быть сдача!',
    answer: 'Да, наши курьеры всегда имеют сдачу. Однако для удобства просим подготовить точную сумму или воспользоваться оплатой картой.',
  },
  {
    id: 2,
    question: 'Вам что-то не довезли?',
    answer: 'Если что-то из заказа не было доставлено, позвоните нам по номеру +7 (917) 510-57-59 и мы незамедлительно решим проблему.',
  },
  {
    id: 3,
    question: 'Не понравился продукт?',
    answer: 'Мы работаем только с лучшими продуктами. Если вам что-то не понравилось, сообщите нам, и мы разберёмся.',
  },
  {
    id: 4,
    question: 'Если появились замечания',
    answer: 'Мы очень внимательно следим за качеством нашей работы, поэтому если у вас будут какие-либо замечания или предложения, то обязательно сообщите их нам.',
  },
  {
    id: 5,
    question: 'Оплата Visa, MasterCard и МИР',
    answer: 'Мы принимаем оплату картами Visa, MasterCard и МИР как онлайн, так и при получении заказа.',
  },
  {
    id: 6,
    question: 'Реквизиты',
    answer: 'ООО «ЛОГОС», ИНН 7712345678, КПП 771201001, р/с 40702810000000000000 в Банке.',
  },
];
