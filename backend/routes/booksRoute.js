import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//Post() method for '/books' route
//Save a new book
router.post('/', async (req, res) => {
   try {
      if (
         !req.body.title ||
         !req.body.author ||
         !req.body.publishYear
      ) {
         return res.status(400).send({ message: "Send all required fields: title, author, publishYear" });
      }
      const newBook = {
         title: req.body.title,
         author: req.body.author,
         publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
      //return created book
      return res.status(201).send(book);
   } catch (error) {
      //errors
      console.log(error.message);
      res.status(500).status({ message: error.message });
   }
});

//Get() methods for '/books' route
//For getting all books
router.get('/', async (req, res) => {
   try {
      const books = await Book.find({});

      return res.status(200).json({
         count: books.length,
         data: books
      });
   } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
   }
});
//For getting 1 book by id
router.get('/:id', async (req, res) => {
   try {

      const { id } = req.params;

      const books = await Book.findById(id);

      return res.status(200).json(books);
   } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
   }
});

//Put() method for '/books' route
//Update a book by ID
router.put('/:id', async (req, res) => {
   try {
      if (
         !req.body.title ||
         !req.body.author ||
         !req.body.publishYear
      ) {
         return res.status(400).send({ message: "Send all required fields: title, author, publishYear" });
      }

      const { id } = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);

      if (!result) {
         return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).send({ message: "Book updated successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
   }
})

//Delete() method for '/books' route
router.delete('/:id', async (req, res) => {
   try {
      const { id } = req.params;

      const result = await Book.findByIdAndDelete(id);
      if (!result) {
         return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).send({ message: "Book deleted successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
   }
});

export default router;