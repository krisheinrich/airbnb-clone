<script>
	export let segment;
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
		<a href="/"><img src="/img/logo.png" alt=""></a>
	</div>
	<nav>
		<ul>
			<li><a class='{segment === undefined ? "selected" : ""}' href='become-a-host'>Become a Host</a></li>
			<li><a class='{segment === "register" ? "selected" : ""}' href='register'>Sign Up</a></li>
			<li><a class='{segment === "login" ? "selected" : ""}' href='login'>Log In</a></li>
		</ul>
	</nav>
</div>
