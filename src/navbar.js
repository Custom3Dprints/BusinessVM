// Fetch navbar.html and insert its content into #navbar
fetch('../public/navbar.html')
	.then(response => response.text())
	.then(html => {
		document.getElementById('navbar').innerHTML = html;
		
		// Attach event listeners
		document.getElementById('Events-link').addEventListener('click', () => window.location.href = "../public/Events.html");
		document.getElementById('Reservations-link').addEventListener('click', () => window.location.href = "../public/Reservations.html");
		document.getElementById('Closed-link').addEventListener('click', () => window.location.href = "../public/ClosedDays.html");
		
		
		// Mobile menu toggle
		const menu = document.querySelector('#mobile-menu');
		const menuLinks = document.querySelector('.navbar__menu');
		menu.addEventListener('click', function(){
			menu.classList.toggle('is-active');
			menuLinks.classList.toggle('active');
		});
	});
