export const getDishById = (id: number) => {
  const meals = farmBundle.items.flatMap((category) => category.products);
  return meals.find((meal) => meal.id === id);
};
export const farmBundle = {
  name: 'Fresh Harvest Bundle',
  rating: '4.9 Excellent',
  ratings: '(300+)',
  img: require('@/assets/data/r1.jpeg'),
  distance: 'Delivered fresh to your door',
  delivery: '1-2 days',
  tags: [
    'Organic',
    'Fresh Vegetables',
    'Seasonal Fruits',
    'Whole Grains',
    'Farm-Fresh Dairy',
    'Natural Oils',
  ],
  about:
    'Enjoy a curated selection of farm-fresh produce, dairy, grains, and more, delivered straight to your door. Supporting local farmers, while you enjoy the freshest and healthiest food.',
  items: [
    {
      category: 'Bundles',
      products: [
        {
          id: 1,
          name: 'Grain Essentials Pack',
          price: 999,
          info: 'Includes a selection of organic wheat, rice, oats, and quinoa.',
          img: require('@/assets/data/1.png'),
        },
        {
          id: 2,
          name: 'Veggies & Fruits Combo',
          price: 699,
          info: 'A mix of seasonal vegetables and fruits, straight from the farm.',
          img: require('@/assets/data/2.png'),
        },
        {
          id: 3,
          name: 'Dairy Delight Box',
          price: 499,
          info: 'Includes farm-fresh milk, butter, cheese, and yogurt.',
          img: require('@/assets/data/3.png'),
        },
        {
          id: 4,
          name: "Farmer's Feast",
          price: 1699,
          info: 'A complete bundle with grains, vegetables, fruits, dairy, and oils.',
          img: require('@/assets/data/4.png'),
        },
      ],
    },
    {
      category: 'Vegetables',
      products: [
        {
          id: 5,
          name: 'Organic Carrots',
          price: 90,
          info: 'Freshly harvested organic carrots, rich in flavor and nutrients.',
          img: require('@/assets/data/5.png'),
        },
        {
          id: 6,
          name: 'Mixed Greens',
          price: 75,
          info: 'A mix of farm-fresh spinach, kale, and arugula.',
          img: require('@/assets/data/6.png'),
        },
      ],
    },
    {
      category: 'Fruits',
      products: [
        {
          id: 7,
          name: 'Seasonal Apples',
          price: 230,
          info: 'Crisp and juicy apples, handpicked from the farm.',
          img: require('@/assets/data/7.png'),
        },
        {
          id: 8,
          name: 'Berry Mix',
          price: 170,
          info: 'A delightful mix of strawberries, blueberries, and raspberries.',
          img: require('@/assets/data/8.png'),
        },
      ],
    },
    {
      category: 'Dairy',
      products: [
        {
          id: 9,
          name: 'Farm-Fresh Milk',
          price: 35,
          info: 'Pure, fresh milk from local cows, delivered to your door.',
          img: require('@/assets/data/9.png'),
        },
        {
          id: 10,
          name: 'Artisanal Cheese',
          price: 79,
          info: 'A variety of handmade cheeses, perfect for any meal.',
          img: require('@/assets/data/10.png'),
        },
      ],
    },
  ],
};

