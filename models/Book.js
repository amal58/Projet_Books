const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  nbPages: { type: Number, required: false },
  language: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

bookSchema.statics.findByAuthor = function (authorId) {
  return this.find({ author: authorId });
};
//bookSchema.plugin(idValidator);

// Validation personnalisée pour vérifier si l'auteur a déjà écrit d'autres livres
bookSchema.path('author').validate(async function (value) {
  const count = await this.model('Book').countDocuments({ author: value });
  return count > 0; // Retourne true si l'auteur a déjà écrit d'autres livres
}, 'L\'auteur doit avoir écrit d\'autres livres.');

module.exports = mongoose.model("Book", bookSchema);





