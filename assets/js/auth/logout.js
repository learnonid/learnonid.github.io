document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault(); // Mencegah aksi default link (pindah ke halaman logout.html)

    // Tampilkan peringatan SweetAlert
    Swal.fire({
        title: 'Yakin ingin logout?',
        text: 'Anda akan keluar dari akun ini.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Logout',
        cancelButtonText: 'Batal',
    }).then((result) => {
        if (result.isConfirmed) {
            // Hapus token dari cookie atau localStorage
            document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Hapus cookie
            localStorage.removeItem('authToken'); // Hapus token dari localStorage

            // Redirect ke halaman login setelah logout
            window.location.href = '../auth/login.html'; // Arahkan ke halaman login atau halaman lain
        }
    });
});
