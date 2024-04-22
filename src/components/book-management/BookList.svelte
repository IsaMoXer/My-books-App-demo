<script>
  import { deleteBook } from '../../http-actions/books-api';
  import { createEventDispatcher } from 'svelte';
  import { useBookStore } from '../../stores/books.svelte.js';
  import { authStore, authStoreRead } from '../../stores/authStore';


  console.log('User from client side------------> ', $authStore.user);
  console.log('Active User from client side------------> ', $authStoreRead.isActive);
  const bookStore = useBookStore();

  // BookStore is not updated on time to be listed
  console.log('Bookstore from BookList component: ', bookStore.books);// To be removed!!!Used for debugging
  let dispatch = createEventDispatcher();
  let selectedBook = $state(null); 
  let editingdBook = $state(null); 
  
  
  const handleViewBook = () => {
    console.log('handleViewBook event pressed!');
    dispatch('viewBook', selectedBook);
  }

  const handleEditBook = () => {
    console.log('handleEditBook event pressed!');
    dispatch('editBook', editingdBook);
  }

  const handleToggleFavourite = (id) => {
    // Add functionality to toggle the isFavourite property
    console.log('You clicked on Favs!', id);
  }

</script>

<!-- Book list -->
<div class="flex flex-col gap-2 max-h-screen overflow-y-auto" style="scrollbar-width: none;">
  <h1 class="text-center">YOUR BOOKS</h1>

  {#if $authStore.isLoading}
  <div class="h-screen flex items-center justify-center">
    <p class="spinner"></p>
  </div>
  {:else if bookStore.books.length === 0}
    <p>No books to show yet!</p>
  {:else}
      <ul class="space-y-2">
        {#each bookStore.books as book, index}
        <li class="border-b-2 flex justify-between items-center">
          <span>{index + 1}. {book.name}</span> <div class="flex justify-between items-center">
            <button on:click={() => {
              selectedBook = book
              handleViewBook()
              }}
              class="text-white bg-gray-800 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">View</button>
              
              <div class="flex gap-4 mr-4">
                <button on:click={() => deleteBook(book.id)} class=""><i class="fa-solid fa-trash-can hover:text-coral-css hover:scale-125"></i></button>
                <button on:click={() => {
                  editingdBook = book
                  handleEditBook()
                  }}><i class="fa-solid fa-pen-to-square hover:text-coral-css hover:scale-125"></i></button>
                  <button on:click={() => handleToggleFavourite(book.id)}>
                    <i class={`fa-${!book.isFavourite ? "regular" : "solid"} fa-bookmark hover:text-coral-css hover:scale-125`}></i>
                  </button>
              </div>
          </div>
        </li>
        {/each}
      </ul>
    {/if}
</div>

<style>
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #09f;
    animation: spin 1s linear infinite;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: 20px auto;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>