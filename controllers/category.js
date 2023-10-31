const Category=require("../models/Category")
  
  const addCategory=(req, res) => {
    const category = new Category(req.body);
    category
      .save()
      .then(() =>
        res.status(201).json({
          model: category,
          message: "Created!",
        })
      )
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Données invalides",
        });
      });
  }





 module.exports={
    
    addCategory:addCategory,
  
 }