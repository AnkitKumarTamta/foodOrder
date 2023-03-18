const express = require('express')
const app = express();
const port = 5000;
var cors = require('cors')
const mongoDB = require('./db')
mongoDB();

app.use(cors())
app.get('/',(req, resp)=>{
    resp.send('hello world');
})

app.use(express.json());
app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/DisplayData'))
app.use('/api',require('./Routes/OrderData'))

app.listen(port, ()=>{
    console.log(`app is running on the port ${port}`)
})