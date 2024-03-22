<script>
import "../../app.css";
import { onMount } from 'svelte';
import { initBooks } from '../../stores/books.svelte.js';
import Navbar from '../../components/Navbar.svelte';
import Footer from '../../components/Footer.svelte';

onMount(async() => {
  console.log('Mounting dashboard...');
  initBooks();
});  
</script>


<Navbar />

<slot />

<Footer />

