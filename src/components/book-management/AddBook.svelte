<script>
  import { createBook, updateBook } from "../../http-actions/books-api.js";
  import { initBooks } from '../../stores/books.svelte.js';

  // This is the book that comes as a prop if user wants to update it
  let { book } = $props();

  // State variables for the form (both adding and updating)
  let name = $state("");
  let author = $state("");
  let pages = $state(null);
  let isbn = $state("");
  let cover_url = $state("");
  let description = $state("");

  let error = $state(false);
  let isLoading = $state(false);

  // This populates the fields of the form in case the AddBook component receivces a 'book' as a property to be updated
  // The $effect rune ensures that the form fields are updated whenever the book object changes
  $effect(() => {
    if (book) {
      name = book.name;
      author = book.author;
      pages = book.pages;
      isbn = book.isbn;
      cover_url = book.cover_url;
      description = book.description;
    }
  });

  // Check if the book to be updated has actually been updated
  function hasBookDataChanged(existingBook, newBook) {
    for (const key in newBook) {
      if (newBook[key] !== existingBook[key]) {
        return true;
      }
    }
    return false;
  };

  // User wants to cancel the update after clicking update button and populating all fields in the form
  function handleCancelUpdate() {
    book = {}; 
  };

  const addBook = async () => {
    // If there is a book in the props, it means that user wants to update the book 
    if (Object.keys(book).length) {
      isLoading = true;
      console.log("I need to pass both the book ID and the book object!", book.id, book.description);
    
      // Update the book object with the new values
      const updatedBook = {
      name,
      pages,
      isbn,
      cover_url,
      author,
      description,
    };
      // The book id cannot be updated, so the existing id is added to the udpatedBook object
      updatedBook.id = book.id;

      
      // Check if the book to update has actually changed
      if (hasBookDataChanged(book, updatedBook)) {
      const response = await updateBook(updatedBook.id, updatedBook);

      if (response.error) {
        error = true;
        console.log(response.error);
        return;
      }

      isLoading = false;
      // Empty the book once the update is done so that state can be updated to show the right info
      book = {};

      // Empty the form's fields once the update is done
      name = "";
      author = "";
      pages = "";
      isbn = "";
      cover_url = "";
      description = "";

      // Init books, so that the component can be re-rendered, therefore updated with new changes without refreshing.
      initBooks();
      return;
    } else {
      alert("You are trying to update a book you haven't modified!");
      isLoading = false;
      return;
    }
  }

    // Functionality to ADD a book
    const bookData = {
      name,
      pages,
      isbn,
      cover_url,
      author,
      description,
      isFavourite: false,
    };

    const response = await createBook(bookData);

    if (response.error) {
      error = true;
      console.log(response.error);
      return;
    }

    name = "";
    author = "";
    pages = "";
    isbn = "";
    cover_url = "";
    description = "";
  };
</script>


{#if error}
  {alert("Missing some mandatory fields!")}
  {error = false}
{/if}

{#if isLoading}
  <p class="spinner"></p>
{:else}
<form class="max-w-sm mx-auto">
  <h1 class="text-center mb-12">ADD A BOOK</h1>

  <input type="text" id="name" name="name" bind:value={name} placeholder="Book title" class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500" /><br />

  <input type="text" id="author" name="author" bind:value={author} placeholder="Author" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500" /><br />

  <input type="number" id="pages" name="pages" bind:value={pages} placeholder="Number of pages" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500" /><br />

  <input type="text" id="isbn" name="isbn" bind:value={isbn} placeholder="isbn" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500" /><br />

  <input type="text" id="cover_url" name="cover_url" bind:value={cover_url} placeholder="Cover URL" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500" /><br />
  
  <textarea id="description" bind:value={description} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." maxlength="300"></textarea>
  <br />
  <div class="text-center">
      
    <button on:click={addBook} class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">{Object.keys(book).length !== 0 ? 'Update' : 'Submit'}</button>

    {#if Object.keys(book).length !== 0}
      <button on:click={handleCancelUpdate} class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full ml-4">Cancel </button>
    {/if}
    
  </div>
</form>
{/if}


<style>
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #09f;
    animation: spin 1s linear infinite;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin: 20px auto;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>