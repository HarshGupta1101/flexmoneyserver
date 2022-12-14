const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
  }
}
