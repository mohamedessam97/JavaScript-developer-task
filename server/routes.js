const express = require("express")
const router = express.Router();


const {getWords ,getRank , register ,logIn}= require('./Controller') // import controllers


router.get('/words' , getWords)     // use words route
router.post('/rank' , getRank)      // use rank   route
router.post('/register' , register) // use register   route
router.post('/login' , logIn)       // use login   route

module.exports = router;
