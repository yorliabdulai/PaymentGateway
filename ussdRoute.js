const express = require("express")
const router = express.Router()

router.get("/", async(req, res)=>{
    res.send({code: 200, data:"You are home"})
})

module.exports = router