const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoURL = 'mongodb://localhost:27017/gofoodmern'

const mongoDB=()=>{
    mongoose.connect(mongoURL,async()=>{
        console.log('connected');

        //fetching db data into nodejs console
        const fetched_data = await mongoose.connection.db.collection("fooditems");
        fetched_data.find({}).toArray(async function(err,data){
        const foodCategory = await mongoose.connection.db.collection("foodCategory")
        foodCategory.find({}).toArray(function(err,catData){
            if(err) console.log(err)
            else {
                global.fooditems = data;
                global.foodCategory = catData;
            }
        })  
            
            // if(err) console.log(err)
            // else {
            //     global.fooditems = data;
                
            // }
        })
    })
}

module.exports = mongoDB;