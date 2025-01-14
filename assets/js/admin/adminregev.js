// Example of table row data
const tableData = [
    {
        eventId: "E001",
        userName: "John Doe",
        status: "Reguler",
        paymentProof: "receipt.jpg",
        benefit: null,
    },
    {
        eventId: "E002",
        userName: "Jane Smith",
        status: "VIP",
        paymentProof: "payment.pdf",
        benefit: "vip-benefit.pdf",
    },
    {
        eventId: "Asl1",
        userName: "Udin",
        status: "VIP",
        paymentProof: "Bukti-Pembayaran.jpeg",
        benefit: null,
    },
    {
        eventId: "x0Re",
        userName: "Budi",
        status: "Reguler",
        paymentProof: "Bayar.jpeg",
        benefit: null,
    },
];

// Populate table
const tableBody = document.getElementById("registrationTableBody");
tableData.forEach((data, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="px-6 py-3">${data.eventId}</td>
        <td class="px-6 py-3">${data.userName}</td>
        <td class="px-6 py-3">${data.status}</td>
        <td class="px-6 py-3">
            <a href="/uploads/${data.paymentProof}" target="_blank" class="text-blue-500 underline">${data.paymentProof}</a>
        </td>
        <td class="px-6 py-3">
            ${
                data.benefit
                    ? `<a href="/uploads/${data.benefit}" target="_blank" class="text-blue-500 underline">${data.benefit}</a>`
                    : `<button class="bg-gray-500 text-white px-3 py-1 rounded benefit-btn" data-index="${index}">Add Benefit</button>`
            }
        </td>
        <td class="px-6 py-3">
            <button class="bg-red-500 text-white px-3 py-1 rounded reject-btn" data-index="${index}">Reject</button>
        </td>
    `;
    tableBody.appendChild(row);
});

// Modal Logic
const benefitModal = document.getElementById("benefitModal");
const benefitForm = document.getElementById("benefitForm");
const cancelBenefit = document.getElementById("cancelBenefit");

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("benefit-btn")) {
        benefitModal.classList.remove("hidden");
    } else if (e.target.classList.contains("reject-btn")) {
        const index = e.target.dataset.index;
        tableData[index].status = "Rejected";
        alert("User status updated to Rejected");
        location.reload(); // Reload page for simplicity
    }
});

cancelBenefit.addEventListener("click", () => {
    benefitModal.classList.add("hidden");
});

benefitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Benefit added successfully!");
    benefitModal.classList.add("hidden");
});