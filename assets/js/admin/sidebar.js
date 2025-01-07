// Fungsi untuk mengambil token dari cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Fungsi untuk fetch data user dan menampilkannya di sidebar
async function fetchUserProfile() {
  try {
    const token = getCookie('authToken'); // Ambil token dari cookie
    if (!token) {
        console.error('Token tidak ditemukan. Pastikan user sudah login.');
        return;
    }

    const userResponse = await fetch('http://127.0.0.1:3000/u/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`, // Sertakan token di header
        },
    });

    if (!userResponse.ok) {
        console.error('Gagal mengambil data user:', userResponse.status, userResponse.statusText);
        return;
    }

    const userData = await userResponse.json();
    
    // Mengakses data dari objek "user"
    const { full_name, email } = userData.user;

    // Tampilkan nama lengkap dan email di sidebar
    const fullNameElement = document.querySelector('.sidebar-header p:nth-child(3)');
    const emailElement = document.querySelector('.sidebar-header p:nth-child(4)');

    fullNameElement.innerHTML = `<i class="ph ph-user"></i> ${full_name || 'Nama tidak ditemukan'}`;
    emailElement.innerHTML = `<i class="ph ph-envelope"></i> ${email || 'Email tidak ditemukan'}`;
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data user:', error);
  }
}

// Panggil fungsi fetchUserProfile saat halaman dimuat
window.addEventListener('DOMContentLoaded', fetchUserProfile);
