<script>
  import { createEventDispatcher } from 'svelte';
  import axios from 'axios';

  const dispatch = createEventDispatcher();
  
  let email = '';
  let password = '';
  let passwordConfirmation = '';
  
  const onSubmit = async () => {
    const response = await axios.post('auth/register', { email, password, passwordConfirmation });
    console.log(response);
  };
</script>

<h2>Sign Up</h2>
<div>
  <form on:submit|preventDefault={onSubmit}>
    <input type="email" bind:value={email} placeholder="Email address"/>
    <input type="password" bind:value={password} placeholder="Password"/>
    <input type="password" bind:value={passwordConfirmation} placeholder="Enter password again"/>
    <button class="button">Sign Up</button> 
  </form>
</div>
<p>Already have an account? <a href="javascript:;" on:click={() => dispatch('showLogin')}>Log In</a></p>