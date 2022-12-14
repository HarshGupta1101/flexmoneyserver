const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

module.exports = async () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });
};
