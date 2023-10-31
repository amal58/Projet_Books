const mongoose=require ("mongoose")

const categorySchema=mongoose.Schema({


    title: {
        type: String,
        required: true,
        enum: ["Horror", "Mystery", "Science Fiction", "Fantasy", "Romance", "Drama", "Non-fiction", "Other"]}
 
})

module.exports=mongoose.model("Category",categorySchema)



 



