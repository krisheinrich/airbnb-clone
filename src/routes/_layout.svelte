<script>
	import Nav from '../components/Nav.svelte';
	import Modal from '../components/Modal.svelte';
	import RegistrationModal from '../components/RegistrationModal.svelte';
	import LoginModal from '../components/LoginModal.svelte';
	import { showModal, showLoginModal, showRegistrationModal } from '../store';

	export let segment;

	const showSignup = () => {
		showLoginModal.set(false);
		showRegistrationModal.set(true);
	};

	const showLogin = () => {
		showRegistrationModal.set(false);
		showLoginModal.set(true);
	};

	const closeModal = () => {
		showRegistrationModal.set(false);
		showLoginModal.set(false);
		showModal.set(false);
	};
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

{#if $showModal}
	<Modal on:close={() => showModal.set(false)}>
		{#if $showLoginModal}
			<LoginModal on:showSignup={showSignup} on:closeModal={closeModal}/>
		{/if}
		{#if $showRegistrationModal}
			<RegistrationModal on:showLogin={showLogin} on:closeModal={closeModal}/>
		{/if}
	</Modal>
{/if}
