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

      const userId = localStorage.getItem('userId'); // Ambil userId dari localStorage
      if (!userId) {
        console.error('User ID tidak ditemukan di localStorage.');
        return;
      }

      // Fetch data user dari endpoint dengan ID
      const userResponse = await fetch(`http://localhost:3000/user/detail/${userId}`, {
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
      const { full_name, email, phone_number } = userData.user;

      // Tampilkan nama lengkap, email, dan phone_number di form
      document.getElementById('full_name').value = full_name || 'Nama tidak ditemukan';
      document.getElementById('email').value = email || 'Email tidak ditemukan';
      document.getElementById('phone_number').value = phone_number || 'Nomor telepon tidak ditemukan';
      // document.getElementById('password').value = password || 'n/a';
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

    const userId = localStorage.getItem('userId'); // Ambil userId dari localStorage
    if (!userId) {
      console.error('User ID tidak ditemukan di localStorage.');
      return;
    }

    const fullName = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone_number').value;
    const password = document.getElementById('password').value;
    const roleId = 1; // Ganti sesuai kebutuhan role_id (misalnya 1 untuk admin)

    const payload = {
      full_name: fullName,
      email: email,
      phone_number: phoneNumber,
      password: password || undefined, // Jangan sertakan password jika kosong
      role_id: roleId,
    };

    try {
      const response = await fetch(`http://localhost:3000/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, // Sertakan token di header dengan format Bearer
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
  