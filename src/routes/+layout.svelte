<script>
  import { onMount } from 'svelte';
  import { initBooks } from '../stores/books.svelte.js';
  
  onMount(() => {
    console.log('Mounting...');
    initBooks();
  });
</script>

<slot />