import User from "../models/User.js";
import books from "../models/Books.js"; // Needed for validation

// Add book to user's favourites
export const addToFavourites = async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.body;

  try {
    // Check if the book exists
    const book = await books.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);

    if (user.favourites.includes(bookId)) {
      return res.status(400).json({ message: "Book already in favourites" });
    }

    user.favourites.push(bookId);
    await user.save();

    res.status(200).json({ message: "Book added to favourites", favourites: user.favourites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's favourite books
export const getFavourites = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate("favourites");

    res.status(200).json({ favourites: user.favourites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove book from favourites
export const removeFromFavourites = async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.params;

  try {
    const user = await User.findById(userId);

    user.favourites = user.favourites.filter(
      (favId) => favId.toString() !== bookId
    );

    await user.save();

    res.status(200).json({ message: "Book removed from favourites", favourites: user.favourites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
