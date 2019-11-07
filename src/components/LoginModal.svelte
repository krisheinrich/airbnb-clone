<script>
  import { createEventDispatcher } from 'svelte';
  import axios from 'axios';
  import { stores } from '@sapper/app';

  const { session } = stores();

  const dispatch = createEventDispatcher();

  let email = '';
  let password = '';
  
  const onSubmit = async () => {
    try {
      const response = await axios.post('auth/login', { email, password });
      if (response.data.status === 'error') {
        alert(response.data.message);
        return;
      }
      session.set({ user: email });
      dispatch('closeModal');
    } catch (error) {
      alert(error.response.data.message);
    }
  };
</script>

<h2>Log In</h2>
<div>
  <form on:submit|preventDefault={onSubmit}>
    <input type="email" bind:value={email} placeholder="Email address"/>
    <input type="password" bind:value={password} placeholder="Password"/>
    <button class="button">Log In</button> 
  </form>
</div>
<p>Don't have an account yet? <a href="javascript:;" on:click={() => dispatch('showSignup')}>Sign Up</a></p>