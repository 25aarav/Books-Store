import mongoose, { MongooseError } from "mongoose";

const booksSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const books = mongoose.model("books", booksSchema);
export default books;
