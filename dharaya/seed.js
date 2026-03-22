const mongoose = require('mongoose');
require('dotenv').config();
const Report = require('./models/Report');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dharaya';

const fakeReports = [
  {
    category: 'air',
    description: 'Garbage burning in Delhi causing severe air pollution and health hazards',
    location: 'Delhi, India',
    latitude: 28.6139,
    longitude: 77.2090,
    severity: 'high',
    status: 'Pending',
    points: 50
  },
  {
    category: 'air',
    description: 'Traffic emissions in Noida creating unhealthy smog levels',
    location: 'Noida, India',
    latitude: 28.5355,
    longitude: 77.3910,
    severity: 'medium',
    status: 'In Progress',
    points: 35
  },
  {
    category: 'air',
    description: 'Construction dust from ongoing metro project in Gurgaon',
    location: 'Gurgaon, India',
    latitude: 28.4595,
    longitude: 77.0266,
    severity: 'low',
    status: 'Resolved',
    points: 20
  },
  {
    category: 'water',
    description: 'Industrial waste dumping in Yamuna River causing water pollution',
    location: 'Delhi, Yamuna River',
    latitude: 28.7041,
    longitude: 77.1025,
    severity: 'high',
    status: 'Pending',
    points: 55
  },
  {
    category: 'water',
    description: 'Sewage overflow near residential areas contaminating groundwater',
    location: 'Greater Noida',
    latitude: 28.4744,
    longitude: 77.5857,
    severity: 'medium',
    status: 'In Progress',
    points: 40
  },
  {
    category: 'soil',
    description: 'Illegal dumping of construction waste affecting soil quality',
    location: 'Faridabad Industrial Area',
    latitude: 28.4089,
    longitude: 77.3178,
    severity: 'high',
    status: 'Pending',
    points: 52
  },
  {
    category: 'soil',
    description: 'Agricultural land degradation due to chemical fertilizer overuse',
    location: 'Haryana, Punjab Border',
    latitude: 29.2,
    longitude: 76.5,
    severity: 'medium',
    status: 'In Progress',
    points: 38
  },
  {
    category: 'noise',
    description: 'Excessive noise from construction activities near schools and hospitals',
    location: 'South Delhi',
    latitude: 28.5244,
    longitude: 77.1855,
    severity: 'medium',
    status: 'Pending',
    points: 32
  },
  {
    category: 'noise',
    description: 'Honking and vehicle noise in commercial market area',
    location: 'CP Market, Delhi',
    latitude: 28.6292,
    longitude: 77.1905,
    severity: 'low',
    status: 'Resolved',
    points: 18
  },
  {
    category: 'air',
    description: 'Industrial emission from thermal power plant affecting nearby villages',
    location: 'Badarpur, Delhi',
    latitude: 28.5278,
    longitude: 77.2803,
    severity: 'high',
    status: 'Pending',
    points: 48
  },
  {
    category: 'water',
    description: 'Plastic and garbage accumulation in local water bodies',
    location: 'Various Water Bodies',
    latitude: 28.6,
    longitude: 77.2,
    severity: 'medium',
    status: 'In Progress',
    points: 42
  },
  {
    category: 'soil',
    description: 'Mining operations causing significant soil erosion and degradation',
    location: 'Himachal Pradesh',
    latitude: 31.786,
    longitude: 77.173,
    severity: 'high',
    status: 'Pending',
    points: 53
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Report.deleteMany({});
    console.log('✓ Cleared existing reports');

    // Insert fake data
    const result = await Report.insertMany(fakeReports);
    console.log(`✓ Successfully seeded ${result.length} fake reports`);

    // Display summary
    const stats = await Report.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    console.log('\n📊 Reports by Category:');
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
