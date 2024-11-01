// Import Firebase and Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase and services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// Function to handle the date submission
async function submitDate() {
    // Get the date from the input field
    const dateInput = document.getElementById('date').value;
    
    if (!dateInput) {
        alert("Please select a date.");
        return;
    }

    try {
        // Reference to the 'DaysClosed' collection
        const daysClosedRef = collection(db, 'DaysClosed');
        
        // Add the date to Firestore
        await addDoc(daysClosedRef, {
            closedDate: dateInput,
        });
        
        alert("Date successfully added to DaysClosed!");
    } catch (error) {
        console.error("Error adding date to DaysClosed: ", error);
    }
}

// Add event listener to the submit button
document.getElementById('submit-button').addEventListener('click', (event) => {
    event.preventDefault();
    submitDate();
});