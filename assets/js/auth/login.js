document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Harap isi email dan password.',
        });
        return;
    }

    try {
        // Kirim permintaan ke endpoint login
        const response = await fetch('http://127.0.0.1:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Login berhasil!',
                text: 'Anda akan diarahkan ke halaman dashboard.',
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                // Redirect ke dashboard atau halaman lain
                window.location.href = 'dashboard.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login gagal',
                text: result.message || 'Email atau password salah.',
            });
        }
    } catch (error) {
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
