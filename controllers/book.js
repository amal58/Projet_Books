const Book=require("../models/Book")
      const fetchBooks = (req, res) => {
        Book.find()
          .populate("author")  
          .populate("categories")  
          .then((books) =>
            res.status(200).json({
              model: books,
              message: "success",
            })
          )
          .catch((error) => {
            res.status(400).json({
              error: error.message,
              message: "problème d'extraction",
            });
          });
      }

  const getBookById = (req, res) => {
    Book.findOne({ _id: req.params.id })
      .populate("author")  
      .populate("categories")  
      .then((book) => {
        if (!book) {
          res.status(404).json({
            message: "Livre non trouvé"
          });
          return;
        }
  
        res.status(200).json({
          model: book,
          message: "Objet trouvé"
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Problème",
        });
      });
  }
  
  const addBook=(req, res) => {
    const book = new Book(req.body);
    book
      .save()
      .then(() =>
        res.status(201).json({
          model: book,
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
 
  const addBookWithValidation = async (req, res) => {
    try {
      const book = new Book(req.body);
  
      // Valider le livre avec mongoose
      await book.validate();
  
      // Vérifier si l'auteur a déjà écrit d'autres livres
      const count = await Book.countDocuments({ author: book.author });
      if (count > 0) {
        // L'auteur a déjà écrit d'autres livres, sauvegarder le nouveau livre
        await book.save();
        res.status(201).json({
          model: book,
          message: 'Livre créé!',
        });
      } else {
        // L'auteur n'a pas encore écrit d'autres livres
        res.status(400).json({
          message: 'L\'auteur doit avoir écrit d\'autres livres avant de créer celui-ci.',
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
        message: 'Données invalides',
      });
    }
  };
  
//modifier
const UpdateBook=(req, res) => {
    Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((book) => {
        if (!book) {
          res.status(404).json({
            message: "Book not found ",
          });
          return;
        }
        res.status(200).json({
          model: book,
          message: "Book updated",
        });
      })
      .catch((error) =>
        res.status(400).json({
          error: error.message,
          message: "book not correct",
        })
      );
  }
const DeleteBook=(req, res) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Book  deleted" }))
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Id book not correct ",
        });
      });
  }
  // Nouvelle route pour obtenir tous les livres d'un auteur
  const getBookbyauthor=(req, res) => {
  const authorId = req.params.id;

  Book.findByAuthor(authorId)
    .populate('author')
    .populate('categories')
    .then((books) => {
      res.status(200).json({
        model: books,
        message: 'Livres de l\'auteur récupérés avec succès',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: 'Problème lors de la récupération des livres de l\'auteur',
      });
    });
};

 module.exports={
  addBookWithValidation:addBookWithValidation,
    getBookbyauthor:getBookbyauthor,
    fetchBooks:fetchBooks,
    addBook:addBook,
    getBookById:getBookById,
    UpdateBook:UpdateBook,
    DeleteBook:DeleteBook
 }