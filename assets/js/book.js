document.addEventListener('DOMContentLoaded', async () => {
    const booksContainer = document.getElementById('books');

    // URL endpoint untuk mengambil data buku
    const booksEndpoint = 'http://127.0.0.1:3000/book/all';

    // Fungsi untuk mengambil data dari API
    async function fetchBooks() {
        try {
            const response = await fetch(booksEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Gagal mengambil data buku:', error);
            return [];
        }
    }

    let response = await fetchBooks();
    let books = response.books || [];
    let visibleCards = 6;

    // Membuat container untuk kartu buku
    const section = document.createElement('section');
    section.className = 'books-section py-16 px-6';

    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold mb-8 text-center';
    title.textContent = 'Katalog Buku';
    section.appendChild(title);

    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'cards-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

    // Fungsi untuk merender kartu buku
    function renderCards() {
        cardsWrapper.innerHTML = '';
        books.slice(0, visibleCards).forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card bg-white shadow-md rounded-lg overflow-hidden';

            // Cover buku (Placeholder)
            const image = document.createElement('img');
            image.src = generateRandomColor(book.book_name);
            image.alt = book.book_name;
            image.className = 'w-full h-40 object-cover';
            card.appendChild(image);

            const cardContent = document.createElement('div');
            cardContent.className = 'p-4';

            const name = document.createElement('h3');
            name.className = 'text-xl font-semibold mb-2';
            name.textContent = book.book_name;
            cardContent.appendChild(name);

            const author = document.createElement('p');
            author.className = 'text-sm text-gray-600';
            author.textContent = `Penulis: ${book.author}`;
            cardContent.appendChild(author);

            const publisher = document.createElement('p');
            publisher.className = 'text-sm text-gray-600';
            publisher.textContent = `Penerbit: ${book.publisher}`;
            cardContent.appendChild(publisher);

            const year = document.createElement('p');
            year.className = 'text-sm text-gray-600';
            year.textContent = `Tahun: ${book.year}`;
            cardContent.appendChild(year);

            const price = document.createElement('p');
            price.className = 'text-lg font-semibold text-green-500 mt-2';
            price.textContent = `Harga: Rp${book.price.toLocaleString('id-ID')}`;
            cardContent.appendChild(price);

            if (book.store_link) {
                const storeLink = document.createElement('a');
                storeLink.className = 'text-blue-500 hover:underline mt-2 block';
                storeLink.href = book.store_link;
                storeLink.textContent = 'Beli Buku';
                storeLink.target = '_blank';
                cardContent.appendChild(storeLink);
            }

            card.appendChild(cardContent);
            cardsWrapper.appendChild(card);
        });

        // Menyembunyikan tombol "Load More" jika semua buku sudah ditampilkan
        if (visibleCards >= books.length) {
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

    // Render buku pertama kali
    renderCards();

    // Menambahkan komponen ke halaman
    section.appendChild(cardsWrapper);
    section.appendChild(loadMoreButton);
    section.appendChild(collapseButton);
    booksContainer.appendChild(section);
});

function generateRandomColor(bookName) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'); // Hex color
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="160">
            <rect width="100%" height="100%" fill="#${randomColor}" />
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20" font-family="Arial, sans-serif">
                ${bookName || 'Buku'}
            </text>
        </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}
