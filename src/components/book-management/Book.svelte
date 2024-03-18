<script>
  let { book } = $props();
</script>


<div class="flex justify-around items-center m-12 mb-16">
  <div class="w-1/2">
    <div class="h-96 w-64 m-auto bg-gray-200 flex items-center justify-center">
      {#if book.cover_url && book.cover_url !== ""}
      <img src={book.cover_url} alt="cover of the book" class="h-full w-full object-cover">
      {:else}
      <p class="text-center">Cover of the book not available!</p>
      {/if}
    </div>
  </div>
  <div class="w-1/2 flex flex-col gap-4">
    <h1 class="font-bold">{book.name}</h1>
    <p>Author: {book.author}</p>
    <p>Number of pages: {book.pages}</p>
    <p>ISBN: {book.isbn}</p>

    <p class="font-semibold mt-6">Sinopsis</p>
    {#if book.description}
      <p>{book.description}</p>
    {:else}
      <div>
        <p>No book description available!</p>
      </div>  
    {/if}
    
  </div>
</div>