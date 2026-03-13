const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Furniture = require('../models/Furniture');

dotenv.config();

const ITEMS = [
  { name: 'Dining Chair', type: 'chair', width: 50, height: 90, depth: 50 },
  { name: 'Office Chair', type: 'chair', width: 60, height: 100, depth: 60 },
  { name: 'Coffee Table', type: 'table', width: 120, height: 45, depth: 60 },
  { name: 'Dining Table', type: 'table', width: 180, height: 76, depth: 90 },
  { name: 'Three-Seater Sofa', type: 'sofa', width: 220, height: 85, depth: 90 },
  { name: 'Loveseat', type: 'sofa', width: 150, height: 85, depth: 85 },
  { name: 'Queen Bed', type: 'bed', width: 160, height: 50, depth: 200 },
  { name: 'Bookshelf', type: 'shelf', width: 80, height: 180, depth: 30 },
  { name: 'Floor Lamp', type: 'lamp', width: 30, height: 160, depth: 30 },
  { name: 'Side Table', type: 'table', width: 50, height: 55, depth: 50 },
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/furnitureflow')
  .then(async () => {
    await Furniture.deleteMany({});
    await Furniture.insertMany(ITEMS);
    console.log('Seeded', ITEMS.length, 'furniture items');
    process.exit(0);
  })
  .catch((err) => { console.error(err); process.exit(1); });
