const express=require("express")
const router =express.Router()
const authorController=require("../controllers/author")


  
  router.post("/",authorController.addAuthor)
   




    module.exports=router