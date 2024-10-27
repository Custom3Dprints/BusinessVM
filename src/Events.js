// Select elements
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const fileDetails = document.getElementById('file-details');
const fileButton = document.getElementById('file-button');
const preview = document.getElementById('preview');

// Prevent default behaviors for drag events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
    dropArea.addEventListener(event, e => e.preventDefault());
});

// Highlight drop area on drag over
['dragenter', 'dragover'].forEach(event => {
    dropArea.addEventListener(event, () => dropArea.classList.add('highlight'));
});

['dragleave', 'drop'].forEach(event => {
    dropArea.addEventListener(event, () => dropArea.classList.remove('highlight'));
});

// Handle file drop
dropArea.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (validateImage(file)) handleFile(file);
});

// Open file dialog on click of "choose file"
fileButton.addEventListener('click', () => fileInput.click());

// Handle file selection
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (validateImage(file)) handleFile(file);
});

// Display file details and preview
function handleFile(file) {
    fileDetails.innerHTML = `<p>File Name: ${file.name}</p><p>File Size: ${(file.size / 1024).toFixed(2)} KB</p>`;
    
    
}

// Validate image file type
function validateImage(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (validTypes.includes(file.type)) {
        return true;
    } else {
        alert('Please upload a valid image file (JPEG, PNG, GIF, WebP).');
        return false;
    }
}




// JavaScript to handle image preview and description display
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







