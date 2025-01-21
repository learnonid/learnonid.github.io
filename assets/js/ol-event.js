document.addEventListener('DOMContentLoaded', async () => {
    const eventsContainer = document.getElementById('events');

    // URL endpoint untuk mengambil data acara
    const eventsEndpoint = 'http://127.0.0.1:3000/event/type/online';

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

    // Mendapatkan tanggal hari ini
    const today = new Date();

    // Mengurutkan acara berdasarkan tanggal terbaru
    events.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));

    // Membuat container untuk kartu acara
    const section = document.createElement('section');
    section.className = 'events-section py-16 px-6';

    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold mb-8 text-center';
    title.textContent = 'Kursus dan Acara';
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
            if (window.location.href === 'http://127.0.0.1:5500/cust/pelatihan-online.html' || window.location.href === 'http://127.0.0.1:5500/cust/index.html') {
                image.src = '../assets/img/course_cover.webp'; // Mengubah src jika sesuai
            } else if (window.location.href === 'https://learnonid.github.io/cust/pelatihan-online.html' || window.location.href === 'https://learnonid.github.io/cust/index.html') {
                image.src = '../assets/img/course_cover.webp'; // Mengubah src jika sesuai
            } else {
                image.src = 'assets/img/course_cover.webp'; // Nilai default jika tidak cocok
            }
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

            // Tambahkan tombol "Daftar" jika berada di URL tertentu dan tanggal acara tidak kurang dari hari ini
            const eventDate = new Date(event.event_date); // Konversi tanggal acara menjadi objek Date
            if (window.location.href === 'http://127.0.0.1:5500/cust/pelatihan-online.html' && eventDate >= today) {
                const registerButton = document.createElement('button');
                registerButton.className = 'mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600';
                registerButton.textContent = 'Daftar';
                registerButton.addEventListener('click', () => {
                    showRegistrationForm(event);
                });
                cardContent.appendChild(registerButton);
            } else if (window.location.href === 'https://learnonid.github.io/cust/pelatihan-online.html' && eventDate >= today) {
                const registerButton = document.createElement('button');
                registerButton.className = 'mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600';
                registerButton.textContent = 'Daftar';
                registerButton.addEventListener('click', () => {
                    showRegistrationForm(event);
                });
                cardContent.appendChild(registerButton);
            } else if (window.location.href === 'http://127.0.0.1:5500/cust/pelatihan-online.html' && eventDate >= today) {
                const registerButton = document.createElement('button');
                registerButton.className = 'mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600';
                registerButton.textContent = 'Daftar';
                registerButton.addEventListener('click', () => {
                    showRegistrationForm(event);
                });
                cardContent.appendChild(registerButton);
            } else if (window.location.href === 'https://learnonid.github.io/cust/pelatihan-online.html' && eventDate >= today) {
                const registerButton = document.createElement('button');
                registerButton.className = 'mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600';
                registerButton.textContent = 'Daftar';
                registerButton.addEventListener('click', () => {
                    showRegistrationForm(event);
                });
                cardContent.appendChild(registerButton);
            }

            // Fungsi untuk menampilkan form pendaftaran
            function showRegistrationForm(event) {
                // Buat elemen modal untuk pendaftaran
                const formContainer = document.createElement('div');
                formContainer.className = 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50';

                // Buat elemen form
                const form = document.createElement('form');
                form.className = 'bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative';

                // Tombol close (X)
                const closeButton = document.createElement('button');
                closeButton.type = 'button';
                closeButton.textContent = 'X';
                closeButton.className = 'absolute top-4 right-4 text-xl font-semibold text-gray-700 hover:text-red-500';
                closeButton.addEventListener('click', () => {
                    document.body.removeChild(formContainer); // Menutup modal saat tombol X diklik
                });

                // Input hidden untuk user_id dan event_id
                const userIdInput = document.createElement('input');
                userIdInput.type = 'hidden';
                userIdInput.name = 'user_id';
                userIdInput.value = localStorage.getItem('userId'); // Mengambil userId dari localStorage

                const eventIdInput = document.createElement('input');
                eventIdInput.type = 'hidden';
                eventIdInput.name = 'event_id';
                eventIdInput.value = event.event_id;

                // Input untuk event_name
                const eventNameLabel = document.createElement('label');
                eventNameLabel.textContent = 'Nama Acara';
                eventNameLabel.className = 'block font-semibold text-gray-700';

                // Gunakan input dengan readonly agar tetap terisi dan bisa terkirim ke server
                const eventNameInput = document.createElement('input');
                eventNameInput.type = 'text';
                eventNameInput.name = 'event_name';
                eventNameInput.value = event.event_name;
                eventNameInput.readOnly = true;  // Digunakan agar tetap terisi dan bisa terkirim
                eventNameInput.className = 'mb-4 p-2 w-full border rounded';
                form.appendChild(eventNameInput);

                // Pilihan status (Regular atau VIP)
                const statusLabel = document.createElement('label');
                statusLabel.textContent = 'Status';
                statusLabel.className = 'block font-semibold text-gray-700';

                const statusSelect = document.createElement('select');
                statusSelect.name = 'status';
                statusSelect.className = 'mb-4 p-2 w-full border rounded';

                const regularOption = document.createElement('option');
                regularOption.value = 'regular';
                regularOption.textContent = 'Regular';
                const vipOption = document.createElement('option');
                vipOption.value = 'vip';
                vipOption.textContent = 'VIP';

                statusSelect.appendChild(regularOption);
                statusSelect.appendChild(vipOption);

                // Tambahkan elemen untuk menampilkan harga
                const priceLabel = document.createElement('label');
                priceLabel.textContent = 'Harga: ';
                priceLabel.className = 'block font-semibold text-gray-700';

                const priceDisplay = document.createElement('span');
                priceDisplay.className = 'font-bold text-xl text-green-500';
                priceDisplay.textContent = `Rp ${event.price}`; // Harga default untuk regular

                // Tambahkan input hidden untuk harga
                const priceInput = document.createElement('input');
                priceInput.type = 'hidden';
                priceInput.name = 'price'; // Nama untuk data harga
                form.appendChild(priceInput);

                // Tambahkan event listener untuk update harga
                statusSelect.addEventListener('change', () => {
                    if (statusSelect.value === 'vip') {
                        priceDisplay.textContent = `Rp ${event.vip_price}`; // Harga untuk VIP
                        priceInput.value = event.vip_price; // Set harga VIP ke input hidden
                    } else {
                        priceDisplay.textContent = `Rp ${event.price}`; // Harga untuk Regular
                        priceInput.value = event.price; // Set harga regular ke input hidden
                    }
                });

                // Set harga awal untuk regular
                priceInput.value = event.price;

                // Input untuk bukti pembayaran (opsional)
                const paymentReceiptLabel = document.createElement('label');
                paymentReceiptLabel.textContent = 'Bukti Pembayaran';
                paymentReceiptLabel.className = 'block font-semibold text-gray-700';

                const paymentReceiptInput = document.createElement('input');
                paymentReceiptInput.type = 'file';
                paymentReceiptInput.name = 'payment_receipt';
                paymentReceiptInput.className = 'mb-4 p-2 w-full border rounded';

                // Informasi rekening untuk pembayaran
                const accountInfoContainer = document.createElement('div');
                accountInfoContainer.className = 'mt-4 p-4 border-t border-gray-300';

                const accountInfoTitle = document.createElement('h3');
                accountInfoTitle.textContent = 'Informasi Rekening Pembayaran';
                accountInfoTitle.className = 'text-xl font-semibold';

                const accountInfoText = document.createElement('p');
                accountInfoText.textContent = 'Silakan lakukan pembayaran ke rekening berikut:';

                const bankInfo = document.createElement('p');
                bankInfo.textContent = 'Bank ABC: 123-456-7890';

                accountInfoContainer.appendChild(accountInfoTitle);
                accountInfoContainer.appendChild(accountInfoText);
                accountInfoContainer.appendChild(bankInfo);

                // Tombol submit
                const submitButton = document.createElement('button');
                submitButton.type = 'submit';
                submitButton.textContent = 'Kirim Pendaftaran';
                submitButton.className = 'mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full';

                // Gabungkan semua elemen form dengan label
                form.appendChild(closeButton); // Menambahkan tombol close
                form.appendChild(userIdInput);
                form.appendChild(eventIdInput);
                form.appendChild(eventNameLabel);
                form.appendChild(eventNameInput);
                form.appendChild(statusLabel);
                form.appendChild(statusSelect);
                form.appendChild(priceLabel);
                form.appendChild(priceDisplay);
                form.appendChild(paymentReceiptLabel);
                form.appendChild(paymentReceiptInput);
                form.appendChild(accountInfoContainer); // Menambahkan informasi rekening
                form.appendChild(submitButton);

                formContainer.appendChild(form);

                // Tambahkan formContainer ke body
                document.body.appendChild(formContainer);

                // Kirim form ke backend dengan FormData
                form.addEventListener('submit', (event) => {
                    event.preventDefault();  // Mencegah form submit default
                
                    const formData = new FormData(form);  // Membuat objek FormData dari form
                
                    // Kirim form data ke server
                    fetch('http://localhost:3000/file/upload', {
                        method: 'POST',
                        body: formData,
                    })
                    .then(response => response.json())
                    .then(result => {
                        if (result.message === "File uploaded and registration saved successfully") {
                            // Menampilkan SweetAlert saat pendaftaran berhasil
                            Swal.fire({
                                title: 'Pendaftaran Berhasil!',
                                text: 'Data telah terkirim dengan sukses.',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                // Menutup form modal setelah sukses
                                document.body.removeChild(formContainer); 
                            });
                        } else {
                            // Menampilkan SweetAlert jika terjadi kesalahan
                            Swal.fire({
                                title: 'Terjadi Kesalahan!',
                                text: 'Pendaftaran gagal. Coba lagi.',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                    })
                    .catch(error => {
                        // Menampilkan SweetAlert jika ada kesalahan saat pengiriman
                        Swal.fire({
                            title: 'Terjadi Kesalahan!',
                            text: 'Terjadi kesalahan saat pendaftaran. Coba lagi.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                        console.error('Error:', error);
                    });
                });
            }





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
