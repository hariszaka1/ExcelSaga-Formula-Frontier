
import type { Level } from './types';
import { MagnifyingGlassIcon, TableCellsIcon, ChartBarIcon, CalculatorIcon, ChatBubbleBottomCenterTextIcon, ShareIcon, ListBulletIcon, SparklesIcon, DocumentChartBarIcon, StarIcon, PuzzlePieceIcon, ShieldExclamationIcon, EyeDropperIcon, AtSymbolIcon, ScissorsIcon, ChartPieIcon, LinkIcon, RectangleGroupIcon, AcademicCapIcon, CubeTransparentIcon, ArrowsRightLeftIcon, BeakerIcon, CheckBadgeIcon, SunIcon, BoltIcon, TagIcon, QueueListIcon, RocketLaunchIcon, TrophyIcon, CpuChipIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline';

export const levelData: Level[] = [
  {
    id: 1,
    title: 'VLOOKUP Quest',
    theme: 'Pencarian Data',
    challenge: 'Tantangan: Cari harga produk berdasarkan nama produk "Apel" menggunakan rumus VLOOKUP.',
    hint: 'Gunakan VLOOKUP. Anda perlu 4 argumen: apa yang dicari, di mana mencarinya, kolom ke berapa hasilnya, dan tipe pencocokan (pilih yang persis).',
    explanation: `Rumus **VLOOKUP** digunakan untuk mencari data secara vertikal (ke bawah) di kolom pertama sebuah tabel dan mengembalikan nilai dari kolom lain di baris yang sama.

Formula yang benar adalah \`=VLOOKUP("Apel";B2:C4;2;FALSE)\`. Mari kita pecah:
- **"Apel"**: Ini adalah nilai yang kita cari.
- **B2:C4**: Ini adalah rentang tabel tempat kita mencari. VLOOKUP akan selalu mencari di kolom pertama rentang ini (kolom B).
- **2**: Ini adalah nomor kolom di dalam rentang yang nilainya ingin kita ambil (kolom C adalah kolom ke-2 dari B2:C4).
- **FALSE** atau **0**: Ini menentukan bahwa kita ingin mencari kecocokan yang **persis**. Ini sangat penting untuk akurasi data.`,
    table: {
      headers: ['ID Produk', 'Nama Produk', 'Harga'],
      rows: [
        ['P001', 'Apel', 15000],
        ['P002', 'Jeruk', 12000],
        ['P003', 'Mangga', 20000],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: [
        '=VLOOKUP("Apel";B2:C4;2;FALSE)',
        '=VLOOKUP("Apel";B:C;2;FALSE)',
        '=VLOOKUP("Apel";B2:C4;2;0)',
        '=VLOOKUP("Apel";B:C;2;0)'
      ],
    },
    icon: MagnifyingGlassIcon,
  },
  {
    id: 2,
    title: 'HLOOKUP & Orientation Trap',
    theme: 'Pencarian Horizontal',
    challenge: 'Gunakan rumus HLOOKUP untuk mengambil nilai penjualan pada tanggal "02-Jan".',
    hint: 'Mirip VLOOKUP tapi untuk tabel horizontal. Perhatikan di baris ke berapa data "Penjualan" berada.',
    explanation: `Rumus **HLOOKUP** bekerja seperti VLOOKUP, tetapi mencari data secara horizontal (ke kanan) di baris pertama tabel.

Formula yang benar adalah \`=HLOOKUP("02-Jan";B1:D3;2;FALSE)\`. Mari kita pecah:
- **"02-Jan"**: Nilai yang kita cari di baris paling atas dari rentang.
- **B1:D3**: Rentang tabel tempat kita mencari. HLOOKUP mencari di baris pertama rentang ini (baris 1).
- **2**: Nomor baris di dalam rentang yang nilainya ingin kita ambil (baris "Penjualan" adalah baris ke-2 dari B1:D3).
- **FALSE** atau **0**: Mencari kecocokan yang persis.`,
    table: {
      headers: ['Metrik', '01-Jan', '02-Jan', '03-Jan'],
      rows: [
        ['Penjualan', 100, 150, 120],
        ['Pengunjung', 50, 75, 60],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: [
        '=HLOOKUP("02-Jan";B1:D3;2;FALSE)',
        '=HLOOKUP("02-Jan";1:3;2;FALSE)',
        '=HLOOKUP("02-Jan";B1:D3;2;0)',
        '=HLOOKUP("02-Jan";1:3;2;0)',
      ],
    },
    icon: TableCellsIcon,
  },
  {
    id: 3,
    title: 'COUNTIF Tracker',
    theme: 'Menghitung Bersyarat',
    challenge: 'Hitung jumlah siswa yang mendapatkan nilai "A" dengan rumus COUNTIF.',
    hint: 'Fungsi COUNTIF butuh dua hal: rentang sel yang mau dihitung dan kriteria (apa yang mau dihitung).',
    explanation: `Rumus **COUNTIF** digunakan untuk menghitung jumlah sel dalam suatu rentang yang memenuhi satu kriteria tertentu.

Formula yang benar adalah \`=COUNTIF(B2:B6;"A")\`.
- **B2:B6**: Ini adalah rentang sel tempat kita ingin menghitung (kolom nilai).
- **"A"**: Ini adalah kriteria. Rumus ini akan menghitung setiap sel di rentang B2:B6 yang isinya persis "A".`,
    table: {
      headers: ['Nama Siswa', 'Nilai'],
      rows: [
        ['Adi', 'A'],
        ['Budi', 'B'],
        ['Cici', 'A'],
        ['Dedi', 'C'],
        ['Eka', 'A'],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: '=COUNTIF(B2:B6;"A")',
    },
    icon: CalculatorIcon,
  },
  {
    id: 4,
    title: 'SUMIFS Monster',
    theme: 'Menjumlahkan Multi-Kriteria',
    challenge: 'Jumlahkan total penjualan untuk wilayah "Utara" di bulan "Januari".',
    hint: 'Gunakan SUMIFS untuk menjumlahkan dengan lebih dari satu syarat. Argumen pertama adalah rentang yang mau dijumlah, diikuti pasangan rentang kriteria dan kriterianya.',
    explanation: `Rumus **SUMIFS** sangat berguna untuk menjumlahkan nilai berdasarkan beberapa kriteria sekaligus.

Formula yang benar adalah \`=SUMIFS(C2:C5;A2:A5;"Januari";B2:B5;"Utara")\`.
- **C2:C5**: Rentang yang akan dijumlahkan (kolom Penjualan).
- **A2:A5**: Rentang kriteria pertama (kolom Bulan).
- **"Januari"**: Kriteria untuk rentang pertama.
- **B2:B5**: Rentang kriteria kedua (kolom Wilayah).
- **"Utara"**: Kriteria untuk rentang kedua.
Rumus ini akan menjumlahkan nilai di kolom C hanya jika baris yang sama berisi "Januari" di kolom A **DAN** "Utara" di kolom B.`,
    table: {
      headers: ['Bulan', 'Wilayah', 'Penjualan'],
      rows: [
        ['Januari', 'Utara', 500],
        ['Januari', 'Selatan', 300],
        ['Februari', 'Utara', 400],
        ['Januari', 'Utara', 200],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: [
        '=SUMIFS(C2:C5;A2:A5;"Januari";B2:B5;"Utara")',
        '=SUMIFS(C:C;A:A;"Januari";B:B;"Utara")',
        '=SUMIFS(C2:C5;B2:B5;"Utara";A2:A5;"Januari")', // Order of criteria doesn't matter
      ],
    },
    icon: ChartBarIcon,
  },
  {
    id: 5,
    title: 'TEXT Function Puzzle',
    theme: 'Format Teks',
    challenge: 'Format ulang tanggal "01/01/2025" (di sel A2) menjadi teks: "Rabu, 01 Januari 2025".',
    hint: 'Fungsi TEXT bisa mengubah tanggal menjadi format teks kustom. Cari tahu kode format untuk "dddd", "dd", "mmmm", dan "yyyy".',
    explanation: `Fungsi **TEXT** adalah alat yang ampuh untuk mengubah nilai (seperti tanggal atau angka) menjadi teks dengan format yang kita tentukan.

Formula yang benar adalah \`=TEXT(A2;"dddd, dd mmmm yyyy")\`.
- **A2**: Sel yang berisi nilai tanggal asli.
- **"dddd, dd mmmm yyyy"**: Kode format untuk menginstruksikan Excel cara menampilkan tanggal sebagai teks.
  - \`dddd\`: Menampilkan nama hari lengkap (e.g., "Rabu").
  - \`dd\`: Menampilkan tanggal sebagai dua digit (e.g., "01").
  - \`mmmm\`: Menampilkan nama bulan lengkap (e.g., "Januari").
  - \`yyyy\`: Menampilkan tahun sebagai empat digit (e.g., "2025").`,
    table: {
      headers: ['Tanggal Mentah'],
      rows: [['01/01/2025']],
    },
    answer: {
      type: 'formula',
      correctValue: '=TEXT(A2;"dddd, dd mmmm yyyy")',
    },
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    id: 6,
    title: 'Nested IF & Decision Forest',
    theme: 'Logika Bertingkat',
    challenge: 'Gunakan rumus IF bertingkat untuk menentukan status. Nilai > 80: LULUS, > 60: REMEDIAL, selain itu: TIDAK LULUS. Cek untuk nilai di B2 (75).',
    hint: 'Anda perlu menumpuk fungsi IF. Mulai dari kondisi paling tinggi (>80), lalu kondisi berikutnya (>60), dan terakhir nilai jika semua salah.',
    explanation: `**IF Bertingkat (Nested IF)** adalah teknik menempatkan fungsi IF di dalam fungsi IF lain untuk menangani lebih dari dua kemungkinan hasil.

Formula yang benar adalah \`=IF(B2>80;"LULUS";IF(B2>60;"REMEDIAL";"TIDAK LULUS"))\`.
1. **Pengecekan Pertama**: \`IF(B2>80;"LULUS";...)\`
   - Excel mengecek apakah nilai di B2 (yaitu 75) lebih besar dari 80. Ini **Salah**.
2. **Pengecekan Kedua**: Karena cek pertama salah, Excel melanjutkan ke IF berikutnya: \`IF(B2>60;"REMEDIAL";"TIDAK LULUS")\`
   - Excel mengecek apakah 75 lebih besar dari 60. Ini **Benar**.
3. **Hasil**: Karena cek kedua benar, Excel mengembalikan "REMEDIAL". Jika cek kedua juga salah, maka hasilnya adalah "TIDAK LULUS". Urutan pengecekan dari kondisi tertinggi ke terendah sangat penting.`,
    table: {
      headers: ['Nama', 'Nilai', 'Status'],
      rows: [['Ani', 75, '?']],
    },
    answer: {
      type: 'formula',
      correctValue: [
        '=IF(B2>80;"LULUS";IF(B2>60;"REMEDIAL";"TIDAK LULUS"))',
        '=IFS(B2>80;"LULUS";B2>60;"REMEDIAL";TRUE;"TIDAK LULUS")', // Modern alternative
        '=IF(B2<=60;"TIDAK LULUS";IF(B2<=80;"REMEDIAL";"LULUS"))', // Inverted logic
      ],
    },
    icon: ShareIcon,
  },
  {
    id: 7,
    title: 'Gerbang Logika AND',
    theme: 'Logika & Kondisi',
    challenge: 'Penjaga gerbang hanya akan membuka jika ksatria memiliki "Pedang Baja" DI SEL B2 DAN "Perisai Besi" DI SEL C2. Tulis formula yang menghasilkan TRUE jika kedua syarat terpenuhi.',
    hint: 'Gunakan fungsi AND untuk memastikan semua kondisi bernilai benar.',
    explanation: `Fungsi **AND** sangat penting dalam logika. Ia akan mengembalikan TRUE hanya jika SEMUA argumen di dalamnya bernilai TRUE. Jika salah satu saja FALSE, hasilnya akan FALSE. Formula yang benar \`=AND(B2="Pedang Baja";C2="Perisai Besi")\` mengecek kedua sel secara bersamaan.`,
    table: {
      headers: ['Item Dimiliki', 'Item Kedua'],
      rows: [['Pedang Baja', 'Perisai Besi']],
    },
    answer: {
      type: 'formula',
      correctValue: [
        '=AND(B2="Pedang Baja";C2="Perisai Besi")',
        '=AND(C2="Perisai Besi";B2="Pedang Baja")'
      ],
    },
    icon: ListBulletIcon,
  },
  {
    id: 8,
    title: 'Dekripsi SUBSTITUTE',
    theme: 'Manipulasi Teks',
    challenge: "Sebuah pesan rahasia ('AXL-007-BOS') diterima di sel A2. Gunakan SUBSTITUTE untuk mengganti 'AXL' dengan 'EXCEL' dan mengungkap kode agen yang benar.",
    hint: 'Fungsi SUBSTITUTE butuh 3 argumen: teks sumber, teks lama yang mau diganti, dan teks baru sebagai pengganti.',
    explanation: `Fungsi **SUBSTITUTE** adalah alat yang hebat untuk mengganti potongan teks tertentu di dalam sebuah string. Tidak seperti REPLACE yang berbasis posisi, SUBSTITUTE mencari teks yang sama persis. Formula \`=SUBSTITUTE(A2;"AXL";"EXCEL")\` mencari 'AXL' di sel A2 dan menggantinya dengan 'EXCEL' untuk mendapatkan hasilnya.`,
    table: {
      headers: ['Kode Rahasia'],
      rows: [['AXL-007-BOS']],
    },
    answer: {
      type: 'formula',
      correctValue: '=SUBSTITUTE(A2;"AXL";"EXCEL")',
    },
    icon: SparklesIcon,
  },
  {
    id: 9,
    title: 'Peringkat Juara LARGE',
    theme: 'Ranking & Statistik',
    challenge: 'Kita perlu mencari skor juara kedua (medali perak) dari daftar turnamen di kolom B. Gunakan formula untuk menemukan skor tertinggi kedua.',
    hint: 'Fungsi MAX hanya memberimu yang tertinggi. Gunakan fungsi LARGE untuk menemukan nilai ke-k tertinggi (misalnya, ke-2, ke-3, dst).',
    explanation: `Ketika Anda perlu menemukan nilai terbesar ke-N dalam suatu data, fungsi **LARGE** adalah jawabannya. Formulanya adalah \`LARGE(array, k)\`, di mana \`k\` adalah peringkat yang Anda inginkan. Untuk menemukan juara kedua, kita gunakan \`k=2\`. Jadi, \`=LARGE(B2:B5;2)\` akan melihat rentang skor dan mengembalikan nilai terbesar kedua, yaitu 275.`,
    table: {
      headers: ['Nama Juara', 'Skor'],
      rows: [
        ['Arjuna', 250],
        ['Bima', 280],
        ['Nakula', 220],
        ['Sadewa', 275],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: '=LARGE(B2:B5;2)',
    },
    icon: DocumentChartBarIcon,
  },
  {
    id: 10,
    title: 'Bonus Boss Fight: Mega Report',
    theme: 'Laporan Gabungan',
    challenge: 'Gabungkan VLOOKUP dan SUM untuk total harga dari daftar belanja. Apa totalnya?',
    hint: 'Untuk mengalikan dan menjumlahkan hasil dari beberapa pencarian sekaligus, SUMPRODUCT adalah fungsi yang sangat kuat. Coba gabungkan dengan VLOOKUP.',
    explanation: `Tantangan ini memerlukan perhitungan total belanja, yaitu (Jumlah x Harga) untuk setiap item, lalu menjumlahkan semuanya. Ada dua cara utama untuk melakukannya:

**1. Metode SUMPRODUCT (Lebih Efisien):**
Formula: \`=SUMPRODUCT(VLOOKUP(A2:A4;D2:E4;2;FALSE);B2:B4)\`
- **VLOOKUP(A2:A4;...)**: Ini adalah *array formula* yang mencari harga untuk semua item di daftar belanja sekaligus, menghasilkan array harga: \`{10; 5; 20}\`.
- **B2:B4**: Ini adalah array jumlah: \`{2; 5; 1}\`.
- **SUMPRODUCT**: Fungsi ini mengalikan elemen yang bersesuaian dari kedua array (\`10*2\`, \`5*5\`, \`20*1\`) dan kemudian menjumlahkan hasilnya (\`20 + 25 + 20\`), memberikan total **65**.

**2. Metode SUM + VLOOKUP (Manual):**
Formula: \`=SUM(VLOOKUP(...) * B2, VLOOKUP(...) * B3, ...)\`
Metode ini melakukan perkalian (harga * jumlah) untuk setiap item secara terpisah, lalu fungsi SUM menjumlahkan semua hasil tersebut. Meskipun berhasil, metode ini kurang efisien jika daftarnya panjang.`,
    table: {
      headers: ['Daftar Belanja', 'Jumlah', 'Tabel Harga', 'Produk', 'Harga'],
      rows: [
        ['Apel', 2, '', 'Apel', 10],
        ['Jeruk', 5, '', 'Jeruk', 5],
        ['Mangga', 1, '', 'Mangga', 20],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: [
        '=SUMPRODUCT(VLOOKUP(A2:A4;D2:E4;2;FALSE);B2:B4)',
        '=SUM(VLOOKUP(A2;D2:E4;2;FALSE)*B2; VLOOKUP(A3;D2:E4;2;FALSE)*B3; VLOOKUP(A4;D2:E4;2;FALSE)*B4)',
        '=SUMPRODUCT(VLOOKUP(A2:A4;D2:E4;2;0);B2:B4)',
        '=SUM(VLOOKUP(A2;D2:E4;2;0)*B2; VLOOKUP(A3;D2:E4;2;0)*B3; VLOOKUP(A4;D2:E4;2;0)*B4)',
      ],
    },
    icon: StarIcon,
  },
  {
    id: 11,
    title: 'INDEX & MATCH Duel',
    theme: 'Pencarian Fleksibel',
    challenge: 'VLOOKUP tidak bisa melihat ke kiri! Gunakan INDEX dan MATCH untuk menemukan Nama Produk dari ID Produk "P002".',
    hint: 'MATCH menemukan posisi "P002" di kolom ID. INDEX mengambil nilai dari posisi yang sama di kolom Nama Produk.',
    explanation: `Rumus **INDEX & MATCH** adalah kombinasi super kuat yang seringkali lebih baik dari VLOOKUP. **MATCH** mencari nilai dan mengembalikan posisinya (nomor baris), lalu **INDEX** mengambil nilai dari posisi tersebut di kolom lain. Formula: \`=INDEX(B2:B4;MATCH("P002";C2:C4;0))\`. \`MATCH("P002";C2:C4;0)\` akan menghasilkan 2 (posisi kedua di rentang C2:C4). Lalu \`INDEX(B2:B4;2)\` akan mengambil nilai kedua dari rentang B2:B4, yaitu "Jeruk".`,
    table: {
        headers: ['Harga', 'Nama Produk', 'ID Produk'],
        rows: [
            [15000, 'Apel', 'P001'],
            [12000, 'Jeruk', 'P002'],
            [20000, 'Mangga', 'P003'],
        ],
    },
    answer: {
        type: 'formula',
        correctValue: [
            '=INDEX(B2:B4;MATCH("P002";C2:C4;0))',
            '=INDEX(B:B;MATCH("P002";C:C;0))'
        ],
    },
    icon: PuzzlePieceIcon,
  },
  {
    id: 12,
    title: 'IFERROR Trap',
    theme: 'Penanganan Error',
    challenge: 'Cari produk "Durian" menggunakan VLOOKUP. Karena tidak ada, akan muncul error #N/A. Gunakan IFERROR untuk menampilkan pesan "Produk tidak ada" sebagai gantinya.',
    hint: 'Bungkus rumus VLOOKUP Anda di dalam fungsi IFERROR. Argumen kedua IFERROR adalah apa yang ditampilkan jika terjadi error.',
    explanation: `Fungsi **IFERROR** sangat berguna untuk menangkap error (seperti #N/A, #VALUE!, dll.) dan menggantinya dengan nilai atau pesan yang lebih ramah pengguna. Formula: \`=IFERROR(VLOOKUP("Durian";A2:B4;2;FALSE);"Produk tidak ada")\`. Excel pertama-tama mencoba menjalankan VLOOKUP. Karena gagal dan menghasilkan error, IFERROR mengambil alih dan mengembalikan nilai kedua, yaitu "Produk tidak ada".`,
    table: {
        headers: ['Produk', 'Harga'],
        rows: [
            ['Apel', 15000],
            ['Jeruk', 12000],
            ['Mangga', 20000],
        ],
    },
    answer: {
        type: 'formula',
        correctValue: '=IFERROR(VLOOKUP("Durian";A2:B4;2;FALSE);"Produk tidak ada")',
    },
    icon: ShieldExclamationIcon,
  },
  {
    id: 13,
    title: 'Conditional Formatting Battle',
    theme: 'Visualisasi Data',
    challenge: 'Sorot nilai siswa di bawah KKM (70) dengan warna merah. Tuliskan formula yang akan Anda masukkan ke *Conditional Formatting* (aturan untuk rentang B2:B5) agar berfungsi dengan benar.',
    hint: 'Aturan format bersyarat untuk rentang sel harus ditulis seolah-olah Anda menulisnya untuk sel pertama di pojok kiri atas rentang tersebut (B2).',
    explanation: `**Conditional Formatting** dengan formula memberikan kontrol penuh atas bagaimana dan kapan sel diformat. Saat menerapkan aturan ke rentang (misal B2:B5), Anda menulis formula untuk sel pertama (B2). Formula yang benar adalah \`=B2<70\`. Excel akan mengevaluasi ini untuk B2. Jika BENAR, format diterapkan. Kemudian, Excel secara otomatis menyesuaikannya untuk sel berikutnya: untuk B3, ia mengevaluasi \`=B3<70\`, dan seterusnya. Ini adalah cara yang efisien untuk menerapkan logika ke seluruh rentang.`,
    table: {
        headers: ['Siswa', 'Nilai'],
        rows: [
            ['Adi', 85],
            ['Budi', 68],
            ['Cici', 92],
            ['Dedi', 60],
        ],
    },
    answer: {
        type: 'formula',
        correctValue: '=B2<70',
    },
    icon: EyeDropperIcon,
  },
  {
    id: 14,
    title: 'SEARCH & FIND Mission',
    theme: 'Analisis Teks',
    challenge: 'Temukan posisi karakter "@" dalam alamat email di sel A2. Gunakan fungsi FIND.',
    hint: 'Fungsi FIND mengambil dua argumen: teks yang dicari, dan di mana mencarinya.',
    explanation: `Fungsi **FIND** digunakan untuk menemukan posisi awal sebuah string teks di dalam string teks lain (dan bersifat case-sensitive/membedakan huruf besar-kecil). Formula: \`=FIND("@";A2)\`. Ini akan mencari karakter "@" di dalam sel A2 ("user@example.com") dan mengembalikan 5, karena "@" adalah karakter ke-5. Fungsi serupa, **SEARCH**, melakukan hal yang sama tetapi tidak case-sensitive.`,
    table: {
        headers: ['Email'],
        rows: [['user@example.com']],
    },
    answer: {
        type: 'formula',
        correctValue: ['=FIND("@";A2)', '=SEARCH("@";A2)'],
    },
    icon: AtSymbolIcon,
  },
  {
    id: 15,
    title: 'LEFT, MID, RIGHT Labyrinth',
    theme: 'Ekstraksi Teks',
    challenge: 'Ekstrak kode unik di tengah ID Karyawan (3 karakter setelah "EMP-"). Gunakan fungsi MID.',
    hint: 'MID butuh 3 argumen: teksnya, posisi awal (start_num), dan berapa banyak karakter yang mau diambil (num_chars).',
    explanation: `Fungsi teks seperti LEFT, RIGHT, dan MID sangat penting untuk memanipulasi data. **MID** digunakan untuk mengambil teks dari bagian tengah. Formula: \`=MID(A2;5;3)\`.
- **A2**: Teks sumber.
- **5**: Mulai dari karakter ke-5 ("1").
- **3**: Ambil 3 karakter.
Hasilnya adalah "123". **LEFT(A2;3)** akan menghasilkan "EMP", dan **RIGHT(A2;2)** akan menghasilkan "ID".`,
    table: {
        headers: ['ID Karyawan'],
        rows: [['EMP-123-ID']],
    },
    answer: {
        type: 'formula',
        correctValue: '=MID(A2;5;3)',
    },
    icon: ScissorsIcon,
  },
  {
    id: 16,
    title: 'Data Cleaning Chamber',
    theme: 'Persiapan Data',
    challenge: 'Data nama di A2 berantakan. Gunakan kombinasi fungsi untuk menghapus spasi berlebih di awal/akhir dan mengganti "JKT" dengan "Jakarta".',
    hint: 'Gunakan TRIM untuk spasi, dan SUBSTITUTE untuk mengganti teks.',
    explanation: `Pembersihan data adalah langkah krusial dalam analisis. Seringkali kita perlu menggabungkan beberapa fungsi. Formula: \`=SUBSTITUTE(TRIM(A2);"JKT";"Jakarta")\`.
1. **TRIM(A2)**: Pertama, Excel membersihkan spasi ekstra dari \`'  Cabang JKT  '\` menjadi \`'Cabang JKT'\`.
2. **SUBSTITUTE(...)**: Selanjutnya, Excel mengambil hasil dari TRIM dan mengganti semua kemunculan "JKT" dengan "Jakarta".
Hasil akhirnya adalah teks yang bersih: "Cabang Jakarta".`,
    table: {
        headers: ['Data Lokasi'],
        rows: [['  Cabang JKT  ']],
    },
    answer: {
        type: 'formula',
        correctValue: '=SUBSTITUTE(TRIM(A2);"JKT";"Jakarta")',
    },
    icon: SparklesIcon,
  },
  {
    id: 17,
    title: 'Dynamic Chart Quest',
    theme: 'Visualisasi Interaktif',
    challenge: 'Anda ingin membuat grafik yang sumber datanya bisa berubah-ubah. Fungsi apa yang paling umum digunakan untuk membuat *named range* dinamis yang bisa tumbuh atau menyusut bersama data? (Jawab dengan nama fungsi)',
    hint: 'Fungsi ini memungkinkan Anda menentukan rentang berdasarkan titik awal, pergeseran baris/kolom, serta tinggi dan lebar rentang.',
    explanation: `Fungsi **OFFSET** sangat kuat untuk membuat referensi rentang yang dinamis. Rumus dasarnya adalah \`OFFSET(reference, rows, cols, [height], [width])\`. Dengan mengkombinasikannya dengan fungsi seperti COUNTA untuk menghitung jumlah baris/kolom yang terisi data, Anda bisa membuat "Named Range" yang secara otomatis memperbarui ukurannya saat data ditambahkan atau dihapus. Ini adalah teknik kunci untuk membuat dasbor dan grafik yang tidak perlu diperbarui secara manual.`,
    table: {
        headers: ['Bulan', 'Penjualan'],
        rows: [['Januari', 100], ['Februari', 120], ['Maret', 150]],
    },
    answer: {
        type: 'text',
        correctValue: 'OFFSET',
    },
    icon: ChartPieIcon,
  },
  {
    id: 18,
    title: 'OFFSET & INDIRECT Cave',
    theme: 'Referensi Dinamis',
    challenge: 'Sebuah sel (E2) berisi teks "B3". Tuliskan formula menggunakan INDIRECT untuk mendapatkan nilai dari sel yang alamatnya tertulis di E2.',
    hint: 'INDIRECT mengambil teks dan memperlakukannya sebagai referensi sel yang valid.',
    explanation: `Fungsi **INDIRECT** sangat unik. Ia mengubah string teks menjadi referensi sel nyata. Jika sel E2 berisi teks "B3", formula \`=INDIRECT(E2)\` akan dievaluasi oleh Excel sebagai \`=B3\`, sehingga mengembalikan nilai dari sel B3, yaitu 50. Ini sangat berguna untuk membuat formula yang dapat merujuk ke sheet atau sel yang berbeda hanya dengan mengubah nilai teks di satu tempat.`,
    table: {
        headers: ['Kolom A', 'Kolom B', 'Kolom C', '', 'Alamat Sel'],
        rows: [['10', '20', '30', '', 'B3'], ['40', '50', '60', '', ''], ['70', '80', '90', '', '']],
    },
    answer: {
        type: 'formula',
        correctValue: ['=INDIRECT(E2)', '=INDIRECT("B3")'],
    },
    icon: LinkIcon,
  },
  {
    id: 19,
    title: 'Dashboard Builder Trial',
    theme: 'Ringkasan Data',
    challenge: 'Dari tabel data penjualan, hitung total penjualan untuk produk "Laptop" di wilayah "Barat". Ini adalah komponen kunci untuk sebuah dasbor ringkasan.',
    hint: 'Gunakan SUMIFS untuk menjumlahkan berdasarkan beberapa kriteria (wilayah DAN produk).',
    explanation: `Dasbor yang efektif bergantung pada formula ringkasan yang kuat seperti **SUMIFS**. Formula \`=SUMIFS(C2:C6;A2:A6;"Barat";B2:B6;"Laptop")\` bekerja dengan:
- **C2:C6**: Menentukan rentang yang akan dijumlahkan (Penjualan).
- **A2:A6;"Barat"**: Menentukan kriteria pertama (Wilayah harus "Barat").
- **B2:B6;"Laptop"**: Menentukan kriteria kedua (Produk harus "Laptop").
Excel hanya akan menjumlahkan baris yang memenuhi SEMUA kriteria ini, menghasilkan total yang akurat untuk dasbor Anda.`,
    table: {
        headers: ['Wilayah', 'Produk', 'Penjualan'],
        rows: [['Barat', 'Laptop', 1200], ['Timur', 'Monitor', 300], ['Barat', 'Keyboard', 75], ['Selatan', 'Laptop', 800], ['Barat', 'Laptop', 500]],
    },
    answer: {
        type: 'formula',
        correctValue: '=SUMIFS(C2:C6;A2:A6;"Barat";B2:B6;"Laptop")',
    },
    icon: RectangleGroupIcon,
  },
  {
    id: 20,
    title: 'Final Boss: Power Formula Fusion',
    theme: 'Laporan Kompleks',
    challenge: 'Gunakan VLOOKUP untuk mencari Skor Total "Budi" dari tabel, dan gabungkan hasilnya menjadi satu kalimat laporan: "Skor total untuk Budi adalah 175."',
    hint: 'Gunakan `&` atau CONCATENATE/CONCAT untuk menggabungkan string teks. Masukkan rumus VLOOKUP Anda di dalam gabungan tersebut.',
    explanation: `Menggabungkan beberapa fungsi dalam satu formula adalah puncak keahlian Excel. Formula \`="Skor total untuk " & "Budi" & " adalah " & VLOOKUP("Budi";B2:C4;2;FALSE)\` (atau variasi dengan CONCAT) menunjukkan alur kerja yang lengkap:
1. **String Statis**: Dimulai dengan teks \`"Skor total untuk "\`.
2. **Nilai Teks**: Menggabungkan nama "Budi".
3. **Fungsi Pencarian**: \`VLOOKUP("Budi";B2:C4;2;FALSE)\` mencari nama "Budi" dan mengembalikan skornya (175) dari kolom kedua.
4. **Penggabungan**: Semua bagian ini digabungkan menjadi satu kalimat laporan yang dinamis dan informatif.`,
    table: {
        headers: ['ID', 'Nama', 'Skor Total'],
        rows: [['101', 'Adi', 170], ['102', 'Budi', 175], ['103', 'Cici', 145]],
    },
    answer: {
        type: 'formula',
        correctValue: [
            '="Skor total untuk Budi adalah "&VLOOKUP("Budi";B2:C4;2;FALSE)',
            '=CONCAT("Skor total untuk Budi adalah ";VLOOKUP("Budi";B2:C4;2;FALSE))',
            '="Skor total untuk "&B3&" adalah "&C3'
        ],
    },
    icon: AcademicCapIcon,
  },
  {
    id: 21,
    title: 'Formula Array Dinamis',
    theme: 'Dynamic Arrays',
    challenge: 'Gunakan fungsi FILTER untuk menampilkan semua penjualan dari wilayah "Timur" secara dinamis.',
    hint: 'FILTER butuh 2 argumen: array yang akan difilter, dan kondisi logis (kolom wilayah = "Timur").',
    explanation: `Formula Array Dinamis seperti FILTER secara otomatis "tumpah" (spill) ke sel-sel di bawahnya. Formula \`=FILTER(A2:C5;A2:A5="Timur")\` akan mengevaluasi kolom Wilayah, dan mengembalikan semua baris dan kolom di mana Wilayah adalah "Timur".`,
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [
        ['Barat', 'Laptop', 1200],
        ['Timur', 'Monitor', 300],
        ['Timur', 'Keyboard', 75],
        ['Barat', 'Laptop', 500],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: '=FILTER(A2:C5;A2:A5="Timur")',
    },
    icon: CubeTransparentIcon,
  },
  {
    id: 22,
    title: 'Duel XLOOKUP',
    theme: 'Pencarian Super',
    challenge: 'Gunakan XLOOKUP untuk menemukan Wilayah dari Produk "Monitor". XLOOKUP bisa mencari ke segala arah!',
    hint: 'XLOOKUP butuh 3 argumen inti: nilai lookup, array lookup, dan array hasil.',
    explanation: `XLOOKUP adalah penerus modern dari VLOOKUP. Formula \`=XLOOKUP("Monitor";B2:B5;A2:A5)\` bekerja dengan mencari "Monitor" di kolom Produk (B2:B5), lalu mengembalikan nilai yang bersesuaian dari kolom Wilayah (A2:A5). Tidak seperti VLOOKUP, urutan kolom tidak jadi masalah.`,
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [
        ['Barat', 'Laptop', 1200],
        ['Timur', 'Monitor', 300],
        ['Barat', 'Keyboard', 75],
        ['Selatan', 'Laptop', 800],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: '=XLOOKUP("Monitor";B2:B5;A2:A5)',
    },
    icon: ArrowsRightLeftIcon,
  },
  {
    id: 23,
    title: 'Misi LET & LAMBDA',
    theme: 'Fungsi Kustom',
    challenge: `Gunakan fungsi LET untuk mendefinisikan variabel 'Pajak' sebesar 10% (0.1) dan 'Harga' dari sel B2. Hitung harga setelah pajak.`,
    hint: 'LET(nama1, nilai1, nama2, nilai2, kalkulasi). Definisikan Pajak dan Harga, lalu hitung Harga * (1 + Pajak).',
    explanation: `Fungsi LET meningkatkan keterbacaan dan performa dengan memungkinkan Anda menamai variabel di dalam formula. Formula \`=LET(Harga;B2;Pajak;0.1;Harga*(1+Pajak))\` membuat formula kompleks jadi lebih mudah dibaca dan dikelola tanpa perlu sel bantu.`,
    table: {
      headers: ['Item', 'Harga'],
      rows: [['Barang A', 1000]],
    },
    answer: {
      type: 'formula',
      correctValue: '=LET(Harga;B2;Pajak;0.1;Harga*(1+Pajak))',
    },
    icon: BeakerIcon,
  },
  {
    id: 24,
    title: 'Validasi Data Cerdas',
    theme: 'Aturan Input',
    challenge: 'Tuliskan formula untuk aturan Validasi Data di sel A2 yang hanya memperbolehkan teks dengan panjang TEPAT 5 karakter.',
    hint: 'Fungsi apa yang bisa menghitung panjang teks?',
    explanation: `Validasi Data dengan formula kustom memberikan kontrol presisi. Formula \`=LEN(A2)=5\` akan menghitung panjang teks di sel A2. Jika panjangnya sama dengan 5, formula mengembalikan TRUE (input valid). Jika tidak, mengembalikan FALSE (input tidak valid).`,
    table: {
      headers: ['Kode Unik (harus 5 karakter)'],
      rows: [['']],
    },
    answer: {
      type: 'formula',
      correctValue: '=LEN(A2)=5',
    },
    icon: CheckBadgeIcon,
  },
  {
    id: 25,
    title: 'What-If Analysis',
    theme: 'Analisis Skenario',
    challenge: `Jika Suku Bunga (B2) berubah menjadi 7%, berapa Angsuran per Bulan yang baru? Gunakan PMT untuk menghitungnya. Pinjaman (B1): 100jt, Bunga/Tahun (B2): 5%, Periode/Tahun (B3): 3.`,
    hint: 'PMT(rate, nper, pv). Ingat, bunga dan periode harus disesuaikan ke basis bulanan.',
    explanation: `Analisis What-If adalah tentang melihat bagaimana perubahan input mempengaruhi hasil. Formula dasarnya adalah \`=PMT(bunga_bulanan; periode_bulan; jumlah_pinjaman)\`. Untuk skenario baru: \`=PMT(7%/12; B3*12; -B1)\`. Tanda negatif pada pv (present value) agar hasilnya positif.`,
    table: {
      headers: ['Parameter', 'Nilai'],
      rows: [
        ['Pinjaman', 100000000],
        ['Bunga per Tahun', 0.05],
        ['Periode (Tahun)', 3],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: '=PMT(7%/12;B3*12;-B1)',
    },
    icon: SunIcon,
  },
  {
    id: 26,
    title: 'Gabungkan Power Query',
    theme: 'Transformasi Data',
    challenge: `Dalam Power Query, Anda punya kolom [Nama Depan] dan [Nama Belakang]. Langkah transformasi apa yang Anda gunakan untuk menggabungkannya menjadi satu kolom "Nama Lengkap" dengan spasi di antaranya? (Jawab dengan nama transformasinya)`,
    hint: `Cari opsi 'Merge Columns' di tab Transform atau Add Column.`,
    explanation: `Power Query adalah alat ETL (Extract, Transform, Load) yang sangat kuat. Untuk menggabungkan kolom, Anda memilih kolom yang relevan, lalu menggunakan fitur **Merge Columns**. Anda bisa menentukan pemisah (separator), seperti spasi, dan nama untuk kolom baru yang dihasilkan. Ini adalah langkah pembersihan dan persiapan data yang sangat umum.`,
    table: {
      headers: ['Nama Depan', 'Nama Belakang'],
      rows: [['Budi', 'Santoso'], ['Ani', 'Wijaya']],
    },
    answer: {
      type: 'text',
      correctValue: 'Merge Columns',
    },
    icon: BoltIcon,
  },
  {
    id: 27,
    title: 'Penguasa Named Range',
    theme: 'Referensi Efisien',
    challenge: 'Sebuah *Named Range* bernama `TarifPajak` merujuk ke sel E2 (berisi 0.11). Tulis formula untuk menghitung total penjualan di C2 DITAMBAH pajaknya, menggunakan *Named Range* tersebut.',
    hint: 'Gunakan nama `TarifPajak` langsung di formulamu seolah-olah itu adalah angka.',
    explanation: `Named Range membuat formula lebih mudah dibaca dan dikelola. Daripada menulis \`=C2*(1+E2)\`, Anda bisa menggunakan \`=C2*(1+TarifPajak)\`. Jika nilai pajak berubah, Anda hanya perlu mengubahnya di sel E2, dan semua formula yang menggunakan Named Range \`TarifPajak\` akan otomatis terupdate.`,
    table: {
      headers: ['A', 'B', 'Penjualan', '', 'Tarif Pajak'],
      rows: [['', '', 1500, '', 0.11]],
    },
    answer: {
      type: 'formula',
      correctValue: '=C2*(1+TarifPajak)',
    },
    icon: TagIcon,
  },
  {
    id: 28,
    title: 'Validasi Bertingkat 3',
    theme: 'Dropdown Dinamis',
    challenge: 'Dropdown di B1 berisi Kategori (Buah, Sayur). Buatlah formula untuk *Source* Data Validation di sel B2 yang isinya bergantung pada B1, dengan asumsi daftar item ada di rentang bernama yang sama dengan kategori (rentang "Buah" dan "Sayur").',
    hint: 'Fungsi `INDIRECT` bisa mengubah teks dari sebuah sel menjadi referensi rentang yang valid.',
    explanation: `Ini adalah teknik dropdown bertingkat (dependent dropdown). Formula \`=INDIRECT(B1)\` di sumber validasi data sel B2 sangat cerdas. Jika B1 berisi teks "Buah", INDIRECT akan mengembalikan referensi ke rentang bernama "Buah". Jika B1 diubah menjadi "Sayur", dropdown di B2 akan secara dinamis merujuk ke rentang bernama "Sayur". Anda harus mendefinisikan Named Range ini terlebih dahulu.`,
    table: {
      headers: ['Kategori', 'Item'],
      rows: [['Buah', '']],
    },
    answer: {
      type: 'formula',
      correctValue: '=INDIRECT(B1)',
    },
    icon: QueueListIcon,
  },
  {
    id: 29,
    title: 'Uji Goal Seek',
    theme: 'Analisis Terbalik',
    challenge: `Di tabel, Laba (B3) dihitung dari Pendapatan (B1) - Biaya (B2). Fitur Excel apa yang bisa secara otomatis mencari tahu berapa nilai Pendapatan yang dibutuhkan untuk mencapai target Laba sebesar 5000?`,
    hint: `Fitur ini ada di Data > What-If Analysis. Ia bekerja "mundur" dari hasil ke input.`,
    explanation: `**Goal Seek** adalah alat yang sempurna untuk ini. Anda memberitahunya: 1. **Set cell**: B3 (sel Laba), 2. **To value**: 5000, 3. **By changing cell**: B1 (sel Pendapatan). Excel kemudian akan menjalankan iterasi untuk menemukan nilai Pendapatan yang tepat untuk mencapai target laba yang diinginkan.`,
    table: {
      headers: ['Item', 'Nilai'],
      rows: [['Pendapatan', 10000], ['Biaya', 6000], ['Laba', 4000]],
    },
    answer: {
      type: 'text',
      correctValue: 'Goal Seek',
    },
    icon: RocketLaunchIcon,
  },
  {
    id: 30,
    title: 'Dashboard Final Boss',
    theme: 'Laporan Final',
    challenge: `Buat formula ringkasan yang menghitung total penjualan untuk produk "Laptop" dari wilayah "Barat". Ini adalah skill inti untuk membuat dashboard.`,
    hint: 'Gunakan SUMIFS untuk menjumlahkan dengan beberapa kriteria sekaligus.',
    explanation: `Ini adalah pertarungan bos terakhir yang menguji kemampuan meringkas data. SUMIFS adalah senjata utama untuk dashboard. Formula \`=SUMIFS(C2:C6;A2:A6;"Barat";B2:B6;"Laptop")\` bekerja dengan:
- **C2:C6**: Menentukan rentang yang akan dijumlahkan (Penjualan).
- **A2:A6;"Barat"**: Syarat pertama (Wilayah harus "Barat").
- **B2:B6;"Laptop"**: Syarat kedua (Produk harus "Laptop").
Excel hanya akan menjumlahkan baris yang memenuhi SEMUA kriteria ini, menghasilkan total yang akurat.`,
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [
        ['Barat', 'Laptop', 1200],
        ['Timur', 'Monitor', 300],
        ['Barat', 'Keyboard', 75],
        ['Selatan', 'Laptop', 800],
        ['Barat', 'Laptop', 500],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: '=SUMIFS(C2:C6;A2:A6;"Barat";B2:B6;"Laptop")',
    },
    icon: TrophyIcon,
  },
  {
    id: 31,
    title: 'Data Cleaning Master',
    theme: 'Pembersihan Data Pro',
    challenge: 'Data di A2 sangat kotor: `  PRODUK-01  ` (ada spasi dan huruf besar). Gunakan formula untuk membersihkannya menjadi "Produk-01" (Proper Case, tanpa spasi ekstra).',
    hint: 'Kombinasikan fungsi TRIM untuk menghapus spasi dan PROPER untuk mengubah format teks.',
    explanation: 'Pembersihan data profesional seringkali membutuhkan kombinasi fungsi. Formula `=PROPER(TRIM(A2))` adalah contoh klasik. **TRIM(A2)** pertama kali menghapus semua spasi di awal dan akhir. Kemudian, **PROPER** mengambil hasil yang bersih itu dan mengubahnya menjadi format "Title Case" di mana setiap kata diawali huruf kapital.',
    table: {
      headers: ['Data Kotor'],
      rows: [['  PRODUK-01  ']],
    },
    answer: {
      type: 'formula',
      correctValue: '=PROPER(TRIM(A2))',
    },
    icon: SparklesIcon,
  },
  {
    id: 32,
    title: 'Query Fusion',
    theme: 'Gabung Tabel Power Query',
    challenge: 'Di Power Query, Anda memiliki Tabel Penjualan (dengan ID Produk) dan Tabel Produk (dengan ID Produk & Nama Produk). Operasi apa yang Anda gunakan untuk menggabungkan kedua tabel ini berdasarkan ID Produk?',
    hint: 'Operasi ini mirip dengan VLOOKUP atau SQL JOIN, digunakan untuk memperkaya satu tabel dengan data dari tabel lain.',
    explanation: 'Operasi **Merge Queries** di Power Query adalah alat fundamental untuk menggabungkan data dari sumber yang berbeda. Anda memilih tabel, kolom yang cocok (kunci), dan jenis join (misalnya, Left Outer untuk mempertahankan semua baris dari tabel pertama). Ini memungkinkan Anda membuat satu tabel datar yang komprehensif untuk analisis.',
    table: {
      headers: ['Tabel A: Penjualan', 'Tabel B: Produk'],
      rows: [['ID Produk, Jumlah', 'ID Produk, Nama'], ['P01, 10', 'P01, Laptop']],
    },
    answer: {
      type: 'text',
      correctValue: ['Merge Queries', 'Merge'],
    },
    icon: BoltIcon,
  },
  {
    id: 33,
    title: 'Format Bersyarat Lanjutan',
    theme: 'Highlight Baris',
    challenge: 'Tulis formula untuk Conditional Formatting pada rentang A2:C5 yang akan menyorot SELURUH BARIS jika nilai Penjualan (di kolom C) melebihi 1000.',
    hint: 'Gunakan referensi absolut pada kolom (`$C`) agar semua sel di baris yang sama merujuk ke kolom C.',
    explanation: 'Untuk memformat seluruh baris, Anda harus menggunakan referensi campuran (mixed reference) dalam formula Conditional Formatting. Formula `=$C2>1000` adalah kuncinya. Saat diterapkan ke rentang A2:C5, Excel mengevaluasi setiap sel. Untuk A2, B2, dan C2, ia akan memeriksa `$C2>1000`. Tanda `$` mengunci kolom C, sementara nomor baris `2` tetap relatif, memungkinkan Excel untuk mengevaluasi `$C3>1000` untuk baris berikutnya, dan seterusnya.',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [
        ['Barat', 'Laptop', 1200],
        ['Timur', 'Monitor', 300],
        ['Barat', 'Keyboard', 75],
        ['Selatan', 'PC', 1500],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: '=$C2>1000',
    },
    icon: EyeDropperIcon,
  },
  {
    id: 34,
    title: 'INDEX-MATCH Pro Combo',
    theme: 'Two-Way Lookup',
    challenge: 'Gunakan INDEX dan MATCH (dua kali) untuk mencari Penjualan (nilai) untuk Produk "Monitor" di Wilayah "Timur".',
    hint: 'Gunakan satu MATCH untuk menemukan baris (Produk) dan MATCH kedua untuk menemukan kolom (Wilayah).',
    explanation: 'Ini adalah *two-way lookup*, di mana VLOOKUP gagal. Formula `=INDEX(B3:D5;MATCH("Monitor";A3:A5;0);MATCH("Timur";B2:D2;0))` sangat kuat. `MATCH("Monitor",...)` menemukan nomor baris (2). `MATCH("Timur",...)` menemukan nomor kolom (2). Kemudian `INDEX(area_data; 2; 2)` mengambil nilai di persimpangan baris ke-2 dan kolom ke-2 dari rentang data, yaitu 300.',
    table: {
      headers: ['Produk/Wilayah', 'Barat', 'Timur', 'Selatan'],
      rows: [
        ['Laptop', 1200, 1100, 800],
        ['Monitor', 250, 300, 200],
        ['Keyboard', 75, 80, 70],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: '=INDEX(B3:D5;MATCH("Monitor";A3:A5;0);MATCH("Timur";B2:D2;0))',
    },
    icon: PuzzlePieceIcon,
  },
  {
    id: 35,
    title: 'Grafik Dinamis',
    theme: 'Chart Otomatis',
    challenge: 'Tulis formula untuk sebuah *Named Range* dinamis yang secara otomatis mencakup semua data Penjualan di kolom B, dimulai dari B2. Asumsikan tidak ada sel kosong di antaranya.',
    hint: 'Gunakan OFFSET yang dikombinasikan dengan COUNTA untuk menghitung tinggi rentang secara otomatis.',
    explanation: 'Named Range dinamis adalah kunci untuk dashboard interaktif. Formula `=OFFSET($B$2;0;0;COUNTA($B:$B)-1;1)` bekerja sebagai berikut: Mulai dari `$B$2`, jangan bergeser baris atau kolom (`0;0`), buat tinggi rentang sejumlah sel yang terisi di kolom B (`COUNTA($B:$B)`) dikurangi 1 (untuk header), dan buat lebarnya 1 kolom. Ini menciptakan rentang yang tumbuh secara otomatis saat data baru ditambahkan.',
    table: {
      headers: ['Bulan', 'Penjualan'],
      rows: [['Jan', 100], ['Feb', 120], ['Mar', 150]],
    },
    answer: {
      type: 'formula',
      correctValue: '=OFFSET($B$2;0;0;COUNTA($B:$B)-1;1)',
    },
    icon: ChartPieIcon,
  },
  {
    id: 36,
    title: 'Scenario Manager Challenge',
    theme: 'Analisis Skenario Kompleks',
    challenge: 'Fitur What-If Analysis apa yang memungkinkan Anda membuat, menyimpan, dan membandingkan beberapa set nilai input yang berbeda (misalnya, "Kasus Terbaik", "Kasus Terburuk") dan melihat dampaknya pada hasil akhir?',
    hint: 'Tidak seperti Goal Seek, fitur ini memungkinkan Anda menyimpan beberapa "skenario" untuk perbandingan.',
    explanation: '**Scenario Manager** (Manajer Skenario) adalah alat What-If Analysis yang kuat. Ini memungkinkan Anda untuk mendefinisikan beberapa set nilai input (skenario) dan dengan mudah beralih di antara mereka untuk melihat bagaimana perubahan tersebut mempengaruhi hasil formula Anda. Anda juga dapat membuat laporan ringkasan yang membandingkan semua skenario secara berdampingan, menjadikannya ideal untuk analisis sensitivitas dan pengambilan keputusan.',
    table: {
      headers: ['Parameter', 'Nilai'],
      rows: [['Pendapatan', 10000], ['Biaya', 6000], ['Laba', 4000]],
    },
    answer: {
      type: 'text',
      correctValue: ['Scenario Manager', 'Manajer Skenario'],
    },
    icon: SunIcon,
  },
  {
    id: 37,
    title: 'Pembuat Laporan Otomatis',
    theme: 'Teks Dinamis',
    challenge: 'Gunakan CONCAT dan XLOOKUP untuk membuat kalimat laporan dinamis: "Penjualan tertinggi di wilayah Barat adalah 1200, diraih oleh produk Laptop."',
    hint: 'Anda perlu beberapa fungsi: MAXIFS untuk menemukan penjualan tertinggi, dan XLOOKUP untuk menemukan produk yang sesuai.',
    explanation: 'Membuat laporan teks dinamis adalah keterampilan tingkat lanjut. Anda memerlukan formula seperti `=CONCAT("Penjualan tertinggi di wilayah Barat adalah "; MAXIFS(C2:C5;A2:A5;"Barat"); ", diraih oleh produk "; XLOOKUP(MAXIFS(C2:C5;A2:A5;"Barat");C2:C5;B2:B5))`. Ini pertama-tama menemukan nilai maksimum dengan `MAXIFS`, lalu menggunakan nilai itu sebagai lookup_value di `XLOOKUP` untuk menemukan nama produk yang cocok.',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [
        ['Barat', 'Laptop', 1200],
        ['Timur', 'Monitor', 300],
        ['Barat', 'Keyboard', 75],
        ['Barat', 'PC', 950],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: '=CONCAT("Penjualan tertinggi di wilayah Barat adalah ";MAXIFS(C2:C5;A2:A5;"Barat");", diraih oleh produk ";XLOOKUP(MAXIFS(C2:C5;A2:A5;"Barat");C2:C5;B2:B5;0))',
    },
    icon: AcademicCapIcon,
  },
  {
    id: 38,
    title: 'Excel + AI Integration',
    theme: 'Analisis Otomatis',
    challenge: 'Fitur Excel apa yang menggunakan AI untuk menganalisis data Anda secara otomatis dan menyarankan PivotTable, grafik, serta memberikan wawasan dalam bahasa alami?',
    hint: 'Fitur ini biasanya ditemukan di tab "Home" dan bekerja hanya dengan satu klik.',
    explanation: 'Fitur **Analyze Data** (Analisis Data) di Microsoft 365 adalah contoh bagus integrasi AI di Excel. Ia memeriksa data Anda untuk pola, tren, dan outlier, lalu secara otomatis menghasilkan visualisasi dan ringkasan yang relevan. Anda dapat mengajukan pertanyaan dalam bahasa biasa (seperti "total penjualan berdasarkan wilayah") dan fitur ini akan memberikan jawaban dalam bentuk grafik atau tabel.',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [
        ['Barat', 'Laptop', 1200],
        ['Timur', 'Monitor', 300],
        ['Selatan', 'Laptop', 800],
      ],
    },
    answer: {
      type: 'text',
      correctValue: ['Analyze Data', 'Analisis Data', 'Ideas'],
    },
    icon: CpuChipIcon,
  },
  {
    id: 39,
    title: 'Mini Quest Macro & VBA',
    theme: 'Otomatisasi',
    challenge: 'Dalam editor VBA, tuliskan satu baris kode untuk menampilkan kotak pesan sederhana yang bertuliskan "Halo Dunia".',
    hint: 'Gunakan objek `MsgBox` diikuti dengan teks yang ingin Anda tampilkan dalam tanda kutip.',
    explanation: 'Meskipun hanya satu baris, `MsgBox "Halo Dunia"` adalah langkah pertama ke dunia otomatisasi VBA (Visual Basic for Applications). Perintah `MsgBox` adalah cara sederhana untuk menampilkan informasi kepada pengguna atau untuk men-debug kode. Memahami sintaks dasar ini membuka pintu untuk membuat makro yang jauh lebih kompleks.',
    table: {
      headers: ['Tugas VBA'],
      rows: [['Tampilkan pesan pop-up']],
    },
    answer: {
      type: 'formula',
      correctValue: 'MsgBox "Halo Dunia"',
    },
    icon: CodeBracketSquareIcon,
  },
  {
    id: 40,
    title: 'Dashboard Final Master',
    theme: 'Metrik KPI',
    challenge: 'Hitung persentase Laptop dari total penjualan di semua wilayah. Ini adalah metrik KPI (Key Performance Indicator) yang penting.',
    hint: 'Gunakan SUMIF untuk penjualan Laptop dan bagi dengan SUM dari seluruh penjualan.',
    explanation: 'KPI adalah jantung dari setiap dashboard. Formula `=SUMIF(B2:B5;"Laptop";C2:C5)/SUM(C2:C5)` menunjukkan kemampuan untuk membuat metrik yang berarti. `SUMIF` pertama-tama mengisolasi dan menjumlahkan semua penjualan "Laptop". Kemudian, hasil tersebut dibagi dengan `SUM` dari seluruh kolom penjualan untuk mendapatkan rasio atau persentase. Jangan lupa untuk memformat sel hasil sebagai persentase.',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [
        ['Barat', 'Laptop', 1200],
        ['Timur', 'Monitor', 800],
        ['Barat', 'Keyboard', 200],
        ['Selatan', 'Laptop', 800],
      ],
    },
    answer: {
      type: 'formula',
      correctValue: '=SUMIF(B2:B5;"Laptop";C2:C5)/SUM(C2:C5)',
    },
    icon: TrophyIcon,
  },
];
