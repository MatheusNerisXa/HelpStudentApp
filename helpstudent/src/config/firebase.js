import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBI2rJBhe1kl-8cu__pXxptuEPg0DPvU80",
  authDomain: "helpstudent-5965f.firebaseapp.com",
  projectId: "helpstudent-5965f",
  storageBucket: "helpstudent-5965f.appspot.com",
  messagingSenderId: "42298725617",
  appId: "1:42298725617:web:92dcc11a52349690128550",
  measurementId: "G-CCXHXHQKD4"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
