const mongoose = require("mongoose");
require('dotenv').config()
const mongoDB = async () => {
  try {
    await mongoose.connect(
    process.env.DB
    );
    console.log("db  connected successfully");
    const fetcheddata = mongoose.connection.db.collection("food_items");
    const foodCategory=mongoose.connection.db.collection("food_category")
    try {
      const data = await fetcheddata.find({}).toArray();
      const catdata=await foodCategory.find({}).toArray();
      if (data && catdata) {
        global.food_items = data;
        global.foodCategory=catdata;
      }
      else{
        console.log("unable to fetch data")
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(`Error is : ${err}`);
  }
};

module.exports = mongoDB;
