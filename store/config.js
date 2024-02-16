import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDd_mF5DvSEN1Jll4q1tk8PfIdvvFEON8M",
  authDomain: "react-native-expense-tra-68f45.firebaseapp.com",
  databaseURL:
    "https://react-native-expense-tra-68f45-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-expense-tra-68f45",
  storageBucket: "react-native-expense-tra-68f45.appspot.com",
  messagingSenderId: "863887998112",
  appId: "1:863887998112:web:5af7fab3b64719f3979dc5",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {db}