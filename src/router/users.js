var express = require('express')
var router = express.Router()

var User = require('../../models/user')

//router.post('/login').post((req, res) => {
//  User.findOne({name: req.body.name, pass: req.body.pass}, (err, user) => {
//      if (err) {
//          console.log(err)
//      }
//      res.json(user)
//  })
//})

router.post("/login",(req,res,next)=>{
		console.log(req.data);
	
})



module.exports = router