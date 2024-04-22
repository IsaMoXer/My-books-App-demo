<script>
import "../../app.css";
import { onMount } from 'svelte';
import { initBooks } from '../../stores/books.svelte.js';
import Navbar from '../../components/Navbar.svelte';
import Footer from '../../components/Footer.svelte';
import { authStoreRead } from "../../stores/authStore";

/**This will prevent client side rendering before user is logged in*/
export let data;
let isLoggedIn = data.isLoggedIn;
$: isLoggedIn = $authStoreRead.isActive ? $authStoreRead.isLoggedIn : data.isLoggedIn;

onMount(() => {
  console.log('Mounting dashboard...');
  console.log('/*/*/*/*/*/*Islogged in 1 : ', isLoggedIn);
  if(data.loggedIn ){
    console.log('USER LOGGED IN!!!');
  }
  initBooks();
});  
</script>

{#if isLoggedIn}
<Navbar />
<slot />
<Footer />
{/if}

