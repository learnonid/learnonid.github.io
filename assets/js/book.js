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

            // Tampilkan tombol pembelian hanya jika token ada di cookie
            showPurchaseButtonIfTokenExists(cardContent, book);

            card.appendChild(cardContent);
            cardsWrapper.appendChild(card);
        });

        if (visibleCards >= books.length) {
            loadMoreButton.classList.add('hidden');
        } else {
            loadMoreButton.classList.remove('hidden');
        }

        if (visibleCards > 6) {
            collapseButton.classList.remove('hidden');
        } else {
            collapseButton.classList.add('hidden');
        }
    }

    function getCookie(name) {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        for (const cookie of cookies) {
            const [key, value] = cookie.split('=');
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return null;
    }

    function showPurchaseButtonIfTokenExists(cardContent, book) {
        const token = getCookie('authToken');
        if (token) {
            const purchaseButton = document.createElement('button');
            purchaseButton.className = 'bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600';
            purchaseButton.textContent = 'Beli Buku';
            purchaseButton.addEventListener('click', () => showPurchaseForm(book));
            cardContent.appendChild(purchaseButton);
        }
    }

    async function uploadPayment(data) {
        try {
            const response = await fetch('http://localhost:3000/book/pay', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            alert('Pembayaran berhasil! Data Anda telah dikirim.');
        } catch (error) {
            console.error('Error uploading payment:', error);
            alert('Gagal mengunggah pembayaran. Silakan coba lagi.');
        }
    }

    function showPurchaseForm(book) {
        const userId = localStorage.getItem('userId'); // Ambil user_id dari localStorage
        if (!userId) {
            alert('User ID tidak ditemukan. Silakan login terlebih dahulu.');
            return;
        }
    
        // Fetch user detail berdasarkan user_id
        fetch(`http://localhost:3000/user/detail/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Gagal mendapatkan data pengguna: ${response.statusText}`);
                }
                return response.json();
            })
            .then(user => {
                console.log(user)
                console.log(user.user.full_name)
                const fullName = user.user.full_name || 'Nama Tidak Ditemukan'; // Ambil full_name dari respons
    
                // Buat modal form pembelian
                const formContainer = document.createElement('div');
                formContainer.className = 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50';
    
                const form = document.createElement('form');
                form.className = 'bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative';
                form.enctype = 'multipart/form-data';
    
                // Tombol Close
                const closeButton = document.createElement('button');
                closeButton.type = 'button';
                closeButton.textContent = 'X';
                closeButton.className = 'absolute top-4 right-4 text-xl font-semibold text-gray-700 hover:text-red-500';
                closeButton.addEventListener('click', () => {
                    document.body.removeChild(formContainer);
                });
    
                // Nama Lengkap
                const fullNameLabel = document.createElement('label');
                fullNameLabel.textContent = 'Nama Lengkap';
                fullNameLabel.className = 'block font-semibold text-gray-700';
    
                const fullNameInput = document.createElement('input');
                fullNameInput.type = 'text';
                fullNameInput.name = 'full_name';
                fullNameInput.value = fullName;
                fullNameInput.disabled = true; // Non-editable
                fullNameInput.className = 'mb-4 p-2 w-full border rounded';
    
                // Nama Buku
                const bookNameLabel = document.createElement('label');
                bookNameLabel.textContent = 'Nama Buku';
                bookNameLabel.className = 'block font-semibold text-gray-700';
    
                const bookNameInput = document.createElement('input');
                bookNameInput.type = 'text';
                bookNameInput.name = 'book_name';
                bookNameInput.value = book.book_name;
                bookNameInput.disabled = true;
                bookNameInput.className = 'mb-4 p-2 w-full border rounded';
    
                // Harga
                const priceLabel = document.createElement('label');
                priceLabel.textContent = 'Harga';
                priceLabel.className = 'block font-semibold text-gray-700';
    
                const priceInput = document.createElement('input');
                priceInput.type = 'text';
                priceInput.value = `Rp${book.price.toLocaleString('id-ID')}`;
                priceInput.disabled = true;
                priceInput.className = 'mb-4 p-2 w-full border rounded';
    
                // Unggah Bukti Pembayaran
                const proofLabel = document.createElement('label');
                proofLabel.textContent = 'Unggah Bukti Pembayaran';
                proofLabel.className = 'block font-semibold text-gray-700';
    
                const proofInput = document.createElement('input');
                proofInput.type = 'file';
                proofInput.name = 'payment_receipt';
                proofInput.required = true;
                proofInput.accept = 'image/*';
                proofInput.className = 'mb-4 p-2 w-full border rounded';
    
                // Informasi Rekening
                const accountInfo = document.createElement('p');
                accountInfo.textContent = 'Lakukan pembayaran ke rekening Bank ABC: 123-456-7890';
                accountInfo.className = 'text-sm text-gray-600 mt-4';
    
                // Tombol Submit
                const submitButton = document.createElement('button');
                submitButton.type = 'submit';
                submitButton.textContent = 'Konfirmasi Pembelian';
                submitButton.className = 'bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600';
    
                form.appendChild(closeButton);
                form.appendChild(fullNameLabel);
                form.appendChild(fullNameInput);
                form.appendChild(bookNameLabel);
                form.appendChild(bookNameInput);
                form.appendChild(priceLabel);
                form.appendChild(priceInput);
                form.appendChild(proofLabel);
                form.appendChild(proofInput);
                form.appendChild(accountInfo); // Tambahkan Informasi Rekening
                form.appendChild(submitButton);
                formContainer.appendChild(form);
                document.body.appendChild(formContainer);
    
                // Submit form
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
    
                    if (!proofInput.files[0]) {
                        alert('Harap unggah bukti pembayaran!');
                        return;
                    }
    
                    const formData = new FormData();
                    formData.append('user_id', userId); // Gunakan user_id dari localStorage
                    formData.append('book_id', book.book_id);
                    formData.append('book_name', book.book_name);
                    formData.append('price', book.price);
                    formData.append('payment_receipt', proofInput.files[0]);
                    formData.append('full_name', fullName);
    
                    await uploadPayment(formData);
                    document.body.removeChild(formContainer);
                });
            })
            .catch(error => {
                console.error('Error fetching user detail:', error);
                alert('Gagal mendapatkan data pengguna. Silakan coba lagi.');
            });
    }
    
    const loadMoreButton = document.createElement('button');
    loadMoreButton.className = 'tbl';
    loadMoreButton.textContent = 'Lebih Banyak';
    loadMoreButton.addEventListener('click', () => {
        visibleCards += 6;
        renderCards();
    });

    const collapseButton = document.createElement('button');
    collapseButton.className = 'tbl hidden';
    collapseButton.textContent = 'Lebih Sedikit';
    collapseButton.addEventListener('click', () => {
        visibleCards = 6;
        renderCards();
    });

    renderCards();

    section.appendChild(cardsWrapper);
    section.appendChild(loadMoreButton);
    section.appendChild(collapseButton);
    booksContainer.appendChild(section);
});

function generateRandomColor(bookName) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="160">
            <rect width="100%" height="100%" fill="#${randomColor}" />
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20" font-family="Arial, sans-serif">
                ${bookName || 'Buku'}
            </text>
        </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}
