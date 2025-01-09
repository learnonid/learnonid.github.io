function showRegistrationForm(event) {
    // Cek apakah form sudah ada di DOM
    if (document.getElementById('registration-form')) {
        return;
    }

    // Membuat container form
    const formContainer = document.createElement('div');
    formContainer.id = 'registration-form';
    formContainer.className = 'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center';

    const form = document.createElement('form');
    form.className = 'bg-white p-6 rounded-lg shadow-lg w-96';

    // Tambahkan heading
    const heading = document.createElement('h2');
    heading.className = 'text-2xl font-bold mb-4';
    heading.textContent = `Daftar Acara: ${event.event_name}`;
    form.appendChild(heading);

    // Input untuk nama pengguna
    const nameField = document.createElement('div');
    nameField.className = 'mb-4';
    const nameLabel = document.createElement('label');
    nameLabel.className = 'block text-sm font-bold mb-2';
    nameLabel.textContent = 'Nama Anda';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.required = true;
    nameInput.className = 'w-full px-3 py-2 border rounded-lg';
    nameField.appendChild(nameLabel);
    nameField.appendChild(nameInput);
    form.appendChild(nameField);

    // Input untuk email pengguna
    const emailField = document.createElement('div');
    emailField.className = 'mb-4';
    const emailLabel = document.createElement('label');
    emailLabel.className = 'block text-sm font-bold mb-2';
    emailLabel.textContent = 'Email Anda';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.required = true;
    emailInput.className = 'w-full px-3 py-2 border rounded-lg';
    emailField.appendChild(emailLabel);
    emailField.appendChild(emailInput);
    form.appendChild(emailField);

    // Input untuk tipe keanggotaan
    const typeField = document.createElement('div');
    typeField.className = 'mb-4';
    const typeLabel = document.createElement('label');
    typeLabel.className = 'block text-sm font-bold mb-2';
    typeLabel.textContent = 'Tipe Keanggotaan';
    const typeSelect = document.createElement('select');
    typeSelect.required = true;
    typeSelect.className = 'w-full px-3 py-2 border rounded-lg';
    ['regular', 'vip'].forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        typeSelect.appendChild(option);
    });
    typeField.appendChild(typeLabel);
    typeField.appendChild(typeSelect);
    form.appendChild(typeField);

    // Tombol Submit
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Kirim';
    submitButton.className = 'w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600';
    form.appendChild(submitButton);

    // Tombol Batal
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Batal';
    cancelButton.className = 'mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600';
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(formContainer);
    });
    form.appendChild(cancelButton);

    // Tambahkan form ke dalam container dan ke dalam body
    formContainer.appendChild(form);
    document.body.appendChild(formContainer);

    // Event handler untuk submit
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const userData = {
            user_id: 'dummyUserId', // Ganti dengan ID pengguna yang valid
            event_id: event.event_id,
            event_name: event.event_name,
            status: typeSelect.value,
            registration_date: new Date().toISOString(),
        };

        try {
            const response = await fetch('http://127.0.0.1:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            alert(`Registrasi berhasil: ${result.message}`);
            document.body.removeChild(formContainer);
        } catch (error) {
            console.error('Gagal mengirim data registrasi:', error);
            alert('Gagal mendaftar, silakan coba lagi.');
        }
    });
}
