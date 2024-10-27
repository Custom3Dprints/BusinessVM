// Import Firebase and Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
const storage = getStorage(app);

// Preview functionality
document.getElementById("preview-button").addEventListener("click", function() {
    const fileInput = document.getElementById("file-input");
    const descriptionText = document.getElementById("description").value;
    const previewContainer = document.getElementById("preview-container");

    // Clear previous preview content
    previewContainer.innerHTML = '';

    // Display the uploaded image
    if (fileInput.files && fileInput.files[0]) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(fileInput.files[0]);
        img.style.maxWidth = "100%";
        img.style.marginTop = "10px";
        img.alt = "Image Preview";
        previewContainer.appendChild(img);
    }

    // Display the description below the image
    if (descriptionText) {
        const descriptionPara = document.createElement("p");
        descriptionPara.textContent = descriptionText;
        descriptionPara.style.marginTop = "10px";
        previewContainer.appendChild(descriptionPara);
    }
});

// Submit functionality
document.querySelector('button[type="submit"]').addEventListener("click", async function() {
    const fileInput = document.getElementById("file-input");
    const descriptionText = document.getElementById("description").value;
    const dateValue = document.getElementById("date").value;

    // Validate inputs
    if (!fileInput.files[0] || !descriptionText || !dateValue) {
        alert("Please fill in all fields, including selecting an image.");
        return;
    }

    // Prepare image for upload
    const file = fileInput.files[0];
    const storageRef = ref(storage, `images/${file.name}`);

    try {
        // Upload the image to Firebase Storage
        await uploadBytes(storageRef, file);
        console.log("Image uploaded successfully!");

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        // Prepare data for Firestore
        const data = {
            imageUrl: downloadURL,
            description: descriptionText,
            date: dateValue,
        };

        // Add the data to Firestore
        const docRef = await addDoc(collection(db, "Events"), data);
        console.log("Document written with ID: ", docRef.id);

        // Reset form inputs
        document.getElementById("file-input").value = '';
        document.getElementById("description").value = '';
        document.getElementById("date").value = '';
        document.getElementById("preview-container").innerHTML = '';

    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error submitting data. Please try again.");
    }
});

