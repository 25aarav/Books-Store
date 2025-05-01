import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile
} from '../controllers/userController.js';
import {
  addToFavourites,
  removeFromFavourites,
  getFavourites,
} from "../controllers/favouriteController.js";
import protect from "../middleware/userAuth.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get("/favourites", protect, getFavourites);
router.post("/favourites/:bookId", protect, addToFavourites);
router.delete("/favourites/:bookId", protect, removeFromFavourites);

export default router;
