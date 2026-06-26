require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  const URL = process.env.MONGO_URI || 'mongodb://localhost:27017/examprep';
  try {
    await mongoose.connect(URL);
    console.log('Connected to MongoDB for seeding...');

    const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('Admin already exists with email: admin@gmail.com');
    } else {
      const admin = new Admin({
        email: 'admin@gmail.com',
        password: 'admin123'
      });
      await admin.save();
      console.log('Default admin created successfully!');
      console.log('Email: admin@gmail.com');
      console.log('Password: admin123');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seedAdmin();
