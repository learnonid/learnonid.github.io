document.addEventListener('DOMContentLoaded', () => {
    const paymentTableBody = document.getElementById('paymentTableBody');

    // Fungsi format Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    }

    // Fetch all book payments
    async function fetchBookPayments() {
        try {
            const response = await fetch('http://localhost:3000/book/all/pay', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch book payments: ${response.statusText}`);
            }

            const data = await response.json(); // Parse JSON response
            populatePaymentTable(data); // Pass response data to the table population function
        } catch (error) {
            console.error('Error fetching book payments:', error);
            alert('Failed to fetch book payments. Please try again later.');
        }
    }

    // Populate table with payment data
    function populatePaymentTable(payments) {
        paymentTableBody.innerHTML = '';
        if (!Array.isArray(payments) || payments.length === 0) {
            paymentTableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4">No payments available</td></tr>';
            return;
        }

        payments.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4">${payment.registration_id || 'N/A'}</td>
                <td class="px-6 py-4">${payment.full_name || 'N/A'}</td>
                <td class="px-6 py-4">${payment.book_name || 'N/A'}</td>
                <td class="px-6 py-4">${formatRupiah(payment.price || 0)}</td>
                <td class="px-6 py-4">
                    <a href="${payment.payment_receipt}" target="_blank" class="text-blue-500 underline">View Receipt</a>
                </td>
                <td class="px-6 py-4">${new Date(payment.payment_date).toLocaleDateString('id-ID')} ${new Date(payment.payment_date).toLocaleTimeString('id-ID')}</td>
            `;
            paymentTableBody.appendChild(row);
        });
    }

    // Initial fetch of payments
    fetchBookPayments();
});
