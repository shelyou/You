
    function showInputTambahan() {
        var tipeBarang = document.getElementById("tipe-barang-plastik").value;
        
        // Sembunyikan semua input tambahan terlebih dahulu
        var semuaInput = document.querySelectorAll("#input-tambahan > div");
        semuaInput.forEach(function(input) {
            input.style.display = "none";
        });

        // Tampilkan input tambahan sesuai tipe barang
        if (tipeBarang) {
            var inputTambahan = document.getElementById("input-tambahan-" + tipeBarang.toLowerCase());
            if (inputTambahan) {
                inputTambahan.style.display = "block";
            }
        }
    }

document.getElementById("jumlah-barang-plastik").addEventListener("input", hitungTotalHarga);
document.getElementById("harga-satuan-plastik").addEventListener("input", hitungTotalHarga);
document.getElementById("diskon-barang-plastik").addEventListener("input", hitungTotalHarga);

function hitungTotalHarga() {
    var jumlahBarang = parseFloat(document.getElementById("jumlah-barang-plastik").value) || 0;
    var hargaSatuan = parseFloat(document.getElementById("harga-satuan-plastik").value) || 0;
    var diskon = parseFloat(document.getElementById("diskon-barang-plastik").value) || 0;

    // Hitung total harga sebelum diskon
    var totalHarga = jumlahBarang * hargaSatuan;

    // Hitung total harga setelah diskon
    var diskonHarga = totalHarga * (diskon / 100);
    var totalSetelahDiskon = totalHarga - diskonHarga;

    // Format ke Rupiah
    document.getElementById("total-harga-barang").value = formatRupiah(totalSetelahDiskon);
}

function formatRupiah(angka) {
    var formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2
    });
    return formatter.format(angka);
}

//Harga PP
function updateHarga() {
    const harga1Kg = parseFloat(document.getElementById("harga-1kg").value) || 0;
    const ukuranTerpilih = parseFloat(document.getElementById("pilih-ukuran").value) || 0;
    const hargaTerpilih = document.getElementById("harga-terpilih");

    if (harga1Kg && ukuranTerpilih) {
        // Hitung harga berdasarkan ukuran terpilih
        hargaTerpilih.value = (harga1Kg * ukuranTerpilih).toFixed(2);
    } else {
        hargaTerpilih.value = '';
    }
}

//harga HD
function updateJenisInput() {
        const jenisBarang = document.getElementById("jenis-barang-hd").value;
        const kemasanFields = document.getElementById("kemasan-fields");
        const ikatanFields = document.getElementById("ikatan-fields");

        // Tampilkan field sesuai pilihan
        if (jenisBarang === "kemasan") {
            kemasanFields.style.display = "block";
            ikatanFields.style.display = "none";
        } else if (jenisBarang === "ikatan") {
            kemasanFields.style.display = "none";
            ikatanFields.style.display = "block";
        } else {
            kemasanFields.style.display = "none";
            ikatanFields.style.display = "none";
        }
    }

//gelas
    function checkModel() {
        const model = document.getElementById("model-barang-gelas").value;
        const tebalTipis = document.getElementById("tebal-tipis");
        if (model === "datar" || model === "oval") {
            tebalTipis.style.display = "block";
        } else {
            tebalTipis.style.display = "none";
        }
    }
