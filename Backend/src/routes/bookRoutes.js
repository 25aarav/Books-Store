import express from 'express';
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} from '../controllers/bookController.js';
import protect from '../middleware/userAuth.js';
import admin from '../middleware/admin.js';


const router = express.Router();

router.post('/', protect, admin, createBook);     
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', protect, admin, updateBook);   
router.delete('/:id', protect, admin, deleteBook);

export default router;
