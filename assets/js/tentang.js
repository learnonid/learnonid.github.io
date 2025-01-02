document.addEventListener('DOMContentLoaded', () => {
    const aboutContainer = document.getElementById('about');
  
    // Membuat elemen "Tentang Kami"
    const aboutSection = document.createElement('section');
    aboutSection.className =
      'about-us py-20 px-12 bg-gradient-to-b from-white via-gray-50 to-main-blue rounded-lg shadow-lg';
  
    // Membuat wrapper
    const aboutWrapper = document.createElement('div');
    aboutWrapper.className = 'container mx-auto flex flex-col items-center text-center';
  
    // Membuat judul utama
    const aboutTitle = document.createElement('h2');
    aboutTitle.className = 'text-5xl font-extrabold text-main-blue mb-6';
    aboutTitle.textContent = 'Tentang Kami';
  
    // Membuat deskripsi utama
    const aboutDescription = document.createElement('p');
    aboutDescription.className = 'text-lg text-gray-700 leading-relaxed mb-12 text-justify mx-0 lg:mx-24 lg:text-center xl:mx-48';
    aboutDescription.textContent =
      'LearnOn.id adalah platform pembelajaran modern yang dirancang untuk membantu individu mengembangkan keterampilan di dunia informatika melalui kursus, pelatihan, dan materi belajar terpercaya.';
  
    // Data 5W1H
    const aboutDetails = [
      {
        icon: 'info',
        question: 'Apa itu LearnOn.id?',
        answer:
          'LearnOn.id adalah platform pembelajaran inovatif yang menyediakan kursus, pelatihan, dan koleksi buku untuk mendukung pengembangan keterampilan di bidang informatika.',
      },
      {
        icon: 'thumbs-up',
        question: 'Mengapa memilih LearnOn.id?',
        answer:
          'Kami menawarkan kursus interaktif dengan pengajar berkualitas, sertifikat resmi untuk mendukung karier Anda, serta fleksibilitas belajar yang dapat diakses kapan saja dan di mana saja.',
      },
      {
        icon: 'users',
        question: 'Siapa yang dapat menggunakan LearnOn.id?',
        answer:
          'LearnOn.id cocok untuk pelajar, mahasiswa, pekerja profesional, atau siapa saja yang ingin meningkatkan keterampilan di bidang teknologi dan informatika.',
      },
      {
        icon: 'clock',
        question: 'Kapan Anda dapat memulai belajar?',
        answer:
          'Belajar di LearnOn.id dapat dimulai kapan saja. Kami menyediakan akses materi pembelajaran online 24/7 untuk mendukung fleksibilitas waktu Anda.',
      },
      {
        icon: 'globe',
        question: 'Di mana Anda bisa menggunakan LearnOn.id?',
        answer:
          'Anda bisa mengakses LearnOn.id dari mana saja, baik melalui perangkat komputer maupun ponsel, selama Anda memiliki koneksi internet.',
      },
      {
        icon: 'book-open',
        question: 'Bagaimana cara belajar di LearnOn.id?',
        answer:
          'Daftar di platform kami, pilih kursus yang Anda minati, dan mulailah belajar dengan materi yang telah dirancang secara interaktif dan mudah dipahami.',
      },
    ];
  
    // Membuat wrapper untuk pertanyaan 5W1H
    const detailsWrapper = document.createElement('div');
    detailsWrapper.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
  
    // Membuat card untuk setiap pertanyaan 5W1H
    aboutDetails.forEach(({ icon, question, answer }) => {
      const detailCard = document.createElement('div');
      detailCard.className =
        'detail-card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 text-center';
  
      // Icon menggunakan Phosphor Icons
      const detailIcon = document.createElement('i');
      detailIcon.className = `ph ph-${icon} text-6xl text-main-blue mb-4`;
  
      // Judul pertanyaan
      const detailQuestion = document.createElement('h3');
      detailQuestion.className = 'text-xl font-bold text-main-blue mb-4';
      detailQuestion.textContent = question;
  
      // Jawaban pertanyaan
      const detailAnswer = document.createElement('p');
      detailAnswer.className = 'text-gray-600 leading-relaxed';
      detailAnswer.textContent = answer;
  
      // Menyusun elemen ke dalam card
      detailCard.appendChild(detailIcon);
      detailCard.appendChild(detailQuestion);
      detailCard.appendChild(detailAnswer);
  
      // Menambahkan card ke dalam wrapper
      detailsWrapper.appendChild(detailCard);
    });
  
    // Menyusun elemen ke dalam wrapper utama
    aboutWrapper.appendChild(aboutTitle);
    aboutWrapper.appendChild(aboutDescription);
    aboutWrapper.appendChild(detailsWrapper);
  
    // Menambahkan wrapper ke section
    aboutSection.appendChild(aboutWrapper);
  
    // Menambahkan section ke dalam container
    aboutContainer.appendChild(aboutSection);
  });
  