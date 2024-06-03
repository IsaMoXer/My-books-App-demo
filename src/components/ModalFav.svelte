<script>
  import { useBookStore } from "../stores/books.svelte";
  import { authStore } from "../stores/authStore";
  export let toggleModal;

  const bookStore = useBookStore();

  const favBooks = bookStore.books.filter(book => book.isFavourite);

  function handleEscape(e) {
    if(e.key === "Escape"){
      toggleModal();
    } 
  }

</script>
<svelte:window on:keydown|preventDefault={handleEscape}/>
 <!-- Favourites div -->
<div class="fixed inset-0 flex items-center justify-center z-10 flex-1 px-8 mx-auto">
  <div class="w-full max-w-2xl bg-btn-blue p-12 pt-0 rounded-lg shadow-xl text-slate-100 relative">
    <button class="absolute top-2 right-8 text-5xl text-black cursor-pointer" on:click={toggleModal}>&times;</button>

    <!-- Book list -->
    <div class="flex flex-col gap-2 max-h-screen overflow-y-auto" style="scrollbar-width: none;">
      <img src="/images/hearts.png" alt="Logo" class="w-32 h-auto m-auto py-4">
      <h1 class="text-center mb-8">YOUR FAVOURITE BOOKS</h1>

      {#if $authStore.isLoading}
      <div class="h-screen flex items-center justify-center">
        <p class="spinner"></p>
      </div>
      {:else if favBooks.length === 0}
        <p>You haven't bookmarked anything yet!</p>
      {:else}
          <ul class="space-y-2 listOverflow">
            {#each favBooks as book, index}
            <li class="border-b-2 flex justify-between items-center">
              <span>{index + 1}. {book.name}</span> 
            </li>
            {/each}
          </ul>
        {/if}
    </div>
  </div>
</div>
 <!-- Modal window blurred -->
<div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-5"></div>

<style>
  .listOverflow {
    overflow-y: scroll;
    scrollbar-width: none;
    overflow-x: hidden;
  }

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