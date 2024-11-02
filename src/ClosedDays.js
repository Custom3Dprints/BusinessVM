// Import Firebase and Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';

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
async function closedDate() {
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
            date: dateInput,
        });
    } catch (error) {
        console.error("Error adding date to DaysClosed: ", error);
    }
}
async function removeDate() {
    // Get the date from the input field
    const date = document.getElementById('date').value;
    

    try {
        // Query Reservations
        const getReservations = query(
            collection(db, "DaysClosed"),
            where('date', '==', date)
        );
        const ReservationsSnapshot = await getDocs(getReservations);

        // Check and delete the document in the correct collection
        if (!ReservationsSnapshot.empty) {
            ReservationsSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
                console.log(`Document with ID: ${doc.id} deleted from Reservations`);
                window.location.reload();
            });
        } else {
            console.log("No matching documents found for deletion.");
        }
    } catch (error) {
        console.error("Error deleting document:", error);
    }
}

// Add event listener to the submit button
document.getElementById('closed-button').addEventListener('click', (event) => {
    event.preventDefault();
    closedDate();
});
// remove event listener to the submit button
document.getElementById('remove-button').addEventListener('click', (event) => {
    event.preventDefault();
    removeDate();
});