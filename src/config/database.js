const mongoose = require("mongoose");

const connectdb = async ()=>{
    await mongoose.connect(process.env.MONGODB_URL);    
};

module.exports = connectdb; 