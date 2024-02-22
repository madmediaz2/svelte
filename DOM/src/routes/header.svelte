<script>
	import { onMount } from 'svelte';
	import GModal from './GModal.svelte';
	
	let showModal = false;
	const handleClose = () => {
		showModal = false;
	};

	let LoggedIn = false;

</script>

<GModal show = {showModal} on:close = {handleClose}/>
	

<header>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="/">CredibilityCrafters</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
			<span class="navbar-toggler-icon"></span>
		</button>
		
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item">
					<a class="nav-link" href="/features">Features</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/features">Pricing</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/calculator">Calculator</a>
				</li>
				
			</ul>
			{#if LoggedIn}
				<div class="login-button-container">
					<button class="btn btn-primary my-2 my-sm-0">Username</button>
				</div>
			{:else}
				<div class="login-button-container">
					<button id="GModal" class="btn btn-primary my-2 my-sm-0"
					on:click={() => { showModal = true;}}
					>Login
				</button>
					
				</div>
			{/if}
            </div>
	</nav>
	
</header>

<style>
	
	.bg-light {
		background-image: linear-gradient(to bottom, #ffffff, #cacaca);
	}

	.navbar{
		padding: 5 10px;
		padding-left: 5px;
	}

	.login-button-container {
        margin-left: auto;
		padding-right: 5px;
    }

</style>