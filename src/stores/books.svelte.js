import * as bookApi from "../http-actions/books-api.js";

let books = $state([]);

const initBooks = async () => {
  const booksFB = await bookApi.getBooks();
  books = [...booksFB];
};

const useBookStore = () => {
  return {
    get books() {
      console.log("Using the useBookStore to get the books!!!!!!!!!");
      return books;
    },
    addBook: book => {
      books = [...books, book];
      console.log("Book from store after adding it: ", book);
    },
    deleteBook: id => {
      books = books.filter(book => book.id !== id);
    },
    updateBook: (id, updatedBook) => {
      books = books.map(book =>
        book.id === id ? { ...book, ...updatedBook } : book
      );
    },
    /* resetBooks: () => {
      books = [];
      console.log("Books reseted: ", books);
    }, */
  };
};

export { initBooks, useBookStore };
