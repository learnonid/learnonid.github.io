// Fungsi untuk mengambil token dari cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  // Fungsi untuk fetch data user dan menampilkan di form edit
  async function fetchUserProfile() {
    try {
      const token = getCookie('authToken'); // Ambil token dari cookie
      if (!token) {
          console.error('Token tidak ditemukan. Pastikan user sudah login.');
          return;
      }
  
      // Fetch data user dari endpoint
      const userResponse = await fetch('http://127.0.0.1:3000/u/profile', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`, // Sertakan token di header dengan format Bearer
          },
      });
  
      if (!userResponse.ok) {
          console.error('Gagal mengambil data user:', userResponse.status, userResponse.statusText);
          return;
      }
  
      const userData = await userResponse.json();
      const { full_name, email } = userData.user;
  
      // Tampilkan nama lengkap dan email di form
      document.getElementById('full_name').value = full_name || 'Nama tidak ditemukan';
      document.getElementById('email').value = email || 'Email tidak ditemukan';
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data user:', error);
    }
  }
  
  // Fungsi untuk mengirimkan perubahan profil
  async function updateUserProfile(event) {
    event.preventDefault(); // Menghindari reload halaman saat submit
  
    const token = getCookie('authToken');
    if (!token) {
        console.error('Token tidak ditemukan. Pastikan user sudah login.');
        return;
    }
  
    const fullName = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const payload = {
      full_name: fullName,
      email: email,
      password: password || undefined, // Jangan sertakan password jika kosong
    };
  
    try {
      const response = await fetch('http://127.0.0.1:3000/u/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        console.error('Gagal mengupdate profil:', response.status, response.statusText);
        return;
      }
  
      const updatedData = await response.json();
      alert('Profil berhasil diperbarui!');
      console.log(updatedData); // Bisa ditambahkan untuk debugging atau tampilan lebih lanjut
    } catch (error) {
      console.error('Terjadi kesalahan saat mengupdate profil:', error);
    }
  }
  
  // Fungsi untuk reset form ke nilai awal (sebelum diedit)
  function resetForm() {
    fetchUserProfile(); // Panggil fetchUserProfile untuk mengisi kembali form dengan nilai yang diterima dari server
  }
  
  // Panggil fetchUserProfile saat halaman dimuat
  window.addEventListener('DOMContentLoaded', fetchUserProfile);
  
  // Menghubungkan form dengan fungsi update
  const editProfileForm = document.getElementById('editProfileForm');
  editProfileForm.addEventListener('submit', updateUserProfile);
  
  // Menghubungkan tombol Cancel dengan fungsi resetForm
  const cancelButton = document.getElementById('cancelButton');
  cancelButton.addEventListener('click', resetForm);
  