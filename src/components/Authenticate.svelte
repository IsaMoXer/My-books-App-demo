<script>
  import { authHandlers, sendJWTToken } from "../stores/authStore";

  let email = $state("");
  let password = $state("");
  let confrimPass = $state("");
  let error = $state(false);
  let register = $state(true);
  let authenticating = $state(false);

  async function handleAuthenticate() {
    if (authenticating) {
            return;
        }

    if(!email || !password || (register && !confrimPass)){
      error = true;
      return;
    }

    authenticating = true;

    try {
            if (!register) {
                await authHandlers.login(email, password);
            } else {
                await authHandlers.signup(email, password);
            }
        } catch (err) {
            console.log("There was an auth error", err);
            error = true;
            authenticating = false;
        }
  };
  
  function handleRegister() {
      register = !register;
  };

</script>


<div class="flex flex-col justify-center items-center flex-1 p-2">
  <form class="flex flex-col gap-6 my-0 mx-auto w-96 max-w-full">
    <h1 class="text-4xl text-center font-bold">{register ? "Register" : "Login"}</h1>
    {#if error}
    <p class="text-coral-css text-sm text-center">The email address or the password are not correct!</p>
    {/if}
    <label for="email">
      <input bind:value={email} class="text-sm w-full bg-transparent text-black p-1" type="email" placeholder="Email" name="email">
    </label>
    <label for="password">
      <input bind:value={password} class="text-sm w-full bg-transparent text-black p-1" type="password" placeholder="Password" name="password">
    </label>
    {#if register}
      <label for="confirmPassword">
        <input bind:value={confrimPass} class="text-sm w-full bg-transparent text-black p-1" type="password" placeholder="Confirm password" name="confirmPassword">
      </label>
    {/if}
    
    <button class="text-white bg-navy rounded-md py-1.5 px-0 hover:bg-blue-css" on:click={handleAuthenticate}>
      {#if authenticating}
      <i class="fa-solid fa-spinner loadingSpinner" />
      {:else}
      SUBMIT
      {/if}
    </button>
  </form>
  <div class="text-xs text-center">
    {#if register}
      <div class="flex gap-1 py-1">
        <p>Already have an account?</p>
        <button on:click={handleRegister} class="text-coral-css cursor-pointer">Login</button>
      </div>
    {:else}
      <div class="flex gap-1 py-1">
        <p>Don't have an account yet?</p>
        <button on:click={handleRegister} class="text-coral-css cursor-pointer">Register</button>
      </div>
    {/if}
  </div>
</div>

<style>
  * {
    transition-duration: 300ms;
  }

  label {
    position: relative;
    border: 1px solid navy;
    border-radius: 5px;
    padding: 4px 8px;
  }

  /* input:focus {
    border:none;
    outline: none;
  } */

  .loadingSpinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>