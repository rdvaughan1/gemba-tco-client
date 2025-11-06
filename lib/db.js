const mongoose = require('mongoose');


let cached = null;


async function connectDB() {
if (cached) return cached;
cached = await mongoose.connect(process.env.MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true
});
return cached;
}


module.exports = { connectDB };
