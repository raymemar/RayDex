import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC6gMHVS_f4J6keNZUCSyKeTuLgveKyBBI",
    authDomain: "atv-extra-2e1f5.firebaseapp.com",
    projectId: "atv-extra-2e1f5",
    storageBucket: "atv-extra-2e1f5.firebasestorage.app",
    messagingSenderId: "283077488221",
    appId: "1:283077488221:web:a15f5fad2accf3341967b4"
};

const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);