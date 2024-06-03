<script>
  import { authHandlers } from "../stores/authStore";

  let email = $state("");
  let password = $state("");
  let confirmPass = $state("");
  let register = $state(true);
  let authenticating = $state(false);
  let error = $state(false);
  let errorConfirm = $state(false);
  let errorFormat = $state(false);

  async function handleAuthenticate() {
    if (authenticating) {
            return;
        }

    // Reset all errors everytime we submit the form
    error, errorConfirm, errorFormat = false;

    // Error when REGISTERing and wrong format or empty fields
    if ((register && !validateEmail(email)) || (register && !validatePassword(password))) {
      errorFormat = true;
      return;
    }    

    if(register && password !== confirmPass) {
      errorConfirm = true;
      return
    }

    if (!email || !password || (register && !confirmPass)) {
      error = true;
      return;
    }

    
    // Once data is validated, set authenticating to true
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

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }

</script>

<div class="flex flex-col justify-center items-center flex-1 px-2 mx-auto">
  <img src="/images/Book_app_logo.png" alt="Logo" class="h-20 w-auto mb-6">
  <form class="flex flex-col gap-6 my-0 mx-auto w-60 sm:w-96">
    <h1 class="text-4xl text-center font-bold">{register ? "Register" : "Login"}</h1>

    <!-- Checking for errors -->
    {#if errorFormat}
    <p class="text-coral-css text-sm text-center">Email or password don't have the right format. Password must contain at least 8 characters, one capital letter, one lowercase letter and one number.</p>
    {:else if error}
    <p class="text-coral-css text-sm text-center">The email address or the password are not correct!</p>
    {:else if errorConfirm}
    <p class="text-coral-css text-sm text-center">Your password and confirmation password do not match!</p>
    {/if}
    <label for="email">
      <input bind:value={email} class="text-sm w-full bg-transparent text-white p-1" type="email" placeholder="Email" name="email">
    </label>
    <label for="password">
      <input bind:value={password} class="text-sm w-full bg-transparent text-white p-1" type="password" placeholder="Password" name="password">
    </label>
    {#if register}
      <label for="confirmPassword">
        <input bind:value={confirmPass} class="text-sm w-full bg-transparent text-white p-1" type="password" placeholder="Confirm password" name="confirmPassword">
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