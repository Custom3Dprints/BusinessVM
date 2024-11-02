function populateTimeDropdown() {
    const dropdown = document.getElementById('time');
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;
    
    // Times available from 3:00 PM (15:00) to 10:00 PM (22:00) in 30-minute increments
    const timeOptions = [
        "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
        "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
        "21:00", "21:30", "22:00"
    ];
    timeOptions.forEach(time => {
        const [hours, minutes] = time.split(':').map(Number);

        //temp for testing
        const option = document.createElement('option');
        option.value = time;
        option.textContent = `${hours > 12 ? hours - 12 : hours}:${minutes === 0 ? '00' : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        dropdown.appendChild(option);
    });
}
// Populate the dropdown on page load
window.onload = populateTimeDropdown;