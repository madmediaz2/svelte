<script>
	import { onMount } from 'svelte';
	import LoginModal from './LoginModal.svelte';
	import { authHandlers } from '../stores/authStore';
	import { authStore } from '../stores/authStore';
	import DashBoardModal from './DashBoardModal.svelte';

	

	async function logout(){
		await authHandlers.logout();
	}
	
	let loggedIn = false;
	let showModal = false;
	const handleClose = () => {
		showModal = false;
	};
</script>

{#if !$authStore.currentUser}
	<LoginModal show = {showModal}  on:close = {handleClose}/>
{:else}
	<DashBoardModal show = {showModal}  on:close = {handleClose}/>
{/if}
	

<header>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="/">CredibilityCrafters</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
			<span class="navbar-toggler-icon"></span>
		</button>
		
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item">
					<a class="nav-link" href="/pricing">Pricing</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/calculator">Calculator</a>
				</li>
				
			</ul>
				{#if $authStore.currentUser}
				<div class="login-button-container">
					<button id="Gmodal" class="btn btn-primary my-2 my-sm-0"
						on:click={() => { showModal = true;}}
						>Dashboard
					</button>
				</div>
				{:else}
				<div class="login-button-container">
					<button id="Gmodal" class="btn btn-primary my-2 my-sm-0"
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