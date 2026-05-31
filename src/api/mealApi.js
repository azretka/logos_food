const BASE = 'https://www.themealdb.com/api/json/v1/1';

const CATEGORY_MAP = {
  Beef:          'meat',
  Chicken:       'hot',
  Seafood:       'fish',
  Lamb:          'cold',
  Pork:          'meat',
  Pasta:         'hot',
  Soup:          'soup',
  Side:          'signature',
  Starter:       'cold',
  Dessert:       'signature',
  Vegetarian:    'hot',
  Miscellaneous: 'signature',
  Goat:          'grill',
  Vegan:         'hot',
  Breakfast:     'hot',
};

const pseudoPrice = (id) => {
  const seed = parseInt(id, 10) % 100;
  const prices = [220, 320, 450, 520, 620, 750, 890, 1200, 1450, 1700, 3230, 7900];
  return prices[seed % prices.length];
};

const pseudoWeight = (id) => {
  const seed = parseInt(id, 10) % 10;
  return [150, 175, 200, 225, 250, 300, 350, 400][seed % 8];
};

const adaptMeal = (meal, category) => ({
  id: parseInt(meal.idMeal, 10),
  name: meal.strMeal,
  category: CATEGORY_MAP[category] || 'signature',
  description: meal.strInstructions
    ? meal.strInstructions.slice(0, 80) + '...'
    : 'Вкусное блюдо от нашего шеф-повара',
  fullDescription: meal.strInstructions || '',
  price: pseudoPrice(meal.idMeal),
  weight: pseudoWeight(meal.idMeal),
  image: meal.strMealThumb,
  nutrition: {
    kcal:    Math.floor(200 + (parseInt(meal.idMeal, 10) % 500)),
    carbs:   Math.floor(10  + (parseInt(meal.idMeal, 10) % 60)),
    protein: Math.floor(5   + (parseInt(meal.idMeal, 10) % 40)),
    fat:     Math.floor(3   + (parseInt(meal.idMeal, 10) % 30)),
    weight:  pseudoWeight(meal.idMeal) + 50,
  },
});

const fetchByCategory = async (mealdbCategory) => {
  const res = await fetch(`${BASE}/filter.php?c=${mealdbCategory}`);
  const data = await res.json();
  return (data.meals || []).slice(0, 4).map(m => adaptMeal(m, mealdbCategory));
};

export const fetchMealById = async (id) => {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  if (!data.meals?.[0]) return null;
  const meal = data.meals[0];
  return adaptMeal(meal, meal.strCategory);
};

export const fetchAllProducts = async () => {
  const mealdbCategories = Object.keys(CATEGORY_MAP);
  const results = await Promise.all(
    mealdbCategories.map(cat => fetchByCategory(cat).catch(() => []))
  );
  return results.flat();
};

export const categories = [
  { id: 'cold',      label: 'Холодные закуски' },
  { id: 'hot',       label: 'Горячие закуски' },
  { id: 'meat',      label: 'Мясные блюда' },
  { id: 'soup',      label: 'Супы' },
  { id: 'fish',      label: 'Рыбные блюда' },
  { id: 'grill',     label: 'Гриль меню' },
  { id: 'signature', label: 'Фирменные блюда' },
  { id: 'drinks',    label: 'Напитки' },
];