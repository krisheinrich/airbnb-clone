<script>
	import axios from 'axios';
	import { stores } from '@sapper/app';
	import { showModal, showLoginModal, showRegistrationModal } from '../store';

	const { session } = stores();

	export let segment;

	const navItems = [
		{
			text: 'Become a Host',
			href: 'become-a-host',
			class: segment === undefined ? "selected" : "",
			onClick: () => {}
		}, {
			text: 'Sign Up',
			href: 'javascript:;',
			class: segment === "register" ? "selected" : "",
			onClick: () => {
				showModal.set(true);
				showLoginModal.set(false);
				showRegistrationModal.set(true);
			}
		}, {
			text: 'Log In',
			href: 'javascript:;',
			class: segment === "login" ? "selected" : "",
			onClick: () => {
				showModal.set(true);
				showLoginModal.set(true);
				showRegistrationModal.set(false);
			}
		}
	];

	const onLogOut = async () => {
		await axios.post('auth/logout');
		session.set({ user: null });
	};
</script>

<style>
	.nav-container {
		border-bottom: 1px solid #eee;
		height: 50px;
	}

	.logo {
		float: left;
	}

	.logo a {
		padding: 0;
		margin: 10px 20px;
	}

	img {
		height: 30px;
	}

	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		float: right;
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.username {
		padding: 1em 0.5em;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: 5px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<div class="nav-container">
	<div class="logo">
		<a href="/"><img src="/img/logo.png" alt="Logo"></a>
	</div>
	<nav>
		<ul>
			{#if $session.user}
				<li class="username">{$session.user}</li>
				<li>
					<a href="javascript:" on:click={onLogOut}>Log Out</a>
				</li>
			{:else}
				{#each navItems as item}
					<li>
						<a class={item.class} href={item.href} on:click={item.onClick}>{item.text}</a>
					</li>
				{/each}
			{/if}
		</ul>
	</nav>
</div>
