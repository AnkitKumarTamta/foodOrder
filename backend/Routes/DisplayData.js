const express = require("express");
const router = express.Router();

router.post('/foodData',(req,resp)=>{
    try {
        resp.send([global.fooditems,global.foodCategory])
    } catch (error) {
       console.error(error.message()) 
       resp.send('server error')
    }
})

module.exports = router;