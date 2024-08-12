const express = require('express')
const app = express();
const db=require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('/', function (req, res) {
  res.send('Hello World')
})

const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);
const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);


app.listen(3000,()=>{
    console.log('lstening on port 3000');
    
})