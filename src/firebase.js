import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBTHhaz5t6StcnJJF_I7K3M4Eiwc1dOIM8",
  authDomain: "phone-a8912.firebaseapp.com",
  projectId: "phone-a8912",
  storageBucket: "phone-a8912.firebasestorage.app",
  messagingSenderId: "362580331282",
  appId: "1:362580331282:web:71380606d5a4273e5181cb",
  measurementId: "G-KV3XD12L30",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
