document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const full_name = document.getElementById('full_name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone_number = document.getElementById('phone_number').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!full_name || !email || !phone_number || !password || !confirmPassword) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Semua field harus diisi!',
        });
        return;
    }

    // validator email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Email Tidak Valid',
            text: 'Format email tidak valid.',
        });
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Password Tidak Sama',
            text: 'Konfirmasi password harus sama dengan password.',
        });
        return;
    }

    // validator phone number, harus 62xxxxxxxx
    const phoneRegex = /^(62|0)8[1-9][0-9]{7,13}$/;
    if (!phoneRegex.test(phone_number)) {
        Swal.fire({
            icon: 'error',
            title: 'Nomor Telepon Tidak Valid',
            text: 'Nomor telepon harus diawali dengan 62 atau 0 dan terdiri dari 9-15 digit angka.',
        });
        return;
    }


    try {
        const response = await fetch('http://127.0.0.1:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ full_name, email, phone_number, password }),
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil',
                text: 'Silahkan login dengan akun Anda.',
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                window.location.href = 'login.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Registrasi Gagal',
                text: result.message || 'Terjadi kesalahan, coba lagi nanti.',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi kesalahan jaringan. Silahkan coba lagi nanti.',
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

const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

toggleConfirmPassword.addEventListener('click', function () {
    const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
    confirmPasswordInput.type = type;

    this.innerHTML =
        type === 'password'
            ? '<i class="ph ph-eye text-xl text-main-blue"></i>'
            : '<i class="ph ph-eye-slash text-xl text-main-blue"></i>';
});