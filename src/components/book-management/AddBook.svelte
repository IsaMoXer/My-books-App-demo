<script>
  import { createBook, updateBook } from "../../http-actions/books-api.js";
  import { initBooks } from '../../stores/books.svelte.js';

  let { book } = $props();
  console.log("Book property: ", book);

  let name = $state("");
  let author = $state("");
  let pages = $state(null);
  let isbn = $state("");
  let cover_url = $state("");
  let description = $state("");
  let error = $state(false);
  //let isFavourite = true;

  let isLoading = $state(false);

  /* This populates the fields of the form in case the AddBook component receivces a 'book' as a property to be updated*/
  $effect(() => {
    if (book) {
      name = book.name;
      author = book.author;
      pages = book.pages;
      isbn = book.isbn;
      cover_url = book.cover_url;
      description = book.description;
      //isFavourite = book.isFavourite;
    }
  });

  const addBook = async () => {
    /* If there is a book in the props, it means that user wants to update the book */
    if (Object.keys(book).length) {
      isLoading = true;
      console.log("I need to pass both the book ID and the book object!", book.id, book.description);
      // Add error handling for not updating a book and clicking the update button. To be added later. 

      // Update the book object with the new values
      const updatedBook = {
      name,
      pages,
      isbn,
      cover_url,
      author,
      description,
      //isFavourite,
    };
      updatedBook.id = book.id;

      console.log('Book before updateing: ', updatedBook);
      const response = await updateBook(updatedBook.id, updatedBook);
      console.log('Book after updateing: ', updatedBook);

      if (response.error) {
        error = true;
        console.log(response.error);
        return;
      }

      isLoading = false;
      // Empty the book once the update is done so that state can be updated to show the right info
      book = {};
      console.log('Book emptied', book);

      // Empty the form's fields once the update is done
      name = "";
      author = "";
      pages = "";
      isbn = "";
      cover_url = "";
      description = "";

      console.log("Book updated!");
      /* Init books, so that the component can be re-rendered, therefore updated with new changes without refreshing. */
      initBooks();
      return;
    }

    /* Functionality to ADD a book*/
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

    console.log("Book added!");
    console.log('This is the added book: ', bookData)
  };

  function handleCancleUpdate() {
    book = {};
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
  <h1 class="text-center mb-4">ADD A BOOK</h1>
  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book name:</label>
  <input type="text" id="name" name="name" bind:value={name} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /><br />
  <label for="author" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author:</label>
  <input type="text" id="author" name="author" bind:value={author} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /><br />
  <label for="pages" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of pages:</label>
  <input type="number" id="pages" name="pages" bind:value={pages} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /><br />
  <label for="isbn" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ISBN:</label>
  <input type="text" id="isbn" name="isbn" bind:value={isbn} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /><br />
  <label for="cover_url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image url:</label>
  <input type="text" id="cover_url" name="cover_url" bind:value={cover_url} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /><br />
  
  <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your description:</label>
  <textarea id="description" bind:value={description} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." maxlength="250"></textarea>
  <br />
  <div class="text-center">
      
    <button on:click={addBook} class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">{Object.keys(book).length !== 0 ? 'Update' : 'Submit'}</button>

    {#if Object.keys(book).length !== 0}
      <button on:click={handleCancleUpdate} class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full ml-4">Cancel </button>
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