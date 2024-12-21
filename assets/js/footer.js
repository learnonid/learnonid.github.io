document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer');

    // Membuat elemen footer
    const footer = document.createElement('footer');
    footer.className = 'bg-gradient-to-b from-main-blue to-main-blue-dark text-white py-8';

    // Membuat div untuk konten footer
    const footerContent = document.createElement('div');
    footerContent.className = 'grid grid-cols-1 md:grid-cols-3 gap-4 px-4 lg:px-24';

    // Bagian About LearnOn (Company)
    const companySection = document.createElement('div');
    companySection.className = 'flex flex-col gap-4';
    const companyTitle = document.createElement('h1');
    companyTitle.className = 'text-2xl font-bold';
    companyTitle.textContent = 'About LearnOn';
    const companyLinks = document.createElement('div');
    companyLinks.className = 'flex flex-col text-sm text-white footer-list';
    const companyItems = [
        'About Us', 'Help & Support', 'Terms of Service', 'Privacy Policy', 
        'Press & News', 'Careers'
    ];
    companyItems.forEach(item => {
        const link = document.createElement('a');
        link.className = 'hover:underline';
        link.href = '#';
        link.textContent = item;
        companyLinks.appendChild(link);
    });
    companySection.appendChild(companyTitle);
    companySection.appendChild(companyLinks);

    // Bagian For Students
    const studentSection = document.createElement('div');
    studentSection.className = 'flex flex-col gap-4';
    const studentTitle = document.createElement('h1');
    studentTitle.className = 'text-xl font-bold';
    studentTitle.textContent = 'For Students';
    const studentLinks = document.createElement('div');
    studentLinks.className = 'flex flex-col text-sm text-white footer-list';
    const studentItems = [
        'How LearnOn Works', 'Browse Courses', 'LearnOn Blog', 'LearnOn Community'
    ];
    studentItems.forEach(item => {
        const link = document.createElement('a');
        link.className = 'hover:underline';
        link.href = '#';
        link.textContent = item;
        studentLinks.appendChild(link);
    });
    studentSection.appendChild(studentTitle);
    studentSection.appendChild(studentLinks);

    // Bagian Categories
    const categoriesSection = document.createElement('div');
    categoriesSection.className = 'flex flex-col gap-4';
    const categoriesTitle = document.createElement('h1');
    categoriesTitle.className = 'text-xl font-bold';
    categoriesTitle.textContent = 'Popular Categories';
    const categoriesLinks = document.createElement('div');
    categoriesLinks.className = 'flex flex-col text-sm text-white footer-list';
    const categoriesItems = [
        'Programming', 'Data Science', 'Design & Graphics', 'Photography', 'Marketing'
    ];
    categoriesItems.forEach(item => {
        const link = document.createElement('a');
        link.className = 'hover:underline';
        link.href = '#';
        link.textContent = item;
        categoriesLinks.appendChild(link);
    });
    categoriesSection.appendChild(categoriesTitle);
    categoriesSection.appendChild(categoriesLinks);

    // Menambahkan bagian-bagian ke dalam footerContent
    footerContent.appendChild(companySection);
    footerContent.appendChild(studentSection);
    footerContent.appendChild(categoriesSection);

    // Menambahkan footerContent ke dalam footer
    footer.appendChild(footerContent);

    // Bagian Copyright
    const copyrightSection = document.createElement('div');
    copyrightSection.className = 'mx-4 lg:mx-24 mt-4 pt-2 text-white border-t border-white';
    const copyrightContent = document.createElement('div');
    copyrightContent.className = 'grid grid-cols-1 md:grid-cols-2 items-center md:items-baseline';

    const copyrightLeft = document.createElement('div');
    copyrightLeft.className = 'flex gap-4 items-baseline justify-center md:justify-start';
    const copyrightTitle = document.createElement('h1');
    copyrightTitle.className = 'font-bold text-2xl';
    copyrightTitle.textContent = 'LearnOn.id';
    const copyrightText = document.createElement('p');
    copyrightText.className = 'text-sm';
    copyrightText.textContent = '© 2024 LearnOn.id All rights reserved.';
    copyrightLeft.appendChild(copyrightTitle);
    copyrightLeft.appendChild(copyrightText);

    const copyrightRight = document.createElement('div');
    copyrightRight.className = 'flex gap-4 justify-center md:justify-end';
    const socialLinks = [
        { href: '#', icon: 'ph-envelope', hoverColor: 'hover:text-orange-600' },
        { href: '#', icon: 'ph-whatsapp-logo', hoverColor: 'hover:text-green-600' },
        { href: '#', icon: 'ph-facebook-logo', hoverColor: 'hover:text-blue-600' },
        { href: '#', icon: 'ph-instagram-logo', hoverColor: 'hover:text-pink-600' },
        { href: '#', icon: 'ph-linkedin-logo', hoverColor: 'hover:text-blue-700' }
    ];
    socialLinks.forEach(link => {
        const socialLink = document.createElement('a');
        socialLink.href = link.href;
        socialLink.className = `text-white ${link.hoverColor}`;
        socialLink.innerHTML = `<i class="ph ${link.icon} text-2xl"></i>`;
        copyrightRight.appendChild(socialLink);
    });

    const languageSelect = document.createElement('div');
    languageSelect.className = 'flex items-center gap-2 border border-white rounded-2xl px-2';
    const globeIcon = document.createElement('i');
    globeIcon.className = 'ph ph-globe text-2xl';
    const languageText = document.createElement('p');
    languageText.className = 'text-md';
    languageText.textContent = 'Indonesia';
    languageSelect.appendChild(globeIcon);
    languageSelect.appendChild(languageText);

    copyrightRight.appendChild(languageSelect);
    copyrightContent.appendChild(copyrightLeft);
    copyrightContent.appendChild(copyrightRight);
    copyrightSection.appendChild(copyrightContent);

    // Menambahkan copyright ke dalam footer
    footer.appendChild(copyrightSection);

    // Menambahkan footer ke dalam container footer
    footerContainer.appendChild(footer);
});
