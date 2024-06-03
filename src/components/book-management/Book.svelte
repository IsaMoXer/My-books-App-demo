<script>
  let { book } = $props();
</script>

<!-- Container for both Cover and Data -->
<div class="flex flex-col justify-between items-center my-16 gap-8 lg:flex-row">
  <!-- Cover of the book -->
  <div class="lg:w-1/2">
    <div class="max-w-64 h-auto m-auto bg-gray-200 flex items-center justify-center">
      <img class="h-full w-full object-cover" src={book.cover_url} alt="cover of the book">
    </div>
  </div>
  <!-- Book data -->
  <div class="lg:w-1/2 flex flex-col gap-4">
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