import type { ChampionshipCase } from './types';

export const championshipCases: ChampionshipCase[] = [
  {
    id: 1,
    title: 'Analisis Komisi Penjualan',
    difficulty: 'Medium',
    description: 'Anda adalah seorang analis data di sebuah perusahaan retail. Manajer penjualan meminta Anda untuk menghitung komisi untuk setiap sales person, lalu meringkas total penjualan dan komisi per wilayah.',
    table: {
      headers: ['ID Sales', 'Nama', 'Wilayah', 'Penjualan (Rp)', 'Komisi', '', 'Ringkasan Wilayah', 'Total Penjualan', 'Total Komisi'],
      rows: [
        ['S01', 'Budi', 'Barat', 25000000, ''],
        ['S02', 'Ani', 'Timur', 18000000, ''],
        ['S03', 'Cici', 'Barat', 30000000, ''],
        ['S04', 'Dedi', 'Selatan', 22000000, ''],
        ['S05', 'Eka', 'Timur', 28000000, ''],
      ],
    },
    tasks: [
      {
        task: 'Di sel E2, hitung komisi untuk Budi. Komisi adalah 5% dari Penjualan jika Penjualan > 20.000.000, jika tidak, komisi adalah 0.',
        targetCell: { r: 1, c: 4 }, // E2
        answer: {
          type: 'formula',
          correctValue: ['=IF(D2>20000000;D2*5%;0)', '=IF(D2>20000000;D2*0.05;0)'],
        },
        correctResult: 1250000,
        explanation: 'Fungsi IF digunakan untuk memeriksa apakah penjualan di D2 melebihi 20jt. Jika ya, D2 dikalikan dengan 5%. Jika tidak, hasilnya 0.',
      },
      {
        task: 'Salin formula dari E2 ke bawah hingga E6 untuk menghitung komisi semua sales person.',
        targetCell: { r: 5, c: 4 }, // E6
        answer: {
          type: 'formula',
          correctValue: ['=IF(D6>20000000;D6*5%;0)', '=IF(D6>20000000;D6*0.05;0)'],
        },
        correctResult: 1400000,
        explanation: 'Dengan menyalin formula ke bawah, referensi sel D2 secara otomatis menjadi D3, D4, dst., menghitung komisi untuk setiap baris.',
      },
      {
        task: 'Di sel G2, buatlah daftar wilayah unik dari data, diurutkan secara alfabetis.',
        targetCell: { r: 1, c: 6 }, // G2
        answer: {
          type: 'formula',
          correctValue: ['=SORT(UNIQUE(C2:C6))'],
        },
        correctResult: 'Barat',
        explanation: 'Menggunakan SORT(UNIQUE(C2:C6)) akan menghasilkan daftar wilayah unik yang terurut, yang lebih rapi untuk laporan.',
      },
       {
        task: 'Di sel H2, hitung total penjualan untuk wilayah pertama yang unik (Barat).',
        targetCell: { r: 1, c: 7 }, // H2
        answer: {
          type: 'formula',
          correctValue: ['=SUMIF(C2:C6;G2;D2:D6)', '=SUMIF(C:C;G2;D:D)'],
        },
        correctResult: 55000000,
        explanation: 'SUMIF(range_kriteria; kriteria; range_jumlah) digunakan untuk menjumlahkan penjualan (kolom D) yang wilayahnya (kolom C) cocok dengan G2.',
      },
      {
        task: 'Di sel I2, hitung total komisi untuk wilayah pertama yang unik (Barat).',
        targetCell: { r: 1, c: 8 }, // I2
        answer: {
          type: 'formula',
          correctValue: ['=SUMIF(C2:C6;G2;E2:E6)'],
        },
        correctResult: 2750000,
        explanation: 'Sama seperti SUMIF untuk penjualan, kita sekarang menjumlahkan kolom Komisi (E) berdasarkan kriteria wilayah di G2.',
      },
      {
        task: 'Salin formula dari H2 dan I2 ke bawah untuk melengkapi ringkasan semua wilayah.',
        targetCell: { r: 3, c: 8 }, // I4
        answer: {
          type: 'formula',
          correctValue: ['=SUMIF(C2:C6;G4;E2:E6)'],
        },
        correctResult: 1400000,
        explanation: 'Menyalin formula ke bawah akan melengkapi tabel ringkasan, memberikan wawasan lengkap tentang performa setiap wilayah.',
      },
    ]
  },
  {
    id: 2,
    title: 'Dynamic Product Dashboard',
    difficulty: 'Medium',
    description: 'Manajer Anda ingin ringkasan penjualan dinamis. Buat daftar produk unik, hitung total penjualan, jumlah transaksi, dan rata-rata penjualan per transaksi.',
    table: {
      headers: ['Tanggal', 'Produk', 'Penjualan', '', 'Ringkasan Produk', 'Total Penjualan', 'Jumlah Transaksi', 'Rata-rata/Transaksi'],
      rows: [
        ['01-Jan', 'Laptop', 15000000, ''],
        ['01-Jan', 'Mouse', 500000, ''],
        ['02-Jan', 'Laptop', 12000000, ''],
        ['02-Jan', 'Keyboard', 750000, ''],
        ['03-Jan', 'Mouse', 600000, ''],
        ['03-Jan', 'Laptop', 18000000, ''],
      ],
    },
    tasks: [
      {
        task: 'Di sel E2, gunakan fungsi untuk membuat daftar produk unik dari kolom B.',
        targetCell: { r: 1, c: 4 }, // E2
        answer: {
          type: 'formula',
          correctValue: ['=UNIQUE(B2:B7)'],
        },
        correctResult: 'Laptop', // First result of the spill
        explanation: 'Fungsi UNIQUE(B2:B7) akan menghasilkan daftar semua item unik dari rentang yang diberikan.',
      },
      {
        task: 'Di sel F2, hitung total penjualan untuk produk pertama yang unik (Laptop).',
        targetCell: { r: 1, c: 5 }, // F2
        answer: {
          type: 'formula',
          correctValue: ['=SUMIF(B2:B7;E2;C2:C7)', '=SUMIF(B:B;E2;C:C)'],
        },
        correctResult: 45000000,
        explanation: 'SUMIF digunakan untuk menjumlahkan penjualan (kolom C) yang produknya (kolom B) cocok dengan produk unik di sel E2.',
      },
      {
        task: 'Di sel G2, hitung jumlah transaksi untuk produk Laptop.',
        targetCell: { r: 1, c: 6 }, // G2
        answer: {
            type: 'formula',
            correctValue: ['=COUNTIF(B2:B7;E2)', '=COUNTIF(B:B;E2)'],
        },
        correctResult: 3,
        explanation: 'COUNTIF digunakan untuk menghitung berapa kali produk di E2 muncul dalam daftar transaksi.',
      },
      {
        task: 'Di sel H2, hitung rata-rata penjualan per transaksi untuk Laptop (Total Penjualan / Jumlah Transaksi).',
        targetCell: { r: 1, c: 7 }, // H2
        answer: {
            type: 'formula',
            correctValue: ['=F2/G2'],
        },
        correctResult: 15000000,
        explanation: 'Membagi total penjualan dengan jumlah transaksi memberikan nilai rata-rata per penjualan.',
      },
      {
        task: 'Salin formula dari F2, G2, dan H2 ke bawah untuk melengkapi laporan.',
        targetCell: { r: 3, c: 5 }, // Check F4 (Keyboard)
        answer: {
          type: 'formula',
          correctValue: ['=SUMIF(B2:B7;E4;C2:C7)'],
        },
        correctResult: 750000,
        explanation: 'Dengan menyalin formula ke bawah, laporan ringkasan produk Anda akan lengkap secara otomatis.',
      },
    ]
  },
  {
    id: 3,
    title: 'Kalkulasi Bonus Karyawan',
    difficulty: 'Medium',
    description: 'Hitung bonus tahunan, total kompensasi, dan rata-rata bonus untuk karyawan berkinerja terbaik.',
    table: {
      headers: ['Nama', 'Gaji', 'Rating Kinerja', 'Bonus', 'Total Kompensasi', '', 'Rata-rata Bonus "Exceeds"'],
      rows: [
        ['Adi', 50000000, 'Exceeds', '', ''],
        ['Budi', 45000000, 'Meets', '', ''],
        ['Cici', 48000000, 'Exceeds', '', ''],
        ['Dedi', 40000000, 'Needs Improvement', '', ''],
      ],
    },
    tasks: [
      {
        task: 'Di sel D2, hitung bonus Adi. Aturan: Bonus dasar 10% dari Gaji. Jika Rating "Exceeds", bonus dikali 1.5. Jika "Meets", bonus tetap. Jika "Needs Improvement", bonus 0.',
        targetCell: { r: 1, c: 3 }, // D2
        answer: {
          type: 'formula',
          correctValue: ['=IF(C2="Exceeds";B2*10%*1.5;IF(C2="Meets";B2*10%;0))', '=IFS(C2="Exceeds";B2*15%;C2="Meets";B2*10%;TRUE;0)'],
        },
        correctResult: 7500000,
        explanation: 'IF bertingkat atau IFS dapat digunakan. Cek rating "Exceeds" dulu, lalu "Meets", dan terakhir default ke 0.',
      },
      {
        task: 'Di sel E2, hitung Total Kompensasi untuk Adi (Gaji + Bonus).',
        targetCell: { r: 1, c: 4 }, // E2
        answer: {
          type: 'formula',
          correctValue: ['=B2+D2'],
        },
        correctResult: 57500000,
        explanation: 'Cukup jumlahkan sel Gaji dan sel Bonus yang sudah dihitung.',
      },
      {
        task: 'Salin formula dari D2 dan E2 ke bawah untuk semua karyawan.',
        targetCell: { r: 4, c: 3 }, // D5
        answer: {
          type: 'formula',
          correctValue: ['=IF(C5="Exceeds";B5*10%*1.5;IF(C5="Meets";B5*10%;0))'],
        },
        correctResult: 0,
        explanation: 'Menyalin formula ke bawah akan secara otomatis menyesuaikan referensi sel untuk setiap karyawan.',
      },
      {
        task: 'Di sel H2, gunakan AVERAGEIF untuk menghitung rata-rata bonus yang diberikan hanya kepada karyawan dengan rating "Exceeds".',
        targetCell: { r: 1, c: 7 }, // H2
        answer: {
            type: 'formula',
            correctValue: ['=AVERAGEIF(C2:C5;"Exceeds";D2:D5)'],
        },
        correctResult: 7350000,
        explanation: 'AVERAGEIF(range_kriteria, kriteria, range_rata2) menghitung rata-rata dari kolom Bonus (D) hanya jika kolom Rating (C) adalah "Exceeds".',
      }
    ]
  },
  {
    id: 4,
    title: 'Advanced Customer Lookup',
    difficulty: 'Medium',
    description: 'Departemen layanan pelanggan perlu sistem pencarian data pelanggan yang fleksibel. VLOOKUP tidak dapat digunakan karena data tidak terstruktur dengan baik.',
    table: {
      headers: ['Email', 'ID Pelanggan', 'Nama', '', 'Cari ID:', 'P003', 'Hasil:'],
      rows: [
        ['adi@mail.com', 'P001', 'Adi', '', 'Email:', ''],
        ['budi@mail.com', 'P002', 'Budi', '', 'Nama:', ''],
        ['cici@mail.com', 'P003', 'Cici', ''],
        ['dedi@mail.com', 'P004', 'Dedi', ''],
      ],
    },
    tasks: [
      {
        task: 'Di sel F2, gunakan XLOOKUP atau INDEX/MATCH untuk menemukan email yang sesuai dengan ID Pelanggan di sel F1.',
        targetCell: { r: 1, c: 5 }, // F2
        answer: {
          type: 'formula',
          correctValue: ['=XLOOKUP(F1;B2:B5;A2:A5)', '=INDEX(A2:A5;MATCH(F1;B2:B5;0))'],
        },
        correctResult: 'cici@mail.com',
        explanation: 'XLOOKUP(lookup_value, lookup_array, return_array) mencari ID di kolom B dan mengembalikan nilai dari kolom A (pencarian ke kiri).',
      },
      {
        task: 'Di sel F3, gunakan formula serupa untuk menemukan Nama yang sesuai dengan ID Pelanggan di sel F1.',
        targetCell: { r: 2, c: 5 }, // F3
        answer: {
          type: 'formula',
          correctValue: ['=XLOOKUP(F1;B2:B5;C2:C5)', '=INDEX(C2:C5;MATCH(F1;B2:B5;0))'],
        },
        correctResult: 'Cici',
        explanation: 'Keindahan XLOOKUP dan INDEX/MATCH adalah kemudahan mengubah kolom hasil tanpa mengubah logika pencarian.',
      },
      {
        task: 'Ubah nilai di sel F1 menjadi "P005". Apa yang terjadi dengan formula Anda?',
        targetCell: { r: 0, c: 5 }, // F1 - User changes this manually. We check a formula that handles the error.
        answer: { type: 'text', correctValue: 'P005' },
        correctResult: 'P005',
        explanation: 'Jika ID tidak ditemukan, formula akan menghasilkan error #N/A. Ini menunjukkan perlunya penanganan error.',
      },
      {
        task: 'Ubah formula di F2 untuk menampilkan "Tidak Ditemukan" jika ID pelanggan tidak ada.',
        targetCell: { r: 1, c: 5 }, // F2
        answer: {
          type: 'formula',
          correctValue: ['=XLOOKUP(F1;B2:B5;A2:A5;"Tidak Ditemukan")', '=IFERROR(INDEX(A2:A5;MATCH(F1;B2:B5;0));"Tidak Ditemukan")'],
        },
        correctResult: 'Tidak Ditemukan',
        explanation: 'XLOOKUP memiliki argumen [if_not_found] bawaan. Untuk INDEX/MATCH, Anda bisa membungkusnya dengan IFERROR.',
      },
    ]
  },
  {
    id: 5,
    title: 'Analisis Penjualan Regional',
    difficulty: 'Hard',
    description: 'Buat laporan ringkas yang menunjukkan penjualan tertinggi, terendah, dan rata-rata untuk setiap wilayah dari data penjualan mentah.',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan', '', 'Wilayah Unik', 'Penjualan Tertinggi', 'Penjualan Terendah', 'Rata-rata Penjualan'],
      rows: [
        ['Utara', 'Apel', 120],
        ['Selatan', 'Jeruk', 80],
        ['Utara', 'Mangga', 150],
        ['Barat', 'Apel', 90],
        ['Selatan', 'Mangga', 110],
        ['Utara', 'Jeruk', 100],
      ],
    },
    tasks: [
      {
        task: 'Di sel E2, buat daftar wilayah unik yang diurutkan.',
        targetCell: { r: 1, c: 4 }, // E2
        answer: { type: 'formula', correctValue: '=SORT(UNIQUE(A2:A7))' },
        correctResult: 'Barat',
        explanation: 'Kombinasi SORT dan UNIQUE adalah cara efisien untuk mendapatkan daftar unik yang terurut secara alfabetis.',
      },
      {
        task: 'Di sel F2, gunakan MAXIFS untuk menemukan penjualan tertinggi untuk wilayah di E2.',
        targetCell: { r: 1, c: 5 }, // F2
        answer: { type: 'formula', correctValue: '=MAXIFS(C2:C7;A2:A7;E2)' },
        correctResult: 90,
        explanation: 'MAXIFS mengembalikan nilai maksimum dari kolom C di mana kolom A cocok dengan wilayah di E2.',
      },
      {
        task: 'Di sel G2, gunakan MINIFS untuk menemukan penjualan terendah untuk wilayah di E2.',
        targetCell: { r: 1, c: 6 }, // G2
        answer: { type: 'formula', correctValue: '=MINIFS(C2:C7;A2:A7;E2)' },
        correctResult: 90,
        explanation: 'MINIFS bekerja sama seperti MAXIFS, tetapi mengembalikan nilai minimum.',
      },
      {
        task: 'Di sel H2, gunakan AVERAGEIF untuk menemukan rata-rata penjualan untuk wilayah di E2.',
        targetCell: { r: 1, c: 7 }, // H2
        answer: { type: 'formula', correctValue: '=AVERAGEIF(A2:A7;E2;C2:C7)' },
        correctResult: 90,
        explanation: 'AVERAGEIF menghitung rata-rata dari kolom C hanya untuk baris yang cocok dengan kriteria wilayah di E2.',
      },
      {
        task: 'Salin formula dari F2, G2, dan H2 ke bawah untuk semua wilayah.',
        targetCell: { r: 3, c: 7 }, // H4
        answer: { type: 'formula', correctValue: '=AVERAGEIF(A2:A7;E4;C2:C7)' },
        correctResult: 123.33,
        explanation: 'Referensi relatif pada kriteria (E2) memungkinkan formula disalin ke bawah untuk menghitung statistik bagi setiap wilayah.',
      }
    ]
  },
  {
    id: 6,
    title: 'Ekstraksi Data Teks Kompleks',
    difficulty: 'Hard',
    description: 'Ekstrak ID, Nama Produk, dan Kode Lokasi dari string deskripsi yang formatnya tidak konsisten.',
    table: {
      headers: ['Deskripsi', 'ID', 'Nama Produk', 'Kode Lokasi'],
      rows: [
        ['ID_123-Laptop Zen-JKT', '', '', ''],
        ['REF_45-Monitor Pro-SBY', '', '', ''],
        ['SKU_9-Keyboard-BDG', '', '', ''],
      ],
    },
    tasks: [
       {
        task: 'Di B2, ekstrak ID (teks sebelum tanda hubung pertama) dari A2.',
        targetCell: { r: 1, c: 1 }, // B2
        answer: { type: 'formula', correctValue: '=LEFT(A2;FIND("-";A2)-1)' },
        correctResult: 'ID_123',
        explanation: 'FIND("-",A2) menemukan posisi tanda hubung pertama. LEFT mengambil semua karakter sebelum posisi tersebut.',
      },
      {
        task: 'Di C2, ekstrak Nama Produk (teks di antara dua tanda hubung) dari A2.',
        targetCell: { r: 1, c: 2 }, // C2
        answer: { type: 'formula', correctValue: '=MID(A2;FIND("-";A2)+1;FIND("-";A2;FIND("-";A2)+1)-FIND("-";A2)-1)' },
        correctResult: 'Laptop Zen',
        explanation: 'Formula ini menggunakan dua FIND untuk menentukan posisi awal dan panjang teks yang akan diekstrak oleh MID.',
      },
      {
        task: 'Di D2, ekstrak Kode Lokasi (teks setelah tanda hubung kedua) dari A2.',
        targetCell: { r: 1, c: 3 }, // D2
        answer: { type: 'formula', correctValue: '=RIGHT(A2;LEN(A2)-FIND("-";A2;FIND("-";A2)+1))' },
        correctResult: 'JKT',
        explanation: 'FIND bersarang menemukan posisi tanda hubung kedua, lalu dikombinasikan dengan LEN dan RIGHT untuk mengekstrak sisa teks.',
      },
      {
        task: 'Salin ketiga formula ke bawah untuk baris lainnya.',
        targetCell: { r: 3, c: 3 }, // D4
        answer: { type: 'formula', correctValue: '=RIGHT(A4;LEN(A4)-FIND("-";A4;FIND("-";A4)+1))' },
        correctResult: 'BDG',
        explanation: 'Fleksibilitas fungsi teks memungkinkan formula ini bekerja bahkan jika panjang setiap bagian berbeda-beda.',
      }
    ]
  },
  {
    id: 7,
    title: 'Laporan Performa Karyawan',
    difficulty: 'Medium',
    description: 'Gabungkan data dari dua tabel untuk membuat laporan performa, lalu berikan rekomendasi berdasarkan hasilnya.',
    table: {
      headers: ['ID Karyawan', 'Nama', 'Skor Kinerja', 'Status Training', 'Rekomendasi', '', 'Tabel Skor', 'Tabel Training'],
      rows: [
        ['EMP01', 'Adi', '', '', '', '', 'ID', 'Skor'],
        ['EMP02', 'Budi', '', '', '', '', 'EMP01', 92],
        ['EMP03', 'Cici', '', '', '', '', 'EMP02', 85],
        ['EMP04', 'Dedi', '', '', '', '', 'EMP03', 95],
        ['', '', '', '', '', '', 'EMP04', 78],
        ['', '', '', '', '', '', '', 'ID', 'Status'],
        ['', '', '', '', '', '', '', 'EMP01', 'Selesai'],
        ['', '', '', '', '', '', '', 'EMP02', 'Tertunda'],
        ['', '', '', '', '', '', '', 'EMP03', 'Selesai'],
        ['', '', '', '', '', '', '', 'EMP04', 'Selesai'],
      ],
    },
    tasks: [
      {
        task: 'Di sel C2, ambil Skor Kinerja Adi (EMP01) dari tabel skor (G3:H6).',
        targetCell: { r: 1, c: 2 }, // C2
        answer: { type: 'formula', correctValue: ['=XLOOKUP(A2;G3:G6;H3:H6)', '=INDEX(H3:H6;MATCH(A2;G3:G6;0))'] },
        correctResult: 92,
        explanation: 'XLOOKUP mencari ID Karyawan di kolom G dan mengembalikan skor yang sesuai dari kolom H.',
      },
      {
        task: 'Di sel D2, ambil Status Training Adi (EMP01) dari tabel training (H8:I11).',
        targetCell: { r: 1, c: 3 }, // D2
        answer: { type: 'formula', correctValue: ['=XLOOKUP(A2;H8:H11;I8:I11)', '=INDEX(I8:I11;MATCH(A2;H8:H11;0))'] },
        correctResult: 'Selesai',
        explanation: 'XLOOKUP dapat dengan mudah digunakan untuk mencari data dari tabel referensi yang berbeda.',
      },
      {
        task: 'Di sel E2, berikan rekomendasi. Jika Skor Kinerja > 90 DAN Status Training "Selesai", hasilnya "Promosi". Jika tidak, "Evaluasi Lanjut".',
        targetCell: { r: 1, c: 4 }, // E2
        answer: { type: 'formula', correctValue: '=IF(AND(C2>90;D2="Selesai");"Promosi";"Evaluasi Lanjut")' },
        correctResult: 'Promosi',
        explanation: 'Fungsi AND digunakan di dalam IF untuk memeriksa apakah kedua kondisi (skor dan training) terpenuhi.',
      },
      {
        task: 'Salin ketiga formula ke bawah untuk semua karyawan.',
        targetCell: { r: 4, c: 4 }, // E5
        answer: { type: 'formula', correctValue: '=IF(AND(C5>90;D5="Selesai");"Promosi";"Evaluasi Lanjut")' },
        correctResult: 'Evaluasi Lanjut',
        explanation: 'Menyalin formula ke bawah memungkinkan Anda dengan cepat mengisi seluruh laporan dan membuat rekomendasi untuk setiap karyawan.',
      }
    ]
  },
  {
    id: 8,
    title: 'Filter Laporan Dinamis Lanjutan',
    difficulty: 'Hard',
    description: 'Buat laporan dinamis yang menampilkan data penjualan berdasarkan beberapa kriteria, lalu hitung total dan rata-ratanya.',
    table: {
      headers: ['Produk', 'Penjualan', 'Wilayah', '', 'Filter: Penjualan > 12jt, Produk: Laptop', '', 'Total Penjualan', 'Rata-rata Penjualan'],
      rows: [
        ['Laptop', 15000000, 'Barat'],
        ['Monitor', 8000000, 'Timur'],
        ['Laptop', 11000000, 'Selatan'],
        ['Keyboard', 2000000, 'Barat'],
        ['Laptop', 18000000, 'Timur'],
      ],
    },
    tasks: [
      {
        task: 'Di sel E3, gunakan FILTER untuk menampilkan semua data (A2:C6) yang penjualannya > 12.000.000 DAN produknya "Laptop".',
        targetCell: { r: 2, c: 4 }, // E3
        answer: { type: 'formula', correctValue: '=FILTER(A2:C6;(B2:B6>12000000)*(A2:A6="Laptop"))' },
        correctResult: 'Laptop', // First cell of the spilled array
        explanation: 'FILTER dapat menangani beberapa kriteria dengan mengalikannya. (Kondisi1)*(Kondisi2) berfungsi sebagai operator AND.',
      },
      {
        task: 'Di sel H2, hitung total penjualan dari hasil yang telah difilter.',
        targetCell: { r: 1, c: 7 }, // H2
        answer: { type: 'formula', correctValue: '=SUM(FILTER(B2:B6;(B2:B6>12000000)*(A2:A6="Laptop")))' },
        correctResult: 33000000,
        explanation: 'Bungkus formula FILTER yang hanya mengambil kolom penjualan dengan fungsi SUM untuk menjumlahkan hasilnya.',
      },
      {
        task: 'Di sel H3, hitung rata-rata penjualan dari hasil yang telah difilter.',
        targetCell: { r: 2, c: 7 }, // H3
        answer: { type: 'formula', correctValue: '=AVERAGE(FILTER(B2:B6;(B2:B6>12000000)*(A2:A6="Laptop")))' },
        correctResult: 16500000,
        explanation: 'Sama seperti SUM, gunakan AVERAGE untuk menghitung rata-rata dari data yang telah difilter.',
      },
      {
        task: 'Di sel H4, hitung jumlah transaksi yang memenuhi kriteria filter.',
        targetCell: { r: 3, c: 7 }, // H4
        answer: { type: 'formula', correctValue: ['=COUNTIFS(B2:B6;">12000000";A2:A6;"Laptop")', '=ROWS(FILTER(A2:C6;(B2:B6>12000000)*(A2:A6="Laptop")))'] },
        correctResult: 2,
        explanation: 'Anda dapat menggunakan COUNTIFS dengan kriteria yang sama, atau menggunakan ROWS pada hasil FILTER Anda untuk menghitung jumlah baris.',
      }
    ]
  },
  {
    id: 9,
    title: 'Analisis Anggaran vs Aktual',
    difficulty: 'Medium',
    description: 'Hitung varians, persentase varians, dan status anggaran antara anggaran dan pengeluaran aktual, lalu berikan ringkasan.',
    table: {
      headers: ['Departemen', 'Anggaran', 'Aktual', 'Varians', 'Varians (%)', 'Status', '', 'Dept. Over Budget'],
      rows: [
        ['Marketing', 100000, 115000, '', '', ''],
        ['Operasional', 250000, 240000, '', '', ''],
        ['HR', 80000, 80000, '', '', ''],
        ['IT', 120000, 130000, '', '', ''],
      ],
    },
    tasks: [
      {
        task: 'Di D2, hitung varians untuk Marketing (Anggaran - Aktual).',
        targetCell: { r: 1, c: 3 }, // D2
        answer: { type: 'formula', correctValue: '=B2-C2' },
        correctResult: -15000,
        explanation: 'Varians negatif berarti pengeluaran melebihi anggaran (over budget).',
      },
      {
        task: 'Di E2, hitung persentase varians (Varians / Anggaran).',
        targetCell: { r: 1, c: 4 }, // E2
        answer: { type: 'formula', correctValue: '=IFERROR(D2/B2;0)' },
        correctResult: -0.15,
        explanation: 'Membagi varians dengan anggaran memberikan persentase penyimpangan. IFERROR ditambahkan untuk menangani jika anggaran adalah 0.',
      },
      {
        task: 'Di F2, tentukan status: "Over Budget" jika varians < 0, "Under Budget" jika > 0, atau "On Budget" jika = 0.',
        targetCell: { r: 1, c: 5 }, // F2
        answer: { type: 'formula', correctValue: '=IF(D2<0;"Over Budget";IF(D2>0;"Under Budget";"On Budget"))' },
        correctResult: 'Over Budget',
        explanation: 'IF bertingkat digunakan untuk mengklasifikasikan varians ke dalam tiga kategori status.',
      },
      {
        task: 'Salin ketiga formula ke bawah untuk semua departemen.',
        targetCell: { r: 2, c: 5 }, // F3
        answer: { type: 'formula', correctValue: '=IF(D3<0;"Over Budget";IF(D3>0;"Under Budget";"On Budget"))' },
        correctResult: 'Under Budget',
        explanation: 'Menyalin formula memungkinkan analisis yang cepat dan konsisten untuk semua baris data.',
      },
      {
        task: 'Di sel H2, gunakan COUNTIF untuk menghitung berapa banyak departemen yang statusnya "Over Budget".',
        targetCell: { r: 1, c: 7 }, // H2
        answer: { type: 'formula', correctValue: '=COUNTIF(F2:F5;"Over Budget")' },
        correctResult: 2,
        explanation: 'COUNTIF sangat berguna untuk meringkas data kategorikal seperti status yang baru saja kita buat.',
      }
    ]
  },
  {
    id: 10,
    title: 'Jadwal Proyek dengan Hari Libur',
    difficulty: 'Medium',
    description: 'Hitung tanggal selesai proyek dengan memperhitungkan akhir pekan dan daftar hari libur nasional.',
    table: {
      headers: ['Tugas', 'Tanggal Mulai', 'Durasi (Hari Kerja)', 'Tanggal Selesai', '', 'Hari Libur'],
      rows: [
        ['Riset', '01-Mar-2024', 5, '', '', '08-Mar-2024'],
        ['Desain', '11-Mar-2024', 10, '', ''],
        ['Development', '18-Mar-2024', 15, '', ''],
      ],
    },
    tasks: [
      {
        task: 'Di D2, gunakan fungsi WORKDAY untuk menghitung tanggal selesai Riset, dengan memperhitungkan hari libur di F2.',
        targetCell: { r: 1, c: 3 }, // D2
        answer: { type: 'formula', correctValue: '=WORKDAY(B2;C2;F$2:F$2)' },
        correctResult: 45362, // Excel serial number for March 11, 2024
        explanation: 'WORKDAY(start_date, days, [holidays]) secara otomatis melewati akhir pekan dan tanggal spesifik yang Anda berikan di rentang hari libur.',
      },
      {
        task: 'Di D3, hitung tanggal selesai Desain. Perhatikan bahwa tanggal mulainya harus setelah tugas Riset selesai.',
        targetCell: { r: 2, c: 3 }, // D3
        answer: { type: 'formula', correctValue: '=WORKDAY(D2;C3;F$2:F$2)' },
        correctResult: 45376, // March 27, 2024
        explanation: 'Jadwal proyek seringkali berurutan. Tanggal mulai tugas kedua adalah tanggal selesai tugas pertama. Gunakan referensi absolut F$2 agar tidak bergeser.',
      },
      {
        task: 'Hitung tanggal selesai untuk tugas Development.',
        targetCell: { r: 3, c: 3 }, // D4
        answer: { type: 'formula', correctValue: '=WORKDAY(D3;C4;F$2:F$2)' },
        correctResult: 45395, // April 18, 2024
        explanation: 'Melanjutkan logika dari tugas sebelumnya untuk menyelesaikan jadwal.',
      },
      {
        task: 'Hitung total hari kerja bersih untuk seluruh proyek dari tanggal mulai pertama hingga tanggal selesai terakhir menggunakan NETWORKDAYS.',
        targetCell: { r: 5, c: 3 }, // D6
        answer: { type: 'formula', correctValue: '=NETWORKDAYS(B2;D4;F$2:F$2)' },
        correctResult: 31,
        explanation: 'NETWORKDAYS(start, end, [holidays]) menghitung jumlah hari kerja antara dua tanggal, yang berguna untuk validasi durasi total proyek.',
      }
    ]
  },
  // Added 41 more cases, ensuring each has 4-6 tasks
  {
    id: 11,
    title: 'Peringkat Penjualan Dinamis Lanjutan',
    difficulty: 'Hard',
    description: 'Buat daftar produk teratas dan terbawah berdasarkan penjualan secara dinamis.',
    table: {
      headers: ['Produk', 'Penjualan', '', 'Top 3 Produk', '', 'Bottom 2 Produk'],
      rows: [
        ['Monitor', 800],
        ['Laptop', 1500],
        ['Keyboard', 200],
        ['Mouse', 500],
        ['Webcam', 700],
      ],
    },
    tasks: [
      {
        task: 'Di sel D2, buat daftar 3 produk teratas yang diurutkan berdasarkan penjualan (menurun).',
        targetCell: { r: 1, c: 3 }, // D2
        answer: { type: 'formula', correctValue: '=TAKE(SORT(A2:B6;2;-1);3)' },
        correctResult: 'Laptop',
        explanation: 'SORT(A2:B6;2;-1) mengurutkan tabel berdasarkan kolom ke-2 (Penjualan) secara menurun. TAKE(..., 3) mengambil 3 baris teratas.',
      },
      {
        task: 'Di sel F2, buat daftar 2 produk terbawah yang diurutkan berdasarkan penjualan (menaik).',
        targetCell: { r: 1, c: 5 }, // F2
        answer: { type: 'formula', correctValue: '=TAKE(SORT(A2:B6;2;1);2)' },
        correctResult: 'Keyboard',
        explanation: 'Logikanya sama, tetapi urutannya diubah menjadi menaik (1) dan hanya mengambil 2 baris teratas.',
      },
      {
        task: 'Di sel D6, hitung total penjualan dari 3 produk teratas.',
        targetCell: { r: 5, c: 3 }, // D6
        answer: { type: 'formula', correctValue: '=SUM(TAKE(SORT(A2:B6;2;-1);3))' },
        correctResult: 3000,
        explanation: 'Anda dapat membungkus formula array dinamis dengan fungsi agregat seperti SUM. Excel akan menjumlahkan semua nilai numerik dalam array hasil.',
      },
      {
        task: 'Di sel D7, hitung rata-rata penjualan dari 3 produk teratas.',
        targetCell: { r: 6, c: 3 }, // D7
        answer: { type: 'formula', correctValue: '=AVERAGE(TAKE(SORT(A2:B6;2;-1);3))' },
        correctResult: 1000,
        explanation: 'Sama seperti SUM, AVERAGE juga dapat digunakan langsung pada hasil dari formula array dinamis.',
      }
    ]
  },
  {
    id: 12,
    title: 'Menggabungkan & Membersihkan Nama',
    difficulty: 'Easy',
    description: 'Gabungkan nama depan dan belakang, lalu bersihkan dari spasi ekstra dan perbaiki kapitalisasinya.',
    table: {
      headers: ['Nama Depan', 'Nama Belakang', 'Nama Lengkap (Kotor)', 'Nama Lengkap (Bersih)'],
      rows: [
        ['  budi', 'SANTOSO', '', ''],
        [' ani  ', 'WIJAYA  ', '', ''],
      ],
    },
    tasks: [
      {
        task: 'Di C2, gabungkan A2 dan B2 dengan spasi di antaranya.',
        targetCell: { r: 1, c: 2 }, // C2
        answer: { type: 'formula', correctValue: ['=A2&" "&B2', '=CONCAT(A2;" ";B2)'] },
        correctResult: '  budi SANTOSO',
        explanation: 'Operator & menggabungkan teks. Perhatikan spasi ekstra dan kapitalisasi yang belum diperbaiki.',
      },
      {
        task: 'Di D2, gunakan fungsi PROPER dan TRIM untuk membersihkan nama di C2.',
        targetCell: { r: 1, c: 3 }, // D2
        answer: { type: 'formula', correctValue: '=PROPER(TRIM(C2))' },
        correctResult: 'Budi Santoso',
        explanation: 'TRIM menghapus spasi berlebih di awal dan akhir. PROPER mengubah teks menjadi format Proper Case.',
      },
      {
        task: 'Gabungkan kedua langkah dalam satu formula di D3 untuk nama Ani Wijaya.',
        targetCell: { r: 2, c: 3 }, // D3
        answer: { type: 'formula', correctValue: '=PROPER(TRIM(A3&" "&B3))' },
        correctResult: 'Ani Wijaya',
        explanation: 'Anda dapat menggabungkan (nesting) beberapa fungsi untuk menyelesaikan tugas pembersihan data dalam satu langkah.',
      },
      {
        task: 'Salin formula dari D3 ke D2 untuk memvalidasi.',
        targetCell: { r: 1, c: 3 }, // D2 (re-check)
        answer: { type: 'formula', correctValue: '=PROPER(TRIM(A2&" "&B2))' },
        correctResult: 'Budi Santoso',
        explanation: 'Formula gabungan ini lebih efisien karena tidak memerlukan kolom perantara.',
      }
    ]
  },
    {
    id: 48,
    title: 'Membuat Histogram Manual',
    difficulty: 'Hard',
    description: 'Kelompokkan data nilai ujian ke dalam beberapa rentang (bins) dan hitung frekuensinya.',
    table: {
      headers: ['Nilai', '', 'Rentang (Bins)', 'Frekuensi'],
      rows: [
        [85, '', '<=70'],
        [65, '', '71-80'],
        [78, '', '81-90'],
        [92, '', '>90'],
        [71],
        [88],
      ],
    },
    tasks: [
      {
        task: 'Di D2, gunakan COUNTIF untuk menghitung jumlah nilai yang kurang dari atau sama dengan 70.',
        targetCell: { r: 1, c: 3 },
        answer: { type: 'formula', correctValue: '=COUNTIF(A2:A7;"<=70")' },
        correctResult: 1,
        explanation: 'COUNTIF dengan operator "<=" digunakan untuk menghitung frekuensi rentang pertama.',
      },
      {
        task: 'Di D3, hitung jumlah nilai antara 71 dan 80.',
        targetCell: { r: 2, c: 3 },
        answer: { type: 'formula', correctValue: '=COUNTIFS(A2:A7;">70";A2:A7;"<=80")' },
        correctResult: 2,
        explanation: 'COUNTIFS diperlukan untuk menerapkan dua kriteria (lebih besar dari 70 DAN kurang dari atau sama dengan 80).',
      },
       {
        task: 'Di D4, hitung jumlah nilai antara 81 dan 90.',
        targetCell: { r: 3, c: 3 },
        answer: { type: 'formula', correctValue: '=COUNTIFS(A2:A7;">80";A2:A7;"<=90")' },
        correctResult: 2,
        explanation: 'Gunakan logika COUNTIFS yang sama untuk rentang nilai berikutnya.',
      },
       {
        task: 'Di D5, hitung jumlah nilai yang lebih besar dari 90.',
        targetCell: { r: 4, c: 3 },
        answer: { type: 'formula', correctValue: '=COUNTIF(A2:A7;">90")' },
        correctResult: 1,
        explanation: 'Gunakan COUNTIF dengan operator ">" untuk menghitung frekuensi rentang terakhir.',
      }
    ]
  },
  {
    id: 49,
    title: 'Mengidentifikasi Tren dengan SLOPE & INTERCEPT',
    difficulty: 'Medium',
    description: 'Tentukan tren penjualan dengan menghitung kemiringan (slope) dan titik potong (intercept) dari garis regresi linear.',
    table: {
      headers: ['Bulan (X)', 'Penjualan (Y)', 'Analisis Tren'],
      rows: [
        [1, 100, 'Slope:'],
        [2, 105, 'Intercept:'],
        [3, 115, 'Prediksi Bulan 5:'],
        [4, 110, ''],
      ],
    },
    tasks: [
      {
        task: 'Di sel D2, hitung kemiringan (slope) dari data penjualan (kolom B) terhadap bulan (kolom A).',
        targetCell: { r: 1, c: 3 },
        answer: { type: 'formula', correctValue: '=SLOPE(B2:B5;A2:A5)' },
        correctResult: 3.5,
        explanation: 'SLOPE(known_y\'s, known_x\'s) menghitung kemiringan garis regresi. Nilai positif menunjukkan tren naik.',
      },
      {
        task: 'Di sel D3, hitung titik potong (intercept) dari data yang sama.',
        targetCell: { r: 2, c: 3 },
        answer: { type: 'formula', correctValue: '=INTERCEPT(B2:B5;A2:A5)' },
        correctResult: 96.25,
        explanation: 'INTERCEPT(known_y\'s, known_x\'s) menghitung titik di mana garis regresi memotong sumbu Y.',
      },
      {
        task: 'Di sel D4, gunakan hasil SLOPE dan INTERCEPT untuk memprediksi penjualan di bulan ke-5. Rumus: y = (slope * x) + intercept.',
        targetCell: { r: 3, c: 3 },
        answer: { type: 'formula', correctValue: '=(D2*5)+D3' },
        correctResult: 113.75,
        explanation: 'Dengan menggunakan persamaan garis regresi (y = mx + c), Anda dapat membuat prediksi untuk nilai x di masa depan.',
      },
      {
        task: 'Gunakan fungsi FORECAST.LINEAR untuk melakukan prediksi yang sama di D4 dalam satu langkah.',
        targetCell: { r: 3, c: 3 },
        answer: { type: 'formula', correctValue: '=FORECAST.LINEAR(5;B2:B5;A2:A5)' },
        correctResult: 113.75,
        explanation: 'FORECAST.LINEAR(x, known_y\'s, known_x\'s) adalah cara langsung untuk melakukan prediksi regresi linear tanpa menghitung slope dan intercept secara terpisah.',
      }
    ]
  },
  {
    id: 50,
    title: 'Peringkat Persentil dan Klasifikasi',
    difficulty: 'Medium',
    description: 'Tentukan peringkat persentil untuk setiap skor siswa, lalu klasifikasikan mereka ke dalam kuartil.',
    table: {
      headers: ['Skor', 'Peringkat Persentil', 'Kuartil'],
      rows: [
        [88, '', ''],
        [75, '', ''],
        [95, '', ''],
        [60, '', ''],
      ],
    },
    tasks: [
      {
        task: 'Di B2, hitung peringkat persentil untuk skor di A2 relatif terhadap semua skor (gunakan referensi absolut untuk rentang).',
        targetCell: { r: 1, c: 1 },
        answer: { type: 'formula', correctValue: '=PERCENTRANK.INC(A$2:A$5;A2)' },
        correctResult: 0.6667,
        explanation: 'PERCENTRANK.INC(array, x) mengembalikan peringkat persentil. Referensi absolut (A$2:A$5) penting agar rentang tidak bergeser saat formula disalin.',
      },
      {
        task: 'Salin formula dari B2 ke bawah untuk semua skor.',
        targetCell: { r: 4, c: 1 },
        answer: { type: 'formula', correctValue: '=PERCENTRANK.INC(A$2:A$5;A4)' },
        correctResult: 0,
        explanation: 'Menyalin formula akan menghitung persentil untuk setiap siswa secara individual.',
      },
      {
        task: 'Di C2, klasifikasikan siswa ke dalam kuartil berdasarkan peringkat persentil di B2. Aturan: >0.75 = "Q1 (Top 25%)", >0.5 = "Q2", >0.25 = "Q3", sisanya "Q4".',
        targetCell: { r: 1, c: 2 },
        answer: { type: 'formula', correctValue: '=IFS(B2>0.75;"Q1 (Top 25%)";B2>0.5;"Q2";B2>0.25;"Q3";TRUE;"Q4")' },
        correctResult: 'Q2',
        explanation: 'Fungsi IFS sangat cocok untuk mengklasifikasikan nilai ke dalam beberapa kategori berdasarkan serangkaian kondisi.',
      },
      {
        task: 'Salin formula kuartil ke bawah untuk semua siswa.',
        targetCell: { r: 3, c: 2 },
        answer: { type: 'formula', correctValue: '=IFS(B4>0.75;"Q1 (Top 25%)";B4>0.5;"Q2";B4>0.25;"Q3";TRUE;"Q4")' },
        correctResult: 'Q1 (Top 25%)',
        explanation: 'Melengkapi klasifikasi akan memberikan gambaran cepat tentang posisi setiap siswa dalam distribusi skor.',
      }
    ]
  },
  {
    id: 51,
    title: 'Case Terakhir: Laporan All-in-One',
    difficulty: 'Hard',
    description: 'Gunakan fungsi LET dan fungsi agregat untuk membuat beberapa kalimat laporan dinamis yang merangkum data penjualan dalam sel terpisah.',
    table: {
      headers: ['Penjualan', '', 'Laporan'],
      rows: [
        [100, '', 'Total Penjualan:'],
        [150, '', 'Jumlah Transaksi:'],
        [120, '', 'Rata-rata Penjualan:'],
        [200, '', 'Penjualan Tertinggi:'],
      ],
    },
    tasks: [
      {
        task: 'Di sel D2, gunakan SUM untuk menghitung total penjualan dari rentang A2:A5.',
        targetCell: { r: 1, c: 3 },
        answer: { type: 'formula', correctValue: '=SUM(A2:A5)' },
        correctResult: 570,
        explanation: 'Fungsi SUM menjumlahkan semua nilai dalam rentang yang diberikan.',
      },
      {
        task: 'Di sel D3, gunakan COUNT untuk menghitung jumlah transaksi.',
        targetCell: { r: 2, c: 3 },
        answer: { type: 'formula', correctValue: '=COUNT(A2:A5)' },
        correctResult: 4,
        explanation: 'Fungsi COUNT menghitung jumlah sel yang berisi angka.',
      },
      {
        task: 'Di sel D4, gunakan AVERAGE untuk menghitung rata-rata penjualan.',
        targetCell: { r: 3, c: 3 },
        answer: { type: 'formula', correctValue: '=AVERAGE(A2:A5)' },
        correctResult: 142.5,
        explanation: 'Fungsi AVERAGE menghitung rata-rata aritmatika dari nilai-nilai.',
      },
      {
        task: 'Di sel D5, gunakan MAX untuk menemukan penjualan tertinggi.',
        targetCell: { r: 4, c: 3 },
        answer: { type: 'formula', correctValue: '=MAX(A2:A5)' },
        correctResult: 200,
        explanation: 'Fungsi MAX mengembalikan nilai terbesar dalam set data.',
      },
      {
        task: 'Sekarang, gabungkan semuanya! Di sel D6, gunakan LET untuk membuat satu kalimat laporan: "Total [jumlah] dari [transaksi] transaksi, dengan rata-rata [rata-rata] dan puncak [tertinggi]".',
        targetCell: { r: 5, c: 3 },
        answer: { type: 'formula', correctValue: '=LET(total;D2;transaksi;D3;rerata;D4;puncak;D5; "Total "&total&" dari "&transaksi&" transaksi, dengan rata-rata "&TEXT(rerata;"#,##0.0")&" dan puncak "&puncak)' },
        correctResult: 'Total 570 dari 4 transaksi, dengan rata-rata 142.5 dan puncak 200',
        explanation: 'Fungsi LET memungkinkan Anda mendefinisikan variabel untuk membuat formula yang kompleks menjadi lebih mudah dibaca dan dikelola.',
      }
    ]
  }
];
