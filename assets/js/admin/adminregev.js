document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const itemsPerPage = 5;
    let totalRegistrations = 0;

    const registrationsContainer = document.getElementById('registrations');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const paginationInfo = document.getElementById('paginationInfo');

    // API Endpoints
    const registrationsEndpoint = 'http://localhost:3000/uer/all';
    const registrationByIdEndpoint = 'http://localhost:3000/uer';
    const updateEndpoint = 'http://localhost:3000/uer/update';

    // Function to get token from cookies
    function getAuthToken() {
        const cookie = document.cookie.split('; ').find((row) => row.startsWith('authToken='));
        return cookie ? cookie.split('=')[1] : null;
    }

    // Format currency (Rupiah)
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    }

    // Fetch all registrations
    async function fetchRegistrations() {
        try {
            const token = getAuthToken();
            if (!token) {
                throw new Error('Token not found in cookies');
            }

            const response = await fetch(registrationsEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch registrations: ' + response.statusText);
            }

            return await response.json(); // Assuming the response is an array
        } catch (error) {
            console.error('Error fetching registrations:', error);
            return [];
        }
    }

    // Fetch registration by ID
    async function fetchRegistrationById(registrationId) {
        try {
            const token = getAuthToken();
            const response = await fetch(`${registrationByIdEndpoint}/${registrationId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch registration details');
            }

            return await response.json(); // Return registration data
        } catch (error) {
            console.error('Error fetching registration by ID:', error);
        }
    }

    // Populate table with registration data
    function populateRegistrationsTable(registrations) {
        registrationsContainer.innerHTML = '';
        if (!Array.isArray(registrations) || registrations.length === 0) {
            registrationsContainer.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center py-4 text-gray-500">No registrations found</td>
                </tr>`;
            return;
        }

        registrations.forEach((registration) => {
            const registrationDate = new Date(registration.registration_date).toLocaleString();
            const row = `
                <tr class="border-b">
                    <td class="px-6 py-4">${registration.full_name || 'N/A'}</td>
                    <td class="px-6 py-4">${registration.event_name || 'N/A'}</td>
                    <td class="px-6 py-4">
                        <select id="status-${registration.registration_id}" class="border rounded px-2 py-1">
                            <option value="${registration.status}" selected>${registration.status}</option>
                            <option value="regular">Regular</option>
                            <option value="vip">VIP</option>
                            <option value="reject">Reject</option>
                        </select>
                    </td>
                    <td class="px-6 py-4">${formatRupiah(registration.price)}</td>
                    <td class="px-6 py-4">${registrationDate}</td>
                    <td class="px-6 py-4">
                        ${registration.payment_receipt
                            ? `<a href="${registration.payment_receipt}" target="_blank" class="text-blue-600 hover:underline">View Receipt</a>`
                            : `<input type="file" id="receipt-upload-${registration.registration_id}" class="border rounded px-2 py-1" />`}
                    </td>
                    <td class="px-6 py-4">
                        ${registration.materi_file
                            ? `<a href="${registration.materi_file}" target="_blank" class="text-blue-600 hover:underline">View Materi</a>`
                            : `<input type="file" id="materi-upload-${registration.registration_id}" class="border rounded px-2 py-1" />`}
                    </td>
                    <td class="px-6 py-4">
                        ${registration.sertifikat_file
                            ? `<a href="${registration.sertifikat_file}" target="_blank" class="text-blue-600 hover:underline">View Certificate</a>`
                            : `<input type="file" id="certificate-upload-${registration.registration_id}" class="border rounded px-2 py-1" />`}
                    </td>
                    <td class="px-6 py-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="updateRegistration('${registration.registration_id}')">
                            Update
                        </button>
                    </td>
                </tr>`;
            registrationsContainer.insertAdjacentHTML('beforeend', row);
        });
    }

    // Update registration
    window.updateRegistration = async function (registrationId) {
        try {
            const token = getAuthToken();
            const statusSelect = document.getElementById(`status-${registrationId}`);
            const receiptFile = document.getElementById(`receipt-upload-${registrationId}`)?.files[0];
            const materiFile = document.getElementById(`materi-upload-${registrationId}`)?.files[0];
            const certificateFile = document.getElementById(`certificate-upload-${registrationId}`)?.files[0];

            // Fetch the current registration data to extract existing details
            const registrationData = await fetchRegistrationById(registrationId);

            const formData = new FormData();
            formData.append('status', statusSelect.value);
            formData.append('event_id', registrationData.event_id);
            formData.append('event_name', registrationData.event_name || 'N/A');
            formData.append('full_name', registrationData.full_name || 'N/A');
            formData.append('user_id', registrationData.user_id);
            formData.append('price', registrationData.price); // Ensure price is sent as a number

            if (receiptFile) formData.append('payment_receipt', receiptFile);
            if (materiFile) formData.append('materi_file', materiFile);
            if (certificateFile) formData.append('sertifikat_file', certificateFile);

            // Log FormData for debugging
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await fetch(`${updateEndpoint}/${registrationId}`, {
                method: 'PUT',
                headers: {
                    Authorization: token,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorResponse = await response.text(); // Log server error response
                console.error('Server response:', errorResponse);
                throw new Error('Failed to update registration');
            }

            Swal.fire('Success', 'Registration updated successfully!', 'success');
            renderRegistrations();
        } catch (error) {
            console.error('Error updating registration:', error);
            Swal.fire('Error', 'Failed to update registration.', 'error');
        }
    };

    // Update pagination controls
    function updatePaginationControls() {
        const totalPages = Math.ceil(totalRegistrations / itemsPerPage);
        paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    }

    // Pagination button event listeners
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderRegistrations();
        }
    });

    nextPageButton.addEventListener('click', () => {
        const totalPages = Math.ceil(totalRegistrations / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderRegistrations();
        }
    });

    // Fetch and render registrations
    async function renderRegistrations() {
        const allRegistrations = await fetchRegistrations();
        totalRegistrations = allRegistrations.length;

        const paginatedRegistrations = paginate(allRegistrations, currentPage, itemsPerPage);
        populateRegistrationsTable(paginatedRegistrations);
        updatePaginationControls();
    }

    // Paginate function to slice data for the current page
    function paginate(array, page, size) {
        const start = (page - 1) * size;
        const end = start + size;
        return array.slice(start, end);
    }

    renderRegistrations();
});
