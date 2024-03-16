import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../lib/firebase/firebase.client';


export const authStore = writable({
    isLoading: true,
    currentUser: null,
    data: {}
});

export const authHandlers = {
    login: async (email, password) =>{ 
        await signInWithEmailAndPassword(auth, email, password);
        console.log($authStore);
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
        console.log('reset email sent', email);
    },
    updateEmail: async (email) =>{
        await updateEmail(auth, email);
    },
    updatePassword: async (password) =>{
        await updatePassword(auth, password);
    }
}