<script>
  import { createBook } from "../../http-actions/books-api.js";

  let name = $state("");
  let author = $state("");
  let pages = $state("");
  let isbn = $state("");
  let cover_url = $state("");

  const addBook = async () => {
    const book = { name, pages, isbn, cover_url, author };
    const response = await createBook(book);
    if (response.error) {
      console.log(response.error);
      return;
    }

    name = "";
    author = "";
    pages = "";
    isbn = "";
    cover_url = "";

    console.log("Book added!");
  };
</script>



<form class="max-w-sm mx-auto mt-12">
  <h1 class="text-center mb-4">ADD A BOOK</h1>
  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book name:</label>
  <input type="text" id="name" name="name" bind:value={name} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /><br />
  <label for="author" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author:</label>
  <input type="text" id="author" name="author" bind:value={author} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /><br />
  <label for="pages" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of pages:</label>
  <input type="number" id="pages" name="pages" bind:value={pages} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /><br />
  <label for="isbn" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ISBN:</label>
  <input type="text" id="isbn" name="isbn" bind:value={isbn} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /><br />
  <label for="cover_url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image url:</label>
  <input type="text" id="cover_url" name="cover_url" bind:value={cover_url} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /><br />
  <div class="text-center">
    <button on:click={addBook} class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">SUBMIT</button>
  </div>
</form>

