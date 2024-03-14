<script>
  import Book from './Book.svelte';
  import { useBookStore } from '../../stores/books.svelte.js';
  import { deleteBook } from '../../http-actions/books-api';
  

  let selectedBook = $state(null); 
  const bookStore = useBookStore();

</script>

<!-- Book list -->
<div class="flex flex-col gap-2">
  <h1 class="">LIST OF BOOKS</h1>
  {#if bookStore.books.length === 0}
    <p>No books to show yet!</p>
  {:else}
  <ul class="space-y-2">
    {#each bookStore.books as book, index}
    <li class="border-b-2 flex justify-between items-center">
      <span>{index + 1}. {book.name}</span> <div class="flex justify-between items-center"><button on:click={() => selectedBook = book} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">View</button><button on:click={() => deleteBook(book.id)} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Delete</button></div>
    </li>
    {/each}
  </ul>
  {/if}
</div>

<!-- Book View conditionally rendered -->
{#if selectedBook}
  <Book book={selectedBook} />
  <button on:click={() => selectedBook = null}>Clear</button>
{/if}


<!-- <style>
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #09f;
    animation: spin 1s linear infinite;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 20px auto;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style> -->