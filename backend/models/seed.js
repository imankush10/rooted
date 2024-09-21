const mongoose = require('mongoose');
const Farmer = require('./Farmer');
const Bundle = require('./Bundle');
const Product = require('./Product');
const connectDB = require('../config/db');

connectDB();

const farmersData = [
  {
    name: 'Raman Yadav',
    rating: '4.8 Excellent',
    ratings: '(250+)',
    distance: 'Delivered fresh and fast',
    img: 'r1.jpeg',
    tags: ['Wheat', 'Rice', 'Oats', 'Quinoa'],
    duration: '2 - 3 days',
  },
  {
    name: 'Sukhwinder Singh',
    rating: '4.7 Excellent',
    ratings: '(150+)',
    distance: 'Delivered fresh',
    img: 'r3.jpeg',
    tags: ['Olive Oil', 'Coconut Oil', 'Sunflower Oil'],
    duration: '3 - 5 days',
  },
  {
    name: 'Navneet Sandhu',
    rating: '4.3 Excellent',
    ratings: '(400+)',
    distance: 'Delivered fresh',
    img: 'r2.jpeg',
    tags: ['Mixed Vegetables', 'Seasonal Fruits'],
    duration: '1 - 2 days',
  },
];

const bundleData = {
  name: 'Fresh Harvest Bundle',
  rating: '4.9 Excellent',
  ratings: '(300+)',
  img: 'r1.jpeg',
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
};

const seedData = async () => {
  try {
    // Create farmers and bundles first
    const farmers = await Farmer.create(farmersData);
    const bundle = await Bundle.create(bundleData);

    // Create products with references to farmers and the bundle
    const productsData = [
      {
        name: 'Grain Essentials Pack',
        price: 999,
        description: 'Includes a selection of organic wheat, rice, oats, and quinoa.',
        img: '1.png',
        bundle: bundle._id, // Reference to the created bundle
        farmer: farmers[0]._id, // Reference to the first farmer
      },
      {
        name: 'Veggies & Fruits Combo',
        price: 699,
        description: 'A mix of seasonal vegetables and fruits, straight from the farm.',
        img: '2.png',
        bundle: bundle._id,
        farmer: farmers[1]._id, // Reference to the second farmer
      },
      {
        name: 'Dairy Delight Box',
        price: 499,
        description: 'Includes farm-fresh milk, butter, cheese, and yogurt.',
        img: '3.png',
        bundle: bundle._id,
        farmer: farmers[2]._id, // Reference to the third farmer
      },
      {
        name: "Farmer's Feast",
        price: 1699,
        description: 'A complete bundle with grains, vegetables, fruits, dairy, and oils.',
        img: '4.png',
        bundle: bundle._id,
        farmer: farmers[0]._id,
      },
      {
        name: 'Organic Carrots',
        price: 90,
        description: 'Freshly harvested organic carrots, rich in flavor and nutrients.',
        img: '5.png',
        bundle: bundle._id,
        farmer: farmers[1]._id,
      },
      {
        name: 'Mixed Greens',
        price: 75,
        description: 'A mix of farm-fresh spinach, kale, and arugula.',
        img: '6.png',
        bundle: bundle._id,
        farmer: farmers[2]._id,
      },
      {
        name: 'Seasonal Apples',
        price: 230,
        description: 'Crisp and juicy apples, handpicked from the farm.',
        img: '7.png',
        bundle: bundle._id,
        farmer: farmers[0]._id,
      },
      {
        name: 'Berry Mix',
        price: 170,
        description: 'A delightful mix of strawberries, blueberries, and raspberries.',
        img: '8.png',
        bundle: bundle._id,
        farmer: farmers[1]._id,
      },
      {
        name: 'Farm-Fresh Milk',
        price: 35,
        description: 'Pure, fresh milk from local cows, delivered to your door.',
        img: '9.png',
        bundle: bundle._id,
        farmer: farmers[2]._id,
      },
      {
        name: 'Artisanal Cheese',
        price: 79,
        description: 'A variety of handmade cheeses, perfect for any meal.',
        img: '10.png',
        bundle: bundle._id,
        farmer: farmers[0]._id,
      },
    ];

    await Product.create(productsData);
    console.log('Data seeded successfully!');
  } catch (err) {
    console.error(err);
  }
};

seedData();