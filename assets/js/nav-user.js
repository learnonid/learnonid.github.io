document.addEventListener('DOMContentLoaded', () => {
    const navLinks = [
      ['Home', 'index.html'],
      ['Pelatihan', '#', [
        ['Online', 'pelatihan-online.html'],
        ['Offline', 'pelatihan-offline.html'],
      ]],
      ['Buku', 'buku.html'],
      ['Tentang', 'tentang.html'],
    ];
  
    const navContainer = document.getElementById('navigation');
  
    // Create the nav element
    const nav = document.createElement('nav');
    nav.className = 'px-12 py-4 bg-main-blue text-white';
  
    // Create the nav-wrapper
    const navWrapper = document.createElement('div');
    navWrapper.className = 'nav-wrapper flex justify-between items-center';
  
    // Logo section
    const logo = document.createElement('div');
    logo.className = 'logo flex items-center space-x-2';
    const logoText = document.createElement('p');
    logoText.className = 'text-2xl font-bold italic cursor-pointer';
    logoText.textContent = 'LearnOn.id';
    logo.appendChild(logoText);
  
    // Menu section
    const menu = document.createElement('div');
    menu.className = 'menu';
    const ul = document.createElement('ul');
    ul.className = 'flex justify-between space-x-10';
  
    navLinks.forEach(([title, url, dropdown]) => {
      const li = document.createElement('li');
      li.className = 'relative';
  
      const link = document.createElement('a');
      link.href = url;
      link.textContent = title;
      link.className = 'underline-animation cursor-pointer';
      li.appendChild(link);
  
      // Check if the current page matches the link and add active class
      if (window.location.pathname === '/' + url || window.location.pathname === url) {
        link.classList.add('active');
      }
  
      if (dropdown) {
        const icon = document.createElement('i');
        icon.className = 'ph ph-caret-down text-sm font-semibold ml-1'; // Add Phosphor caret-down icon
        icon.classList.toggle('rotate');
        link.appendChild(icon);
  
        const dropdownMenu = document.createElement('ul');
        dropdownMenu.className = 'absolute left-0 mt-2 bg-white text-black p-2 shadow-lg hidden rounded-md';
        dropdown.forEach(([subTitle, subUrl]) => {
          const dropdownItem = document.createElement('li');
          const dropdownLink = document.createElement('a');
          dropdownLink.href = subUrl;
          dropdownLink.textContent = subTitle;
          dropdownLink.className = 'block px-4 py-2 hover:bg-gray-200 hover:rounded-md';
          dropdownItem.appendChild(dropdownLink);
          dropdownMenu.appendChild(dropdownItem);
  
          // Check if the current page matches any dropdown item and add active class
          if (window.location.pathname === subUrl) {
            dropdownLink.classList.add('active');
          }
        });
  
        li.appendChild(dropdownMenu);
  
        // Toggle dropdown visibility
        link.addEventListener('click', (e) => {
          e.preventDefault(); // Prevent default link action
          dropdownMenu.classList.toggle('hidden');
        });
      }
  
      ul.appendChild(li);
    });
  
    menu.appendChild(ul);
  
    // Logout button
    const logoutButton = document.createElement('a');
    logoutButton.id = 'logoutButton'; // Tambahkan id untuk tombol logout
    logoutButton.className = 'btn-logout cursor-pointer';
    logoutButton.textContent = 'Logout';
  
    // Append sections to navWrapper
    navWrapper.appendChild(logo);
    navWrapper.appendChild(menu);
    navWrapper.appendChild(logoutButton);
  
    // Append navWrapper to nav
    nav.appendChild(navWrapper);
  
    // Append nav to the container
    navContainer.appendChild(nav);
  
    // Event listener untuk tombol Logout
    logoutButton.addEventListener('click', function(event) {
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
  });
  