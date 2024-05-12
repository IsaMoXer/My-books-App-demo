<script>
  import BookList from '../../components/book-management/BookList.svelte';
  import AddBook from '../../components/book-management/AddBook.svelte';
  import Book from '../../components/book-management/Book.svelte';

  let showBookView = $state(false);
  
  let selBook = $state({});
  let edBook = $state({});

  const onViewBook = (e) => {
    edBook = {};
    selBook = e.detail;
    showBookView = true;
  }

  const onEditBook = (e) => {
    selBook = {};
    edBook = e.detail;
    showBookView = false;
    console.log('Edit event reached the BookList', edBook);
  console.log('Book object length: ', Object.keys(edBook).length)}
   
  const onDeleteBook = () => {
    edBook = {}
    showBookView =  false;
  }
</script>


<!-- {#if !$authStore.loading} -->
<div class="flex h-auto">
  {#if !showBookView}
  <div class="w-3/5 border p-4">
    <AddBook book={edBook}/>
  </div>
  {:else}
  <div class="w-3/5 border p-4 flex flex-col gap-0">
    <Book book={selBook}/>
    <button on:click={() => showBookView = false} class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-10 rounded-full self-center mb-12">CLEAR</button>
  </div>
  {/if}
  
  <div class="w-2/5 border p-4">
    <BookList on:viewBook={onViewBook} on:editBook={onEditBook} on:deleteBook={onDeleteBook} />
  </div>
 
</div>
<!-- {/if} -->