<script>
	import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  const onSubmit = () => {
    alert("Log in");
  };
</script>

<h2>Log In</h2>
<div>
  <form on:submit|preventDefault={onSubmit}>
    <input type="email" id="email" placeholder="Email address"/>
    <input type="password" id="password" placeholder="Password"/>
    <button class="button">Log In</button> 
  </form>
</div>
<p>Don't have an account yet? <a href="javascript:;" on:click={() => dispatch('showSignup')}>Sign Up</a></p>