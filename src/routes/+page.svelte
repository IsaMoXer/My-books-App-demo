<script>
  import Authenticate from '../components/Authenticate.svelte';

</script>


<div class="m-auto p-12 h-screen flex items-center bgBookImage" role="img" aria-label="books">
  <div class="bg-slate-900 m-auto py-10 px-4 flex items-center drop-shadow-md rounded-lg max-w-md sm:w-fit">
    <Authenticate />
  </div>
</div>

  <style>
    *{
      color: white;
    }

    .bgBookImage {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-image: linear-gradient(to right bottom, rgba(0, 0, 70, 0.75),rgba(0, 0, 70, 0.75)), url('/images/shiromani-kant-mo3FOTG62ao-unsplash.jpg');
      background-size: cover;
      background-position: center;
    }

  </style>