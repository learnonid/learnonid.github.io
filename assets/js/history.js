document.addEventListener('DOMContentLoaded', async () => {
    const paymentsContainer = document.getElementById('payments'); // Div container untuk menampilkan pembayaran
    const userId = localStorage.getItem('userId'); // Ambil user_id dari localStorage

    if (!userId) {
        alert('User ID tidak ditemukan. Silakan login terlebih dahulu.');
        return;
    }

    const endpoint = `http://localhost:3000/book/pay/user/${userId}`; // Endpoint dengan ID pengguna

    // Fungsi untuk mengambil data pembayaran
    async function fetchPayments() {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch payments: ${response.statusText}`);
            }

            const data = await response.json(); // Parse respons JSON
            return data;
        } catch (error) {
            console.error('Error fetching payments:', error);
            alert('Gagal memuat data pembayaran. Silakan coba lagi.');
            return [];
        }
    }

    // Fungsi untuk merender data pembayaran ke halaman
    function renderPayments(payments) {
        paymentsContainer.innerHTML = ''; // Kosongkan container

        if (!Array.isArray(payments) || payments.length === 0) {
            paymentsContainer.innerHTML = '<p class="text-center text-gray-600">Tidak ada pembayaran ditemukan.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'w-4/5 border-collapse border border-gray-300 my-12 mx-6';

        // Header tabel
        table.innerHTML = `
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2 hidden">Registration ID</th>
                    <th class="border border-gray-300 p-2">Nama Buku</th>
                    <th class="border border-gray-300 p-2">Harga</th>
                    <th class="border border-gray-300 p-2">Bukti Pembayaran</th>
                    <th class="border border-gray-300 p-2">Tanggal Pembayaran</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');

        payments.forEach(payment => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td class="border border-gray-300 p-2 hidden">${payment.registration_id}</td>
                <td class="border border-gray-300 p-2">${payment.book_name}</td>
                <td class="border border-gray-300 p-2">Rp${payment.price.toLocaleString('id-ID')}</td>
                <td class="border border-gray-300 p-2">
                    <a href="${payment.payment_receipt}" target="_blank" class="text-blue-500 underline">Lihat Bukti</a>
                </td>
                <td class="border border-gray-300 p-2">${new Date(payment.payment_date).toLocaleString('id-ID')}</td>
            `;

            tbody.appendChild(row);
        });

        paymentsContainer.appendChild(table);
    }

    // Fetch dan render data pembayaran
    const payments = await fetchPayments();
    renderPayments(payments);
});
