import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../lib/firebase/firebase.client';


export const authStore = writable({
    isLoading: true,
    currentUser: null
});

export const authHandlers = {
    login: async (email, password) =>{ 
        await signInWithEmailAndPassword(auth, email, password);
    },
    signup: async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    },
    logout: async () => {
        await signOut(auth);
        console.log('logged out');
    },
    resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email);
    },
    updateEmail: async (email) =>{
        await updateEmail(auth, email);
    },
    updatePassword: async (password) =>{
        await updatePassword(auth, password);
    }
}