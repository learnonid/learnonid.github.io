document.addEventListener('DOMContentLoaded', () => {
    const heroContainer = document.getElementById('hero');
  
    // Membuat elemen hero section
    const hero = document.createElement('section');
    hero.className = 'hero text-main-blue py-16 px-12 text-center bg-gradient bg-gradient-to-b from-main-blue to-white';
  
    // Membuat Carousel
    const carouselWrapper = document.createElement('div');
    carouselWrapper.className = 'carousel relative w-full max-w-3xl mx-auto overflow-hidden mb-8 rounded-lg';
  
    // Data untuk carousel slides
    const slides = [
      {
        title: 'Belajar Mudah dan Fleksibel',
        description: 'Nikmati pelatihan online dan offline yang sesuai kebutuhan Anda.',
        image: '../assets/img/hero-slides1.jpeg',
      },
      {
        title: 'Dapatkan Sertifikat Pelatihan',
        description: 'Pelatihan yang kredibel dan mendukung karier Anda.',
        image: '../assets/img/hero-slides2.jpeg',
      },
      {
        title: 'Akses Kapan Saja, Dimana Saja',
        description: 'Belajar tanpa batas dengan platform kami.',
        image: '../assets/img/hero-slides3.jpeg',
      },
    ];
  
    // Membuat elemen slides container
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'slides flex transition-transform duration-500';
  
    slides.forEach(({ title, description, image }, index) => {
      const slide = document.createElement('div');
      slide.className = 'slide flex-shrink-0 w-full relative';
  
      // Gambar slide
      const img = document.createElement('img');
      img.src = image;
      img.alt = `Slide ${index + 1}`;
      img.className = 'w-full h-auto rounded-lg';
  
      // Text overlay
      const overlay = document.createElement('div');
      overlay.className = 'absolute inset-0 bg-black bg-opacity-40 text-white flex flex-col justify-center items-center p-6 text-center space-y-4';
  
      const slideTitle = document.createElement('h2');
      slideTitle.className = 'text-2xl font-bold';
      slideTitle.textContent = title;
  
      const slideDesc = document.createElement('p');
      slideDesc.className = 'text-lg';
      slideDesc.textContent = description;
  
      overlay.appendChild(slideTitle);
      overlay.appendChild(slideDesc);
  
      slide.appendChild(img);
      slide.appendChild(overlay);
  
      slidesContainer.appendChild(slide);
    });
  
    carouselWrapper.appendChild(slidesContainer);
  
    // Membuat navigasi carousel (prev dan next)
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-prev absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full';
    prevButton.textContent = '‹';
  
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-next absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full';
    nextButton.textContent = '›';
  
    carouselWrapper.appendChild(prevButton);
    carouselWrapper.appendChild(nextButton);
  
    // Logika navigasi carousel
    let currentIndex = 0;
  
    function updateCarousel() {
      const offset = -currentIndex * 100;
      slidesContainer.style.transform = `translateX(${offset}%)`;
    }
  
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });
  
    // Membuat elemen judul sambutan
    const title = document.createElement('h1');
    title.className = 'text-4xl font-bold mb-4';
    title.textContent = 'Selamat Datang di LearnOn!';
  
    const description = document.createElement('p');
    description.className = 'text-lg';
    description.textContent = 'Belajar mudah dan fleksibel dengan pelatihan online dan offline yang sesuai kebutuhan Anda.';
  
    // Menyusun elemen ke dalam hero section
    hero.appendChild(carouselWrapper);
    hero.appendChild(title);
    hero.appendChild(description);
  
    // Menambahkan hero section ke dalam container
    heroContainer.appendChild(hero);
  });
  