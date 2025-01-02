document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loader = document.getElementById('loader'); // Ambil elemen loader

    if (!email || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Harap isi email dan password.',
        });
        return;
    }

    try {
        // Tampilkan loader
        loader.classList.remove('hidden');

        // Kirim permintaan ke endpoint login
        const response = await fetch('http://127.0.0.1:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        // Sembunyikan loader
        loader.classList.add('hidden');

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Login berhasil!',
                text: 'Anda akan diarahkan ke dashboard yang sesuai.',
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                // Mengambil data role dari hasil login
                const role = result.role;

                // Menentukan halaman tujuan berdasarkan role
                if (role === 'admin') {
                    window.location.href = 'dashboard-admin.html'; // Arahkan ke dashboard admin
                } else if (role === 'customer') {
                    window.location.href = 'dashboard-customer.html'; // Arahkan ke dashboard customer
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Terjadi Kesalahan',
                        text: 'Terjadi kesalahan ketika login. Silakan coba lagi.',
                    });
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login gagal',
                text: result.message || 'Email atau password salah.',
            });
        }
    } catch (error) {
        // Sembunyikan loader jika ada error
        loader.classList.add('hidden');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi kesalahan saat login. Silakan coba lagi.',
        });
        console.error('Error:', error);
    }
});

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    this.innerHTML =
        type === 'password'
            ? '<i class="ph ph-eye text-xl text-main-blue"></i>'
            : '<i class="ph ph-eye-slash text-xl text-main-blue"></i>';
});
