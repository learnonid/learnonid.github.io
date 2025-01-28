document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const itemsPerPage = 5;
    let totalBooks = 0;

    const bookTableBody = document.getElementById('bookTableBody');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const paginationInfo = document.getElementById('paginationInfo');

    // Fungsi format Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    }

    // Fetch books and manage pagination
    async function fetchBooks(page = 1) {
        try {
            const response = await fetch(`http://127.0.0.1:3000/book/all`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch books: ${response.statusText}`);
            }

            const responseData = await response.json();
            const books = responseData.books || [];
            totalBooks = books.length; // Update totalBooks dynamically from response

            const paginatedBooks = paginate(books, page, itemsPerPage);
            populateBooksTable(paginatedBooks);

            updatePaginationControls();
        } catch (error) {
            console.error('Error fetching books:', error);
            alert('Gagal memuat data buku. Silakan coba lagi.');
        }
    }

    // Paginate an array
    function paginate(array, page, size) {
        const start = (page - 1) * size;
        return array.slice(start, start + size);
    }

    // Populate table with book data
    function populateBooksTable(books) {
        bookTableBody.innerHTML = '';
        if (!Array.isArray(books) || books.length === 0) {
            bookTableBody.innerHTML = '<tr><td colspan="8" class="text-center py-4">No books available</td></tr>';
            return;
        }

        books.forEach(book => {
            const row = document.createElement('tr');
            const shortenedID = book.book_id ? book.book_id.slice(-3) : 'N/A';
            row.innerHTML = `
                <td class="px-6 py-4">${shortenedID}</td>
                <td class="px-6 py-4">${book.book_name || 'N/A'}</td>
                <td class="px-6 py-4">${book.author || 'N/A'}</td>
                <td class="px-6 py-4">${book.publisher || 'N/A'}</td>
                <td class="px-6 py-4">${book.year || 'N/A'}</td>
                <td class="px-6 py-4">${book.isbn || 'N/A'}</td>
                <td class="px-6 py-4">${formatRupiah(book.price || 0)}</td>
                <td class="px-6 py-4 flex gap-2">
                    <button class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" onclick="editBook('${book.book_id}')">
                        Edit
                    </button>
                    <button class="bg-red-500 text-white p-2 rounded hover:bg-red-700" onclick="deleteBook('${book.book_id}')">
                        Delete
                    </button>
                </td>
            `;
            bookTableBody.appendChild(row);
        });
    }

    // Update pagination controls
    function updatePaginationControls() {
        const totalPages = Math.ceil(totalBooks / itemsPerPage);
        paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    }

    // Pagination button events
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchBooks(currentPage);
        }
    });

    nextPageButton.addEventListener('click', () => {
        const totalPages = Math.ceil(totalBooks / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            fetchBooks(currentPage);
        }
    });

    // Initial fetch
    fetchBooks();

    // Modal and form handling for adding/updating a book
    const newBookButton = document.getElementById('newBookButton');
    const bookModal = document.getElementById('bookModal');
    const cancelButton = document.getElementById('cancelButton');
    const bookForm = document.getElementById('bookForm');
    const updateButton = document.getElementById('updateButton');

    let editingBookId = null;

    // Show modal
    newBookButton.addEventListener('click', () => {
        bookModal.classList.remove('hidden');
        editingBookId = null;
        updateButton.textContent = 'Create';
        bookForm.reset();
    });

    // Hide modal
    cancelButton.addEventListener('click', () => {
        bookModal.classList.add('hidden');
    });

    // Handle form submission
    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(bookForm);
        const bookData = Object.fromEntries(formData.entries());
    
        // Konversi year dan price ke tipe data yang sesuai
        bookData.year = parseInt(bookData.year || 0); // Pastikan year adalah integer
        bookData.price = parseFloat(bookData.price || 0); // Pastikan price adalah float
    
        if (!bookData.book_name || !bookData.author || isNaN(bookData.year) || isNaN(bookData.price)) {
            Swal.fire('Error', 'Please fill in all required fields correctly!', 'error');
            return;
        }
    
        const url = editingBookId
            ? `http://127.0.0.1:3000/book/update/${editingBookId}`
            : `http://127.0.0.1:3000/book/create`;
        const method = editingBookId ? 'PUT' : 'POST';
    
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to save book');
            }
    
            Swal.fire('Success', 'Book saved successfully', 'success').then(() => {
                fetchBooks(currentPage);
                bookModal.classList.add('hidden');
            });
        } catch (error) {
            console.error('Error saving book:', error);
            Swal.fire('Error', error.message, 'error');
        }
    }); 

    // Edit Book
    window.editBook = async function (bookId) {
        try {
            const response = await fetch(`http://127.0.0.1:3000/book/detail/${bookId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book details');
            }

            const data = await response.json();
            const book = data.book;

            editingBookId = bookId;
            updateButton.textContent = 'Update';

            document.getElementById('book_name').value = book.book_name;
            document.getElementById('author').value = book.author;
            document.getElementById('publisher').value = book.publisher;
            document.getElementById('year').value = book.year;
            document.getElementById('isbn').value = book.isbn;
            document.getElementById('price').value = book.price;
            document.getElementById('store_link').value = book.store_link;

            bookModal.classList.remove('hidden');
        } catch (error) {
            console.error('Error fetching book details:', error);
            Swal.fire('Error', 'Failed to fetch book details', 'error');
        }
    };

    // Delete Book
    window.deleteBook = async function (bookId) {
        const confirmation = await Swal.fire({
            title: 'Delete Book?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (!confirmation.isConfirmed) return;

        try {
            const response = await fetch(`http://127.0.0.1:3000/book/delete/${bookId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete book');
            }

            Swal.fire('Deleted!', 'Book has been deleted.', 'success');
            fetchBooks(currentPage);
        } catch (error) {
            console.error('Error deleting book:', error);
            Swal.fire('Error', error.message, 'error');
        }
    };
});
