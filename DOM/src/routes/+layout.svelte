<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
    import Header from './header.svelte';
	import './styles.css';

	
	import { onMount } from 'svelte';
	import { auth } from '../lib/firebase/firebase.client';
	import { authStore } from '../stores/authStore';

	onMount(() =>{
		const unsubscribe = auth.onAuthStateChanged((user) => {
			//console.log(user);
			authStore.update((curr) => {
				return {...curr, isLoading: false, currentUser: user }
			});
		});
	})
</script>



<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		min-height: 100vh;
		background-image: linear-gradient(to bottom, #ffffff, #6d6d6d);
		animation-name: popup;
    	animation-duration: 0.5s;
	}

	@keyframes popup{
    from{
        opacity: 0.5;
        transform: translateY(10px)
    }
    to{
        opacity: 1;
        transform: translateY(0px);
    }
}

	
</style>