// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3xSnIPISWMMrtEK73_Olwp4SKKusJz3I",
  authDomain: "nextjs-shop-ing.firebaseapp.com",
  projectId: "nextjs-shop-ing",
  storageBucket: "nextjs-shop-ing.appspot.com",
  messagingSenderId: "208412951347",
  appId: "1:208412951347:web:35aec2c65583a2c30fb446",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
