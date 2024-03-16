<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
    import Header from './header.svelte';
	import './styles.css';
	import { onMount } from 'svelte';
	import { auth, db } from '../lib/firebase/firebase.client';
	import { authStore } from '../stores/authStore';
	import { doc, getDoc, setDoc } from 'firebase/firestore';

	const nonAuthRouters = ["/", "/pricing", "/calculator"];

	onMount(() =>{
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			//console.log(user);
			const currentPath = window.location.pathname;

			if(!user && !nonAuthRouters.includes(currentPath)){
				window.location.href = "/";
				return;
			}

			if(!user){
				return;
			}

			let dataToSetToStore;

			const docref = doc(db, "users", user.uid);
			const docSnap = await getDoc(docref);

			if(!docSnap.exists()){
				console.log("creating user");
				dataToSetToStore = {
					uid: user.uid,
					email: user.email,
					lastLogin: new Date().toISOString()
				}
				const userRef = doc(db, "users", user.uid);
				await setDoc(
					userRef,
					dataToSetToStore,
					{merge: true}
				);
			} else {
				const userData = docSnap.data();
				dataToSetToStore = userData;
			}

			authStore.update((curr) => {
				return {
					...curr, 
					isLoading: false, 
					currentUser: user }
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