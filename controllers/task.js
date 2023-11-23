const Task=require("../models/Task")


const fetchTasks =(req,res)=>{
    Task.find()
     .then((tasks) => {
       res.status(200).json({
        model:tasks,
        message:"success"
  
      });
    })
    .catch((error) => {
    
      res.status(400).json({
        error:error.message,
        message:"probleme d'extraction",
      });
    });
 
  }

  const getTaskById=(req,res)=>{
    Task.findOne({_id:req.params.id})
    .then((task) => {
      if(!task){
        res.status(404).json({
          message:"objet npon trouve"
        })
        return
      }
  
     res.status(200).json({
      model: task,
      message:"objet trouve"
     })
   })
   .catch((error) => {
   
     res.status(400).json({
       error:error.message,
       message:"probleme ",
     });
   });
  }
  
  // const addTask=(req,res)=>{
  //     console.log(req.body)
  //     const task=new Task(req.body)
  //     //fonction async ,promise
  //     task.save().then(()=>
  //     res.status(201).json({
  //       model:task,
  //       message:"objet cree!",
  //     })
  //     )
  //     .catch((error) => {
    
  //       res.status(400).json({
  //         error: error.message,
  //         message:"donnees invalides",
  //       });
  //     });
  //  }


   //add task avec async await
  
   const addTask = async (req, res) => {
    console.log(req.body);
    const task = new Task(req.body);
    
    try {
      await task.save();
      res.status(201).json({
        model: task,
        message: "objet cree!",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: "donnees invalides",
      });
    }
  }
  

//modifier
const UpdateTask=(req,res)=>{
   Task.findOneAndUpdate({_id: req.params.id}, req.body,{new:true})
   .then((task)=>{
    if(!task){
      res.status(404).json({
        message:"objet non trouve"
      })
      
    }else{
    res.status(200).json({
      model:task,
      message:"objet modifie",
    }) }
   })
   .catch((error) => {
  
    res.status(400).json({
      error: error.message,
      message:"objet non trv",
    });
  });
 }


const DeleteTask=(req,res)=>{
    Task.deleteOne({_id: req.params.id})
    .then(()=>res.status(200).json({message:"objet supp"}))
    .catch((error)=>res.status(400).json({error}))
 }

 module.exports={
    fetchTasks:fetchTasks,
    addTask:addTask,
    getTaskById:getTaskById,
    UpdateTask:UpdateTask,
    DeleteTask:DeleteTask
 }