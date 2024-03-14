<script>
  import BookList from '../components/book-management/BookList.svelte';
  import AddBook from '../components/book-management/AddBook.svelte';
</script>

<div class="flex">
  <div class="w-3/5 border p-4">
    <AddBook />
  </div>
  
  <div class="w-2/5 border p-4">
    <BookList />
  </div>
</div>