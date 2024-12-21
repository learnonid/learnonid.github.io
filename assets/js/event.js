
document.addEventListener('DOMContentLoaded', () => {
    const eventsContainer = document.getElementById('events');

    // Data acara
    const events = [
        {
            event_name: 'Kursus Pemrograman Python',
            event_type: 'Online',
            event_date: '10 Januari 2024',
            location: 'Zoom',
            description: 'Pelajari dasar-dasar pemrograman Python dengan praktek langsung.',
            event_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYbsJFulTRg3kb36fs2oHH0rDX5C0uJ6HBDQ&s'
        },
        {
            event_name: 'Workshop Kecerdasan Buatan (AI)',
            event_type: 'Offline',
            event_date: '25 Januari 2024',
            location: 'Jakarta Convention Center',
            description: 'Pelajari teknik-teknik terbaru dalam pengembangan teknologi kecerdasan buatan.',
            event_image: 'https://www.meridean.org/images/artificial-intelligence-course-abroad.png'
        },
        {
            event_name: 'Pelatihan Internet of Things (IoT)',
            event_type: 'Online',
            event_date: '05 Februari 2024',
            location: 'Google Meet',
            description: 'Memahami konsep IoT dan bagaimana menghubungkan perangkat elektronik dengan internet.',
            event_image: 'https://www.excelptp.com/wp-content/uploads/2021/05/iot-banner-img.jpg'
        },
        {
            event_name: 'Seminar Desain Grafis',
            event_type: 'Offline',
            event_date: '15 Februari 2024',
            location: 'Jakarta Convention Center',
            description: 'Mengasah keterampilan desain grafis dengan menggunakan Adobe Illustrator dan Photoshop.',
            event_image: 'https://i.ytimg.com/vi/GQS7wPujL2k/maxresdefault.jpg'
        },
        {
            event_name: 'Pelatihan Blockchain',
            event_type: 'Online',
            event_date: '01 Maret 2024',
            location: 'Zoom',
            description: 'Memahami konsep blockchain dan penerapan teknologi ini dalam berbagai industri.',
            event_image: 'https://www.qtreetechnologies.in/images/block-chain-training-in-coimbatore.jpg'
        },
        {
            event_name: 'Seminar Strategi Pemasaran Digital',
            event_type: 'Offline',
            event_date: '10 Maret 2024',
            location: 'Jakarta Convention Center',
            description: 'Menguasai strategi pemasaran digital, SEO, dan manajemen media sosial.',
            event_image: 'https://courses.iid.org.in/public//uploads/media_manager/628.jpg'
        },
        {
            event_name: 'Workshop Pengembangan Aplikasi Mobile',
            event_type: 'Online',
            event_date: '20 Maret 2024',
            location: 'Google Meet',
            description: 'Pelajari cara membuat aplikasi mobile menggunakan Flutter dan React Native.',
            event_image: 'https://voksinstitute.com/assets/images/courses/voks-institute-mobile-app-development-course.png'
        },
        {
            event_name: 'Kursus Menulis Konten Kreatif',
            event_type: 'Offline',
            event_date: '05 April 2024',
            location: 'Jakarta Convention Center',
            description: 'Mengasah kemampuan menulis konten kreatif untuk web dan media sosial.',
            event_image: 'https://dubai.sae.edu/wp-content/uploads/sites/16/2023/01/Social-Media-1.jpg'
        },
        {
            event_name: 'Pelatihan Keamanan Siber',
            event_type: 'Online',
            event_date: '20 April 2024',
            location: 'Zoom',
            description: 'Pelajari dasar-dasar keamanan siber dan teknik perlindungan data online.',
            event_image: 'https://thecyberexpress.com/wp-content/uploads/2023/10/MicrosoftTeams-image-75.png'
        },
        {
            event_name: 'Workshop Analisis Data',
            event_type: 'Offline',
            event_date: '10 Mei 2024',
            location: 'Jakarta Convention Center',
            description: 'Menguasai teknik analisis data dengan Python dan alat bantu statistik.',
            event_image: 'https://www.cromacampus.com/public/uploads/Blog/2024/01/week_3/Data-Analyst-Course-After-12th-An-Ultimate-Guide-for-Learners.jpg'
        },
    ];
    

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
