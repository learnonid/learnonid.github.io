document.addEventListener('DOMContentLoaded', () => {
  const navLinks = [
    ['Home', 'index.html'],
    ['Pelatihan', '#', [
      ['Online', 'pelatihan-online.html'],
      ['Offline', 'pelatihan-offline.html'],
    ]],
    ['Buku', '#'],
    ['Tentang', '#'],
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

  // Login button
  const loginButton = document.createElement('a');
  loginButton.href = './auth/login.html';
  loginButton.className = 'btn-login';
  loginButton.textContent = 'Login';

  // Append sections to navWrapper
  navWrapper.appendChild(logo);
  navWrapper.appendChild(menu);
  navWrapper.appendChild(loginButton);

  // Append navWrapper to nav
  nav.appendChild(navWrapper);

  // Append nav to the container
  navContainer.appendChild(nav);
});

