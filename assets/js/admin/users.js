document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const itemsPerPage = 5;
    let totalUsers = 0;

    const userTableBody = document.getElementById('userTableBody');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const paginationInfo = document.getElementById('paginationInfo');

    // Fetch users and manage pagination
    async function fetchUsers(page = 1) {
        try {
            const response = await fetch(`http://127.0.0.1:3000/user/all`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users: ' + response.statusText);
            }

            const responseData = await response.json();
            const users = responseData.users || [];
            totalUsers = users.length;

            const paginatedUsers = paginate(users, page, itemsPerPage);
            populateUsersTable(paginatedUsers);

            updatePaginationControls();
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    // Paginate an array
    function paginate(array, page, size) {
        const start = (page - 1) * size;
        return array.slice(start, start + size);
    }

    // Populate table with user data
    function populateUsersTable(users) {
        userTableBody.innerHTML = '';
        if (!Array.isArray(users) || users.length === 0) {
            userTableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4">No users available</td></tr>';
            return;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4">${user.user_id || 'N/A'}</td>
                <td class="px-6 py-4">${user.full_name || 'N/A'}</td>
                <td href="mailto:${user.mail}" class="px-6 py-4">${user.email || 'N/A'}</td>
                <td href="https://wa.me/${user.phone_number}" class="px-6 py-4">${user.phone_number || 'N/A'}</td>
                <td class="px-6 py-4">${user.role_id === 1 ? 'Admin' : 'User'}</td>
                <td class="px-6 py-4 flex gap-2">
                    <button class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" onclick="editUser('${user.user_id}')">
                        <i class="ph ph-pencil-simple"></i>
                    </button>
                    <button class="bg-red-500 text-white p-2 rounded hover:bg-red-700" onclick="deleteUser('${user.user_id}')">
                        <i class="ph ph-trash"></i>
                    </button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    // Update pagination controls
    function updatePaginationControls() {
        const totalPages = Math.ceil(totalUsers / itemsPerPage);
        paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    }

    // Pagination button events
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchUsers(currentPage);
        }
    });

    nextPageButton.addEventListener('click', () => {
        const totalPages = Math.ceil(totalUsers / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            fetchUsers(currentPage);
        }
    });

    // Initial fetch
    fetchUsers();

    // Edit User
    window.editUser = async function(userId) {
        try {
            const response = await fetch(`http://127.0.0.1:3000/user/detail/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            const data = await response.json();
            const user = data.user;

            document.getElementById('full_name').value = user.full_name;
            document.getElementById('email').value = user.email;
            document.getElementById('phone').value = user.phone_number;
            document.getElementById('role').value = user.role_id === 1 ? 'admin' : 'user';

            document.getElementById('userModal').classList.remove('hidden');
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    // Save User Changes
    document.getElementById('saveChanges').addEventListener('click', async () => {
        const userId = document.getElementById('userId').value; // Ambil ID pengguna dari modal (pastikan Anda memiliki field ini)
        const fullName = document.getElementById('full_name').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phone').value;
        const role = document.getElementById('role').value === 'admin' ? 1 : 2; // Admin = 1, User = 2

        try {
            const response = await fetch(`http://127.0.0.1:3000/user/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: fullName,
                    email: email,
                    phone_number: phoneNumber,
                    role_id: role,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            Swal.fire('Berhasil!', 'User berhasil diperbarui', 'success');
            document.getElementById('userModal').classList.add('hidden');
            fetchUsers(currentPage);
        } catch (error) {
            console.error('Error updating user:', error);
            Swal.fire('Error', error.message, 'error');
        }
    });


    // Delete User
    window.deleteUser = async function(userId) {
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
            const response = await fetch(`http://127.0.0.1:3000/user/delete/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            Swal.fire('Dihapus!', 'User berhasil dihapus', 'success');
            fetchUsers(currentPage);
        } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire('Error', error.message, 'error');
        }
    };

    // cancel button
    document.getElementById('cancelButton').addEventListener('click', () => {
        document.getElementById('userModal').classList.add('hidden');
    });
});
