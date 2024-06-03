<script>
  import "../app.css"
  import {  onMount } from 'svelte';
  import { auth, db } from "$lib/firebase/firebaseConfig";
  import { getDoc, doc, setDoc } from "firebase/firestore";
  import { authStore, sendJWTToken } from "../stores/authStore";
  import { initBooks } from "../stores/books.svelte";


  let timerId;
	async function sendServerToken() {
		try {
			await sendJWTToken();
		} catch (error) {
			clearInterval(timerId);
			console.log(error);
		}
	}
   
  const nonAuthRoutes = ["/"];
  onMount(async () => {
    try {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
            await sendJWTToken();
            const currentPath = window.location.pathname;

             if (!user && !nonAuthRoutes.includes(currentPath)) {
                window.location.href = "/";
                return;
            }

            if (user && currentPath === "/") {
                window.location.href = "/dashboard";
                initBooks();
                return;
            } 
            
            if (!user) {
                return;
            } 

            //There is a logged user in the dashboard
            let dataToSetToStore;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);           

            if (!docSnap.exists()) {
                const userRef = doc(db, "users", user.uid);
                
                dataToSetToStore = {
                    email: user.email,
                    userId: user.uid,
                };
                
                await setDoc(userRef, dataToSetToStore);
            
            // There is a user created already, fetching info from database...
            } else {
                const userData = docSnap.data();
                dataToSetToStore = userData;
            }
            // Update the client side from server (database)
            authStore.update(() => {
                return {
                    user,
                    data: dataToSetToStore,
                    isLoading: false,
                };
            });            
        });

        
        await sendServerToken();
		timerId = setInterval(async () => {
			await sendServerToken();
		}, 1000 * 10 * 60);

        return unsubscribe;

		} catch (e) {
			console.log(e);
		}
		return () => {
			clearInterval(timerId);
		} 

  });
</script>

<slot />

<svelte:head>
  <title>My Books App</title>
</svelte:head>