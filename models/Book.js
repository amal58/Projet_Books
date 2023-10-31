const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  
  description: { type: String, required: true },
  nbPages: { type: Number, required: false },
  language: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

});
module.exports = mongoose.model("Book", bookSchema);







