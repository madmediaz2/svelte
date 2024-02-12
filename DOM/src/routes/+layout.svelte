<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
    import Header from './header.svelte';
	import './styles.css';
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
	}
	
</style>