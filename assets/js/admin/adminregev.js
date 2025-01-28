document.addEventListener('DOMContentLoaded', async () => {
    const registrationsContainer = document.getElementById('registrations');
    const userNameContainer = document.getElementById('user-name'); // Tempat untuk menampilkan nama pengguna

    // URL endpoint untuk mengambil semua data pengguna
    const registrationsEndpoint = 'http://localhost:3000/uer/all'; // Ganti dengan endpoint yang sesuai
    const userEndpoint = 'http://localhost:3000/user/detail'; // Ganti dengan endpoint untuk mengambil nama user berdasarkan ID
    const updateEndpoint = 'http://localhost:3000/uer/update'; // Ganti dengan endpoint untuk update data registrasi

    // Fungsi untuk mengambil data registrasi pengguna dari API
    async function fetchRegistrations() {
        try {
            const token = localStorage.getItem('authToken'); // Token untuk autentikasi

            if (!token) {
                console.error('Token not found in localStorage');
                return [];
            }

            const response = await fetch(registrationsEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}` // Menambahkan token ke header
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch registration data:', error);
            return [];
        }
    }

    // Fungsi untuk mengambil nama pengguna berdasarkan ID
    async function fetchUserName(userId) {
        try {
            const token = localStorage.getItem('authToken'); // Token untuk autentikasi

            if (!token) {
                console.error('Token not found in localStorage');
                return '';
            }

            const response = await fetch(`${userEndpoint}/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}` // Menambahkan token ke header
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.user.full_name; // Mengembalikan nama lengkap pengguna dari respons
        } catch (error) {
            console.error('Failed to fetch user name:', error);
            return '';
        }
    }

    // Mendapatkan userId dari localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error('User ID not found in localStorage');
        return;
    }

    // Ambil nama pengguna dan tampilkan di halaman
    const full_name = await fetchUserName(userId);
    if (userNameContainer) {
        userNameContainer.textContent = `Hello, ${full_name || 'User'}`; // Tampilkan nama pengguna
    }

    // Ambil data registrasi dan tampilkan
    let response = await fetchRegistrations();
    let registrations = response || [];

    // Membuat elemen tabel
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'overflow-x-auto bg-white shadow-md rounded-lg justify-center mx-4';

    const table = document.createElement('table');
    table.className = 'min-w-full table-auto justify-center';

    // Header tabel dengan kolom nama pengguna
    const thead = document.createElement('thead');
    thead.className = 'bg-main-blue text-white';
    thead.innerHTML = `
        <tr>
            <th class="px-6 py-3 text-left">User Name</th>
            <th class="px-6 py-3 text-left">Event Name</th>
            <th class="px-6 py-3 text-left">Status</th>
            <th class="px-6 py-3 text-left">Price</th>
            <th class="px-6 py-3 text-left">Registration Date</th>
            <th class="px-6 py-3 text-left">Bukti Transfer</th>
            <th class="py-3 text-left">Materi File</th>
            <th class="py-3 text-left">Sertifikat File</th>
            <th class="px-6 py-3 text-left">Action</th>
        </tr>
    `;
    table.appendChild(thead);

    // Body tabel
    const tbody = document.createElement('tbody');
    if (registrations.length === 0) {
        const noDataRow = document.createElement('tr');
        noDataRow.className = 'text-center';
        noDataRow.innerHTML = `
            <td colspan="7" class="px-6 py-4 text-gray-500">No registrations found</td>
        `;
        tbody.appendChild(noDataRow);
    } else {
        registrations.forEach(async registration => {
            const row = document.createElement('tr');
            row.className = 'border-b';
        
            // Menampilkan materi file atau input jika tidak ada
            const materiFile = registration.materi_file ? 
                `<a href="${registration.materi_file}" target="_blank" class="text-blue-500">Lihat Materi</a>` : 
                `<input type="file" class="text-blue-500" id="materi-file-${registration.registration_id}" name="materi-file" />`;

            const paymentReceipt = registration.payment_receipt ? 
                `<a href="${registration.payment_receipt}" target="_blank" class="text-blue-500">Bukti Transfer</a>` : 
                `<input type="file" class="text-blue-500" id="materi-file-${registration.registration_id}" name="materi-file" />`;
        
            // Menampilkan sertifikat file atau input jika tidak ada
            const sertifikatFile = registration.sertifikat_file ? 
                `<a href="${registration.sertifikat_file}" target="_blank" class="text-blue-500">Lihat Sertifikat</a>` : 
                `<input type="file" class="text-blue-500" id="sertifikat-file-${registration.registration_id}" name="sertifikat-file" />`;
        
            // Mengambil nama pengguna untuk setiap baris
            const full_name = registration.user_id ? await fetchUserName(registration.user_id) : 'N/A';
        
            // Cek jika event_id ada dan valid, jika tidak, jangan tampilkan tombol update
            const eventID = registration.event_id;
            if (!eventID) {
                console.error('Event ID is missing or invalid');
                return;
            }

            // Cek jika id registrasi ada
            const registrationID = registration.registration_id;
            if (!registrationID) {
                console.error('Registration ID is missing or invalid');
                return;
            }
        
            // Tombol Update - jika event ID ada
            const updateButton = `<button class="px-4 py-2 text-white bg-blue-500 rounded-lg" onclick="updateRegistration('${registration.registration_id}', '${eventID}')">Update</button>`;

            // Elemen status sebagai dropdown dengan opsi tambahan "Reject"
            const statusOptions = `
                <select id="status-${registration.registration_id}" class="border rounded px-2 py-1">
                    <option value="${registration.status}" selected>${registration.status}</option>
                    <option value="reguler">Reguler</option>
                    <option value="vip">VIP</option>
                    <option value="reject">Reject</option>
                </select>
            `;
        
            row.innerHTML = `
                <td class="px-6 py-4">${full_name}</td>
                <td class="px-6 py-4">${registration.event_name || 'N/A'}</td>
                <td class="px-6 py-4">${statusOptions}</td>
                <td class="px-6 py-4" id="price-${registration.registration_id}">Rp${registration.price.toLocaleString('id-ID')}</td>
                <td class="px-6 py-4">${new Date(registration.registration_date).toLocaleString()}</td>
                <td class="px-6 py-4">${paymentReceipt}</td>
                <td class="py-4">${materiFile}</td>
                <td class="py-4">${sertifikatFile}</td>
                <td class="px-6 py-4">${updateButton}</td>
            `;
            tbody.appendChild(row);
        });              
    }

    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    registrationsContainer.appendChild(tableWrapper);
});

// Fungsi untuk melakukan pembaruan registrasi
async function updateRegistration(registrationId, eventId, registration) {
    try {
        const token = localStorage.getItem('authToken');
        const materiFileInput = document.getElementById(`materi-file-${registrationId}`);
        const sertifikatFileInput = document.getElementById(`sertifikat-file-${registrationId}`);
        const statusSelect = document.getElementById(`status-${registrationId}`); // Ambil status dari dropdown
        const eventName = document.getElementById(`event-name-${registrationId}`); // Ambil nama event

        // File input (opsional)
        const materiFile = materiFileInput ? materiFileInput.files[0] : null;
        const sertifikatFile = sertifikatFileInput ? sertifikatFileInput.files[0] : null;

        // Ambil nilai harga dalam format Rupiah dan ubah ke float
        const priceElement = document.querySelector(`#price-${registrationId}`); // Ambil elemen harga
        const formattedPrice = priceElement.textContent.replace(/[Rp.,\s]/g, ''); // Hapus format Rupiah
        const price = parseFloat(formattedPrice);

        if (isNaN(price)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Price',
                text: 'Harga tidak valid. Pastikan nilainya berupa angka.',
            });
            return;
        }

        // Siapkan FormData
        const formData = new FormData();
        if (materiFile) formData.append('materi_file', materiFile);
        if (sertifikatFile) formData.append('sertifikat_file', sertifikatFile);
        formData.append('status', statusSelect.value); // Tambahkan status baru
        formData.append('event_name', eventName);
        formData.append('price', price); // Tambahkan harga sebagai float

        // Kirim permintaan PUT
        const updateResponse = await fetch(`http://localhost:3000/uer/update/${registrationId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`,
            },
            body: formData,
        });

        console.log('Response Status:', updateResponse.status);
        console.log('Response Text:', await updateResponse.text());

        if (updateResponse.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Registration Updated',
                text: 'Status berhasil diperbarui.',
            });
            window.location.reload();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Gagal memperbarui status registrasi.',
            });
        }
    } catch (error) {
        console.error('Error while updating registration:', error);
        Swal.fire({
            icon: 'error',
            title: 'An error occurred',
            text: 'Terjadi kesalahan saat memperbarui registrasi.',
        });
    }
}