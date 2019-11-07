<script>
  import { createEventDispatcher } from 'svelte';
  import axios from 'axios';
  import { stores } from '@sapper/app';

  const { session } = stores();

  const dispatch = createEventDispatcher();
  
  let email = '';
  let password = '';
  let passwordConfirmation = '';
  
  const onSubmit = async () => {
    try {
      const response = await axios.post('auth/register', { email, password, passwordConfirmation });
      if (response.data.status === 'error') {
        alert(response.data.message);
        return;
      }

      session.set({ user: email });
      dispatch('closeModal');
    } catch (error) {
      alert(error.response.data.message);
      return;
    }
  };
</script>

<h2>Sign Up</h2>
<div>
  <form on:submit|preventDefault={onSubmit}>
    <input type="email" bind:value={email} placeholder="Email address"/>
    <input type="password" bind:value={password} placeholder="Password"/>
    <input type="password" bind:value={passwordConfirmation} placeholder="Enter password again"/>
    <button class="button">Sign Up</button> 
    <p>Already have an account? <a href="javascript:;" on:click={() => dispatch('showLogin')}>Log In</a></p>
  </form>
</div>
