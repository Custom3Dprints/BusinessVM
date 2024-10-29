import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




async function displayReservations() {
    try {
        // Fetch reservation documents from Firestore
        const snapshot = await getDocs(collection(db, 'Reservations'));

        // Get today's date and set the time to midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Set the end date for the week (7 days from today)
        const endDate = new Date();
        endDate.setDate(today.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);

        // Arrays to hold today's and this week's reservations
        const reservationsTdy = [];
        const reservationsWeek = [];

        // Helper function to convert 24-hour to 12-hour format
        const convertToStandardTime = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            const suffix = hours >= 12 ? 'PM' : 'AM';
            const adjustedHours = ((hours + 11) % 12) + 1;
            return `${adjustedHours}:${String(minutes).padStart(2, '0')} ${suffix}`;
        };

        // Loop through each document in the snapshot
        snapshot.forEach(doc => {
            const reservationData = doc.data();
            const getDate = new Date(reservationData.date);
            const adjustedDate = new Date(getDate.getTime() + getDate.getTimezoneOffset() * 60000);

            // Combine date and time for sorting
            const dateTimeString = `${reservationData.date}T${reservationData.time}`;
            const fullDateTime = new Date(dateTimeString);

            // Check if the reservation date is today or within the week
            if (adjustedDate.getTime() === today.getTime()) {
                reservationsTdy.push({ ...reservationData, fullDateTime });
            } else if (adjustedDate > today && adjustedDate <= endDate) {
                reservationsWeek.push({ ...reservationData, fullDateTime });
            }
        });

        // Sort reservations by full date and time
        reservationsTdy.sort((a, b) => a.fullDateTime - b.fullDateTime);
        reservationsWeek.sort((a, b) => a.fullDateTime - b.fullDateTime);

        // Function to create a section for reservations
        const createReservationSection = (reservations, title) => {
            const section = document.createElement('div');
            section.className='info';
            const titleElement = document.createElement('h3');
            titleElement.textContent = title;
            section.appendChild(titleElement);

            // If no reservations found, display a message
            if (reservations.length === 0) {
                const noReservationsElement = document.createElement('p');
                noReservationsElement.textContent = "No reservations found.";
                section.appendChild(noReservationsElement);
            } else {
                // Create reservation elements for each reservation
                reservations.forEach(reservationData => {
                    const reservationElement = document.createElement('div');
                    reservationElement.className = 'reservationelement';
                    reservationElement.innerHTML = `
                        <p>Date: ${reservationData.fullDateTime.toLocaleDateString()}</p>
                        <p>Time: ${convertToStandardTime(reservationData.time)}</p>
                        <p>Name: ${reservationData.name}</p>
                        <p>Number of Guests: ${reservationData.people}</p>
                        <p>Email: ${reservationData.email}</p>
                        <p>Phone Number: ${formatPhoneNumber(reservationData.phone)}</p>
                    `;
                    section.appendChild(reservationElement);
                });
            }

            return section;
        };

        // Get the elements to append the reservation sections
        const left_reservation = document.getElementById("left-reservation");
        const right_reservation = document.getElementById("right-reservation");

        // Append today's reservations
        const todaySection = createReservationSection(reservationsTdy, 'Today\'s Reservations');
        left_reservation.appendChild(todaySection);

        // Append this week’s reservations
        const weekSection = createReservationSection(reservationsWeek, 'This Week\'s Reservations');
        right_reservation.appendChild(weekSection);

    } catch (error) {
        // Log any errors that occur during the fetch process
        console.error("Error fetching reservations:", error);
    }
}


// Function to format phone numbers (example implementation)
function formatPhoneNumber(phone) {
    // Basic formatting logic for US phone numbers (you can customize this as needed)
    const cleaned = ('' + phone).replace(/\D/g, ''); // Remove non-digit characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone; // Return original if formatting fails
}

// Initialize the reservation display after the document is fully loaded
document.addEventListener("DOMContentLoaded", displayReservations);



