<script>
  import { authHandlers, authStore } from "../stores/authStore";
  import { useBookStore } from '../stores/books.svelte';

  const bookStore = useBookStore();
 
  export let toggleModal;
  let searchQuery = "";
  let searchResults = [];
  let isDarkMode = false;

  function handleSearchQuery() {
    searchResults = bookStore.books.filter(book => 
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      searchQuery = '';
      searchResults = [];
    }
  }

  function handleBlur() {
    searchQuery = '';
    searchResults = [];
  }


  function handleDark(){
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
    isDarkMode = !isDarkMode;
}


</script>
<nav class="bg-main-dark p-4">
   <!-- Logo with home button -->
  <div class="flex justify-between items-center">
      <a href="/dashboard">
        <div class="flex items-center gap-4">
            <img src="/images/Book_app_logo.png" alt="Logo" class="h-16 w-auto">
            <h1 class="text-white font-bold text-lg">Tracking Book App</h1>
        </div>
      </a>
      <!-- Navigation menu -->
      <div class="hidden md:flex">
          <a href="/dashboard" class="text-white hover:text-gray-300 px-3 py-2">Home</a>
          <a href="/dashboard/about" class="text-white hover:text-gray-300 px-3 py-2">About</a>
          <a href="/dashboard/contact" class="text-white hover:text-gray-300 px-3 py-2">Contact</a>
      </div>

      <!-- Search Bar component -->
      <div class="relative w-full max-w-md">
        <div class="bg-white p-2 rounded-full flex items-center">
          <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z"></path>
          </svg>
          <input type="text" name="searchQuery" bind:value={searchQuery} on:input={handleSearchQuery} on:keydown={handleKeydown} on:blur={handleBlur} class="w-full bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-500 pl-2" placeholder="Search by title...">
        </div>
  
        {#if searchResults.length > 0}
          <div class="absolute top-full left-0 bg-white border border-gray-200 text-gray-700 w-full mt-1 rounded shadow-md z-10">
            {#each searchResults as book}
              <p>{book.name}</p>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Menu hidden for big screens-->
      <div class="flex md:hidden">
          <button class="text-white focus:outline-none">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
          </button>
      </div>      
  </div>
</nav>

<!-- Second line with greeting message, logout and favourites -->
<div class="bg-light-grey py-2 px-6 flex justify-end items-center gap-4">
  <p class="text-main-dark">Hello{$authStore.user?.email ? `, ${$authStore.user?.email.split("@")[0]}` : ''} <i class="fa-solid fa-user"></i></p>
  <button class="text-main-dark" on:click={authHandlers.logout}>Logout <i class="fa-solid fa-right-from-bracket"></i></button>
  <button class="text-main-dark" on:click={toggleModal}>Favourites <i class="fa-solid fa-bookmark"></i></button>
</div>

<!-- Third line with amount of books message -->
<div class="bg-zinc-300 py-2 px-6 flex justify-end items-center gap-4">
  <div class="text-main-dark">
    <p>You have {bookStore.books.length} book{bookStore.books.length < 2 ? "" : "s"} in your list <span>📚</span></p>
  </div>
  <!-- Dark mode switch -->
  <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center" on:click={handleDark}>
    <i class="fa-solid fa-{isDarkMode ? 'sun' : 'moon'}"></i>
  </button>
</div>

<!-- Dark mode styles -->
<style>
	:global(body) {
		background-color: #fff; 
		color: inherit;
		transition: background-color 0.3s
	}
	:global(body.dark-mode) {
		background-color: #334155;
		color: #bfc2c7;
	}
  
</style>