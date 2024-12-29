document.addEventListener('DOMContentLoaded', () => {
    // Mengubah navLinks untuk mobile-nav dengan menambahkan tombol login
    const navLinks = [
      ['Home', 'index.html', 'ph ph-house'],
      ['Online', 'pelatihan-online.html', 'ph ph-globe'],
      ['Offline', 'pelatihan-offline.html', 'ph ph-map-pin'],
      ['Buku', '#', 'ph ph-book'],
      ['Tentang', '#', 'ph ph-info'],
    ];
  
    const navContainer = document.getElementById('mobile-nav');
    
    // Membuat elemen nav
    const nav = document.createElement('nav');
    nav.className = 'px-6 py-4 bg-main-blue text-white flex justify-between items-center relative';
    
    // Bagian logo
    const logo = document.createElement('div');
    logo.className = 'logo flex items-center space-x-2';
    const logoText = document.createElement('p');
    logoText.className = 'text-xl font-bold italic cursor-pointer';
    logoText.textContent = 'LearnOn.id';
    logo.appendChild(logoText);
    
    // Wrapper untuk tombol-tombol (login dan burger button)
    const wrapperButtons = document.createElement('div');
    wrapperButtons.className = 'flex justify-end items-center space-x-2'; // Menempatkan tombol login dan burger button di kanan
  
    // Tombol Login
    const loginButton = document.createElement('a');
    loginButton.href = './auth/login.html';
    loginButton.className = 'btn-login text-white text-lg z-50 relative'; // Menggunakan class btn-login
    loginButton.innerHTML = 'Login';
    
    // Tombol burger (toggle menu)
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle flex items-center z-50 relative';
    menuToggle.innerHTML = `
      <i class="ph ph-list text-2xl"></i>
    `;
    
    // Menambahkan tombol login dan burger button ke dalam wrapperButtons
    wrapperButtons.appendChild(loginButton);
    wrapperButtons.appendChild(menuToggle);
    
    // Bagian menu
    const menu = document.createElement('div');
    menu.className = 'menu fixed top-0 left-0 w-full bg-main-blue text-white z-40 flex flex-col p-6 space-y-4 transform -translate-y-full transition-transform duration-300';
    
    const ul = document.createElement('ul');
    ul.className = 'flex flex-col space-y-6 text-lg';
    
    navLinks.forEach(([title, url, iconClass]) => {
      const li = document.createElement('li');
    
      const mainLink = document.createElement('a');
      mainLink.href = url;
      mainLink.className = 'flex items-center space-x-4 underline-animation cursor-pointer';
    
      const icon = document.createElement('i');
      icon.className = `${iconClass} text-2xl`;
    
      const text = document.createElement('span');
      text.textContent = title;
    
      mainLink.appendChild(icon);
      mainLink.appendChild(text);
      li.appendChild(mainLink);
    
      ul.appendChild(li);
    });
    
    menu.appendChild(ul);
    
    // Menambahkan elemen-elemen ke dalam navContainer
    nav.appendChild(logo);
    nav.appendChild(wrapperButtons);  // Menambahkan wrapper untuk tombol login dan burger button
    navContainer.appendChild(nav);
    navContainer.appendChild(menu);
    
    // Menangani toggle menu dengan animasi
    menuToggle.addEventListener('click', () => {
      if (menu.classList.contains('-translate-y-full')) {
        menu.classList.remove('-translate-y-full');
        menu.classList.add('translate-y-0');
      } else {
        menu.classList.add('-translate-y-full');
        menu.classList.remove('translate-y-0');
      }
    });
  });
  