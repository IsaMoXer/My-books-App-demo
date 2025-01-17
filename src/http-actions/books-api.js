import { useBookStore } from "../stores/books.svelte.js";

const getBooks = async () => {
  const response = await fetch("/api/books");

  return await response.json();
};

const createBook = async book => {
  const response = await fetch("/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  const data = await response.json();
  if (!data.error) {
    const bookStore = useBookStore();
    bookStore.addBook(data);
  }
  return data;
};

const updateBook = async (id, updatedBook) => {
  const response = await fetch(`/api/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  });

  const data = await response.json();
  if (!data.error) {
    const bookStore = useBookStore();
    bookStore.updateBook(id, data);
  }
  return data;
};

const deleteBook = async id => {
  const confirm = window.confirm("Are you sure you want to delete this book?");
  if (confirm) {
    const response = await fetch(`/api/books/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
    } else {
      const bookStore = useBookStore();
      bookStore.deleteBook(id);
    }
  } else return;
};

export { getBooks, createBook, updateBook, deleteBook };
