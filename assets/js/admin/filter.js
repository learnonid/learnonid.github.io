document.addEventListener('DOMContentLoaded', function () {
    const filterItems = document.querySelectorAll('#filter li');
    const eventContainer = document.getElementById('event-container'); // Ganti dengan ID kontainer tempat Anda menampilkan event
    
    filterItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all items
            filterItems.forEach(i => i.classList.remove('bg-main-blue', 'text-white'));
            
            // Add active class to the clicked item
            item.classList.add('bg-main-blue', 'text-white');

            // Determine the filter type based on the clicked item
            let filterType = '';
            if (item.innerText === 'Online Events') {
                filterType = '/type/online';
            } else if (item.innerText === 'Offline Events') {
                filterType = '/type/offline';
            } else {
                filterType = '/all';
            }

            // Fetch events based on filter type
            fetchEvents(filterType);
        });
    });

    // Function to fetch events from the API
    function fetchEvents(type) {
        const url = `http://localhost:8080/events${type}`;  // Sesuaikan dengan URL API Anda
        fetch(url)
            .then(response => response.json())
            .then(events => {
                displayEvents(events);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }

    // Function to display events in the event container
    function displayEvents(events) {
        eventContainer.innerHTML = '';  // Clear current events

        if (events.length === 0) {
            eventContainer.innerHTML = '<p>No events found.</p>';
            return;
        }

        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('event-item');
            eventElement.innerHTML = `
                <h3>${event.event_name}</h3>
                <p>${event.event_date}</p>
                <p>Price: Rp ${event.price.toLocaleString()}</p>
                <p>Location: ${event.location}</p>
            `;
            eventContainer.appendChild(eventElement);
        });
    }

    // Fetch all events initially
    fetchEvents('/all');
});
