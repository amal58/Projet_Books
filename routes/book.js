const express=require("express")
const router =express.Router()
const bookController=require("../controllers/book")

router.get("/",bookController.fetchBooks)
  
  router.get("/:id",bookController.getBookById)
  
  
  router.post("/",bookController.addBook)

  // Route avec validation spécifique
  router.post('/add', bookController.addBookWithValidation);
   

//modifier
router.patch("/:id",bookController.UpdateBook)


router.delete("/:id",bookController.DeleteBook)

router.get("/author/:id",bookController.getBookbyauthor)


    module.exports=router



