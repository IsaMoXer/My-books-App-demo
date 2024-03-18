import * as bookApi from "../http-actions/books-api.js";

let books = $state([]);

const initBooks = async () => {
  if (books.length === 0) {
    console.log("Fetching books...");
    const booksFB = await bookApi.getBooks();
    books = booksFB;
    console.log("Books after fetching for local variable books:", books);
  } else {
    console.log("Books list already populated");
  }
};

const useBookStore = () => {
  return {
    get books() {
      return books;
    },
    addBook: book => {
      books = [...books, book];
    },
    deleteBook: id => {
      books = books.filter(book => book.id !== id);
    }
  };
};

export { initBooks, useBookStore };
