<script>
  import { deleteBook } from '../../http-actions/books-api';
  import { createEventDispatcher } from 'svelte';
  import { initBooks, useBookStore } from '../../stores/books.svelte.js';
  import { authStore, authStoreRead } from '../../stores/authStore';
  import { updateBook } from '../../http-actions/books-api';


  console.log('User from client side------------> ', $authStore.user);
  console.log('Active User from client side------------> ', $authStoreRead.isActive);
  const bookStore = useBookStore();

  // BookStore is not updated on time to be listed
  console.log('Bookstore from BookList component: ', bookStore.books);// To be removed!!!Used for debugging
  let dispatch = createEventDispatcher();
  let selectedBook = $state(null); 
  let editingdBook = $state(null); 
  let selectedOption = $state("");
  let orderedBookList = $state([]);
 
  
  const handleViewBook = () => {
    console.log('handleViewBook event pressed!');
    dispatch('viewBook', selectedBook);
  }

  const handleEditBook = () => {
    console.log('handleEditBook event pressed!');
    dispatch('editBook', editingdBook);
  }

  const handleDeleteBook = (bookId) => {
    deleteBook(bookId);
    dispatch('deleteBook');
  }

  const handleToggleFavourite = (id, book) => {
    console.log('You clicked on Favs!', id);
  
    const updatedBook = {...book, isFavourite: !book.isFavourite};
    console.log('Updated book with isFavourite prop toggled: ', updatedBook, 'Fav: ', updatedBook.isFavourite);
    updateBook(id, updatedBook);
    console.log('isFavourite property toggled successfully');
    initBooks();

  }

  const handleOrderBy = () => {
      if (selectedOption === "byTitle") {
        orderedBookList = bookStore.books.slice().sort((a, b) => a.name.localeCompare(b.name));
      } else if (selectedOption === "byAuthor") {
        orderedBookList = bookStore.books.slice().sort((a, b) => a.author.localeCompare(b.author));
      } 
  }
</script>

<!-- Book list -->
<div class="flex flex-col gap-2 max-h-screen overflow-y-auto" style="scrollbar-width: none;">
  <h1 class="text-center">YOUR BOOKS</h1>

  <!--Order book by -->
  <select class="bg-transparent border border-slate-200 p-2 my-6" bind:value={selectedOption} on:change={handleOrderBy}>
    <option value="">--Choose an order option--</option>
    <option value="byTitle">
      Order by title
    </option>
    <option value="byAuthor">
      Order by author
    </option>
  </select>
  
  
  {#if $authStore.isLoading}
  <div class="h-screen flex items-center justify-center">
    <p class="spinner"></p>
  </div>
  {:else if bookStore.books.length === 0}
    <p>No books to show yet!</p>
  {:else}
    <ul class="space-y-2">  
      <!-- Display books based on selected order -->
        {#each orderedBookList.length === 0 ? bookStore.books : orderedBookList as book, index}
        <!-- Book row -->
        <li class="border-b-2 flex justify-between items-center pb-2 gap-6">
          <button class="flex justify-center items-center gap-6 hover:text-coral-css hover:font-semibold" on:click={() => {
            selectedBook = book
            handleViewBook()
            }}>

            <img src={book.cover_url ? book.cover_url : 'images/missing_cover.png'} alt="cover of the book" class="h-16 w-auto">
        
    
            <p class="text-left">{index + 1}. {book.name}</p>
          </button>
          <!-- Div with modifying buttons (delete, editBook, bookmark)-->
          <div class="flex justify-between items-center">    
              <div class="flex gap-4 mr-4">
                <!-- Delete button -->
                <button on:click={() => handleDeleteBook(book.id)} class=""><i class="fa-solid fa-trash-can hover:text-coral-css hover:scale-125"></i></button>
                <!-- Edit button -->
                <button on:click={() => {
                  editingdBook = book
                  handleEditBook()
                  }}><i class="fa-solid fa-pen-to-square hover:text-coral-css hover:scale-125"></i></button>
                  <!-- Favourite button -->
                  <button on:click={() => handleToggleFavourite(book.id, book)}>
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