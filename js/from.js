let barangData = []; // Data barang akan disimpan di sini

    // Fungsi untuk memuat data barang dari file JSON
    function loadBarangData(formType) {
        const jsonFile = formType === 'bahan_kue' ? 'kue.json' : 'plastik.json';
        return fetch(jsonFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                barangData = data;
                console.log(`Data berhasil dimuat dari ${jsonFile}`, barangData);
            })
            .catch(error => console.error(`Gagal memuat data dari ${jsonFile}:`, error));
    }

    // Fungsi untuk menyaring nama barang berdasarkan input
    function filterNamaBarang(formType) {
        const inputNamaBarang = formType === 'plastik' 
            ? document.getElementById('nama-barang-plastik') 
            : document.getElementById('nama-barang');
        const dropdownNamaBarang = formType === 'plastik' 
            ? document.getElementById('dropdown-nama-barang-plastik') 
            : document.getElementById('dropdown-nama-barang');
        const kodeBarangDisplay = formType === 'plastik' 
            ? document.getElementById('kode-barang-display-plastik') 
            : document.getElementById('kode-barang-display');

        const searchValue = inputNamaBarang.value.toLowerCase();
        dropdownNamaBarang.innerHTML = '';
        if (searchValue) {
            const filteredBarang = barangData.filter(item => item.nama.toLowerCase().includes(searchValue));
            dropdownNamaBarang.style.display = filteredBarang.length ? 'block' : 'none';
            filteredBarang.forEach(item => {
                const div = document.createElement('div');
                div.textContent = `${item.nama}`;
                div.onclick = () => {
                    inputNamaBarang.value = item.nama;
                    kodeBarangDisplay.textContent = item.kode;
                    dropdownNamaBarang.style.display = 'none';
                };
                dropdownNamaBarang.appendChild(div);
            });
        } else {
            dropdownNamaBarang.style.display = 'none';
        }
    }

    // Muat data barang saat halaman selesai dimuat
    document.addEventListener('DOMContentLoaded', () => {
        loadBarangData('bahan_kue'); // Form default adalah bahan kue
    });

    // Fungsi untuk menampilkan form Plastik
    function showPlasticForm() {
        document.getElementById('form-barang').style.display = 'none';
        document.getElementById('plastik-form').style.display = 'block';
        loadBarangData('plastik');
    }

    // Fungsi untuk menampilkan form Bahan Kue
    function showCakeForm() {
        document.getElementById('plastik-form').style.display = 'none';
        document.getElementById('form-barang').style.display = 'block';
        loadBarangData('bahan_kue');
    }
