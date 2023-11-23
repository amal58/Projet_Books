const express=require("express")
const router =express.Router()
const userController = require("../controllers/user")
const validateSignup = require('../middlewares/validationMiddleware'); 

  router.post("/signup",validateSignup,userController.signup)
  router.post("/login",userController.login)
   

 module.exports=router




