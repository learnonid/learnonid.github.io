
    document.addEventListener('DOMContentLoaded', () => {
        let currentPage = 1;
        const itemsPerPage = 5;
        let totalEvents = 0;

        const eventTableBody = document.getElementById('eventTableBody');
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

        // Fetch events and manage pagination
        async function fetchEvents(page = 1) {
            try {
                const response = await fetch(`http://127.0.0.1:3000/event/all`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch events: ' + response.statusText);
                }

                const responseData = await response.json();
                const events = responseData.events || [];
                totalEvents = events.length;

                const paginatedEvents = paginate(events, page, itemsPerPage);
                populateEventsTable(paginatedEvents);

                updatePaginationControls();
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }

        // Paginate an array
        function paginate(array, page, size) {
            const start = (page - 1) * size;
            return array.slice(start, start + size);
        }

        // Populate table with event data
        function populateEventsTable(events) {
            eventTableBody.innerHTML = '';
            if (!Array.isArray(events) || events.length === 0) {
                eventTableBody.innerHTML = '<tr><td colspan="8" class="text-center py-4">No events available</td></tr>';
                return;
            }

            events.forEach(event => {
                const row = document.createElement('tr');
                const shortenedID = event.event_id ? event.event_id.slice(-3) : 'N/A';
                row.innerHTML = `
                    <td class="px-6 py-4">${shortenedID}</td>
                    <td class="px-6 py-4">${event.event_name || 'N/A'}</td>
                    <td class="px-6 py-4">${event.event_type || 'N/A'}</td>
                    <td class="px-6 py-4">${event.event_date || 'N/A'}</td>
                    <td class="px-6 py-4">${formatRupiah(event.price || 0)}</td>
                    <td class="px-6 py-4">${formatRupiah(event.vip_price || 0)}</td>
                    <td class="px-6 py-4">${event.location || 'N/A'}</td>
                    <td class="px-6 py-4 flex gap-2">
                        <button class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" onclick="editEvent('${event.event_id}')">
                            <i class="ph ph-pencil-simple"></i>
                        </button>
                        <button class="bg-red-500 text-white p-2 rounded hover:bg-red-700" onclick="deleteEvent('${event.event_id}')">
                            <i class="ph ph-trash"></i>
                        </button>
                    </td>
                `;
                eventTableBody.appendChild(row);
            });
        }

        // Update pagination controls
        function updatePaginationControls() {
            const totalPages = Math.ceil(totalEvents / itemsPerPage);
            paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;

            prevPageButton.disabled = currentPage === 1;
            nextPageButton.disabled = currentPage === totalPages;
        }

        // Pagination button events
        prevPageButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                fetchEvents(currentPage);
            }
        });

        nextPageButton.addEventListener('click', () => {
            const totalPages = Math.ceil(totalEvents / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                fetchEvents(currentPage);
            }
        });

        // Initial fetch
        fetchEvents();

        // Event Modal for adding a new event
        const newEventButton = document.getElementById('newEventButton');
        const eventModal = document.getElementById('eventModal');
        const cancelButton = document.getElementById('cancelButton');
        const event_type = document.getElementById('event_type');
        const locationContainer = document.getElementById('locationContainer');
        const locationInput = document.getElementById('location');
        const eventForm = document.getElementById('eventForm');
        const updateButton = document.getElementById('updateButton'); // Update button

        let editingEventId = null;

        // Show modal
        newEventButton.addEventListener('click', () => {
            eventModal.classList.remove('hidden');
            editingEventId = null;
            updateButton.textContent = 'Create'; // Set to Create Event
            eventForm.reset();
        });

        // Hide modal
        cancelButton.addEventListener('click', () => {
            eventModal.classList.add('hidden');
        });

        // Toggle location input based on event type
        event_type.addEventListener('change', () => {
            const isOnline = event_type.checked;
            const label = locationContainer.querySelector('label');
            label.textContent = isOnline ? 'Link' : 'Location';
            locationInput.placeholder = isOnline ? 'Enter event link' : 'Enter event location';

            // Ensure location field is reset when toggling
            locationInput.value = '';
        });

        // Handle form submission for both create and update
        eventForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(eventForm);
            const eventData = Object.fromEntries(formData.entries());
        
            // Validasi input agar tidak kosong (kecuali deskripsi)
            if (!eventData.event_name) {
                Swal.fire('Error', 'Nama event harus diisi!', 'error');
                return;
            }
            if (!eventData.event_date) {
                Swal.fire('Error', 'Tanggal event harus diisi!', 'error');
                return;
            }
            if (!eventData.price || eventData.price <= 0) {
                Swal.fire('Error', 'Harga event harus lebih besar dari 0!', 'error');
                return;
            }
            if (!eventData.vip_price || eventData.vip_price < eventData.price) {
                Swal.fire('Error', 'Harga VIP tidak boleh lebih murah dari harga normal!', 'error');
                return;
            }
            if (!eventData.location) {
                Swal.fire('Error', 'Lokasi event harus diisi!', 'error');
                return;
            }
        
            // Validasi harga normal dan VIP
            const price = parseFloat(eventData.price) || 0;
            const vipPrice = parseFloat(eventData.vip_price) || 0;
        
            // Menambahkan event type berdasarkan status switch
            eventData.price = price;
            eventData.vip_price = vipPrice;
            eventData.event_type = event_type.checked ? 'online' : 'offline';
        
            const url = editingEventId
                ? `http://127.0.0.1:3000/event/update/${editingEventId}` // Update
                : `http://127.0.0.1:3000/event/create`; // Create
            const method = editingEventId ? 'PUT' : 'POST';
        
            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(eventData),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to save event');
                }
        
                Swal.fire('Success', 'Event saved successfully', 'success').then(() => {
                    window.location.reload(); // Refresh page after success
                });
        
                eventModal.classList.add('hidden');
                eventForm.reset();
            } catch (error) {
                console.error(error);
                Swal.fire('Error', error.message, 'error');
            }
        });
        

        // Edit Event
        window.editEvent = async function(eventId) { 
            try {
                const response = await fetch(`http://127.0.0.1:3000/event/detail/${eventId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event details');
                }
                const data = await response.json();
                const event = data.event;
        
                console.log(event); // Periksa apakah data event sudah benar
        
                editingEventId = eventId;
                updateButton.textContent = 'Update'; // Set to Update Event
        
                // Cek nilai yang akan diisi ke input
                console.log('Event Name:', event.event_name);
                console.log('Event Price:', event.price);
                console.log('Event VIP Price:', event.vip_price);
        
                // Populate form fields
                document.getElementById('event_name').value = event.event_name;
                document.getElementById('event_type').checked = event.event_type === 'online';
                document.getElementById('event_date').value = event.event_date;
                document.getElementById('price').value = event.price;
                document.getElementById('vip_price').value = event.vip_price;
                document.getElementById('location').value = event.location;
                document.getElementById('description').value = event.description;
        
                // Ensure fields are not readonly or disabled
                document.getElementById('event_name').removeAttribute('readonly');
                document.getElementById('price').removeAttribute('readonly');
                document.getElementById('vip_price').removeAttribute('readonly');
                document.getElementById('location').removeAttribute('readonly');
        
                // Show modal for editing
                eventModal.classList.remove('hidden');
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };
        


        // Delete Event
        window.deleteEvent = async function(eventId) { // Define deleteEvent function on window object
            const confirmation = await Swal.fire({
                title: 'Ingin Menghapus?',
                text: 'Kamu tidak akan bisa mengembalikan data yang sudah dihapus!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal',
            });

            if (!confirmation.isConfirmed) return;

            try {
                const response = await fetch(`http://127.0.0.1:3000/event/delete/${eventId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete event');
                }

                Swal.fire('Dihapus!', 'Event berhasil dihapus', 'success');
                fetchEvents(currentPage); // Refresh events
            } catch (error) {
                console.error('Error deleting event:', error);
                Swal.fire('Error', error.message, 'error');
            }
        }
    });
