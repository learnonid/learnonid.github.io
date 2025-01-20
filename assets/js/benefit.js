document.addEventListener('DOMContentLoaded', async () => {
    const registrationsContainer = document.getElementById('registrations');

    // Retrieve user ID from localStorage
    const userId = localStorage.getItem('userId'); // Make sure the key matches what is stored in localStorage
    if (!userId) {
        console.error('User ID not found in localStorage');
        return;
    }

    // URL endpoint for fetching user registration data using the user ID from localStorage
    const registrationsEndpoint = `http://localhost:3000/uer/user/${userId}`;

    // Function to fetch registration data from the API
    async function fetchRegistrations() {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
    
            if (!userId || !token) {
                console.error('User ID or Token not found in localStorage');
                return [];
            }
    
            const registrationsEndpoint = `http://localhost:3000/uer/user/${userId}`;
            
            const response = await fetch(registrationsEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}` // Add the token to the headers
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

    let response = await fetchRegistrations();
    let registrations = response || [];

    // Creating the table element
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'overflow-x-auto bg-white shadow-md rounded-lg justify-center mx-16';

    const table = document.createElement('table');
    table.className = 'min-w-full table-auto justify-center';

    // Header tabel
    const thead = document.createElement('thead');
    thead.className = 'bg-main-blue text-black';
    thead.innerHTML = `
        <tr>
            <th class="px-6 py-3 text-left">Event Name</th>
            <th class="px-6 py-3 text-left">Status</th>
            <th class="px-6 py-3 text-left">Price</th>
            <th class="px-6 py-3 text-left">Registration Date</th>
            <th class="px-6 py-3 text-left">Materi File</th>
            <th class="px-6 py-3 text-left">Sertifikat File</th>
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
        registrations.forEach(registration => {
            const row = document.createElement('tr');
            row.className = 'border-b';

            // Menampilkan materi file atau pesan jika tidak ada
            const materiFile = registration.materi_file ? 
                `<a href="${registration.materi_file}" target="_blank" class="text-blue-500">Lihat Materi</a>` : 
                'File belum diberikan oleh Admin';

            // Menampilkan sertifikat file atau pesan jika tidak ada
            const sertifikatFile = registration.sertifikat_file ? 
                `<a href="${registration.sertifikat_file}" target="_blank" class="text-blue-500">Lihat Sertifikat</a>` : 
                'File belum diberikan oleh Admin';

            row.innerHTML = `
                <td class="px-6 py-4">${registration.event_name || 'N/A'}</td>
                <td class="px-6 py-4">${registration.status}</td>
                <td class="px-6 py-4">Rp${registration.price.toLocaleString('id-ID')}</td>
                <td class="px-6 py-4">${new Date(registration.registration_date).toLocaleString()}</td>
                <td class="px-6 py-4">${materiFile}</td>
                <td class="px-6 py-4">${sertifikatFile}</td>
            `;
            tbody.appendChild(row);
        });
    }

    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    registrationsContainer.appendChild(tableWrapper);
});
