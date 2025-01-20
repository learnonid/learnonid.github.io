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
            // Simpan token ke localStorage
            const token = result.token;
            localStorage.setItem('authToken', token);

            // Simpan token ke cookie (exp 1 hari)
            document.cookie = `authToken=${token}; path=/; secure; samesite=strict; max-age=86400`; // 86400 detik = 1 hari

            // Ambil informasi user berdasarkan ID menggunakan token
            const userResponse = await fetch('http://127.0.0.1:3000/u/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`, // Sertakan token di header
                },
            });

            const user = await userResponse.json();

            if (userResponse.ok) {
                console.log(user); // Log data yang diterima untuk memeriksa struktur
            
                const userId = user.user.user_id; // Akses user_id dari data
                if (userId) {
                    localStorage.setItem('userId', userId); // Simpan user ID ke localStorage
                } else {
                    console.error('User ID tidak ditemukan');
                }
            
                // Arahkan berdasarkan role
                const role = user.user.role_id;
                if (role === 1) {
                    window.location.href = '../admin/dashboard.html'; // Admin
                } else if (role === 2) {
                    window.location.href = '../cust/'; // Customer
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Terjadi Kesalahan',
                        text: 'Role tidak dikenali. Silakan coba lagi.',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Gagal mendapatkan informasi pengguna.',
                });
            }                   
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

// Fungsi untuk toggle password visibility
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

// Fungsi untuk mendapatkan cookie berdasarkan nama
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Fungsi untuk menghapus token dari cookie saat logout
function clearAuthToken() {
    document.cookie = 'authToken=; path=/; max-age=0'; // Menghapus cookie
    localStorage.removeItem('authToken'); // Menghapus token dari localStorage
    localStorage.removeItem('userId'); // Menghapus user ID dari localStorage
    localStorage.clear();
}
