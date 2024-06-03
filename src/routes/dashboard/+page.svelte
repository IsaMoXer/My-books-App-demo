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
   
  const onDeleteBook = () => {
    edBook = {}
    showBookView =  false;
  }
</script>



<div class="flex h-auto flex-col md:flex-row">
  {#if !showBookView}
  <!-- AddBook Form-->
  <div class="md:w-2/5 lg:w-1/2 border p-12">
    <AddBook book={edBook}/>
  </div>
  {:else}
  <!-- ViewBook -->
  <div class="md:w-2/5 lg:w-1/2 border p-12 flex flex-col gap-0">
    <Book book={selBook}/>
    <button on:click={() => showBookView = false} class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-10 rounded-full self-center mb-12">CLEAR</button>
  </div>
  {/if}
  <!-- List of Books -->
  <div class="md:w-3/5 lg:w-1/2 border p-12">
    <BookList on:viewBook={onViewBook} on:editBook={onEditBook} on:deleteBook={onDeleteBook} />
  </div>
</div>
