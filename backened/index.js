const connectToMongo=require('./db');
var cors = require('cors');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const express = require('express')


connectToMongo()

const app = express()
const port =  process.env.PORT || 5000;
// app.use(express.static(path.resolve(__dirname,"../build")))
app.use(express.json());
app.use(cors())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.get('/',(req,res)=>{
  res.json("Succesfully deployed");
} )
if(process.env.NODE_ENV=="production")
{
  app.use(express.static('client/build'))
}
app.listen(port, () => {
  console.log(`Example app listening at port http://localhost:${port}`)
})