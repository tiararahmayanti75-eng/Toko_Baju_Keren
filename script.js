// Array Utama untuk Penampung Keranjang Belanjaan
let keranjangBelanja = [];

// Mapping Otomatis agar Gambar Mini di Modal Sesuai Dengan Item yang Dipilih
const daftarGambarProduk = {
    'Kaos T-Shirt The 1975 Live': 'foto 1.jpeg',
    'Kaos Kendrick Lamar - They Not Like Us': 'foto 2.jpeg',
    'Blouse Pink Coquette Ribbon': 'foto 3.jpeg',
    'Elegant V-Neck Ribbon Top': 'foto 4.jpeg',
    'Kemeja Flanel B&W Checkered': 'foto 5.jpeg',
    'Flanel Vintage Red Short Sleeve': 'foto 6.jpeg',
    'Vertical Stripes Ribbon Shirt': 'foto 7.jpeg',
    'Elegant White Puff Sleeve': 'foto 8.jpeg',
    'Kaos T-Shirt The 1975 Live v2': 'foto 9.jpeg',
    'Kaos Over-sized Tribal Flame': 'foto 10.jpeg',
    'Kaos Stripe Retro Casual': 'foto 11.jpeg',
    'Cardigan Rajut Crop Top': 'foto 12.jpeg'
};

// Fungsi Tambah Barang ke Keranjang (DIPERBAIKI: Tidak Meremove / Mereload Data Halaman)
function tambahKeKeranjang(namaProduk, hargaProduk) {
    // Cari tahu apakah item tersebut sudah dimasukkan sebelumnya
    let itemSama = keranjangBelanja.find(item => item.nama === namaProduk);

    if (itemSama) {
        itemSama.jumlah += 1; 
    } else {
        keranjangBelanja.push({
            nama: namaProduk,
            harga: hargaProduk,
            jumlah: 1
        });
    }

    // Eksekusi pembaruan visual counter
    perbaruiTampilanNavbar();
    
    // Alert Konfirmasi Sukses Masuk Sistem
    alert(`Berhasil menambahkan '${namaProduk}' ke keranjang belanja Anda!`);
}

// Fungsi Mengupdate Angka Real-Time di Navbar Pojok Kanan
function perbaruiTampilanNavbar() {
    let totalKuantitas = keranjangBelanja.reduce((total, item) => total + item.jumlah, 0);
    document.getElementById('cart-count').innerText = totalKuantitas;
}

// Manajemen Jendela Modal DOM Element
const modalCheckout = document.getElementById('cart-modal');
const btnBukaCart = document.getElementById('cart-button');
const btnTutupCart = document.getElementById('close-cart');

// Event handler klik buka ikon keranjang
btnBukaCart.addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah jumping anchor link
    if (keranjangBelanja.length === 0) {
        alert("Keranjang Anda masih kosong. Pilih baju kesukaanmu dulu ya!");
        return;
    }
    renderItemKeModal();
    hitungUlangSemua();
    modalCheckout.style.display = "block";
});

// Event handler tutup silang (x)
btnTutupCart.addEventListener('click', function() {
    modalCheckout.style.display = "none";
});

// Tutup otomatis jika layar luar hitam diklik
window.addEventListener('click', function(e) {
    if (e.target == modalCheckout) {
        modalCheckout.style.display = "none";
    }
});

// Fungsi Menyuntikkan List Belanja secara Dinamis
function renderItemKeModal() {
    let container = document.getElementById('cart-items-container');
    container.innerHTML = ""; // Wipe out content lama

    keranjangBelanja.forEach(item => {
        let gambarMini = daftarGambarProduk[item.nama] || 'foto 1.jpeg';
        let subHargaItem = item.harga * item.jumlah;

        let templateHTML = `
            <div class="checkout-item">
                <img src="${gambarMini}" alt="${item.nama}" class="checkout-item-img">
                <div class="checkout-item-details">
                    <p class="checkout-item-title">${item.nama}</p>
                    <div class="checkout-item-price-row">
                        <span style="color: #ee4d2d; font-weight: 600;">Rp ${subHargaItem.toLocaleString('id-ID')}</span>
                        <span style="color: #777;">x${item.jumlah}</span>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', templateHTML);
    });
}

// Fungsi Hitung Matematika Final Sesuai Ketentuan Diskon Tugas
function hitungUlangSemua() {
    let subtotalBaju = keranjangBelanja.reduce((total, item) => total + (item.harga * item.jumlah), 0);
    document.getElementById('txt-subtotal').innerText = "Rp " + subtotalBaju.toLocaleString('id-ID');

    // Kalkulasi Checkbox Proteksi
    let chargeProteksi = 0;
    let isChecked = document.getElementById('proteksi-check').checked;
    if (isChecked) {
        chargeProteksi = 3000;
        document.getElementById('txt-proteksi').innerText = "Rp 3.000";
    } else {
        chargeProteksi = 0;
        document.getElementById('txt-proteksi').innerText = "Rp 0";
    }

    // Aturan Tetap Kalkulasi Invoice 
    const feeLayanan = 2200;
    const diskonVoucherToko = 50000;

    // Total Akhir Rumus
    let hasilAkhir = (subtotalBaju + chargeProteksi + feeLayanan) - diskonVoucherToko;
    if (hasilAkhir < 0) hasilAkhir = 0;

    document.getElementById('txt-total-akhir').innerText = "Rp " + hasilAkhir.toLocaleString('id-ID');
}

// Aksi Akhir Klik Tombol Buat Pesanan
function prosesCheckout() {
    alert("🚀 Pesanan Berhasil Dibuat!\nTerima kasih Tiara Rahmayanti, paket Anda akan segera dikirimkan ke Mranggen, Demak.");
    keranjangBelanja = []; // Kosongkan database keranjang kembali
    perbaruiTampilanNavbar();
    modalCheckout.style.display = "none";
}