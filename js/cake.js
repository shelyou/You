// Fungsi untuk menampilkan/menghilangkan elemen berdasarkan tipe
function toggleFields(type, fields) {
    fields.forEach(f => (document.getElementById(f).style.display = 'none'));
    const fieldToShow = fields.find(f => f.includes(type));
    if (fieldToShow) document.getElementById(fieldToShow).style.display = 'block';
    hitungTotalHarga();
}

// Fungsi untuk menghitung total harga
function hitungTotalHarga() {
    const tipeBarang = document.getElementById('tipe-barang').value;
    const tipeIsi = document.getElementById('tipe-isi').value;
    const jumlahBarang = parseFloat(document.getElementById('jumlah-barang').value) || 0;
    const diskon = parseFloat(document.getElementById('diskon-barang').value) || 0;
    let totalHargaTipeIsi = 0, totalHargaBarang = 0;

    if (tipeBarang === 'carton') {
        const hargaCarton = parseFloat(document.getElementById('harga-karungan').value) || 0;
        if (tipeIsi === 'pax') {
            const jumlahPax = parseFloat(document.getElementById('jumlah-pax').value) || 1;
            const hargaPerPax = hargaCarton / jumlahPax;
            document.getElementById('harga-pax').value = hargaPerPax.toFixed(2);
            totalHargaTipeIsi = jumlahPax * hargaPerPax;
        } else if (tipeIsi === 'kilogram') {
            const jumlahKilogram = parseFloat(document.getElementById('jumlah-kilogram').value) || 0;
            const totalHargaKilogram = parseFloat(document.getElementById('harga-karungan').value) || 0;
            const hargaPerKg = jumlahKilogram > 0 ? totalHargaKilogram / jumlahKilogram : 0;
            document.getElementById('harga-kilogram').value = hargaPerKg.toFixed(2);
            totalHargaTipeIsi = jumlahKilogram * hargaPerKg;
        }
        totalHargaBarang = hargaCarton * jumlahBarang;
    } else if (tipeBarang === 'plastik') {
        totalHargaBarang = 
            (parseFloat(document.getElementById('harga-satuan').value) || 0) * jumlahBarang;
    }

    document.getElementById('total-harga').value = 
        (totalHargaBarang * (1 - diskon / 100)).toFixed(2);
    document.getElementById('total-harga-isi').value = 
        (totalHargaTipeIsi * (1 - diskon / 100)).toFixed(2);
}

// Fungsi untuk menghitung harga plastik berdasarkan input
function hitungHargaPlastik() {
    const hargaSatuan = parseFloat(document.getElementById("harga-satuan").value);
    const isiPerKg = parseFloat(document.getElementById("harga-dus").value);
    if (hargaSatuan && isiPerKg) {
        const hargaPerKg = hargaSatuan / isiPerKg;
        ["per-kg", "setengah-kg", "seperempat-kg", "satu-ons", "setengah-ons"].forEach((u, i) => {
            document.getElementById(`harga-${u}`).value = 
                (hargaPerKg / Math.pow(2, i)).toFixed(2);
        });
    } else {
        ["per-kg", "setengah-kg", "seperempat-kg", "satu-ons", "setengah-ons"].forEach(u => {
            document.getElementById(`harga-${u}`).value = "";
        });
    }
}

// Menambahkan event listener untuk tipe barang
document.getElementById('tipe-barang').addEventListener('change', () => {
    toggleFields(document.getElementById('tipe-barang').value, ['carton-fields', 'plastik-fields']);
});

// Menambahkan event listener untuk tipe isi
document.getElementById('tipe-isi').addEventListener('change', () => {
    toggleFields(document.getElementById('tipe-isi').value, ['pax-fields', 'kilogram-fields']);
});

// Menambahkan event listener untuk input lainnya
['jumlah-barang', 'diskon-barang', 'harga-karungan', 'jumlah-pax', 'jumlah-kilogram', 'harga-kilogram', 'harga-satuan']
    .forEach(id => document.getElementById(id).addEventListener('input', hitungTotalHarga));
['harga-satuan', 'harga-dus']
    .forEach(id => document.getElementById(id).addEventListener('input', hitungHargaPlastik));
