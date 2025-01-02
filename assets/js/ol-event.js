document.addEventListener('DOMContentLoaded', async () => {
    const eventsContainer = document.getElementById('events');

    // URL endpoint untuk mengambil data acara
    const eventsEndpoint = 'http://127.0.0.1:3000/event/online';

    // Fungsi untuk mengambil data dari API
    async function fetchEvents() {
        try {
            const response = await fetch(eventsEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Gagal mengambil data acara:', error);
            return [];
        }
    }

    let response = await fetchEvents();
    let events = response.events || [];
    let visibleCards = 6;

    // Membuat container untuk kartu acara
    const section = document.createElement('section');
    section.className = 'events-section py-16 px-6';

    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold mb-8 text-center';
    title.textContent = 'Acara yang Telah Terlaksana';
    section.appendChild(title);

    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'cards-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

    // Fungsi untuk merender kartu acara
    function renderCards() {
        cardsWrapper.innerHTML = '';
        events.slice(0, visibleCards).forEach(event => {
            const card = document.createElement('div');
            card.className = 'event-card bg-white shadow-md rounded-lg overflow-hidden';

            // Event image
            const image = document.createElement('img');
            image.src = event.event_image;
            image.alt = event.event_name;
            image.className = 'w-full h-40 object-cover';
            card.appendChild(image);

            const cardContent = document.createElement('div');
            cardContent.className = 'p-4';

            const name = document.createElement('h3');
            name.className = 'text-xl font-semibold mb-2';
            name.textContent = event.event_name;
            cardContent.appendChild(name);

            const type = document.createElement('p');
            type.className = 'text-sm text-orange-400 font-semibold';
            type.textContent = `${event.event_type}`;
            cardContent.appendChild(type);

            const date = document.createElement('p');
            date.className = 'text-sm text-gray-600';
            date.textContent = `${event.event_date}`;
            cardContent.appendChild(date);

            const location = document.createElement('p');
            location.className = 'text-sm text-gray-600 font-semibold';
            location.textContent = `${event.location}`;
            cardContent.appendChild(location);

            const description = document.createElement('p');
            description.className = 'text-sm text-gray-800 mt-2';
            description.textContent = event.description;
            cardContent.appendChild(description);

            card.appendChild(cardContent);
            cardsWrapper.appendChild(card);
        });

        // Menyembunyikan tombol "Load More" jika semua acara sudah ditampilkan
        if (visibleCards >= events.length) {
            loadMoreButton.classList.add('hidden');
        } else {
            loadMoreButton.classList.remove('hidden');
        }

        // Menampilkan tombol "Collapse" jika visibleCards lebih dari 6
        if (visibleCards > 6) {
            collapseButton.classList.remove('hidden');
        } else {
            collapseButton.classList.add('hidden');
        }
    }

    // Tombol Load More
    const loadMoreButton = document.createElement('button');
    loadMoreButton.className = 'tbl';
    loadMoreButton.textContent = 'Lebih Banyak';
    loadMoreButton.addEventListener('click', () => {
        visibleCards += 6;
        renderCards();
    });

    // Tombol Collapse
    const collapseButton = document.createElement('button');
    collapseButton.className = 'tbl hidden';
    collapseButton.textContent = 'Lebih Sedikit';
    collapseButton.addEventListener('click', () => {
        visibleCards = 6;
        renderCards();
    });

    // Render acara pertama kali
    renderCards();

    // Menambahkan komponen ke halaman
    section.appendChild(cardsWrapper);
    section.appendChild(loadMoreButton);
    section.appendChild(collapseButton);
    eventsContainer.appendChild(section);
});
