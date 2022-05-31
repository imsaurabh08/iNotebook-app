const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const mongoose=require('mongoose');

const mongoURI =process.env.DATABASE;

console.log(mongoURI)
const connectToMongo=()=>{
    mongoose.connect(mongoURI,
        ()=>{
            console.log("Connected  to Mongo successfully  ")
        } 
        )
}
module.exports=connectToMongo;