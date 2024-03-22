<script>
  import "../app.css"
  import { onDestroy, onMount } from 'svelte';
  //import { initBooks } from '../stores/books.svelte.js';
  import { auth, db } from "$lib/firebase/firebaseConfig";
  import { getDoc, doc, setDoc, collection, addDoc } from "firebase/firestore";
  import { authStore, sendJWTToken } from "../stores/authStore";

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
    console.log('Mounting register/login page...');
    //initBooks();
    try {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const currentPath = window.location.pathname;

            if (!user && !nonAuthRoutes.includes(currentPath)) {
                window.location.href = "/";
                return;
            }

            if (user && currentPath === "/") {
                window.location.href = "/dashboard";
                return;
            }

            if (!user) {
                return;
            }

            //There is a logged user in the dashboard
           await sendJWTToken();
            let dataToSetToStore;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);           

            if (!docSnap.exists()) {
                console.log("Creating User");
                const userRef = doc(db, "users", user.uid);
                
                dataToSetToStore = {
                    email: user.email,
                    userId: user.uid,
                    /* books: [], */
                };
                
                await setDoc(userRef, dataToSetToStore);

                // Create a subcollection called "books" inside the user document
                const booksCollectionRef = collection(userRef, "books");
                // Add a sample book to the "books" subcollection
                const bookData = {
                    title: "Sample Book",
                    author: "Sample Author"
                };
                
                await addDoc(booksCollectionRef, bookData);
        
            } else {
                console.log("Fetching User");
                const userData = docSnap.data();
                console.log('User Data: ', userData);
                dataToSetToStore = userData;
            }
            // Update the client side from server (database)
            authStore.update((curr) => {
                return {
                    /* ...curr, */
                    user,
                    data: dataToSetToStore,
                    loading: false,
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
		};    
  });
</script>

<slot />