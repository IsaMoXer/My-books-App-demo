<script>
  import { authHandlers, authStore } from "../stores/authStore";
  import { useBookStore } from '../stores/books.svelte';

  const bookStore = useBookStore();
  console.log('**********************************', bookStore.books.length)
</script>
<nav class="bg-main-dark p-4">
  <div class="flex justify-between items-center">
      <a href="/dashboard">
        <div class="flex items-center gap-4">
            <img src="/images/Book_app_logo.png" alt="Logo" class="h-16 w-auto">
            <h1 class="text-white font-bold text-lg">Tracking Book App</h1>
        </div>
      </a>
      <div class="hidden md:flex">
          <a href="/dashboard" class="text-white hover:text-gray-300 px-3 py-2">Home</a>
          <a href="/dashboard/about" class="text-white hover:text-gray-300 px-3 py-2">About</a>
          <a href="/dashboard/contact" class="text-white hover:text-gray-300 px-3 py-2">Contact</a>
      </div>

      <div class="bg-white p-2 rounded-full flex items-center">
        <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z"></path>
        </svg>
        <input type="text" class="w-full bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-500 pl-2" placeholder="Search...">
      </div>

      <div class="flex md:hidden">
          <button class="text-white focus:outline-none">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
          </button>
      </div>      
  </div>
</nav>

<div class="bg-light-grey py-2 px-6 flex justify-end items-center gap-4">
  <p class="text-main-dark">Hello{$authStore.user?.email ? `, ${$authStore.user?.email.split("@")[0]}` : ''} <i class="fa-solid fa-user"></i></p>
  <button class="text-main-dark" on:click={authHandlers.logout}>Logout <i class="fa-solid fa-right-from-bracket"></i></button>
  <button class="text-main-dark" on:click={()=>{}}>Favourites <i class="fa-solid fa-bookmark"></i></button>
</div>

<div class="bg-zinc-300 py-2 px-6 flex justify-end items-center gap-4">
  <div class="text-main-dark">
    <p>You have {bookStore.books.length} book{bookStore.books.length < 2 ? "" : "s"} in your list <span>📚</span></p>
  </div>
</div>