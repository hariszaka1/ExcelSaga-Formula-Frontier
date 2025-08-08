
import type { Level } from './types';
import { MagnifyingGlassIcon, TableCellsIcon, ChartBarIcon, CalculatorIcon, ChatBubbleBottomCenterTextIcon, ShareIcon, ListBulletIcon, SparklesIcon, DocumentChartBarIcon, StarIcon, PuzzlePieceIcon, ShieldExclamationIcon, EyeDropperIcon, AtSymbolIcon, ScissorsIcon, ChartPieIcon, LinkIcon, RectangleGroupIcon, AcademicCapIcon, CubeTransparentIcon, ArrowsRightLeftIcon, BeakerIcon, CheckBadgeIcon, SunIcon, BoltIcon, TagIcon, QueueListIcon, RocketLaunchIcon, TrophyIcon, CpuChipIcon, CodeBracketSquareIcon, WrenchScrewdriverIcon, Cog6ToothIcon, CircleStackIcon, ChartBarSquareIcon, BuildingLibraryIcon, GlobeAltIcon, FunnelIcon, Square3Stack3DIcon, PlayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// WARNING: SERVER-SIDE SECRETS.
// The following constants are for demonstration purposes only, based on a user request.
// Secrets like these (NEXTAUTH_SECRET, Google Client Secret) are for SERVER-SIDE use ONLY.
// They must NEVER be used or exposed in client-side code like this application.
// Doing so would create a major security vulnerability.
// The current application's Google Login is secure because it uses a client-side flow
// that does not require a client secret.

export const NEXTAUTH_SECRET = '8c1c49b0e3b1c6d32890989e24823521';
export const GOOGLE_CLIENT_SECRET = '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';

export const levelData: Level[] = [
  // Part 1: Basic & Intermediate
  {
    id: 1,
    title: 'VLOOKUP Quest',
    theme: 'Pencarian Data',
    table: {
      headers: ['ID Produk', 'Nama Produk', 'Harga'],
      rows: [
        ['P001', 'Apel', 15000],
        ['P002', 'Jeruk', 12000],
        ['P003', 'Mangga', 20000],
      ],
    },
    icon: MagnifyingGlassIcon,
    questions: [
      {
        challenge: 'Gunakan VLOOKUP untuk mencari harga produk "Apel" dari tabel yang tersedia.',
        hint: 'Ingatlah 4 bagian penting dari VLOOKUP: `VLOOKUP(nilai_dicari, tabel_array, nomor_indeks_kolom, [tipe_pencocokan])`. 1. Apa yang dicari? ("Apel"). 2. Di mana tabelnya? (dari nama produk sampai harga). 3. Kolom ke berapa hasilnya?. 4. Butuh kecocokan persis? (Gunakan FALSE atau 0).',
        explanation: 'Formula yang benar adalah `=VLOOKUP("Apel";B2:C4;2;FALSE)`. Mari kita pecah menjadi bagian-bagian yang mudah dimengerti:\n1.  `"Apel"`: Ini adalah **nilai yang dicari** (*lookup_value*). Kita memberi tahu Excel, "Hei, tolong cari teks \'Apel\' ini."\n2.  `B2:C4`: Ini adalah **area pencarian** (*table_array*). Penting: VLOOKUP *selalu* mencari di kolom paling kiri dari area yang Anda tentukan. Dalam kasus ini, pencarian dilakukan di kolom B (Nama Produk).\n3.  `2`: Ini adalah **nomor kolom hasil** (*col_index_num*). Setelah menemukan "Apel" di kolom B, kita meminta Excel untuk mengambil data dari kolom ke-**2** dari area pencarian kita (B2:C4). Kolom B adalah ke-1, jadi kolom C (Harga) adalah ke-2.\n4.  `FALSE`: Ini adalah perintah untuk **pencocokan persis** (*exact match*). Ini sangat penting! `FALSE` (atau 0) memastikan VLOOKUP hanya akan berhasil jika menemukan "Apel" dengan tepat. Tanpa ini, ia mungkin memberikan hasil yang salah jika tidak menemukan kecocokan.',
        answer: {
          type: 'formula',
          correctValue: ['=VLOOKUP("Apel";B2:C4;2;FALSE)', '=VLOOKUP("Apel";B:C;2;FALSE)', '=VLOOKUP("Apel";B2:C4;2;0)', '=VLOOKUP("Apel";B:C;2;0)'],
        },
      },
      {
        challenge: 'Gunakan VLOOKUP untuk mencari harga produk "Jeruk".',
        hint: 'Logikanya sama seperti mencari "Apel", hanya nilai yang dicari (`lookup_value`) yang berbeda. Pastikan argumen lain tetap benar.',
        explanation: 'Untuk "Jeruk", formula yang benar adalah `=VLOOKUP("Jeruk";B2:C4;2;FALSE)`. Logikanya sama persis dengan sebelumnya, kita hanya mengubah **nilai yang dicari** (*lookup_value*) dari "Apel" menjadi "Jeruk". Sisa argumen (area pencarian, nomor kolom hasil, dan pencocokan persis) tetap sama karena struktur tabel tidak berubah.',
        answer: {
          type: 'formula',
          correctValue: ['=VLOOKUP("Jeruk";B2:C4;2;FALSE)', '=VLOOKUP("Jeruk";B:C;2;FALSE)', '=VLOOKUP("Jeruk";B2:C4;2;0)', '=VLOOKUP("Jeruk";B:C;2;0)'],
        },
      },
      {
        challenge: 'Gunakan VLOOKUP untuk mencari harga produk "Mangga".',
        hint: 'Pastikan rentang tabel (`table_array`) dan nomor kolom indeks (`col_index_num`) sudah benar untuk mengambil data harga.',
        explanation: 'Sama seperti sebelumnya, kita hanya perlu mengubah nilai yang dicari menjadi "Mangga". Formula yang benar adalah `=VLOOKUP("Mangga";B2:C4;2;FALSE)`. Ini menunjukkan betapa kuatnya VLOOKUP untuk mencari data berulang kali dari sebuah tabel, hanya dengan mengubah satu parameter.',
        answer: {
          type: 'formula',
          correctValue: ['=VLOOKUP("Mangga";B2:C4;2;FALSE)', '=VLOOKUP("Mangga";B:C;2;FALSE)', '=VLOOKUP("Mangga";B2:C4;2;0)', '=VLOOKUP("Mangga";B:C;2;0)'],
        },
      },
      {
        challenge: 'Jika Anda mengetik "Senin" di sebuah sel dan menarik fill handle ke bawah, apa nilai yang akan muncul di sel berikutnya?',
        hint: 'Excel mengenali nama-nama hari dalam seminggu.',
        explanation: 'Excel memiliki daftar kustom bawaan, termasuk nama hari. Saat Anda menarik fill handle dari "Senin", Excel secara otomatis akan melanjutkannya ke hari berikutnya, yaitu "Selasa".',
        answer: { type: 'text', correctValue: 'Selasa' },
      },
    ],
  },
  {
    id: 2,
    title: 'HLOOKUP & Orientation Trap',
    theme: 'Pencarian Horizontal',
    table: {
      headers: ['Metrik', '01-Jan', '02-Jan', '03-Jan'],
      rows: [
        ['Penjualan', 100, 150, 120],
        ['Pengunjung', 50, 75, 60],
      ],
    },
    icon: TableCellsIcon,
    questions: [
      {
        challenge: 'Gunakan HLOOKUP untuk menemukan data Penjualan pada tanggal "02-Jan".',
        hint: 'HLOOKUP mirip VLOOKUP tapi untuk baris: `HLOOKUP(nilai_dicari, tabel_array, nomor_indeks_baris, [tipe_pencocokan])`. Perhatikan di baris ke berapa data "Penjualan" berada.',
        explanation: '**HLOOKUP** adalah saudara kembar VLOOKUP, tetapi dirancang khusus untuk data yang tersusun secara **horizontal**. Formula yang benar: `=HLOOKUP("02-Jan";B1:D3;2;FALSE)`.\n1.  `"02-Jan"`: Ini adalah **nilai yang dicari**. HLOOKUP akan mencarinya di baris paling **atas** dari area yang Anda tentukan.\n2.  `B1:D3`: Ini adalah **area pencarian**. HLOOKUP mencari di baris pertama area ini (yaitu baris 1, yang berisi tanggal).\n3.  `2`: Ini adalah **nomor baris hasil** (*row_index_num*). Setelah menemukan "02-Jan" di baris 1, ia akan turun ke baris ke-**2** di dalam area tersebut untuk mengambil hasilnya (yaitu baris Penjualan).\n4.  `FALSE`: Sama seperti VLOOKUP, ini meminta **pencocokan persis**.',
        answer: {
          type: 'formula',
          correctValue: ['=HLOOKUP("02-Jan";B1:D3;2;FALSE)', '=HLOOKUP("02-Jan";1:3;2;FALSE)', '=HLOOKUP("02-Jan";B1:D3;2;0)', '=HLOOKUP("02-Jan";1:3;2;0)'],
        },
      },
      {
        challenge: 'Gunakan HLOOKUP untuk menemukan jumlah Pengunjung pada tanggal "03-Jan".',
        hint: 'Anda perlu mengubah `row_index_num`. Data "Pengunjung" ada di baris ke-3 dari rentang tabel Anda.',
        explanation: 'Untuk mendapatkan data pengunjung, kita perlu menyesuaikan argumen **nomor baris hasil** (*row_index_num*). Formulanya adalah `=HLOOKUP("03-Jan";B1:D3;3;FALSE)`. \nExcel akan mencari "03-Jan" di baris pertama, dan setelah menemukannya di kolom D, ia akan turun ke baris ke-**3** dari area B1:D3 untuk mengambil nilai yang benar (yaitu 60).',
        answer: {
          type: 'formula',
          correctValue: ['=HLOOKUP("03-Jan";B1:D3;3;FALSE)', '=HLOOKUP("03-Jan";1:3;3;FALSE)', '=HLOOKUP("03-Jan";B1:D3;3;0)', '=HLOOKUP("03-Jan";1:3;3;0)'],
        },
      },
      {
        challenge: 'Gunakan HLOOKUP untuk menemukan data Penjualan pada tanggal "01-Jan".',
        hint: 'Jangan lupa, argumen terakhir HLOOKUP harus `FALSE` atau `0` untuk pencocokan persis. Baris Penjualan adalah baris ke-2.',
        explanation: 'Kita kembali mencari data penjualan, jadi **nomor baris hasil** (*row_index_num*) harus kembali ke `2`. Formula yang benar adalah `=HLOOKUP("01-Jan";B1:D3;2;FALSE)`. HLOOKUP mencari "01-Jan" di baris 1, menemukannya di kolom B, dan mengambil data dari baris ke-2 di kolom yang sama (yaitu 100).',
        answer: {
          type: 'formula',
          correctValue: ['=HLOOKUP("01-Jan";B1:D3;2;FALSE)', '=HLOOKUP("01-Jan";1:3;2;FALSE)', '=HLOOKUP("01-Jan";B1:D3;2;0)', '=HLOOKUP("01-Jan";1:3;2;0)'],
        },
      },
    ],
  },
    {
    id: 3,
    title: 'COUNTIF Tracker',
    theme: 'Menghitung Bersyarat',
    table: {
      headers: ['Nama Siswa', 'Nilai'],
      rows: [['Adi', 'A'], ['Budi', 'B'], ['Cici', 'A'], ['Dedi', 'C'], ['Eka', 'A']],
    },
    icon: CalculatorIcon,
    questions: [
      {
        challenge: 'Gunakan COUNTIF untuk menghitung jumlah siswa yang mendapat nilai "A" pada kolom Nilai.',
        hint: 'Fungsi COUNTIF memiliki dua argumen: `COUNTIF(range, criteria)`. 1. `range` adalah kolom tempat Anda ingin menghitung (kolom Nilai). 2. `criteria` adalah apa yang Anda cari (dalam hal ini, teks "A").',
        explanation: 'Fungsi **COUNTIF** sangat berguna untuk menghitung sel yang memenuhi satu syarat. Formula yang benar: `=COUNTIF(B2:B6;"A")`.\n*   `B2:B6`: Ini adalah **range** (rentang), yaitu di mana kita akan mencari dan menghitung.\n*   `"A"`: Ini adalah **criteria** (kriteria), yaitu apa yang kita cari. Excel akan memeriksa setiap sel di `B2:B6` dan menambahkan 1 ke hitungannya setiap kali ia menemukan teks "A".',
        answer: { type: 'formula', correctValue: ['=COUNTIF(B2:B6;"A")', '=COUNTIF(B:B;"A")'] },
      },
      {
        challenge: 'Gunakan COUNTIF untuk menghitung jumlah siswa yang mendapat nilai "B".',
        hint: 'Sama seperti sebelumnya, tapi ubah kriteria Anda dari "A" menjadi "B".',
        explanation: 'Logikanya sama persis seperti sebelumnya. Kita menggunakan rentang yang sama tetapi hanya perlu mengubah **criteria** dari "A" menjadi "B". Formula yang benar adalah `=COUNTIF(B2:B6;"B")`. Ini menunjukkan betapa mudahnya mengadaptasi formula untuk kriteria yang berbeda.',
        answer: { type: 'formula', correctValue: ['=COUNTIF(B2:B6;"B")', '=COUNTIF(B:B;"B")'] },
      },
      {
        challenge: 'Gunakan COUNTIF untuk menghitung jumlah siswa yang nilainya bukan "C".',
        hint: 'Kriteria "tidak sama dengan" dalam COUNTIF ditulis sebagai `"<>"`. Gabungkan dengan kriteria Anda, misal ` "<>C" `.',
        explanation: 'Untuk kriteria "tidak sama dengan", Anda menggunakan operator `<>` di dalam string kriteria. Formulanya adalah `=COUNTIF(B2:B6;"<>C")`. Kriteria ` "<>C" ` memerintahkan Excel untuk menghitung semua sel dalam rentang `B2:B6` yang isinya **BUKAN** "C". Ini adalah trik yang sangat berguna untuk mengecualikan nilai tertentu dari hitungan.',
        answer: { type: 'formula', correctValue: ['=COUNTIF(B2:B6;"<>C")', '=COUNTIF(B:B;"<>C")'] },
      },
      {
        challenge: 'Fungsi apa yang digunakan untuk menjumlahkan semua angka dalam rentang sel?',
        hint: 'Ini adalah salah satu fungsi matematika paling dasar di Excel, namanya sangat singkat.',
        explanation: 'Fungsi SUM adalah fungsi fundamental yang digunakan untuk menjumlahkan nilai dalam sel, rentang sel, atau kombinasi keduanya. Contoh: =SUM(A1:A10).',
        answer: { type: 'text', correctValue: 'SUM' },
      },
    ],
  },
  {
    id: 4,
    title: 'SUMIFS Monster',
    theme: 'Menjumlahkan Multi-Kriteria',
    table: {
      headers: ['Bulan', 'Wilayah', 'Penjualan'],
      rows: [['Januari', 'Utara', 500], ['Januari', 'Selatan', 300], ['Februari', 'Utara', 400], ['Januari', 'Utara', 200]],
    },
    icon: ChartBarIcon,
    questions: [
      {
        challenge: 'Gunakan SUMIFS untuk menghitung total penjualan di wilayah "Utara" pada bulan "Januari".',
        hint: 'Struktur SUMIFS: `SUMIFS(sum_range, criteria_range1, criteria1, ...)`. 1. `sum_range`: kolom yang mau dijumlah (Penjualan). 2. `criteria_range1`: kolom filter pertama (Bulan). 3. `criteria1`: nilai filter ("Januari"). Lanjutkan untuk kriteria wilayah.',
        explanation: 'Rumus **SUMIFS** sangat kuat karena dapat menjumlahkan berdasarkan beberapa kriteria sekaligus (logika AND). Formula yang benar: `=SUMIFS(C2:C5;A2:A5;"Januari";B2:B5;"Utara")`. \n1. `C2:C5`: Ini adalah **sum_range**, kolom yang angkanya akan kita jumlahkan. Berbeda dengan SUMIF, pada SUMIFS rentang ini ditulis pertama.\n2. `A2:A5;"Januari"`: Ini adalah **pasangan kriteria pertama**. Excel akan memeriksa kolom `A2:A5` (Bulan) untuk nilai `"Januari"`.\n3. `B2:B5;"Utara"`: Ini adalah **pasangan kriteria kedua**. Excel akan memeriksa kolom `B2:B5` (Wilayah) untuk nilai `"Utara"`. \nSebuah baris hanya akan dijumlahkan jika **kedua** kriteria terpenuhi.',
        answer: { type: 'formula', correctValue: ['=SUMIFS(C2:C5;A2:A5;"Januari";B2:B5;"Utara")', '=SUMIFS(C:C;A:A;"Januari";B:B;"Utara")'] },
      },
      {
        challenge: 'Gunakan SUMIF untuk menghitung total penjualan di wilayah "Utara" untuk semua bulan.',
        hint: 'Karena hanya ada satu kriteria (Wilayah), Anda bisa menggunakan fungsi SUMIF yang lebih sederhana: `SUMIF(range, criteria, [sum_range])`.',
        explanation: 'Ketika hanya ada satu syarat, **SUMIF** lebih sederhana dan efisien. Formulanya: `=SUMIF(B2:B5;"Utara";C2:C5)`.\n* `B2:B5`: Ini **range** tempat kriteria diperiksa (kolom Wilayah).\n* `"Utara"`: Ini **criteria** yang dicari.\n* `C2:C5`: Ini **sum_range**, kolom yang akan dijumlahkan jika kriteria pada baris yang sama terpenuhi.',
        answer: { type: 'formula', correctValue: ['=SUMIF(B2:B5;"Utara";C2:C5)', '=SUMIF(B:B;"Utara";C:C)'] },
      },
      {
        challenge: 'Gunakan SUMIF untuk menghitung total penjualan di bulan "Januari" untuk semua wilayah.',
        hint: 'Gunakan SUMIF dengan kriteria "Januari" pada kolom Bulan, dan rentang penjumlahannya adalah kolom Penjualan.',
        explanation: 'Sama seperti sebelumnya, kita menggunakan **SUMIF** karena hanya ada satu kriteria. Formulanya adalah `=SUMIF(A2:A5;"Januari";C2:C5)`. Kali ini, kita memeriksa kolom Bulan (`A2:A5`) untuk kriteria `"Januari"`, dan jika cocok, kita menjumlahkan nilai yang sesuai dari kolom Penjualan (`C2:C5`).',
        answer: { type: 'formula', correctValue: ['=SUMIF(A2:A5;"Januari";C2:C5)', '=SUMIF(A:A;"Januari";C:C)'] },
      },
    ],
  },
    {
    id: 5,
    title: 'TEXT Function Puzzle',
    theme: 'Format Teks',
    table: { headers: ['Tanggal Mentah'], rows: [['01/01/2025']] },
    icon: ChatBubbleBottomCenterTextIcon,
    questions: [
      {
        challenge: 'Gunakan fungsi TEXT untuk mengubah tanggal di sel A2 menjadi format "Rabu, 01 Januari 2025".',
        hint: 'Gunakan fungsi TEXT. Cari tahu kode format untuk nama hari lengkap (`"dddd"`), tanggal dua digit (`"dd"`), nama bulan lengkap (`"mmmm"`), dan tahun empat digit (`"yyyy"`).',
        explanation: 'Fungsi **TEXT** adalah alat yang sangat berguna untuk mengubah nilai (seperti tanggal atau angka yang disimpan secara internal oleh Excel) menjadi teks dengan format spesifik yang kita inginkan. Formula yang benar: `=TEXT(A2;"dddd, dd mmmm yyyy")`.\n* `A2`: Nilai yang akan diformat.\n* `"dddd, dd mmmm yyyy"`: Ini adalah kode format yang kita berikan ke Excel. \n  - `dddd` untuk nama hari lengkap (misal: "Rabu").\n  - `dd` untuk tanggal 2 digit (misal: "01").\n  - `mmmm` untuk nama bulan lengkap (misal: "Januari").\n  - `yyyy` untuk tahun 4 digit (misal: "2025").\n  Tanda koma dan spasi di dalam kode format akan ditampilkan apa adanya.',
        answer: { type: 'formula', correctValue: '=TEXT(A2;"dddd, dd mmmm yyyy")' },
      },
      {
        challenge: 'Gunakan fungsi TEXT pada sel A2 untuk menampilkan hanya nama bulan ("Januari").',
        hint: 'Kode format untuk nama bulan lengkap adalah `"mmmm"`.',
        explanation: 'Untuk mendapatkan nama bulan lengkap dari sebuah tanggal, kita hanya perlu menggunakan kode format `"mmmm"`. Formulanya adalah `=TEXT(A2;"mmmm")`. Sebagai catatan, jika Anda hanya ingin nama bulan yang disingkat (misalnya "Jan"), Anda bisa menggunakan kode format `"mmm"`.',
        answer: { type: 'formula', correctValue: '=TEXT(A2;"mmmm")' },
      },
      {
        challenge: 'Gunakan fungsi TEXT untuk mengekstrak tahun dari tanggal di sel A2 sebagai teks.',
        hint: 'Kode format untuk tahun 4 digit adalah `"yyyy"`. Untuk 2 digit, gunakan `"yy"`.',
        explanation: 'Untuk mendapatkan tahun 4 digit sebagai teks, gunakan kode format `"yyyy"`. Formulanya adalah `=TEXT(A2;"yyyy")`. Ini penting untuk dibedakan dari fungsi `YEAR(A2)`. Keduanya memang mengambil tahun, tetapi `YEAR(A2)` mengembalikan hasil berupa **angka** (2025), sedangkan `TEXT(A2;"yyyy")` mengembalikan hasil berupa **teks** ("2025").',
        answer: { type: 'formula', correctValue: '=TEXT(A2;"yyyy")' },
      },
      {
        challenge: 'Apa fungsi dari shortcut keyboard CTRL + B?',
        hint: 'Shortcut ini berhubungan dengan pemformatan teks dasar.',
        explanation: 'CTRL + B digunakan untuk membuat teks yang dipilih menjadi tebal (Bold). Ini adalah cara cepat untuk menekankan teks tanpa menggunakan mouse.',
        answer: { type: 'dropdown', options: ['Membuat teks miring (Italic)', 'Menyalin (Copy)', 'Membuat teks menjadi tebal (Bold)', 'Menempelkan (Paste)'], correctValue: 'Membuat teks menjadi tebal (Bold)' },
      },
    ],
  },
  {
    id: 6,
    title: 'Nested IF & Decision Forest',
    theme: 'Logika Bertingkat',
    table: { headers: ['Nama', 'Nilai', 'Status'], rows: [['Ani', 75, '?'],['Budi', 90, '?'],['Cici', 55, '?']] },
    icon: ShareIcon,
    questions: [
        {
            challenge: 'Tentukan status untuk Ani (nilai 75) menggunakan IF bertingkat. Aturan: nilai > 80 adalah "LULUS", nilai > 60 adalah "REMEDIAL", dan sisanya "TIDAK LULUS".',
            hint: 'Mulai dari kondisi paling tinggi (>80), lalu kondisi berikutnya (>60) di dalam argumen `value_if_false` dari IF pertama.',
            explanation: '**IF Bertingkat** (Nested IF) mengevaluasi beberapa kondisi secara berurutan seperti air terjun. Begitu satu kondisi terpenuhi, ia akan berhenti. Formula: `=IF(B2>80;"LULUS";IF(B2>60;"REMEDIAL";"TIDAK LULUS"))`.\n* **Langkah 1:** Excel memeriksa `B2>80` (Apakah 75 > 80?). Jawabannya **Salah**. Maka, Excel lanjut ke argumen `value_if_false` dari IF pertama.\n* **Langkah 2:** Argumen tersebut adalah IF kedua: `IF(B2>60;"REMEDIAL";"TIDAK LULUS")`. Excel memeriksa `B2>60` (Apakah 75 > 60?). Jawabannya **Benar**. Maka, hasilnya adalah "REMEDIAL" dan proses berhenti di sini.\n* **Alternatif Modern:** Fungsi `IFS` jauh lebih mudah dibaca untuk banyak kondisi: `=IFS(B2>80;"LULUS";B2>60;"REMEDIAL";TRUE;"TIDAK LULUS")`. Argumen `TRUE` di akhir berfungsi sebagai penangkap semua kondisi lain yang tidak terpenuhi.',
            answer: { type: 'formula', correctValue: ['=IF(B2>80;"LULUS";IF(B2>60;"REMEDIAL";"TIDAK LULUS"))', '=IFS(B2>80;"LULUS";B2>60;"REMEDIAL";TRUE;"TIDAK LULUS")'] },
        },
        {
            challenge: 'Gunakan formula IF yang sama untuk menentukan status Budi (nilai 90).',
            hint: 'Formula IF yang sama seharusnya bisa menangani nilai ini juga. Cukup ganti referensi sel ke baris Budi.',
            explanation: 'Menggunakan formula yang sama, `=IF(B3>80;"LULUS";IF(B3>60;"REMEDIAL";"TIDAK LULUS"))`, kita lihat alurnya:\n* **Langkah 1:** Excel memeriksa `B3>80` (Apakah 90 > 80?). Jawabannya **Benar**. Maka, hasilnya adalah "LULUS" dan proses langsung berhenti. IF kedua tidak pernah dievaluasi sama sekali. Inilah efisiensi dari logika air terjun.',
            answer: { type: 'formula', correctValue: ['=IF(B3>80;"LULUS";IF(B3>60;"REMEDIAL";"TIDAK LULUS"))', '=IFS(B3>80;"LULUS";B3>60;"REMEDIAL";TRUE;"TIDAK LULUS")'] },
        },
        {
            challenge: 'Gunakan formula IF yang sama untuk menentukan status Cici (nilai 55).',
            hint: 'Pikirkan jalur mana yang akan diambil oleh nilai 55 dalam struktur IF Anda. Ini akan gagal di kedua tes dan jatuh ke pilihan terakhir.',
            explanation: 'Menggunakan formula yang sama, `=IF(B4>80;"LULUS";IF(B4>60;"REMEDIAL";"TIDAK LULUS"))`, alurnya sebagai berikut:\n* **Langkah 1:** Excel memeriksa `B4>80` (Apakah 55 > 80?). **Salah**. Lanjut ke `value_if_false`.\n* **Langkah 2:** Excel memeriksa IF kedua: `B4>60` (Apakah 55 > 60?). **Salah**. Lanjut ke `value_if_false` dari IF kedua.\n* **Hasil:** Karena semua kondisi gagal, Excel menampilkan nilai terakhir yang tersedia, yaitu "TIDAK LULUS".',
            answer: { type: 'formula', correctValue: ['=IF(B4>80;"LULUS";IF(B4>60;"REMEDIAL";"TIDAK LULUS"))', '=IFS(B4>80;"LULUS";B4>60;"REMEDIAL";TRUE;"TIDAK LULUS")'] },
        }
    ]
  },
    {
    id: 7,
    title: 'Gerbang Logika AND',
    theme: 'Logika & Kondisi',
    table: { headers: ['Item Dimiliki', 'Item Kedua'], rows: [['Pedang Baja', 'Perisai Besi'], ['Pedang Kayu', 'Perisai Besi']] },
    icon: ListBulletIcon,
    questions: [
        {
            challenge: 'Gunakan fungsi AND untuk memeriksa apakah seorang ksatria memiliki "Pedang Baja" (di B2) DAN "Perisai Besi" (di C2).',
            hint: 'Gunakan fungsi AND untuk memastikan SEMUA kondisi bernilai benar. Formatnya: `AND(kondisi1, kondisi2, ...)`',
            explanation: 'Fungsi **AND** adalah pemeriksa yang sangat ketat. Ia hanya akan menghasilkan `TRUE` jika **SEMUA** kondisi atau argumen di dalamnya bernilai benar. Formula `=AND(B2="Pedang Baja";C2="Perisai Besi")` memeriksa dua hal: \n1. Apakah isi sel B2 sama dengan "Pedang Baja"? (Benar) \n2. Apakah isi sel C2 sama dengan "Perisai Besi"? (Benar) \nKarena kedua kondisi benar, maka hasil akhirnya adalah `TRUE`.',
            answer: { type: 'formula', correctValue: ['=AND(B2="Pedang Baja";C2="Perisai Besi")', '=AND(C2="Perisai Besi";B2="Pedang Baja")'] },
        },
        {
            challenge: 'Terapkan formula AND yang sama untuk ksatria dengan "Pedang Kayu" (di B3) dan "Perisai Besi" (di C3). Apa hasilnya?',
            hint: 'Fungsi AND memerlukan semua kondisi untuk terpenuhi. Jika satu saja salah, hasilnya akan FALSE.',
            explanation: 'Formula `=AND(B3="Pedang Baja";C3="Perisai Besi")` akan menghasilkan `FALSE`. Walaupun kondisi kedua (C3="Perisai Besi") bernilai benar, kondisi pertama (B3="Pedang Baja") salah karena isi sel B3 adalah "Pedang Kayu". Jika ada satu saja kondisi yang salah, fungsi AND akan langsung menghasilkan `FALSE` tanpa perlu memeriksa kondisi lainnya.',
            answer: { type: 'formula', correctValue: '=AND(B3="Pedang Baja";C3="Perisai Besi")' },
        }
    ]
  },
  {
    id: 8,
    title: 'Dekripsi SUBSTITUTE',
    theme: 'Manipulasi Teks',
    table: { headers: ['Kode Rahasia'], rows: [['AXL-007-BOS'], ['AXL-008-NYC']] },
    icon: SparklesIcon,
    questions: [
        {
            challenge: 'Gunakan SUBSTITUTE untuk mengganti teks "AXL" dengan "EXCEL" pada kode rahasia di sel A2.',
            hint: 'Fungsi SUBSTITUTE butuh 3 argumen: `SUBSTITUTE(teks, teks_lama, teks_baru)`.',
            explanation: 'Fungsi **SUBSTITUTE** sangat berguna untuk mencari dan mengganti potongan teks di dalam sebuah sel. Formula `=SUBSTITUTE(A2;"AXL";"EXCEL")` bekerja seperti ini:\n* `A2`: Ini adalah **teks** asli tempat kita akan melakukan pencarian dan penggantian.\n* `"AXL"`: Ini adalah **teks_lama** (*old_text*), yaitu teks yang ingin kita ganti.\n* `"EXCEL"`: Ini adalah **teks_baru** (*new_text*), yaitu teks baru yang akan menjadi penggantinya. Hasilnya adalah "EXCEL-007-BOS".',
            answer: { type: 'formula', correctValue: '=SUBSTITUTE(A2;"AXL";"EXCEL")' },
        },
        {
            challenge: 'Gunakan SUBSTITUTE untuk mengubah semua tanda hubung "-" menjadi garis miring "/" pada kode di sel A2.',
            hint: "Anda bisa menggunakan SUBSTITUTE untuk mengganti karakter seperti '-'. Jangan lupa untuk mengapitnya dengan tanda kutip.",
            explanation: "SUBSTITUTE tidak hanya untuk kata, tapi juga bisa untuk satu karakter atau simbol. Formula `=SUBSTITUTE(A2;\"-\";\"/\")` akan mencari semua kemunculan karakter `-` di dalam sel A2 dan menggantinya dengan karakter `/`. Secara default, SUBSTITUTE akan mengganti semua kemunculan yang ia temukan.",
            answer: { type: 'formula', correctValue: '=SUBSTITUTE(A2;"-";"/")' },
        }
    ]
  },
    {
    id: 9,
    title: 'Peringkat Juara LARGE',
    theme: 'Ranking & Statistik',
    table: { headers: ['Nama Juara', 'Skor'], rows: [['Arjuna', 250], ['Bima', 280], ['Nakula', 220], ['Sadewa', 275]] },
    icon: DocumentChartBarIcon,
    questions: [
        {
            challenge: 'Gunakan fungsi LARGE untuk menemukan skor tertinggi kedua dari daftar skor di kolom B.',
            hint: 'Gunakan fungsi LARGE untuk menemukan nilai ke-k tertinggi. Format: `LARGE(array, k)`. Untuk juara kedua, `k` adalah 2.',
            explanation: 'Fungsi **LARGE** sangat berguna untuk menemukan nilai terbesar ke-N dalam suatu rentang, tanpa perlu mengurutkan datanya terlebih dahulu. Untuk mencari skor juara kedua, kita mencari nilai terbesar ke-2. Jadi, formula `=LARGE(B2:B5;2)` adalah jawaban yang tepat. Excel akan secara virtual mengurutkan skor (280, 275, 250, 220) dan mengambil nilai kedua, yaitu 275.',
            answer: { type: 'formula', correctValue: ['=LARGE(B2:B5;2)', '=LARGE(B:B;2)'] },
        },
        {
            challenge: 'Gunakan fungsi LARGE dengan k=1 untuk menemukan skor tertinggi (juara pertama).',
            hint: 'Juara pertama adalah nilai terbesar ke-1. Jadi, `k` adalah 1.',
            explanation: 'Mencari nilai terbesar ke-1 menggunakan `LARGE(B2:B5;1)` akan memberikan hasil yang sama persis dengan menggunakan fungsi `MAX(B2:B5)`. Keduanya adalah cara yang valid untuk mengembalikan nilai tertinggi dalam sebuah rentang, yaitu 280. `MAX` lebih umum digunakan untuk kasus ini, tetapi `LARGE` juga benar.',
            answer: { type: 'formula', correctValue: ['=LARGE(B2:B5;1)', '=MAX(B2:B5)', '=LARGE(B:B;1)', '=MAX(B:B)'] },
        },
        {
            challenge: 'Gunakan fungsi SMALL dengan k=1 untuk menemukan skor terendah dari daftar.',
            hint: 'SMALL adalah kebalikan dari LARGE. Gunakan `k=1` untuk menemukan nilai yang paling kecil.',
            explanation: 'Fungsi **SMALL** adalah kebalikan dari LARGE; ia menemukan nilai terkecil ke-N. Untuk menemukan skor terendah, kita mencari nilai terkecil ke-1. Formula `=SMALL(B2:B5;1)` akan memberikan hasil yang sama persis dengan fungsi `MIN(B2:B5)`, yaitu 220.',
            answer: { type: 'formula', correctValue: ['=SMALL(B2:B5;1)', '=MIN(B2:B5)', '=SMALL(B:B;1)', '=MIN(B:B)'] },
        }
    ]
  },
  {
    id: 10,
    title: 'Bonus Boss Fight: Mega Report',
    theme: 'Laporan Gabungan',
    table: {
      headers: ['Daftar Belanja', 'Jumlah', 'Tabel Harga', 'Produk', 'Harga'],
      rows: [['Apel', 2, '', 'Apel', 10], ['Jeruk', 5, '', 'Jeruk', 5], ['Mangga', 1, '', 'Mangga', 20]],
    },
    icon: StarIcon,
    questions: [
      {
        challenge: 'Gunakan SUMPRODUCT dan VLOOKUP untuk menghitung total biaya dari seluruh daftar belanja (Jumlah dikalikan Harga masing-masing produk).',
        hint: 'SUMPRODUCT sangat kuat untuk mengalikan dan menjumlahkan hasil dari beberapa pencarian sekaligus. Coba gabungkan dengan VLOOKUP untuk mencari harga setiap item terlebih dahulu.',
        explanation: 'Ini adalah tantangan yang menunjukkan kekuatan formula array. Metode paling efisien adalah menggunakan **SUMPRODUCT**. Formula `=SUMPRODUCT(VLOOKUP(A2:A4;D2:E4;2;FALSE);B2:B4)` bekerja dalam beberapa langkah ajaib di balik layar:\n1. `VLOOKUP(A2:A4;...)` sebenarnya dijalankan untuk setiap item di A2:A4, menciptakan sebuah array harga virtual di memori: `{10;5;20}`.\n2. `B2:B4` adalah array jumlah yang ada di sel: `{2;5;1}`.\n3. `SUMPRODUCT` kemudian mengalikan elemen-elemen yang bersesuaian dari kedua array ini: `(10*2)`, `(5*5)`, dan `(20*1)`.\n4. Terakhir, ia menjumlahkan semua hasil perkalian tersebut: `20 + 25 + 20 = 65`. Semua dalam satu formula!',
        answer: { type: 'formula', correctValue: ['=SUMPRODUCT(VLOOKUP(A2:A4;D2:E4;2;FALSE);B2:B4)', '=SUMPRODUCT(VLOOKUP(A2:A4;D2:E4;2;0);B2:B4)'] },
      },
      {
        challenge: 'Hitung total biaya belanja hanya untuk "Apel" dan "Mangga".',
        hint: 'Cara paling langsung adalah mencari harga Apel, kalikan dengan jumlahnya, lalu tambahkan dengan hasil perhitungan yang sama untuk Mangga.',
        explanation: 'Cara yang lebih manual tetapi mudah dipahami adalah dengan menjumlahkan hasil perkalian untuk setiap item secara terpisah: `=(VLOOKUP("Apel";D2:E4;2;FALSE)*B2)+(VLOOKUP("Mangga";D2:E4;2;FALSE)*B4)`. \n* Formula ini pertama-tama mencari harga Apel (`10`), mengalikannya dengan jumlah Apel (`2`) untuk mendapatkan `20`.\n* Kemudian ia mencari harga Mangga (`20`), mengalikannya dengan jumlah Mangga (`1`) untuk mendapatkan `20`.\n* Terakhir, ia menjumlahkan kedua hasilnya (`20+20=40`). Ini kurang efisien jika daftarnya panjang, tetapi sangat jelas untuk kasus sederhana.\n* **Alternatif Modern:** `=SUM(XLOOKUP({"Apel";"Mangga"};D2:D4;E2:E4)*XLOOKUP({"Apel";"Mangga"};A2:A4;B2:B4))`',
        answer: { type: 'formula', correctValue: ['=(VLOOKUP("Apel";D2:E4;2;FALSE)*B2)+(VLOOKUP("Mangga";D2:E4;2;FALSE)*B4)', '=(XLOOKUP("Apel";D2:D4;E2:E4)*B2)+(XLOOKUP("Mangga";D2:D4;E2:E4)*B4)'] },
      }
    ]
  },
  // Part 2: Advanced
  {
    id: 11,
    title: 'INDEX & MATCH Duel',
    theme: 'Pencarian Fleksibel',
    table: {
        headers: ['Harga', 'Nama Produk', 'ID Produk'],
        rows: [[15000, 'Apel', 'P001'], [12000, 'Jeruk', 'P002'], [20000, 'Mangga', 'P003']],
    },
    icon: PuzzlePieceIcon,
    questions: [
        {
            challenge: 'Gunakan INDEX dan MATCH untuk menemukan "Nama Produk" berdasarkan "ID Produk" "P002".',
            hint: 'Gunakan MATCH untuk menemukan posisi "P002" di kolom ID. Lalu gunakan INDEX untuk mengambil nilai dari posisi yang sama di kolom Nama Produk.',
            explanation: 'Ini adalah kombo klasik yang mengatasi kelemahan terbesar VLOOKUP (tidak bisa mencari ke kiri). Formula `=INDEX(B2:B4;MATCH("P002";C2:C4;0))` bekerja dalam dua langkah dari dalam ke luar:\n1. **Bagian Dalam (MATCH):** `MATCH("P002";C2:C4;0)` mencari "P002" di kolom ID (`C2:C4`) dan menemukan bahwa itu ada di posisi baris ke-**2** dalam rentang tersebut. Angka `0` berarti pencocokan persis, sama seperti `FALSE` di VLOOKUP.\n2. **Bagian Luar (INDEX):** `INDEX(B2:B4;2)` kemudian mengambil nilai dari posisi baris ke-**2** di kolom Nama Produk (`B2:B4`), yaitu "Jeruk".\n**Alternatif Modern:** `XLOOKUP("P002";C2:C4;B2:B4)` melakukan hal yang sama dengan lebih sederhana.',
            answer: { type: 'formula', correctValue: ['=INDEX(B2:B4;MATCH("P002";C2:C4;0))', '=INDEX(B:B;MATCH("P002";C:C;0))'] },
        },
        {
            challenge: 'Gunakan INDEX dan MATCH untuk menemukan "Harga" berdasarkan "ID Produk" "P003".',
            hint: 'Logikanya sama. Ubah rentang hasil pada fungsi INDEX ke kolom Harga, dan ubah nilai yang dicari di MATCH.',
            explanation: 'Keindahan INDEX & MATCH adalah fleksibilitasnya. Untuk mencari harga, kita hanya perlu mengubah rentang di fungsi INDEX. Formula: `=INDEX(A2:A4;MATCH("P003";C2:C4;0))`. \n* `MATCH` bekerja seperti sebelumnya, menemukan posisi "P003" (yaitu posisi ke-3).\n* `INDEX` sekarang mengambil nilai dari posisi ke-3 di kolom Harga (`A2:A4`), yaitu 20000. Kita tidak perlu mengubah MATCH sama sekali jika hanya ingin hasil dari kolom yang berbeda.',
            answer: { type: 'formula', correctValue: ['=INDEX(A2:A4;MATCH("P003";C2:C4;0))', '=INDEX(A:A;MATCH("P003";C:C;0))'] },
        }
    ]
  },
  {
    id: 12,
    title: 'IFERROR Trap',
    theme: 'Penanganan Error',
    table: { headers: ['Produk', 'Harga'], rows: [['Apel', 15000], ['Jeruk', 12000], ['Mangga', 20000]] },
    icon: ShieldExclamationIcon,
    questions: [
        {
            challenge: 'Gunakan IFERROR untuk menampilkan pesan "Produk tidak ada" jika VLOOKUP untuk mencari "Durian" menghasilkan error.',
            hint: 'Bungkus rumus VLOOKUP Anda di dalam fungsi IFERROR. Format: `IFERROR(formula_utama, nilai_jika_error)`.',
            explanation: 'Fungsi **IFERROR** adalah jaring pengaman yang sangat berguna. Formula: `=IFERROR(VLOOKUP("Durian";A2:B4;2;FALSE);"Produk tidak ada")`. \nCara kerjanya: Excel pertama-tama mencoba menjalankan argumen pertama, yaitu `VLOOKUP(...)`. Karena "Durian" tidak ada di dalam tabel, VLOOKUP gagal dan menghasilkan error `#N/A`. IFERROR mendeteksi error ini dan alih-alih menampilkannya, ia akan menampilkan argumen kedua, yaitu teks "Produk tidak ada".',
            answer: { type: 'formula', correctValue: '=IFERROR(VLOOKUP("Durian";A2:B4;2;FALSE);"Produk tidak ada")' },
        },
        {
            challenge: 'Terapkan formula IFERROR yang sama saat mencari "Apel" dengan VLOOKUP. Apa hasilnya?',
            hint: 'Jika formula di dalam IFERROR tidak menghasilkan error, maka hasil dari formula itu sendiri yang akan ditampilkan.',
            explanation: 'Ini menunjukkan apa yang terjadi ketika tidak ada error. Formula `=IFERROR(VLOOKUP("Apel";A2:B4;2;FALSE);"Produk tidak ada")` akan dicoba oleh Excel. Kali ini, `VLOOKUP` berhasil menemukan "Apel" dan mengembalikan 15000. Karena tidak ada error yang terjadi, fungsi IFERROR tidak melakukan apa-apa dan hanya meneruskan hasil yang sukses tersebut. Jadi, hasilnya adalah 15000.',
            answer: { type: 'formula', correctValue: '=IFERROR(VLOOKUP("Apel";A2:B4;2;FALSE);"Produk tidak ada")' },
        },
        {
          challenge: 'Formula `=10/0` akan menghasilkan error. Apa jenis error tersebut?',
          hint: 'Error ini terjadi saat ada operasi pembagian yang tidak valid.',
          explanation: 'Error #DIV/0! terjadi ketika sebuah formula mencoba membagi sebuah angka dengan nol (0) atau dengan sel kosong, yang merupakan operasi matematika yang tidak terdefinisi.',
          answer: { type: 'dropdown', options: ['#N/A', '#DIV/0!', '#NAME?', '#VALUE!'], correctValue: '#DIV/0!' },
        },
    ]
  },
    {
    id: 13,
    title: 'Conditional Formatting Battle',
    theme: 'Visualisasi Data',
    table: { headers: ['Siswa', 'Nilai'], rows: [['Adi', 85], ['Budi', 68], ['Cici', 92], ['Dedi', 60]] },
    icon: EyeDropperIcon,
    questions: [
        {
            challenge: 'Tulis formula untuk Conditional Formatting pada rentang B2:B5 untuk menyorot semua nilai di bawah 70.',
            hint: 'Aturan Conditional Formatting harus berupa formula yang menghasilkan TRUE atau FALSE. Tulis formula seolah-olah untuk sel pertama di pojok kiri atas rentang (B2).',
            explanation: 'Untuk *Conditional Formatting* berbasis formula, Anda menulis formula untuk sel paling atas kiri dari rentang yang Anda pilih (dalam hal ini, rentang `B2:B5`). Formula `=B2<70` akan dievaluasi untuk setiap sel dalam rentang tersebut:\n* Untuk sel `B2`, Excel memeriksa `85<70`. Hasilnya **FALSE**, jadi sel tidak disorot.\n* Untuk sel `B3`, Excel memeriksa `68<70`. Hasilnya **TRUE**, jadi sel disorot.\n* Untuk sel `B4`, Excel memeriksa `92<70`. Hasilnya **FALSE**.\n* Dan seterusnya. Kuncinya adalah menggunakan referensi relatif (`B2` bukan `$B$2`) agar Excel secara otomatis menyesuaikannya untuk setiap sel.',
            answer: { type: 'formula', correctValue: '=B2<70' },
        },
        {
            challenge: 'Tulis formula untuk Conditional Formatting untuk menyorot nilai yang sama dengan atau lebih besar dari 90.',
            hint: 'Gunakan operator "lebih besar dari atau sama dengan" yaitu `>=`.',
            explanation: 'Logikanya sama persis, hanya operator perbandingannya yang berbeda. Formula `=B2>=90` akan membuat Excel memeriksa setiap sel di rentang yang dipilih. Hanya sel `B4` (yang berisi nilai 92) yang akan menghasilkan `TRUE` untuk kondisi `92>=90`, sehingga hanya sel tersebut yang akan disorot sesuai format yang Anda atur.',
            answer: { type: 'formula', correctValue: '=B2>=90' },
        }
    ]
  },
  {
    id: 14,
    title: 'SEARCH & FIND Mission',
    theme: 'Analisis Teks',
    table: { headers: ['Email'], rows: [['user@example.com']] },
    icon: AtSymbolIcon,
    questions: [
        {
            challenge: 'Gunakan fungsi FIND untuk menemukan posisi karakter "@" dalam alamat email di sel A2.',
            hint: 'Format fungsi FIND adalah `FIND(teks_dicari, di_dalam_teks)`. Ingat, teks yang dicari harus diapit tanda kutip.',
            explanation: 'Fungsi **FIND** dan **SEARCH** keduanya digunakan untuk mencari posisi awal sebuah potongan teks di dalam teks lain. Formula `=FIND("@";A2)` akan mencari karakter "@" di dalam "user@example.com" dan mengembalikan angka 5, karena karakter "@" dimulai pada posisi ke-5 dari kiri.\nPerbedaan utama antara keduanya adalah: `FIND` bersifat *case-sensitive* (membedakan huruf besar/kecil), sedangkan `SEARCH` tidak. Untuk mencari "@", keduanya memberikan hasil yang sama.',
            answer: { type: 'formula', correctValue: ['=FIND("@";A2)', '=SEARCH("@";A2)'] },
        },
        {
            challenge: 'Gunakan fungsi FIND untuk menemukan posisi kemunculan pertama huruf "e" di sel A2.',
            hint: 'FIND akan menemukan kemunculan pertama dari kiri. Karakter pertama adalah posisi 1.',
            explanation: 'Formula `=FIND("e";A2)` akan memeriksa teks "user@example.com" dari kiri ke kanan. Ia akan menemukan huruf "e" pertama pada kata "user" dan mengembalikan posisinya, yaitu 3. Fungsi ini akan berhenti setelah menemukan kecocokan pertama, meskipun ada huruf "e" lain di kata "example".',
            answer: { type: 'formula', correctValue: ['=FIND("e";A2)', '=SEARCH("e";A2)'] },
        }
    ]
  },
    {
    id: 15,
    title: 'LEFT, MID, RIGHT Labyrinth',
    theme: 'Ekstraksi Teks',
    table: { headers: ['ID Karyawan'], rows: [['EMP-123-ID']] },
    icon: ScissorsIcon,
    questions: [
        {
            challenge: 'Gunakan fungsi MID untuk mengekstrak 3 karakter numerik di tengah ID Karyawan ("123") dari sel A2.',
            hint: 'Gunakan `MID(teks, posisi_awal, jumlah_karakter)`. "1" dimulai dari karakter ke-5, dan Anda butuh 3 karakter.',
            explanation: '**MID** sangat berguna untuk mengambil potongan teks dari bagian tengah sebuah string. Formula `=MID(A2;5;3)` bekerja seperti ini:\n* `A2`: Teks sumbernya.\n* `5`: Ini adalah **posisi_awal** (*start_num*). Ekstraksi akan dimulai dari karakter ke-5 (yaitu karakter "1").\n* `3`: Ini adalah **jumlah_karakter** (*num_chars*). Ekstraksi akan mengambil 3 karakter mulai dari posisi awal tersebut. Hasilnya adalah "123".',
            answer: { type: 'formula', correctValue: '=MID(A2;5;3)' },
        },
        {
            challenge: 'Gunakan fungsi LEFT untuk mengambil 3 karakter pertama ("EMP") dari ID di sel A2.',
            hint: 'Gunakan `LEFT(teks, jumlah_karakter)`. Anda perlu 3 karakter dari kiri.',
            explanation: 'Fungsi **LEFT** adalah cara termudah untuk mengambil sejumlah karakter dari awal (kiri) sebuah string. Formula `=LEFT(A2;3)` secara sederhana berarti "ambil 3 karakter dari sisi kiri sel A2", yang akan menghasilkan "EMP".',
            answer: { type: 'formula', correctValue: '=LEFT(A2;3)' },
        },
        {
            challenge: 'Gunakan fungsi RIGHT untuk mengambil 2 karakter terakhir ("ID") dari ID di sel A2.',
            hint: 'Gunakan `RIGHT(teks, jumlah_karakter)`. Anda perlu 2 karakter dari kanan.',
            explanation: 'Fungsi **RIGHT** adalah kebalikan dari LEFT; ia mengambil sejumlah karakter dari akhir (kanan) sebuah string. Formula `=RIGHT(A2;2)` secara sederhana berarti "ambil 2 karakter dari sisi kanan sel A2", yang akan menghasilkan "ID".',
            answer: { type: 'formula', correctValue: '=RIGHT(A2;2)' },
        },
        {
          challenge: 'Fungsi apa yang digunakan untuk mencari item di dalam satu baris atau kolom, dan mengembalikan posisi relatif item tersebut?',
          hint: 'Fungsi ini sering dipasangkan dengan INDEX untuk melakukan pencarian yang lebih fleksibel daripada VLOOKUP.',
          explanation: 'Fungsi MATCH sangat berguna untuk menemukan posisi (nomor baris atau kolom) dari sebuah item dalam rentang. Hasilnya yang berupa angka kemudian dapat digunakan oleh fungsi lain seperti INDEX.',
          answer: { type: 'text', correctValue: 'MATCH' },
        },
    ]
  },
  {
    id: 16,
    title: 'Data Cleaning Chamber',
    theme: 'Persiapan Data',
    table: { headers: ['Data Lokasi'], rows: [['  Cabang JKT  ']] },
    icon: SparklesIcon,
    questions: [
        {
            challenge: 'Gunakan kombinasi TRIM dan SUBSTITUTE untuk membersihkan spasi berlebih dan mengganti "JKT" dengan "Jakarta" pada data di sel A2.',
            hint: 'Gunakan TRIM untuk spasi, lalu bungkus hasilnya dengan SUBSTITUTE untuk mengganti teks.',
            explanation: 'Pembersihan data seringkali membutuhkan beberapa fungsi yang digabungkan (nested). Formula `=SUBSTITUTE(TRIM(A2);"JKT";"Jakarta")` dievaluasi dari dalam ke luar, seperti membuka lapisan bawang:\n1. **TRIM(A2)** berjalan pertama. Fungsi ini menghapus semua spasi di awal dan akhir teks. Hasilnya, "  Cabang JKT  " menjadi "Cabang JKT".\n2. Hasil dari `TRIM` kemudian "diberikan" ke fungsi `SUBSTITUTE`, yang mengganti "JKT" dengan "Jakarta". Hasil akhir yang bersih adalah: "Cabang Jakarta".',
            answer: { type: 'formula', correctValue: ['=SUBSTITUTE(TRIM(A2);"JKT";"Jakarta")', '=TRIM(SUBSTITUTE(A2;"JKT";"Jakarta"))'] },
        },
        {
            challenge: 'Gunakan fungsi TRIM untuk menghapus spasi di awal dan akhir dari data di sel A2.',
            hint: 'Fungsi TRIM dibuat khusus untuk tugas ini. Cukup `TRIM(A2)`.',
            explanation: 'Fungsi **TRIM** sangat efisien dan merupakan langkah pertama yang umum dalam pembersihan data teks. Ia melakukan tiga hal: menghapus semua spasi di awal teks, menghapus semua spasi di akhir teks, dan mengubah spasi ganda di antara kata-kata menjadi satu spasi tunggal. `=TRIM(A2)` adalah cara terbaik dan paling langsung untuk membersihkan masalah spasi.',
            answer: { type: 'formula', correctValue: '=TRIM(A2)' },
        }
    ]
  },
    {
    id: 17,
    title: 'Dynamic Chart Quest',
    theme: 'Visualisasi Interaktif',
    table: { headers: ['Bulan', 'Penjualan'], rows: [['Januari', 100], ['Februari', 120], ['Maret', 150]] },
    icon: ChartPieIcon,
    questions: [
        {
            challenge: 'Fungsi apa yang menjadi dasar untuk membuat referensi rentang dinamis, yang sering digunakan untuk sumber data grafik yang bisa bertambah otomatis? (Jawab dengan nama fungsi)',
            hint: 'Fungsi ini memungkinkan Anda menentukan rentang berdasarkan titik awal, pergeseran baris & kolom, serta tinggi & lebar rentang.',
            explanation: 'Fungsi **OFFSET** adalah fondasi klasik untuk membuat referensi rentang yang dinamis. Dengan mengkombinasikannya dengan fungsi `COUNTA` (untuk menghitung jumlah data yang ada), Anda bisa membuat *Named Range* yang secara otomatis memperbarui ukurannya setiap kali data baru ditambahkan. Grafik yang menggunakan *Named Range* ini kemudian akan ikut ter-update secara otomatis. Penting diketahui, OFFSET adalah fungsi *volatile* (selalu dihitung ulang saat ada perubahan di worksheet), jadi untuk workbook yang sangat besar, alternatif menggunakan fungsi **INDEX** seringkali lebih disukai karena tidak volatile.',
            answer: { type: 'text', correctValue: ['OFFSET', 'INDEX'] },
        },
        {
          challenge: 'Tipe grafik apa yang paling cocok untuk menampilkan tren penjualan selama 12 bulan?',
          hint: 'Grafik ini sangat baik untuk menunjukkan data berkelanjutan dari waktu ke waktu.',
          explanation: 'Line Chart (Grafik Garis) adalah pilihan ideal untuk melacak perubahan atau tren dari waktu ke waktu. Setiap titik pada garis mewakili nilai pada titik waktu tertentu, memudahkan untuk melihat naik turunnya data.',
          answer: { type: 'dropdown', options: ['Bar Chart', 'Line Chart', 'Pie Chart', 'Scatter Plot'], correctValue: 'Line Chart' },
        },
    ]
  },
  {
    id: 18,
    title: 'OFFSET & INDIRECT Cave',
    theme: 'Referensi Dinamis',
    table: {
        headers: ['Kolom A', 'Kolom B', 'Kolom C', '', 'Alamat Sel'],
        rows: [['10', '20', '30', '', 'B3'], ['40', '50', '60', '', ''], ['70', '80', '90', '', '']],
    },
    icon: LinkIcon,
    questions: [
        {
            challenge: 'Gunakan fungsi INDIRECT untuk mengambil nilai dari sel yang alamatnya tertulis sebagai teks di sel E2 ("B3").',
            hint: 'INDIRECT mengambil teks dan memperlakukannya sebagai referensi sel yang valid. Cukup `INDIRECT(sel_berisi_teks_alamat)`.',
            explanation: 'Fungsi **INDIRECT** adalah fungsi yang sangat unik dan kuat. Ia mengubah sebuah string teks menjadi sebuah referensi sel yang "hidup". Formula `=INDIRECT(E2)` akan:\n1. Membaca isi dari sel E2, yaitu string teks "B3".\n2. Memperlakukan teks tersebut bukan sebagai teks biasa, melainkan sebagai alamat sel `B3`.\n3. Mengembalikan nilai yang ada di sel `B3` tersebut, yaitu 50. Ini sangat berguna untuk membuat formula yang dapat merujuk ke sel yang berbeda hanya dengan mengubah teks di sel lain.',
            answer: { type: 'formula', correctValue: ['=INDIRECT(E2)', '=INDIRECT("B3")'] },
        }
    ]
  },
    {
    id: 19,
    title: 'Dashboard Builder Trial',
    theme: 'Ringkasan Data',
    table: {
        headers: ['Wilayah', 'Produk', 'Penjualan'],
        rows: [['Barat', 'Laptop', 1200], ['Timur', 'Monitor', 300], ['Barat', 'Keyboard', 75], ['Selatan', 'Laptop', 800], ['Barat', 'Laptop', 500]],
    },
    icon: RectangleGroupIcon,
    questions: [
        {
            challenge: 'Gunakan SUMIFS untuk menghitung total penjualan produk "Laptop" di wilayah "Barat".',
            hint: 'Gunakan SUMIFS untuk menjumlahkan berdasarkan beberapa kriteria: Wilayah dan Produk.',
            explanation: 'Dashboard yang efektif bergantung pada formula ringkasan yang kuat seperti **SUMIFS**. Formula `=SUMIFS(C2:C6;A2:A6;"Barat";B2:B6;"Laptop")` akan memeriksa setiap baris data dan menjumlahkan nilai di kolom C hanya jika kedua kondisi berikut terpenuhi pada baris yang sama:\n1. Nilai di kolom Wilayah (A2:A6) adalah "Barat".\n2. **DAN** nilai di kolom Produk (B2:B6) adalah "Laptop".\nIni adalah fungsi inti untuk membuat Key Performance Indicators (KPI) di banyak laporan.',
            answer: { type: 'formula', correctValue: ['=SUMIFS(C2:C6;A2:A6;"Barat";B2:B6;"Laptop")', '=SUMIFS(C:C;A:A;"Barat";B:B;"Laptop")'] },
        },
        {
            challenge: 'Gunakan SUMIF untuk menghitung total penjualan untuk produk "Monitor" di semua wilayah.',
            hint: 'Gunakan SUMIF karena hanya ada satu kriteria (Produk).',
            explanation: 'Karena kita hanya peduli pada satu kriteria (Produk = "Monitor"), fungsi **SUMIF** yang lebih sederhana sudah cukup. Formulanya adalah `=SUMIF(B2:B6;"Monitor";C2:C6)`. Ini akan memeriksa kolom Produk (`B2:B6`) untuk setiap sel yang berisi "Monitor" dan menjumlahkan nilai yang sesuai dari kolom Penjualan (`C2:C6`).',
            answer: { type: 'formula', correctValue: ['=SUMIF(B2:B6;"Monitor";C2:C6)', '=SUMIF(B:B;"Monitor";C:C)'] },
        }
    ]
  },
  {
    id: 20,
    title: 'Power Formula Fusion',
    theme: 'Laporan Kompleks',
    table: { headers: ['ID', 'Nama', 'Skor Total'], rows: [['101', 'Adi', 170], ['102', 'Budi', 175], ['103', 'Cici', 145]] },
    icon: AcademicCapIcon,
    questions: [
        {
            challenge: 'Gabungkan VLOOKUP dengan operator & atau CONCAT untuk membuat kalimat: "Skor total untuk Budi adalah [skor Budi]".',
            hint: 'Gunakan operator `&` atau fungsi `CONCAT` untuk menggabungkan string. Masukkan VLOOKUP di dalam gabungan tersebut.',
            explanation: 'Menggabungkan fungsi dengan teks (concatenation) adalah keahlian tingkat lanjut yang penting. Formula `="Skor total untuk Budi adalah "&VLOOKUP("Budi";B2:C4;2;FALSE)` bekerja dengan cara:\n1. Pertama, Excel menyelesaikan fungsi `VLOOKUP(...)`. Fungsi ini mencari "Budi", menemukan skornya, dan menghasilkan nilai `175`.\n2. Kemudian, operator `&` (ampersand) bekerja. Ia menggabungkan teks statis `"Skor total untuk Budi adalah "` dengan hasil dari VLOOKUP tersebut.\nFungsi `CONCAT` atau `CONCATENATE` juga bisa digunakan untuk tujuan yang sama: `=CONCAT("Skor total untuk Budi adalah ";VLOOKUP("Budi";B2:C4;2;FALSE))`',
            answer: { type: 'formula', correctValue: ['="Skor total untuk Budi adalah "&VLOOKUP("Budi";B2:C4;2;FALSE)', '=CONCAT("Skor total untuk Budi adalah ";VLOOKUP("Budi";B2:C4;2;FALSE))'] },
        },
        {
            challenge: 'Buat kalimat laporan untuk "Adi" dengan format: "Adi (ID: 101) memiliki skor 170" menggunakan referensi sel dan operator &.',
            hint: 'Anda perlu menggabungkan nama, ID, dan skor. Gunakan operator `&` dan referensi sel langsung.',
            explanation: 'Ini adalah contoh penggabungan string (concatenation) yang lebih kompleks yang menggabungkan beberapa sel dan teks statis. Formula `=B2&" (ID: "&A2&") memiliki skor "&C2` bekerja secara berurutan:\n1. Mengambil nilai dari `B2` ("Adi").\n2. Menggabungkannya dengan teks `" (ID: "`. Hasil sementara: "Adi (ID: ".\n3. Menggabungkannya dengan nilai dari `A2` ("101"). Hasil sementara: "Adi (ID: 101".\n4. Menggabungkannya dengan `") memiliki skor "`. Hasil sementara: "Adi (ID: 101) memiliki skor ".\n5. Terakhir, menggabungkannya dengan nilai dari `C2` (170) untuk hasil akhir.',
            answer: { type: 'formula', correctValue: ['=B2&" (ID: "&A2&") memiliki skor "&C2', '=CONCAT(B2," (ID: ",A2,") memiliki skor ",C2)'] },
        }
    ]
  },
  // Part 3: Master
    {
    id: 21,
    title: 'Formula Array Dinamis',
    theme: 'Dynamic Arrays',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [['Barat', 'Laptop', 1200], ['Timur', 'Monitor', 300], ['Timur', 'Keyboard', 75], ['Barat', 'Laptop', 500]],
    },
    icon: CubeTransparentIcon,
    questions: [
        {
            challenge: 'Gunakan FILTER untuk membuat daftar baru yang hanya berisi data dari wilayah "Timur".',
            hint: 'Gunakan `FILTER(array, include)`. `array` adalah seluruh tabel data Anda, `include` adalah kondisi (misal: kolom wilayah = "Timur").',
            explanation: 'Formula Array Dinamis seperti **FILTER** secara fundamental mengubah cara kerja Excel. Anda hanya perlu menulis satu formula, dan hasilnya secara otomatis "tumpah" (spill) ke sel-sel di sekitarnya. Formula `=FILTER(A2:C5;A2:A5="Timur")` bekerja seperti ini:\n* `A2:C5`: Ini adalah **array** yang ingin kita filter, yaitu seluruh data.\n* `A2:A5="Timur"`: Ini adalah kondisi **include**. Excel memeriksa setiap sel di `A2:A5`, dan membuat sebuah array boolean virtual (misalnya `{FALSE;TRUE;TRUE;FALSE}`). Hanya baris yang menghasilkan `TRUE` yang akan ditampilkan di hasil akhir.',
            answer: { type: 'formula', correctValue: '=FILTER(A2:C5;A2:A5="Timur")' },
        },
        {
            challenge: 'Gunakan FILTER untuk menampilkan semua transaksi dengan penjualan di atas 500.',
            hint: 'Ganti kondisi `include` pada fungsi FILTER Anda untuk memeriksa kolom Penjualan.',
            explanation: 'Kekuatan FILTER terletak pada kemudahannya untuk mengubah kriteria. Untuk memfilter berdasarkan nilai numerik, kita hanya perlu mengubah kondisi **include**. Formula `=FILTER(A2:C5;C2:C5>500)` akan memeriksa setiap nilai di kolom Penjualan (`C2:C5`) dan hanya mengembalikan baris di mana kondisi `nilai > 500` terpenuhi (TRUE).',
            answer: { type: 'formula', correctValue: '=FILTER(A2:C5;C2:C5>500)' },
        }
    ]
  },
  {
    id: 22,
    title: 'Duel XLOOKUP',
    theme: 'Pencarian Super',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [['Barat', 'Laptop', 1200], ['Timur', 'Monitor', 300], ['Barat', 'Keyboard', 75], ['Selatan', 'Laptop', 800]],
    },
    icon: ArrowsRightLeftIcon,
    questions: [
        {
            challenge: 'Gunakan XLOOKUP untuk menemukan Wilayah dari Produk "Monitor".',
            hint: 'Gunakan `XLOOKUP(lookup_value, lookup_array, return_array)`. `lookup_value` adalah "Monitor", `lookup_array` adalah kolom Produk, `return_array` adalah kolom Wilayah.',
            explanation: '**XLOOKUP** adalah penerus modern yang lebih kuat dan intuitif daripada VLOOKUP dan HLOOKUP. Formula `=XLOOKUP("Monitor";B2:B5;A2:A5)` lebih mudah dibaca:\n* `"Monitor"`: Apa yang kita cari.\n* `B2:B5`: Di kolom mana kita mencarinya (*lookup_array*).\n* `A2:A5`: Dari kolom mana kita ingin mengambil hasilnya (*return_array*).\nIni menghilangkan keharusan menghitung nomor kolom (seperti di VLOOKUP) dan dapat dengan mudah mencari ke kiri atau kanan tanpa masalah.',
            answer: { type: 'formula', correctValue: ['=XLOOKUP("Monitor";B2:B5;A2:A5)', '=XLOOKUP("Monitor";B:B;A:A)'] },
        },
        {
            challenge: 'Gunakan XLOOKUP untuk mencari nilai Penjualan dari produk "Keyboard".',
            hint: 'Ubah `return_array` menjadi kolom Penjualan. `lookup_array` tetap kolom Produk.',
            explanation: 'Sangat mudah untuk mengubah kolom hasil dengan XLOOKUP. Kita hanya perlu mengubah argumen ketiga. Formulanya adalah `=XLOOKUP("Keyboard";B2:B5;C2:C5)`. Argumen pertama dan kedua (`lookup_value` dan `lookup_array`) tetap sama karena kita masih mencari "Keyboard" di kolom Produk. Yang berubah hanyalah kolom `return_array` yang sekarang adalah `C2:C5` (kolom Penjualan).',
            answer: { type: 'formula', correctValue: ['=XLOOKUP("Keyboard";B2:B5;C2:C5)', '=XLOOKUP("Keyboard";B:B;C:C)'] },
        },
        {
          challenge: 'Fungsi apa yang digunakan untuk menyaring rentang data berdasarkan kriteria yang Anda tentukan?',
          hint: 'Ini adalah fungsi array dinamis yang modern, yang dapat "menumpahkan" hasilnya ke beberapa sel.',
          explanation: 'Fungsi FILTER adalah fungsi array dinamis yang kuat. Ia mengembalikan semua baris dari rentang yang memenuhi kriteria yang Anda berikan, secara otomatis membuat tabel hasil baru.',
          answer: { type: 'text', correctValue: 'FILTER' },
        },
    ]
  },
    {
    id: 23,
    title: 'Misi LET & LAMBDA',
    theme: 'Fungsi Kustom',
    table: { headers: ['Item', 'Harga'], rows: [['Barang A', 1000]] },
    icon: BeakerIcon,
    questions: [
        {
            challenge: 'Gunakan LET untuk mendefinisikan variabel "Pajak" sebesar 10% (0.1), lalu hitung harga di B2 ditambah pajak tersebut.',
            hint: 'Gunakan `LET(nama1, nilai1, kalkulasi)`. Nama variabelnya `Pajak`, nilainya `0.1`. Kalkulasinya adalah `B2 * (1 + Pajak)`.',
            explanation: 'Fungsi **LET** sangat meningkatkan keterbacaan dan efisiensi formula yang kompleks. Ia memungkinkan Anda memberi nama pada variabel atau perhitungan. Formula `=LET(Pajak;0.1;B2*(1+Pajak))` bekerja sebagai berikut:\n1. `Pajak;0.1`: Mendefinisikan sebuah variabel bernama `Pajak` dengan nilai `0.1`.\n2. `B2*(1+Pajak)`: Ini adalah kalkulasi akhir yang menggunakan variabel `Pajak` yang baru saja kita buat. Ini membuat formula lebih mudah dibaca dan dikelola daripada `=B2*(1+0.1)`. Jika `Pajak` digunakan berkali-kali, LET juga lebih cepat karena hanya menghitungnya sekali.',
            answer: { type: 'formula', correctValue: ['=LET(Pajak;0.1;B2*(1+Pajak))', '=LET(Pajak;0.1;B2+B2*Pajak)'] },
        },
        {
            challenge: 'Gunakan LET untuk mendefinisikan variabel harga dan diskon 20%, lalu hitung besar diskon dari harga di B2.',
            hint: 'Anda bisa mendefinisikan beberapa variabel: `LET(nama1, nilai1, nama2, nilai2, kalkulasi)`.',
            explanation: 'Anda dapat mendefinisikan beberapa pasangan nama-nilai di dalam satu fungsi LET. `=LET(Harga;B2;DiskonRate;0.2;Harga*DiskonRate)` akan:\n1. Mendefinisikan `Harga` sebagai nilai dari sel `B2` (yaitu 1000).\n2. Mendefinisikan `DiskonRate` sebagai `0.2`.\n3. Melakukan kalkulasi akhir `Harga*DiskonRate` menggunakan variabel-variabel yang sudah didefinisikan, menghasilkan `1000 * 0.2 = 200`.',
            answer: { type: 'formula', correctValue: '=LET(Harga;B2;DiskonRate;0.2;Harga*DiskonRate)' },
        }
    ]
  },
  {
    id: 24,
    title: 'Validasi Data Cerdas',
    theme: 'Aturan Input',
    table: { headers: ['Kode Unik (harus 5 karakter)'], rows: [['']] },
    icon: CheckBadgeIcon,
    questions: [
        {
            challenge: 'Tulis formula untuk aturan Validasi Data di sel A2 yang hanya memperbolehkan teks dengan panjang tepat 5 karakter.',
            hint: 'Gunakan fungsi LEN untuk menghitung panjang teks, lalu bandingkan hasilnya dengan 5. Aturan validasi butuh hasil TRUE/FALSE.',
            explanation: 'Validasi Data dengan formula kustom memberikan kontrol presisi atas input pengguna. Formula `=LEN(A2)=5` bekerja sebagai penjaga gerbang. Sebelum data yang diketik pengguna dimasukkan ke sel A2, Excel mengevaluasi formula ini:\n1. `LEN(A2)` menghitung panjang teks yang dimasukkan pengguna.\n2. `=5` membandingkan hasil panjang tersebut dengan angka 5.\nJika hasilnya `TRUE` (panjangnya tepat 5), input diterima. Jika `FALSE` (panjangnya bukan 5), Excel akan menampilkan pesan error dan menolak input tersebut.',
            answer: { type: 'formula', correctValue: '=LEN(A2)=5' },
        },
        {
            challenge: 'Tulis formula untuk aturan Validasi Data di sel A2 yang hanya memperbolehkan input berupa angka.',
            hint: 'Gunakan fungsi `IS...` yang memeriksa tipe data. Fungsi `ISNUMBER` akan sangat membantu.',
            explanation: 'Fungsi `ISNUMBER` adalah salah satu dari keluarga fungsi "IS" yang memeriksa tipe data. Ia akan mengembalikan `TRUE` jika isi sel adalah angka, dan `FALSE` jika bukan (misalnya jika berisi teks, error, atau boolean). Dengan menggunakannya sebagai formula Validasi Data, `=ISNUMBER(A2)`, Anda memastikan hanya entri numerik yang akan diterima oleh sel tersebut, mencegah kesalahan input data.',
            answer: { type: 'formula', correctValue: '=ISNUMBER(A2)' },
        },
        {
          challenge: 'Formula yang merujuk ke nama yang tidak ada (misal: `=TotalPenjualan`) akan menghasilkan error. Apa jenis errornya?',
          hint: 'Error ini terjadi ketika Excel tidak mengenali nama fungsi atau named range.',
          explanation: 'Error #NAME? muncul ketika Excel tidak dapat mengenali teks dalam sebuah formula. Ini biasanya terjadi karena salah ketik nama fungsi (misal, `VLOKUP` bukan `VLOOKUP`) atau merujuk ke Named Range yang belum dibuat.',
          answer: { type: 'dropdown', options: ['#REF!', '#VALUE!', '#NAME?', '#NUM!'], correctValue: '#NAME?' },
        },
    ]
  },
    {
    id: 25,
    title: 'What-If Analysis',
    theme: 'Analisis Skenario',
    table: { headers: ['Parameter', 'Nilai'], rows: [['Pinjaman', 100000000], ['Bunga per Tahun', 0.05], ['Periode (Tahun)', 3]] },
    icon: SunIcon,
    questions: [
        {
            challenge: 'Gunakan PMT untuk menghitung angsuran bulanan jika suku bunga tahunan (di B2) berubah menjadi 7%.',
            hint: 'Gunakan `PMT(rate, nper, pv)`. Ingat, bunga (`rate`) dan periode (`nper`) harus disesuaikan ke basis bulanan. Bunga dibagi 12, periode dikali 12.',
            explanation: 'Analisis What-If adalah tentang melihat bagaimana perubahan input mempengaruhi hasil. Fungsi **PMT** menghitung pembayaran angsuran tetap untuk pinjaman. Formula `=PMT(7%/12; B3*12; -B1)` menghitung angsuran bulanan untuk skenario baru:\n* `rate`: Bunga tahunan `7%` harus diubah menjadi bunga bulanan, jadi kita bagi dengan 12.\n* `nper`: Periode `3` tahun (dari B3) harus diubah menjadi total bulan, jadi kita kali dengan 12.\n* `pv`: Nilai pinjaman saat ini (`present value`), yaitu `-B1`. Dibuat negatif agar hasil PMT menjadi angka positif (uang keluar vs uang masuk).',
            answer: { type: 'formula', correctValue: '=PMT(7%/12;B3*12;-B1)' },
        },
        {
            challenge: 'Gunakan PMT untuk menghitung angsuran bulanan berdasarkan kondisi awal di tabel (bunga 5% per tahun).',
            hint: 'Gunakan nilai dari tabel. Bunga `B2/12`, periode `B3*12`, nilai pinjaman `-B1`.',
            explanation: 'Formula untuk kondisi awal adalah `=PMT(B2/12; B3*12; -B1)`. Ini menggunakan nilai-nilai langsung dari tabel untuk menghitung angsuran dasar.\n* `rate`: `B2/12` (0.05 dibagi 12).\n* `nper`: `B3*12` (3 dikali 12).\n* `pv`: `-B1` (-100,000,000).\nTanda negatif pada `pv` (present value) adalah konvensi keuangan yang umum di Excel agar hasil angsuran (PMT) menjadi positif, merepresentasikan pembayaran keluar.',
            answer: { type: 'formula', correctValue: '=PMT(B2/12;B3*12;-B1)' },
        }
    ]
  },
  {
    id: 26,
    title: 'Gabungkan Power Query',
    theme: 'Transformasi Data',
    table: { headers: ['Nama Depan', 'Nama Belakang'], rows: [['Budi', 'Santoso'], ['Ani', 'Wijaya']] },
    icon: BoltIcon,
    questions: [
        {
            challenge: 'Di Power Query, transformasi apa yang digunakan untuk menggabungkan kolom Nama Depan dan Nama Belakang menjadi satu kolom "Nama Lengkap"?',
            hint: 'Cari opsi yang terdengar seperti "Gabungkan Kolom" atau "Merge Columns". Anda bisa menentukan pemisah seperti spasi.',
            explanation: 'Power Query adalah alat ETL (Extract, Transform, Load) yang sangat kuat yang terintegrasi di dalam Excel. Untuk menggabungkan kolom, Anda melakukan langkah-langkah berikut di dalam editor Power Query:\n1. Pilih kolom yang relevan secara berurutan (misalnya klik kolom Nama Depan, lalu tahan Ctrl dan klik kolom Nama Belakang).\n2. Klik kanan pada salah satu header kolom yang dipilih.\n3. Pilih fitur **Merge Columns** (Gabungkan Kolom) dari menu konteks.\n4. Power Query kemudian akan meminta Anda untuk menentukan pemisah (delimiter), seperti spasi, dan memberi nama pada kolom baru tersebut.',
            answer: { type: 'text', correctValue: ['Merge Columns'] },
        }
    ]
  },
    {
    id: 27,
    title: 'Penguasa Named Range',
    theme: 'Referensi Efisien',
    table: { headers: ['A', 'B', 'Penjualan', '', 'Tarif Pajak'], rows: [['', '', 1500, '', 0.11]] },
    icon: TagIcon,
    questions: [
        {
            challenge: 'Gunakan Named Range `TarifPajak` (yang merujuk ke E2) untuk menghitung total penjualan di C2 ditambah pajaknya.',
            hint: 'Gunakan nama `TarifPajak` langsung di formulamu seolah-olah itu adalah angka. Formula dasarnya: `Nilai * (1 + Pajak)`.',
            explanation: '*Named Range* (Rentang Bernama) adalah salah satu fitur terbaik untuk membuat formula lebih mudah dibaca, dipahami, dan dikelola. Daripada menulis `=C2*(1+E2)`, yang mungkin sulit dimengerti artinya nanti, Anda bisa menggunakan `=C2*(1+TarifPajak)`. Ini jauh lebih jelas maksudnya. Keuntungan lainnya adalah jika tarif pajak pindah ke sel lain, Anda hanya perlu memperbarui definisi *Named Range*-nya di Name Manager, dan semua formula yang menggunakannya akan otomatis ter-update.',
            answer: { type: 'formula', correctValue: ['=C2*(1+TarifPajak)', '=C2+C2*TarifPajak'] },
        },
    ]
  },
  {
    id: 28,
    title: 'Validasi Bertingkat',
    theme: 'Dropdown Dinamis',
    table: { headers: ['Kategori', 'Item'], rows: [['Buah', '']] },
    icon: QueueListIcon,
    questions: [
        {
            challenge: 'Gunakan INDIRECT sebagai Source di Data Validation sel B2 untuk membuat dropdown yang isinya bergantung pada pilihan di B1.',
            hint: 'Fungsi `INDIRECT` bisa mengubah teks dari sebuah sel menjadi referensi rentang yang valid. Ini adalah kunci dari dropdown bertingkat.',
            explanation: 'Ini adalah teknik canggih yang disebut *dropdown bertingkat* (dependent dropdown). Kuncinya adalah menggunakan fungsi **INDIRECT** di dalam pengaturan *Data Validation*.\n1. Anda membuat beberapa *Named Range*. Satu bernama `Buah` (merujuk ke daftar buah-buahan) dan satu lagi bernama `Sayur` (merujuk ke daftar sayuran).\n2. Di sel B2, Anda membuka *Data Validation*, memilih *List*, dan di kotak *Source*, Anda menulis formula `=INDIRECT(B1)`.\nCara kerjanya: Jika B1 berisi teks "Buah", `INDIRECT("Buah")` akan mengubah teks itu menjadi referensi ke rentang bernama `Buah`. Jika B1 diubah menjadi "Sayur", ia akan langsung merujuk ke rentang bernama `Sayur`. Ini membuat daftar pilihan di B2 berubah secara dinamis.',
            answer: { type: 'formula', correctValue: '=INDIRECT(B1)' },
        }
    ]
  },
    {
    id: 29,
    title: 'Uji Goal Seek',
    theme: 'Analisis Terbalik',
    table: { headers: ['Item', 'Nilai'], rows: [['Pendapatan', 10000], ['Biaya', 6000], ['Laba', 4000]] },
    icon: RocketLaunchIcon,
    questions: [
        {
            challenge: 'Untuk mencapai target laba (B3) sebesar 5000 dengan hanya mengubah Pendapatan (B1), fitur What-If Analysis apa yang digunakan?',
            hint: 'Fitur ini ada di tab Data > grup Forecast > What-If Analysis. Namanya berarti "Mencari Tujuan".',
            explanation: '**Goal Seek** adalah alat yang sempurna untuk analisis terbalik sederhana. Ini bekerja dengan cara "coba-coba" yang sangat cepat untuk menemukan input yang tepat untuk hasil yang Anda inginkan. Anda memberitahunya tiga hal di dalam dialog box Goal Seek:\n1. **Set cell**: \`B3\` (sel formula yang ingin Anda atur nilainya).\n2. **To value**: \`5000\` (nilai target yang Anda inginkan untuk sel B3).\n3. **By changing cell**: \`B1\` (sel input tunggal yang boleh diubah oleh Excel untuk mencapai target).\nExcel kemudian akan secara iteratif mencoba berbagai nilai di B1 sampai formula di B3 menghasilkan 5000.',
            answer: { type: 'text', correctValue: ['Goal Seek'] },
        }
    ]
  },
  {
    id: 30,
    title: 'Dashboard Final Boss',
    theme: 'Laporan Final',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [['Barat', 'Laptop', 1200], ['Timur', 'Monitor', 300], ['Barat', 'Keyboard', 75], ['Selatan', 'Laptop', 800], ['Barat', 'Laptop', 500]],
    },
    icon: TrophyIcon,
    questions: [
        {
            challenge: 'Gunakan SUMIFS untuk menghitung total penjualan produk "Laptop" dari wilayah "Barat".',
            hint: 'Gunakan SUMIFS. Ingat, argumen pertama adalah rentang yang akan dijumlahkan, diikuti oleh pasangan rentang kriteria dan kriterianya.',
            explanation: 'SUMIFS adalah senjata utama untuk membuat ringkasan dashboard yang membutuhkan beberapa filter. Formula `=SUMIFS(C2:C6;A2:A6;"Barat";B2:B6;"Laptop")` bekerja dengan menjumlahkan nilai dari `sum_range` (`C2:C6`) untuk baris-baris yang memenuhi **SEMUA** kriteria yang diberikan:\n1. `A2:A6;"Barat"`: Kriteria pertama adalah kolom Wilayah (`A2:A6`) harus sama dengan "Barat".\n2. `B2:B6;"Laptop"`: Kriteria kedua adalah kolom Produk (`B2:B6`) harus sama dengan "Laptop".\nJika kedua syarat terpenuhi pada satu baris, nilai dari kolom Penjualan (`C2:C6`) pada baris itu akan dijumlahkan.',
            answer: { type: 'formula', correctValue: ['=SUMIFS(C2:C6;A2:A6;"Barat";B2:B6;"Laptop")', '=SUMIFS(C:C;A:A;"Barat";B:B;"Laptop")'] },
        }
    ]
  },
  // Part 4: Analyst
    {
    id: 31,
    title: 'Data Cleaning Master',
    theme: 'Pembersihan Data Pro',
    table: { headers: ['Data Kotor'], rows: [['  PRODUK-01  ']] },
    icon: SparklesIcon,
    questions: [
        {
            challenge: 'Gunakan kombinasi PROPER dan TRIM untuk membersihkan data di A2 menjadi "Produk-01" (Proper Case, tanpa spasi ekstra).',
            hint: 'Kombinasikan dua fungsi: satu untuk menghapus spasi di awal/akhir, dan satu lagi untuk mengubah format huruf menjadi kapital di setiap awal kata.',
            explanation: 'Formula `=PROPER(TRIM(A2))` adalah contoh klasik pembersihan data yang efisien, yang bekerja dari dalam ke luar:\n1. **TRIM(A2):** Pertama, fungsi `TRIM` bekerja. Ia membersihkan semua spasi di awal dan akhir teks, serta spasi ganda di tengah. Hasilnya, `"  PRODUK-01  "` menjadi `"PRODUK-01"`.\n2. **PROPER(...):** Kemudian, fungsi `PROPER` mengambil hasil dari `TRIM` dan mengubahnya ke *Proper Case*, di mana huruf pertama dari setiap kata menjadi kapital dan sisanya huruf kecil. Hasil akhirnya adalah string yang bersih: `"Produk-01"`.',
            answer: { type: 'formula', correctValue: ['=PROPER(TRIM(A2))', '=TRIM(PROPER(A2))'] },
        }
    ]
  },
  {
    id: 32,
    title: 'Query Fusion',
    theme: 'Gabung Tabel Power Query',
    table: { headers: ['Tabel A: Penjualan', 'Tabel B: Produk'], rows: [['ID Produk, Jumlah', 'ID Produk, Nama'], ['P01, 10', 'P01, Laptop']] },
    icon: BoltIcon,
    questions: [
        {
            challenge: 'Di Power Query, operasi apa yang digunakan untuk menggabungkan informasi dari Tabel Penjualan dan Tabel Produk berdasarkan ID Produk yang sama?',
            hint: 'Operasi ini mirip dengan VLOOKUP atau SQL JOIN, tetapi di dalam antarmuka Power Query.',
            explanation: 'Operasi **Merge Queries** di Power Query adalah alat yang setara dengan `SQL JOIN`. Ini digunakan untuk menggabungkan data dari dua atau lebih tabel berdasarkan kolom yang cocok (kunci). Ini memungkinkan Anda untuk "menarik" kolom dari satu tabel ke tabel lain, seperti menambahkan kolom `Nama Produk` dan `Harga` dari Tabel Produk ke dalam Tabel Penjualan, dengan mencocokkan baris berdasarkan kolom `ID Produk` yang sama di kedua tabel. Ini adalah operasi fundamental dalam pemodelan data.',
            answer: { type: 'text', correctValue: ['Merge Queries', 'Merge'] },
        }
    ]
  },
    {
    id: 33,
    title: 'Format Bersyarat Lanjutan',
    theme: 'Highlight Baris',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [['Barat', 'Laptop', 1200], ['Timur', 'Monitor', 300], ['Barat', 'Keyboard', 75], ['Selatan', 'PC', 1500]],
    },
    icon: EyeDropperIcon,
    questions: [
        {
            challenge: 'Tulis formula Conditional Formatting untuk rentang A2:C5 yang akan menyorot seluruh baris jika Penjualan (kolom C) melebihi 1000.',
            hint: 'Gunakan referensi absolut pada kolom (`$C`) agar semua sel di baris yang sama merujuk ke kolom C. Referensi baris harus tetap relatif (tanpa `$`).',
            explanation: 'Untuk memformat seluruh baris berdasarkan nilai di satu kolom, kita harus menggunakan **referensi campuran (mixed reference)**. Formula `=$C2>1000` adalah kuncinya. Saat aturan ini diterapkan pada rentang `A2:C5`:\n* Tanda `$` **mengunci** kolom menjadi `C`. Ini berarti saat aturan dievaluasi untuk sel A2, B2, atau C2, semuanya akan memeriksa nilai di kolom `$C` dari baris mereka saat ini.\n* Nomor baris `2` **tidak dikunci** (relatif). Ini berarti saat aturan dievaluasi untuk baris berikutnya (baris 3), formula secara otomatis akan memeriksa `$C3`, lalu `$C4`, dan seterusnya. Ini memastikan seluruh baris diformat secara konsisten berdasarkan nilai di kolom C-nya.',
            answer: { type: 'formula', correctValue: '=$C2>1000' },
        }
    ]
  },
  {
    id: 34,
    title: 'INDEX-MATCH Pro Combo',
    theme: 'Two-Way Lookup',
    table: {
      headers: ['Produk/Wilayah', 'Barat', 'Timur', 'Selatan'],
      rows: [['Laptop', 1200, 1100, 800], ['Monitor', 250, 300, 200], ['Keyboard', 75, 80, 70]],
    },
    icon: PuzzlePieceIcon,
    questions: [
        {
            challenge: 'Gunakan INDEX dan dua fungsi MATCH untuk menemukan nilai penjualan di persimpangan antara baris "Monitor" dan kolom "Timur".',
            hint: 'Formula dasarnya adalah `INDEX(area_data, nomor_baris, nomor_kolom)`. Gunakan `MATCH("Monitor", ...)` untuk mendapatkan `nomor_baris`. Gunakan `MATCH("Timur", ...)` untuk mendapatkan `nomor_kolom`.',
            explanation: 'Ini adalah *two-way lookup* yang sangat kuat, sering digunakan sebelum XLOOKUP ada. Formula `=INDEX(B3:D5;MATCH("Monitor";A3:A5;0);MATCH("Timur";B2:D2;0))` bekerja seperti ini:\n1.  **INDEX(B3:D5; ... ; ...):** Menentukan area data utama tempat hasil akhir akan diambil (hanya area nilai, tanpa header).\n2.  **MATCH("Monitor";A3:A5;0):** Ini adalah argumen `nomor_baris`. Ia mencari "Monitor" di header baris (`A3:A5`) dan mengembalikan posisi barisnya (yaitu, `2`).\n3.  **MATCH("Timur";B2:D2;0):** Ini adalah argumen `nomor_kolom`. Ia mencari "Timur" di header kolom (`B2:D2`) dan mengembalikan posisi kolomnya (yaitu, `2`).\nHasilnya, Excel mengambil nilai dari baris ke-2 dan kolom ke-2 di dalam area B3:D5, yaitu 300.\n**Alternatif Modern:** XLOOKUP bertingkat lebih mudah dibaca: `=XLOOKUP("Monitor";A3:A5;XLOOKUP("Timur";B2:D2;B3:D5))`',
            answer: { type: 'formula', correctValue: ['=INDEX(B3:D5;MATCH("Monitor";A3:A5;0);MATCH("Timur";B2:D2;0))', '=XLOOKUP("Monitor";A3:A5;XLOOKUP("Timur";B2:D2;B3:D5))'] },
        }
    ]
  },
    {
    id: 35,
    title: 'Grafik Dinamis',
    theme: 'Chart Otomatis',
    table: { headers: ['Bulan', 'Penjualan'], rows: [['Jan', 100], ['Feb', 120], ['Mar', 150]] },
    icon: ChartPieIcon,
    questions: [
        {
            challenge: 'Tulis formula untuk Named Range dinamis yang mencakup semua data Penjualan di kolom B, mulai dari B2.',
            hint: 'Gunakan OFFSET yang dikombinasikan dengan COUNTA. `OFFSET(titik_awal, geser_baris, geser_kolom, tinggi, lebar)`. `tinggi` bisa didapat dari `COUNTA`.',
            explanation: 'Formula `=OFFSET($B$2;0;0;COUNTA($B:$B)-1;1)` menciptakan rentang yang tumbuh secara otomatis, yang sangat berguna untuk sumber data grafik. Begini cara kerjanya:\n* `$B$2` adalah sel jangkar, titik awal rentang.\n* `0;0` berarti tidak ada pergeseran baris atau kolom dari titik awal.\n* `COUNTA($B:$B)-1` adalah bagian dinamisnya. `COUNTA($B:$B)` menghitung semua sel yang tidak kosong di kolom B (termasuk header). Kita kurangi 1 untuk mengabaikan header, sehingga hasilnya adalah jumlah data penjualan yang sebenarnya. Ini menjadi argumen `tinggi` rentang.\n* `1` adalah `lebar` rentang (hanya 1 kolom).\n**Alternatif (Non-Volatile):** `=$B$2:INDEX($B:$B;COUNTA($B:$B))` lebih disukai untuk workbook besar karena tidak selalu dihitung ulang.',
            answer: { type: 'formula', correctValue: ['=OFFSET($B$2;0;0;COUNTA($B:$B)-1;1)', '=$B$2:INDEX($B:$B;COUNTA($B:$B))'] },
        }
    ]
  },
  {
    id: 36,
    title: 'Scenario Manager Challenge',
    theme: 'Analisis Skenario Kompleks',
    table: { headers: ['Parameter', 'Nilai'], rows: [['Pendapatan', 10000], ['Biaya', 6000], ['Laba', 4000]] },
    icon: SunIcon,
    questions: [
        {
            challenge: 'Fitur What-If Analysis apa yang memungkinkan Anda untuk membuat, menyimpan, dan membandingkan beberapa set skenario nilai input?',
            hint: 'Fitur ini memungkinkan Anda menyimpan beberapa "skenario" untuk perbandingan nanti dan menghasilkan laporan ringkasan.',
            explanation: '**Scenario Manager** (Manajer Skenario) adalah alat What-If Analysis yang jauh lebih canggih daripada Goal Seek. Ini memungkinkan Anda untuk mendefinisikan dan menyimpan beberapa set nilai input (sel yang dapat diubah) sebagai "skenario" yang berbeda, masing-masing dengan namanya sendiri (misal: "Optimis", "Pesimis"). Anda kemudian dapat dengan mudah beralih di antara skenario-skenario ini untuk melihat dampaknya pada hasil formula Anda, dan yang terpenting, membuat laporan ringkasan yang membandingkan semua skenario secara berdampingan dalam satu tabel baru.',
            answer: { type: 'text', correctValue: ['Scenario Manager', 'Manajer Skenario'] },
        }
    ]
  },
    {
    id: 37,
    title: 'Pembuat Laporan Otomatis',
    theme: 'Teks Dinamis',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [['Barat', 'Laptop', 1200], ['Timur', 'Monitor', 300], ['Barat', 'Keyboard', 75], ['Barat', 'PC', 950]],
    },
    icon: AcademicCapIcon,
    questions: [
        {
            challenge: 'Gunakan MAXIFS dan XLOOKUP untuk membuat kalimat laporan dinamis: "Penjualan tertinggi di wilayah Barat adalah [nilai], diraih oleh produk [nama produk]".',
            hint: 'Anda perlu MAXIFS untuk nilai tertinggi, XLOOKUP untuk produk yang sesuai, dan CONCAT atau `&` untuk menggabungkannya.',
            explanation: 'Formula ini adalah contoh hebat menggabungkan beberapa fungsi modern untuk membuat laporan dinamis yang canggih. Mari kita pecah formula `=CONCAT("...", MAXIFS(...), ..., XLOOKUP(...))`:\n1. **`MAXIFS(C2:C5;A2:A5;"Barat")`**: Fungsi ini menemukan nilai penjualan tertinggi (`1200`) tetapi **hanya** untuk baris di mana wilayahnya adalah "Barat".\n2. **`XLOOKUP(MAXIFS(...);C2:C5;B2:B5)`**: Fungsi XLOOKUP kemudian mengambil hasil dari MAXIFS (yaitu `1200`), mencarinya di kolom penjualan (`C2:C5`), dan mengembalikan nama produk yang sesuai dari kolom produk (`B2:B5`), yaitu "Laptop".\n3. Terakhir, `CONCAT` atau operator `&` menggabungkan semua potongan teks statis dan hasil-hasil formula yang dinamis menjadi satu kalimat laporan yang koheren dan otomatis.',
            answer: { type: 'formula', correctValue: ['=CONCAT("Penjualan tertinggi di wilayah Barat adalah ";MAXIFS(C2:C5;A2:A5;"Barat");", diraih oleh produk ";XLOOKUP(MAXIFS(C2:C5;A2:A5;"Barat");C2:C5;B2:B5))', '="Penjualan tertinggi di wilayah Barat adalah "&MAXIFS(C2:C5;A2:A5;"Barat")&", diraih oleh produk "&XLOOKUP(MAXIFS(C2:C5;A2:A5;"Barat");C2:C5;B2:B5)'] },
        }
    ]
  },
  {
    id: 38,
    title: 'Excel + AI Integration',
    theme: 'Analisis Otomatis',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [['Barat', 'Laptop', 1200], ['Timur', 'Monitor', 300], ['Selatan', 'Laptop', 800]],
    },
    icon: CpuChipIcon,
    questions: [
        {
            challenge: 'Fitur Excel berbasis AI di Microsoft 365 apa yang secara otomatis menganalisis data dan menyarankan PivotTable serta grafik?',
            hint: 'Fitur ini biasanya ditemukan di tab "Home" dan sebelumnya dikenal sebagai "Ideas".',
            explanation: 'Fitur **Analyze Data** (sebelumnya dikenal sebagai *Ideas*) di Microsoft 365 adalah contoh integrasi kecerdasan buatan (AI) ke dalam Excel. Dengan satu klik, Excel akan memeriksa set data Anda, secara otomatis mendeteksi pola, tren, outlier, dan korelasi, lalu menyarankan visualisasi data seperti grafik dan PivotTable yang paling relevan untuk memberikan wawasan cepat. Ini sangat mempercepat proses analisis data eksplorasi awal, karena Anda tidak perlu membuat setiap grafik dari nol.',
            answer: { type: 'text', correctValue: ['Analyze Data', 'Analisis Data', 'Ideas'] },
        }
    ]
  },
    {
    id: 39,
    title: 'Mini Quest Macro & VBA',
    theme: 'Otomatisasi',
    table: { headers: ['Tugas VBA'], rows: [['Tampilkan pesan pop-up']] },
    icon: CodeBracketSquareIcon,
    questions: [
        {
            challenge: 'Dalam editor VBA, tulis satu baris kode untuk menampilkan kotak pesan (pop-up) bertuliskan "Halo Dunia".',
            hint: 'Gunakan objek `MsgBox` diikuti dengan teks yang ingin Anda tampilkan dalam tanda kutip.',
            explanation: '`MsgBox "Halo Dunia"` adalah salah satu perintah paling dasar dan umum dalam VBA (Visual Basic for Applications), bahasa pemrograman di balik makro Excel. Perintah `MsgBox` digunakan untuk menampilkan kotak pesan (pop-up) sederhana kepada pengguna. Teks yang ingin Anda tampilkan ditulis di antara tanda kutip ganda. Ini adalah cara yang sangat umum digunakan untuk memberi notifikasi, menampilkan hasil cepat, atau melakukan debug saat sebuah makro sedang dijalankan.',
            answer: { type: 'formula', correctValue: ['MsgBox "Halo Dunia"', 'MsgBox("Halo Dunia")'] },
        }
    ]
  },
  {
    id: 40,
    title: 'Dashboard Final Master',
    theme: 'Metrik KPI',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [['Barat', 'Laptop', 1200], ['Timur', 'Monitor', 800], ['Barat', 'Keyboard', 200], ['Selatan', 'Laptop', 800]],
    },
    icon: TrophyIcon,
    questions: [
        {
            challenge: 'Gunakan SUMIF dan SUM untuk menghitung KPI persentase penjualan "Laptop" dari total penjualan semua produk.',
            hint: 'Gunakan SUMIF untuk menghitung total penjualan Laptop, lalu bagi dengan SUM dari seluruh kolom penjualan.',
            explanation: 'KPI (Key Performance Indicator) adalah jantung dari setiap dashboard yang baik. Formula `=SUMIF(B2:B5;"Laptop";C2:C5)/SUM(C2:C5)` menghitung metrik yang sangat berarti ini dalam dua langkah:\n1. **Pembilang (Numerator):** `SUMIF(B2:B5;"Laptop";C2:C5)` menjumlahkan semua penjualan yang produknya adalah "Laptop". Ini adalah "bagian" yang ingin kita ukur.\n2. **Penyebut (Denominator):** `SUM(C2:C5)` menjumlahkan *semua* penjualan tanpa terkecuali. Ini adalah "keseluruhan".\nPembagian antara keduanya (`bagian / keseluruhan`) memberikan rasio atau persentase kontribusi penjualan Laptop terhadap total penjualan.',
            answer: { type: 'formula', correctValue: ['=SUMIF(B2:B5;"Laptop";C2:C5)/SUM(C2:C5)', '=SUMIF(B:B;"Laptop";C:C)/SUM(C:C)'] },
        }
    ]
  },
  // Part 5: Grandmaster
    {
    id: 41,
    title: 'FILTER & TEXTJOIN',
    theme: 'Teks Array Dinamis',
    table: {
      headers: ['Wilayah', 'Produk'],
      rows: [['Utara', 'Apel'], ['Selatan', 'Jeruk'], ['Utara', 'Mangga'], ['Barat', 'Pisang']],
    },
    icon: CubeTransparentIcon,
    questions: [
      {
        challenge: 'Gunakan FILTER dan TEXTJOIN untuk membuat daftar semua produk dari wilayah "Utara" sebagai satu teks yang dipisahkan koma.',
        hint: 'Gunakan FILTER untuk mendapatkan daftar produk, lalu bungkus hasilnya dengan TEXTJOIN untuk menggabungkannya menjadi satu string.',
        explanation: 'Kombinasi **FILTER** dan **TEXTJOIN** sangat kuat untuk membuat ringkasan teks dinamis. Formula `=TEXTJOIN(", ";TRUE;FILTER(B2:B5;A2:A5="Utara"))` bekerja dari dalam ke luar:\n1. `FILTER(B2:B5, A2:A5="Utara")` berjalan pertama. Ia menyaring kolom Produk dan menghasilkan array dinamis di memori yang berisi `{"Apel";"Mangga"}`.\n2. `TEXTJOIN` kemudian mengambil array tersebut. \n    - Argumen pertama, `", "`, adalah pemisah yang akan diletakkan di antara setiap item.\n    - Argumen kedua, `TRUE`, memberitahu fungsi untuk mengabaikan sel kosong jika ada.\n    - Argumen ketiga adalah array hasil dari `FILTER` yang akan digabungkan.\nHasil akhirnya adalah satu string teks yang rapi: "Apel, Mangga".',
        answer: { type: 'formula', correctValue: '=TEXTJOIN(", ";TRUE;FILTER(B2:B5;A2:A5="Utara"))' },
      },
    ],
  },
  {
    id: 42,
    title: 'Magic with MAP & LAMBDA',
    theme: 'Kalkulasi Array',
    table: {
      headers: ['Produk', 'Harga Dasar'],
      rows: [['A', 1000], ['B', 2000], ['C', 1500]],
    },
    icon: BeakerIcon,
    questions: [
      {
        challenge: 'Gunakan MAP dan LAMBDA untuk membuat array harga baru setelah ditambah PPN 11% untuk setiap item di B2:B4.',
        hint: 'MAP menerapkan fungsi LAMBDA ke setiap elemen dalam array. Formatnya: `MAP(array, LAMBDA(parameter, kalkulasi))`',
        explanation: 'Fungsi **MAP** sangat efisien untuk menerapkan sebuah kalkulasi pada setiap elemen dalam sebuah array tanpa perlu melakukan "drag-and-drop" formula. Formula `=MAP(B2:B4; LAMBDA(harga; harga*1.11))` bekerja seperti ini:\n1. `MAP` mengambil array input, yaitu `B2:B4`.\n2. `LAMBDA(harga; ...)` mendefinisikan sebuah fungsi mini yang bisa digunakan ulang. `harga` adalah nama parameter sementara yang akan mewakili setiap elemen dari array input saat diiterasi (pertama 1000, lalu 2000, dst.).\n3. `harga*1.11` adalah kalkulasi yang diterapkan pada setiap nilai `harga` tersebut.\nMAP akan menghasilkan array baru yang tumpah (spill) ke bawah, berisi hasil kalkulasi untuk setiap item.',
        answer: { type: 'formula', correctValue: ['=MAP(B2:B4;LAMBDA(harga;harga*1.11))', '=MAP(B2:B4;LAMBDA(x;x*1.11))', '=MAP(B2:B4;LAMBDA(p;p+p*0.11))'] },
      },
    ],
  },
    {
    id: 43,
    title: 'SORT & UNIQUE Alliance',
    theme: 'Daftar Unik Terurut',
    table: {
      headers: ['Wilayah', 'Penjualan'],
      rows: [['Utara', 500], ['Selatan', 300], ['Barat', 400], ['Utara', 200], ['Selatan', 100]],
    },
    icon: QueueListIcon,
    questions: [
      {
        challenge: 'Gunakan SORT dan UNIQUE untuk membuat daftar wilayah yang unik dan terurut secara alfabetis dari kolom A.',
        hint: 'Bungkus fungsi UNIQUE dengan fungsi SORT. `SORT(UNIQUE(range))`',
        explanation: 'Menggabungkan **UNIQUE** dan **SORT** adalah cara standar dan sangat efisien untuk mendapatkan daftar item yang bersih dan terurut dari sebuah kolom yang berisi duplikat. Formula `=SORT(UNIQUE(A2:A6))` bekerja dalam dua tahap dari dalam ke luar:\n1. `UNIQUE(A2:A6)` terlebih dahulu memproses rentang dan mengekstrak semua nilai unik. Ia akan menghasilkan array `{"Utara";"Selatan";"Barat"}` (urutannya sesuai kemunculan pertama kali).\n2. `SORT(...)` kemudian mengambil array hasil dari UNIQUE tersebut dan mengurutkannya secara alfabetis (default A-Z), menghasilkan array akhir yang tumpah ke bawah: `{"Barat";"Selatan";"Utara"}`.',
        answer: { type: 'formula', correctValue: '=SORT(UNIQUE(A2:A6))' },
      },
    ],
  },
  {
    id: 44,
    title: 'Power Query Unpivot',
    theme: 'Transformasi Bentuk Data',
    table: {
      headers: ['Produk', 'Jan', 'Feb', 'Mar'],
      rows: [['Apel', 100, 120, 130], ['Jeruk', 80, 85, 90]],
    },
    icon: BoltIcon,
    questions: [
      {
        challenge: 'Di Power Query, transformasi apa yang digunakan untuk mengubah data format "lebar" (kolom Jan, Feb, Mar) menjadi format "tinggi"?',
        hint: 'Ini adalah kebalikan dari "Pivot". Anda mengubah kolom menjadi baris.',
        explanation: '**Unpivot Columns** adalah salah satu transformasi yang paling fundamental dan kuat di Power Query. Ini digunakan untuk menormalkan data dari format **lebar** menjadi format **tinggi**, yang jauh lebih baik untuk analisis dan pembuatan PivotTable. \nCara kerjanya: Anda memilih kolom yang ingin di-"unpivot" (dalam kasus ini Jan, Feb, dan Mar). Power Query kemudian mengubahnya menjadi dua kolom baru: satu untuk menyimpan nama header kolom asli (biasanya bernama "Attribute", yang bisa Anda ganti namanya menjadi "Bulan") dan satu lagi untuk menyimpan nilainya ("Value", yang bisa Anda ganti namanya menjadi "Penjualan").',
        answer: { type: 'text', correctValue: ['Unpivot Columns', 'Unpivot'] },
      },
    ],
  },
    {
    id: 45,
    title: 'Weighted Average',
    theme: 'Statistik Lanjutan',
    table: {
      headers: ['Tugas', 'Nilai', 'Bobot (%)'],
      rows: [['UTS', 80, 40], ['UAS', 90, 50], ['Kuis', 85, 10]],
    },
    icon: CalculatorIcon,
    questions: [
      {
        challenge: 'Gunakan SUMPRODUCT untuk menghitung nilai akhir mahasiswa sebagai rata-rata tertimbang (kolom B) berdasarkan bobot di kolom C.',
        hint: 'Gunakan SUMPRODUCT untuk mengalikan nilai dengan bobotnya masing-masing dan menjumlahkannya. Lalu, bagi hasilnya dengan total bobot (SUM dari kolom C).',
        explanation: '**SUMPRODUCT** sangat ideal untuk menghitung rata-rata tertimbang dengan cepat. Formula `=SUMPRODUCT(B2:B4;C2:C4)/SUM(C2:C4)` bekerja seperti ini:\n1. `SUMPRODUCT(B2:B4;C2:C4)` pertama-tama mengalikan setiap nilai dengan bobotnya yang sesuai, lalu menjumlahkan semua hasilnya. Perhitungannya adalah: `(80*40) + (90*50) + (85*10) = 3200 + 4500 + 850 = 8550`.\n2. `SUM(C2:C4)` menghitung total bobot, yaitu `40+50+10 = 100`.\n3. Hasil dari SUMPRODUCT kemudian dibagi dengan total bobot untuk mendapatkan rata-rata tertimbang yang benar: `8550 / 100 = 85.5`. Jika bobot sudah dalam format desimal (misal 0.4, 0.5, 0.1), Anda tidak perlu membaginya lagi dengan `SUM(C2:C4)`.',
        answer: { type: 'formula', correctValue: ['=SUMPRODUCT(B2:B4;C2:C4)/SUM(C2:C4)', '=SUMPRODUCT(B2:B4;C2:C4/100)'] },
      },
    ],
  },
  {
    id: 46,
    title: 'XLOOKUP Wildcard',
    theme: 'Pencarian Parsial',
    table: {
      headers: ['ID Karyawan', 'Nama Lengkap'],
      rows: [['EMP01', 'Budi Hartono'], ['EMP02', 'Ani Santoso Wijaya'], ['EMP03', 'Cici Lestari'], ['EMP04', 'Dedi Santosa']],
    },
    icon: MagnifyingGlassIcon,
    questions: [
      {
        challenge: 'Gunakan XLOOKUP dengan mode pencocokan wildcard untuk menemukan ID Karyawan untuk nama yang mengandung kata "Santoso".',
        hint: 'Gunakan wildcard `*` di sekitar teks pencarian (misal: `"*Santoso*"`) dan atur argumen `match_mode` XLOOKUP ke 2 untuk mengaktifkan pencarian wildcard.',
        explanation: '**XLOOKUP** mendukung pencocokan *wildcard* (karakter pengganti), sebuah fitur yang tidak dimiliki VLOOKUP secara default. Formula `=XLOOKUP("*Santoso*";B2:B5;A2:A5;;2)` bekerja karena:\n* `"*Santoso*"`: Ini adalah nilai yang dicari. Tanda bintang `*` adalah wildcard yang berarti "nol atau lebih karakter apa pun". Jadi `"*Santoso*"` akan cocok dengan teks apa pun yang mengandung "Santoso" di dalamnya, seperti "Ani Santoso Wijaya".\n* Argumen ke-4, `if_not_found`, sengaja dikosongkan.\n* Argumen ke-5, `match_mode`, diatur ke `2`, yang secara eksplisit memberitahu XLOOKUP untuk mengaktifkan mode pencarian wildcard. Mode defaultnya adalah 0 (pencocokan persis).',
        answer: { type: 'formula', correctValue: ['=XLOOKUP("*Santoso*";B2:B5;A2:A5;;2)', '=XLOOKUP("*Santoso*";B2:B5;A2:A5;"";2)'] },
      },
    ],
  },
    {
    id: 47,
    title: 'DAX Time Intelligence',
    theme: 'Analisis Data Model',
    table: {
      headers: ['Tabel Fakta: Sales', 'Tabel Dimensi: Calendar'],
      rows: [['[Date], [SalesAmount]', '[Date], [Year], [Month]']],
    },
    icon: RectangleGroupIcon,
    questions: [
      {
        challenge: 'Dalam Data Model, fungsi DAX Time Intelligence apa yang digunakan untuk membuat Measure Year-to-Date (YTD)?',
        hint: 'Fungsinya sering disingkat YTD dan merupakan bagian dari keluarga fungsi Time Intelligence.',
        explanation: 'Fungsi *Time Intelligence* adalah permata dari DAX (Data Analysis Expressions), bahasa formula untuk Power Pivot dan Power BI. Fungsi **TOTALYTD** sangat penting untuk analisis bisnis. Formula untuk *Measure* (ukuran) yang Anda buat akan terlihat seperti ini: `Total Sales YTD := TOTALYTD(SUM(Sales[SalesAmount]), \'Calendar\'[Date])`.\nFungsi ini secara otomatis menghitung `SUM` dari kolom `SalesAmount` untuk rentang tanggal dari awal tahun fiskal (sesuai konteks filter di PivotTable) hingga tanggal terakhir dalam konteks filter tersebut. Ini memerlukan Tabel Kalender yang terhubung dan ditandai sebagai tabel tanggal dalam Data Model.',
        answer: { type: 'text', correctValue: ['TOTALYTD', 'DATESYTD'] },
      },
    ],
  },
  {
    id: 48,
    title: 'TEXTSPLIT & SORT',
    theme: 'Manipulasi Teks Lanjutan',
    table: { headers: ['Daftar Nama'], rows: [['Cici,Adi,Eka,Budi,Dedi']] },
    icon: ScissorsIcon,
    questions: [
      {
        challenge: 'Gunakan kombinasi INDEX, SORT, dan TEXTSPLIT untuk mengekstrak nama kedua secara alfabetis dari daftar nama di sel A2.',
        hint: 'Kombinasikan tiga fungsi: TEXTSPLIT untuk memisahkan string menjadi array, SORT untuk mengurutkan array tersebut, dan INDEX untuk mengambil elemen tertentu dari array hasil.',
        explanation: 'Ini adalah contoh bagus dari kekuatan fungsi array dinamis yang digabungkan untuk melakukan beberapa langkah dalam satu formula. Formula `=INDEX(SORT(TEXTSPLIT(A2;","));2)` bekerja dari dalam ke luar:\n1. **TEXTSPLIT(A2,","):** Pertama, ia memisahkan string di A2 menggunakan koma sebagai pemisah (`col_delimiter`). Ini menghasilkan array vertikal di memori: `{"Cici";"Adi";"Eka";"Budi";"Dedi"}`.\n2. **SORT(...):** Selanjutnya, fungsi `SORT` mengambil array hasil dari TEXTSPLIT dan mengurutkannya secara alfabetis dari A ke Z, menghasilkan array baru: `{"Adi";"Budi";"Cici";"Dedi";"Eka"}`.\n3. **INDEX(..., 2):** Terakhir, fungsi `INDEX` mengambil elemen ke-**2** dari array yang sudah terurut tersebut, yaitu "Budi".',
        answer: { type: 'formula', correctValue: '=INDEX(SORT(TEXTSPLIT(A2;","));2)' },
      },
    ],
  },
    {
    id: 49,
    title: 'Financial Modeling: NPV',
    theme: 'Analisis Investasi',
    table: {
      headers: ['Parameter', 'Nilai', 'Arus Kas Tahunan'],
      rows: [['Investasi Awal', -5000, 2000], ['Tingkat Diskonto', 0.1, 2500], ['', '', 3000], ['', '', 1000]],
    },
    icon: ChartBarIcon,
    questions: [
      {
        challenge: 'Gunakan fungsi NPV dan penambahan manual untuk menghitung Net Present Value dari proyek, dengan investasi awal di B1 dan arus kas di C2:C5.',
        hint: 'Fungsi NPV di Excel hanya mendiskontokan arus kas dari periode 1 ke depan. Investasi awal (periode 0) harus ditambahkan secara terpisah di luar fungsi NPV.',
        explanation: 'Fungsi **NPV** di Excel memiliki kekhasan penting yang sering menjebak pengguna baru. Ia tidak menghitung *Net* Present Value, melainkan Present Value dari serangkaian arus kas, dengan asumsi arus kas pertama terjadi pada **akhir periode 1**. Oleh karena itu, investasi awal (yang terjadi di periode 0) tidak boleh dimasukkan ke dalam fungsi NPV. Formula yang benar: `=NPV(B2;C2:C5)+B1`.\n1. `NPV(B2;C2:C5)` mendiskontokan semua arus kas masa depan (dari tahun 1 sampai 4) ke nilai sekarang menggunakan tingkat diskonto di B2.\n2. `+B1` kemudian menambahkan investasi awal (yang sudah dalam nilai sekarang dan biasanya berupa angka negatif) ke hasil tersebut untuk mendapatkan NPV yang sesungguhnya.',
        answer: { type: 'formula', correctValue: ['=NPV(B2;C2:C5)+B1', '=B1+NPV(B2;C2:C5)'] },
      },
    ],
  },
  {
    id: 50,
    title: 'Grandmaster Report',
    theme: 'Dashboard dalam Satu Sel',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [['Barat', 'Laptop', 1200], ['Timur', 'Monitor', 800], ['Barat', 'Laptop', 1300], ['Selatan', 'Laptop', 800]],
    },
    icon: TrophyIcon,
    questions: [
      {
        challenge: 'Gunakan LET, SUMIF, dan COUNTIF untuk membuat laporan ringkas dalam satu sel: "Laptop - Total: [Total Penjualan], Transaksi: [Jumlah Transaksi]".',
        hint: 'Gunakan LET untuk mendefinisikan variabel, SUMIF dan COUNTIF untuk kalkulasi, dan CONCAT atau operator `&` untuk menggabungkan semuanya menjadi satu teks.',
        explanation: 'Fungsi **LET** memungkinkan Anda membuat formula kompleks yang sangat terbaca dan efisien, karena Anda bisa mendefinisikan perhitungan sekali dan menggunakannya kembali. Formula ini bekerja dengan:\n1. `LET(produk;"Laptop";...`: Mendefinisikan variabel `produk`.\n2. `total;SUMIF(B2:B5;produk;C2:C5);...`: Mendefinisikan `total` dengan menghitung `SUMIF` untuk produk yang sudah didefinisikan.\n3. `jumlah;COUNTIF(B2:B5;produk);...`: Mendefinisikan `jumlah` dengan menghitung `COUNTIF` untuk produk yang sama.\n4. Terakhir, bagian kalkulasi `CONCAT(...)` menggabungkan semua variabel dan teks statis menjadi satu string laporan yang dinamis. Ini lebih bersih dan efisien daripada menulis `SUMIF` dan `COUNTIF` dua kali dalam formula gabungan yang panjang.',
        answer: {
          type: 'formula',
          correctValue: [
            '=LET(produk;"Laptop";total;SUMIF(B2:B5;produk;C2:C5);jumlah;COUNTIF(B2:B5;produk);CONCAT(produk;" - Total: ";total;", Transaksi: ";jumlah))',
            '="Laptop - Total: "&SUMIF(B2:B5;"Laptop";C2:C5)&", Transaksi: "&COUNTIF(B2:B5;"Laptop")'
          ],
        },
      },
    ],
  },
  // Part 6: Data Wrangler
  {
    id: 51,
    title: 'VSTACK Challenge',
    theme: 'Menggabungkan Data',
    table: {
      headers: ['Wilayah A', 'Penjualan', '', 'Wilayah B', 'Penjualan'],
      rows: [['Apel', 10, '', 'Durian', 30], ['Jeruk', 15, '', 'Mangga', 25]],
    },
    icon: Square3Stack3DIcon,
    questions: [
      {
        challenge: 'Gunakan VSTACK untuk menggabungkan data dari Wilayah A (A2:B3) dan Wilayah B (D2:E3) menjadi satu daftar vertikal.',
        hint: 'Fungsi VSTACK menumpuk beberapa array atau rentang secara vertikal. Cukup berikan rentang yang ingin digabung sebagai argumen: `VSTACK(array1, array2, ...)`',
        explanation: 'Fungsi **VSTACK** adalah bagian dari Dynamic Arrays yang sangat berguna untuk menggabungkan beberapa set data tanpa perlu copy-paste. Formula `=VSTACK(A2:B3;D2:E3)` akan mengambil rentang pertama (`A2:B3`) dan menempatkannya di atas, lalu secara otomatis menumpuk rentang kedua (`D2:E3`) tepat di bawahnya. Hasilnya adalah satu array tunggal yang "tumpah" ke bawah.',
        answer: { type: 'formula', correctValue: '=VSTACK(A2:B3;D2:E3)' },
      },
    ],
  },
  {
    id: 52,
    title: 'HSTACK Gauntlet',
    theme: 'Menggabungkan Data',
    table: {
      headers: ['Nama Depan', '', 'Nama Belakang'],
      rows: [['Budi', '', 'Santoso'], ['Ani', '', 'Wijaya']],
    },
    icon: Square3Stack3DIcon,
    questions: [
      {
        challenge: 'Gunakan HSTACK untuk menggabungkan kolom Nama Depan (A2:A3) dan Nama Belakang (C2:C3) secara horizontal.',
        hint: 'HSTACK bekerja seperti VSTACK tetapi menumpuk array secara horizontal (samping-menyamping).',
        explanation: 'Fungsi **HSTACK** adalah pasangan horizontal dari VSTACK. Ia memungkinkan Anda untuk menempatkan array atau rentang data berdampingan. Formula `=HSTACK(A2:A3;C2:C3)` mengambil semua data dari `A2:A3` dan menempatkannya di kolom pertama, lalu mengambil data dari `C2:C3` dan menempatkannya di kolom kedua, tepat di sebelahnya.',
        answer: { type: 'formula', correctValue: '=HSTACK(A2:A3;C2:C3)' },
      },
    ],
  },
  {
    id: 53,
    title: 'TAKE & DROP',
    theme: 'Ekstraksi Array',
    table: {
      headers: ['Tanggal', 'Produk', 'Penjualan'],
      rows: [['01-Jan', 'Apel', 100], ['02-Jan', 'Jeruk', 120], ['03-Jan', 'Mangga', 150], ['04-Jan', 'Pisang', 90]],
    },
    icon: ScissorsIcon,
    questions: [
      {
        challenge: 'Gunakan TAKE untuk mengambil hanya 2 baris pertama dari tabel (A2:C5).',
        hint: 'Fungsi TAKE mengambil sejumlah baris atau kolom tertentu dari awal atau akhir sebuah array. Untuk 2 baris pertama, gunakan `TAKE(array, 2)`.',
        explanation: 'Fungsi **TAKE** sangat berguna untuk mengekstrak sebagian data dari awal sebuah array. Formula `=TAKE(A2:C5;2)` memerintahkan Excel untuk mengambil `array` `A2:C5` dan hanya mengembalikan `2` baris pertama. Jika Anda ingin mengambil dari akhir, Anda bisa menggunakan angka negatif, misal `TAKE(A2:C5;-2)` akan mengambil 2 baris terakhir.',
        answer: { type: 'formula', correctValue: '=TAKE(A2:C5;2)' },
      },
      {
        challenge: 'Gunakan DROP untuk menghapus baris pertama dari tabel (A1:C5) dan mengambil semua data sisanya.',
        hint: 'DROP adalah kebalikan dari TAKE; ia menghapus sejumlah baris atau kolom. Untuk menghapus 1 baris pertama, gunakan `DROP(array, 1)`.',
        explanation: 'Fungsi **DROP** adalah pelengkap dari TAKE. Ia menghapus sejumlah baris atau kolom dari awal array dan mengembalikan sisanya. Formula `=DROP(A1:C5;1)` akan mengambil seluruh rentang termasuk header (`A1:C5`), menghapus (`drop`) 1 baris pertama, dan mengembalikan semua data di bawahnya. Ini cara dinamis yang hebat untuk bekerja dengan data tanpa header.',
        answer: { type: 'formula', correctValue: '=DROP(A1:C5;1)' },
      },
    ],
  },
  {
    id: 54,
    title: 'CHOOSECOLS Quest',
    theme: 'Memilih Kolom',
    table: {
      headers: ['ID', 'Produk', 'Jumlah', 'Harga'],
      rows: [['P01', 'Apel', 10, 1500], ['P02', 'Jeruk', 20, 1200]],
    },
    icon: FunnelIcon,
    questions: [
      {
        challenge: 'Gunakan CHOOSECOLS untuk membuat tabel baru yang hanya berisi kolom Produk (kolom 2) dan Harga (kolom 4) dari tabel asli.',
        hint: 'Fungsi CHOOSECOLS memungkinkan Anda memilih kolom mana yang akan diambil dari sebuah array. Format: `CHOOSECOLS(array, col_num1, col_num2, ...)`',
        explanation: 'Fungsi **CHOOSECOLS** memberikan Anda kontrol presisi untuk menyusun ulang atau memilih kolom tertentu dari sebuah array. Formula `=CHOOSECOLS(A1:D3;2;4)` akan mengambil `array` `A1:D3` dan hanya mengembalikan kolom ke-2 (Produk) dan kolom ke-4 (Harga) dalam urutan tersebut, menciptakan tabel baru secara dinamis.',
        answer: { type: 'formula', correctValue: '=CHOOSECOLS(A1:D3;2;4)' },
      },
    ],
  },
  {
    id: 55,
    title: 'Text to Columns (Formula)',
    theme: 'Pemisahan Teks',
    table: {
      headers: ['Data Gabungan'],
      rows: [['ID01-Laptop-1200'], ['ID02-Monitor-300']],
    },
    icon: ScissorsIcon,
    questions: [
      {
        challenge: 'Gunakan TEXTSPLIT untuk memisahkan data di A2 menjadi tiga kolom terpisah, menggunakan "-" sebagai pemisah.',
        hint: 'Fungsi TEXTSPLIT dapat memisahkan teks menjadi beberapa kolom. Gunakan argumen `col_delimiter`: `TEXTSPLIT(text, col_delimiter)`.',
        explanation: 'Fungsi **TEXTSPLIT** adalah versi formula dari fitur "Text to Columns". Formula `=TEXTSPLIT(A2;"-")` akan mengambil teks dari A2, mencari pemisah `-`, dan secara otomatis menempatkan setiap bagian ke dalam kolomnya sendiri. Ini jauh lebih fleksibel daripada fitur lama karena hasilnya akan diperbarui secara otomatis jika data di A2 berubah.',
        answer: { type: 'formula', correctValue: '=TEXTSPLIT(A2;"-")' },
      },
    ],
  },
  {
    id: 56,
    title: 'Array to Text',
    theme: 'Penggabungan Array',
    table: {
      headers: ['Daftar Produk'],
      rows: [['Apel'], ['Jeruk'], ['Mangga']],
    },
    icon: ChatBubbleBottomCenterTextIcon,
    questions: [
      {
        challenge: 'Gunakan TEXTJOIN untuk menggabungkan semua produk dari rentang A2:A4 menjadi satu teks yang dipisahkan oleh " | ".',
        hint: 'Fungsi TEXTJOIN menggabungkan array teks. Format: `TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)`',
        explanation: 'Fungsi **TEXTJOIN** adalah kebalikan dari TEXTSPLIT dan jauh lebih unggul dari CONCAT. Formula `=TEXTJOIN(" | ";TRUE;A2:A4)` bekerja seperti ini: \n- ` " | " `: Ini adalah `delimiter` (pemisah) yang akan diletakkan di antara setiap item. \n- `TRUE`: Argumen ini memberitahu fungsi untuk mengabaikan sel kosong jika ada di dalam rentang. \n- `A2:A4`: Ini adalah rentang yang berisi teks yang akan digabungkan.',
        answer: { type: 'formula', correctValue: '=TEXTJOIN(" | ";TRUE;A2:A4)' },
      },
    ],
  },
  {
    id: 57,
    title: 'WRAPROWS Challenge',
    theme: 'Mengubah Bentuk Array',
    table: {
      headers: ['Data'],
      rows: [['A'], ['B'], ['C'], ['D'], ['E'], ['F']],
    },
    icon: RectangleGroupIcon,
    questions: [
      {
        challenge: 'Gunakan WRAPROWS untuk mengubah daftar vertikal di A2:A7 menjadi tabel dengan 3 item per baris.',
        hint: 'Fungsi WRAPROWS "membungkus" sebuah array menjadi baris dengan panjang tertentu. Format: `WRAPROWS(vector, wrap_count)`.',
        explanation: '**WRAPROWS** sangat berguna untuk menata ulang array satu dimensi menjadi tabel dua dimensi. Formula `=WRAPROWS(A2:A7;3)` mengambil vektor (array satu kolom) `A2:A7` dan `wrap_count` sebesar `3` memberitahu Excel untuk memulai baris baru setiap 3 item. Hasilnya adalah tabel 2 baris dan 3 kolom.',
        answer: { type: 'formula', correctValue: '=WRAPROWS(A2:A7;3)' },
      },
    ],
  },
  {
    id: 58,
    title: 'TOCOL & TOROW',
    theme: 'Meratakan Array',
    table: {
      headers: ['Q1', 'Q2'],
      rows: [[10, 20], [30, 40]],
    },
    icon: FunnelIcon,
    questions: [
      {
        challenge: 'Gunakan TOCOL untuk meratakan tabel 2x2 di A2:B3 menjadi satu daftar kolom tunggal.',
        hint: 'Fungsi TOCOL mengubah array menjadi satu kolom. Cukup berikan array sebagai argumen: `TOCOL(array)`.',
        explanation: 'Fungsi **TOCOL** adalah kebalikan dari WRAPROWS; ia "meratakan" sebuah array dua dimensi menjadi satu vektor kolom tunggal. `=TOCOL(A2:B3)` akan membaca tabel baris demi baris secara default dan menghasilkan satu kolom berisi {10;20;30;40}. Anda dapat menambahkan argumen opsional untuk mengubah cara pemindaiannya (misalnya, kolom demi kolom).',
        answer: { type: 'formula', correctValue: '=TOCOL(A2:B3)' },
      },
    ],
  },
  {
    id: 59,
    title: 'Dynamic Sort & Filter',
    theme: 'Array Bertingkat',
    table: {
      headers: ['Produk', 'Kategori', 'Stok'],
      rows: [['Apel', 'Buah', 50], ['Bayam', 'Sayur', 20], ['Mangga', 'Buah', 30], ['Wortel', 'Sayur', 40]],
    },
    icon: QueueListIcon,
    questions: [
      {
        challenge: 'Gunakan SORT dan FILTER untuk membuat daftar produk kategori "Buah", yang diurutkan berdasarkan Stok secara menurun.',
        hint: 'Bungkus fungsi FILTER di dalam fungsi SORT. `SORT(FILTER(...), sort_index, sort_order)`. `sort_order` -1 berarti menurun.',
        explanation: 'Ini adalah contoh bagus dari menggabungkan beberapa fungsi array dinamis. Formula `=SORT(FILTER(A2:C5;B2:B5="Buah");3;-1)` bekerja dari dalam ke luar:\n1. `FILTER(A2:C5;B2:B5="Buah")` pertama-tama membuat tabel virtual yang hanya berisi produk "Buah".\n2. `SORT(...)` kemudian mengambil tabel hasil filter tersebut. Argumen kedua, `3`, memberitahu SORT untuk mengurutkan berdasarkan kolom ke-3 (Stok) dari hasil filter. Argumen ketiga, `-1`, menentukan urutan menurun.',
        answer: { type: 'formula', correctValue: '=SORT(FILTER(A2:C5;B2:B5="Buah");3;-1)' },
      },
    ],
  },
  {
    id: 60,
    title: 'Data Wrangler Finale',
    theme: 'Laporan Teks Dinamis',
    table: {
      headers: ['Agen', 'Wilayah'],
      rows: [['Ani', 'Utara'], ['Budi', 'Selatan'], ['Cici', 'Utara'], ['Dedi', 'Timur']],
    },
    icon: StarIcon,
    questions: [
      {
        challenge: 'Gunakan FILTER dan TEXTJOIN untuk membuat laporan teks yang berisi semua nama agen di wilayah "Utara", dipisahkan dengan koma.',
        hint: 'Kombinasikan FILTER untuk mendapatkan nama-nama agen, lalu TEXTJOIN untuk menggabungkannya menjadi satu teks.',
        explanation: 'Ini adalah kombinasi sempurna untuk membuat ringkasan teks dari data yang difilter. Formula `=TEXTJOIN(", ";TRUE;FILTER(A2:A5;B2:B5="Utara"))` bekerja dengan sangat efisien:\n1. `FILTER(A2:A5;B2:B5="Utara")` pertama-tama menyaring kolom Agen dan menghasilkan array `{"Ani"; "Cici"}`.\n2. `TEXTJOIN` kemudian mengambil array ini dan menggabungkannya menjadi satu string teks, "Ani, Cici", menggunakan pemisah yang telah ditentukan.',
        answer: { type: 'formula', correctValue: '=TEXTJOIN(", ";TRUE;FILTER(A2:A5;B2:B5="Utara"))' },
      },
    ],
  },
  // Part 7: Automation Apprentice
  {
    id: 61,
    title: 'VBA: Hello Variable',
    theme: 'Dasar-dasar VBA',
    table: {
      headers: ['Tugas VBA'],
      rows: [['Simpan nama ke variabel dan tampilkan']],
    },
    icon: CodeBracketSquareIcon,
    questions: [
      {
        challenge: 'Dalam VBA, deklarasikan variabel string bernama `namaPengguna`, isi dengan "Sobat Excel", lalu tampilkan dalam MsgBox.',
        hint: 'Gunakan `Dim namaPengguna As String` untuk deklarasi. Gunakan `namaPengguna = "..."` untuk mengisi nilai. Lalu `MsgBox namaPengguna`.',
        explanation: 'Ini adalah dasar dari pemrograman VBA. Anda harus mengetik kode ini di dalam sebuah `Sub` di editor VBA.\n`Dim namaPengguna As String` memberitahu VBA untuk menyiapkan sebuah "kotak" di memori bernama `namaPengguna` yang hanya bisa diisi teks (`String`).\n`namaPengguna = "Sobat Excel"` mengisi kotak tersebut dengan nilai.\n`MsgBox namaPengguna` menampilkan isi dari kotak tersebut.',
        answer: { type: 'formula', correctValue: 'Dim namaPengguna As String\nnamaPengguna = "Sobat Excel"\nMsgBox namaPengguna' },
      },
    ],
  },
  {
    id: 62,
    title: 'VBA: Cell Manipulation',
    theme: 'Interaksi dengan Sel',
    table: {
      headers: ['A', 'B'],
      rows: [['', '']],
    },
    icon: PlayIcon,
    questions: [
      {
        challenge: 'Tulis kode VBA untuk menempatkan teks "Otomatis!" ke dalam sel A1.',
        hint: 'Gunakan objek `Range`. `Range("A1").Value = "..."`',
        explanation: 'Mengontrol sel adalah inti dari otomatisasi Excel dengan VBA. `Range("A1")` merujuk ke objek sel A1 di worksheet yang aktif. Properti `.Value` dari objek tersebut memungkinkan Anda untuk membaca atau menulis nilai di dalamnya. Jadi, `Range("A1").Value = "Otomatis!"` secara langsung menulis teks tersebut ke dalam sel.',
        answer: { type: 'formula', correctValue: ['Range("A1").Value = "Otomatis!"', 'Cells(1, 1).Value = "Otomatis!"'] },
      },
    ],
  },
  {
    id: 63,
    title: 'VBA: Simple Loop',
    theme: 'Looping Dasar',
    table: {
      headers: ['Angka'],
      rows: [[''], [''], [''], [''], ['']],
    },
    icon: ArrowPathIcon,
    questions: [
      {
        challenge: 'Gunakan loop `For...Next` di VBA untuk mengisi sel A1 sampai A5 dengan angka 1 sampai 5.',
        hint: 'Gunakan `For i = 1 To 5`. Di dalam loop, gunakan `Cells(i, 1).Value = i`. Jangan lupa `Next i`.',
        explanation: 'Loop `For...Next` sangat penting untuk melakukan tugas berulang. Kode ini bekerja sebagai berikut:\n`Dim i As Integer` mendeklarasikan variabel `i` sebagai penghitung.\n`For i = 1 To 5` memulai loop. VBA akan menjalankan kode di dalamnya sebanyak 5 kali, dengan `i` bernilai 1, lalu 2, dst.\n`Cells(i, 1).Value = i` adalah inti loop. Saat `i` adalah 1, ia menulis 1 ke `Cells(1, 1)` (A1). Saat `i` adalah 2, ia menulis 2 ke `Cells(2, 1)` (A2), dan seterusnya.\n`Next i` memberitahu VBA untuk lanjut ke iterasi berikutnya.',
        answer: { type: 'formula', correctValue: 'Dim i As Integer\nFor i = 1 To 5\nCells(i, 1).Value = i\nNext i' },
      },
    ],
  },
  {
    id: 64,
    title: 'VBA: Simple IF',
    theme: 'Logika di VBA',
    table: {
      headers: ['Nilai', 'Status'],
      rows: [[75, '']],
    },
    icon: ShareIcon,
    questions: [
      {
        challenge: 'Tulis kode VBA yang membaca nilai di sel A2. Jika > 70, tulis "Lulus" di B2, jika tidak, tulis "Gagal".',
        hint: 'Gunakan `If Range("A2").Value > 70 Then ... Else ... End If`.',
        explanation: 'Logika `If...Then...Else` di VBA sama seperti di bahasa pemrograman lain. VBA akan membaca nilai dari A2. Jika kondisi `Range("A2").Value > 70` terpenuhi (TRUE), maka kode di blok `Then` akan dijalankan. Jika tidak (FALSE), maka kode di blok `Else` yang akan dijalankan. `End If` wajib ada untuk menutup blok kondisional.',
        answer: { type: 'formula', correctValue: 'If Range("A2").Value > 70 Then\nRange("B2").Value = "Lulus"\nElse\nRange("B2").Value = "Gagal"\nEnd If' },
      },
    ],
  },
  {
    id: 65,
    title: 'VBA: Custom Function',
    theme: 'Membuat Fungsi Sendiri',
    table: {
      headers: ['Harga', 'PPN (11%)'],
      rows: [[1000, '']],
    },
    icon: BeakerIcon,
    questions: [
      {
        challenge: 'Buat User Defined Function (UDF) di VBA bernama `HITUNG_PPN` yang menerima harga dan mengembalikan PPN 11%.',
        hint: 'Gunakan sintaks `Function NAMA_FUNGSI(argumen) ... End Function`. Di dalam fungsi, `NAMA_FUNGSI = kalkulasi`.',
        explanation: 'Membuat fungsi kustom (UDF) adalah cara yang sangat kuat untuk memperluas kemampuan formula Excel. Dengan menempatkan kode `Function HITUNG_PPN(harga As Double) As Double` di sebuah modul VBA, Anda membuat fungsi baru yang bisa digunakan di worksheet seperti fungsi bawaan lainnya. `harga As Double` mendefinisikan input, dan `As Double` di akhir mendefinisikan tipe output. Baris `HITUNG_PPN = harga * 0.11` adalah kalkulasi yang hasilnya akan dikembalikan oleh fungsi.',
        answer: { type: 'formula', correctValue: 'Function HITUNG_PPN(harga As Double) As Double\nHITUNG_PPN = harga * 0.11\nEnd Function' },
      },
    ],
  },
  {
    id: 66,
    title: 'VBA: Button Trigger',
    theme: 'Interaksi Pengguna',
    table: { headers: ['Tugas'], rows: [['Jalankan makro dari tombol']] },
    icon: PlayIcon,
    questions: [
      {
        challenge: 'Bagaimana cara menetapkan makro VBA bernama `TampilkanPesan` agar berjalan saat sebuah tombol (Shape) diklik?',
        hint: 'Klik kanan pada Shape/Tombol, lalu cari opsi yang terdengar seperti "Assign Macro".',
        explanation: 'Menghubungkan makro ke tombol membuat spreadsheet menjadi lebih interaktif dan mirip aplikasi. Langkahnya adalah: \n1. Sisipkan sebuah Shape (misal: Rectangle) atau Tombol dari menu Insert. \n2. Klik kanan pada objek tersebut. \n3. Pilih opsi **Assign Macro...** dari menu konteks. \n4. Pilih nama makro yang Anda inginkan (misal: `TampilkanPesan`) dari daftar yang muncul dan klik OK.',
        answer: { type: 'text', correctValue: ['Assign Macro', 'Menetapkan Makro'] },
      },
    ],
  },
  {
    id: 67,
    title: 'VBA: Worksheet Variable',
    theme: 'Bekerja dengan Sheet',
    table: { headers: ['Sheet1', 'Sheet2'], rows: [['', '']] },
    icon: RectangleGroupIcon,
    questions: [
      {
        challenge: 'Tulis kode VBA untuk menyalin nilai dari sel A1 di "Sheet1" ke sel B1 di "Sheet2".',
        hint: 'Gunakan objek `Worksheets`. Contoh: `Worksheets("NamaSheet").Range("A1").Value`.',
        explanation: 'Untuk bekerja antar-sheet, Anda harus secara eksplisit menentukan sheet mana yang Anda tuju. Kode `Worksheets("Sheet2").Range("B1").Value = Worksheets("Sheet1").Range("A1").Value` melakukan ini. Sisi kanan tanda sama dengan (`=`) membaca nilai dari A1 di Sheet1. Sisi kiri menulis nilai tersebut ke B1 di Sheet2. Ini mencegah kesalahan yang umum terjadi jika makro dijalankan saat sheet yang salah sedang aktif.',
        answer: { type: 'formula', correctValue: 'Worksheets("Sheet2").Range("B1").Value = Worksheets("Sheet1").Range("A1").Value' },
      },
    ],
  },
  {
    id: 68,
    title: 'VBA: Last Row',
    theme: 'Looping Dinamis',
    table: { headers: ['Data'], rows: [['A'], ['B'], ['C'], ['(bisa bertambah)']] },
    icon: ArrowPathIcon,
    questions: [
      {
        challenge: 'Tulis kode VBA untuk menemukan baris terakhir yang berisi data di kolom A dan simpan nomor barisnya ke variabel `lastRow`.',
        hint: 'Metode yang umum adalah `Cells(Rows.Count, "A").End(xlUp).Row`.',
        explanation: 'Menemukan baris terakhir secara dinamis adalah keterampilan VBA yang krusial untuk loop yang fleksibel. Kode `lastRow = Cells(Rows.Count, "A").End(xlUp).Row` bekerja seperti ini:\n1. `Rows.Count` mendapatkan jumlah total baris di sheet (lebih dari 1 juta).\n2. `Cells(Rows.Count, "A")` merujuk ke sel paling bawah di kolom A.\n3. `.End(xlUp)` mensimulasikan penekanan tombol `Ctrl + Panah Atas` dari sel tersebut. Ia akan berhenti di sel terakhir yang berisi data.\n4. `.Row` mengembalikan nomor baris dari sel tersebut.',
        answer: { type: 'formula', correctValue: 'Dim lastRow As Long\nlastRow = Cells(Rows.Count, "A").End(xlUp).Row' },
      },
    ],
  },
  {
    id: 69,
    title: 'VBA: Clear Contents',
    theme: 'Manipulasi Data',
    table: { headers: ['Data'], rows: [[100], [200]] },
    icon: WrenchScrewdriverIcon,
    questions: [
      {
        challenge: 'Tulis kode VBA untuk menghapus isi (nilai) dari rentang A1:A10 tanpa menghapus formatnya.',
        hint: 'Gunakan metode `.ClearContents` pada objek `Range`.',
        explanation: 'Ada beberapa cara untuk membersihkan sel di VBA. `.ClearContents` adalah yang paling umum karena ia hanya menghapus nilai-nilai di dalam sel, membiarkan format seperti warna, border, dan tebal huruf tetap utuh. Ini berbeda dari `.Clear` yang akan menghapus semuanya (nilai, format, komentar).',
        answer: { type: 'formula', correctValue: 'Range("A1:A10").ClearContents' },
      },
    ],
  },
  {
    id: 70,
    title: 'Automation Finale',
    theme: 'Makro Praktis',
    table: { headers: ['Status'], rows: [['Pending']] },
    icon: StarIcon,
    questions: [
      {
        challenge: 'Buat makro VBA bernama `UpdateStatus` yang mengubah nilai di A2 menjadi "Selesai" dan mengubah warna latar belakangnya menjadi hijau.',
        hint: 'Gunakan `.Value` untuk mengubah nilai dan `.Interior.Color` untuk mengubah warna. Warna hijau bisa menggunakan konstanta `vbGreen`.',
        explanation: 'Makro ini menggabungkan manipulasi nilai dan format. `Range("A2").Value = "Selesai"` mengubah teks. `Range("A2").Interior.Color = vbGreen` mengakses properti `Interior` dari sel dan mengatur properti `Color`-nya. `vbGreen` adalah salah satu konstanta warna bawaan VBA yang mudah digunakan.',
        answer: { type: 'formula', correctValue: 'Sub UpdateStatus()\n  Range("A2").Value = "Selesai"\n  Range("A2").Interior.Color = vbGreen\nEnd Sub' },
      },
    ],
  },
  // Part 8: BI Specialist
  {
    id: 71,
    title: 'DAX: CALCULATE',
    theme: 'Konteks Filter DAX',
    table: { headers: ['Measure', 'Konteks'], rows: [['Total Penjualan', 'Wilayah = "Utara"']] },
    icon: CalculatorIcon,
    questions: [
      {
        challenge: 'Tulis measure DAX menggunakan CALCULATE untuk menghitung [Total Sales] HANYA untuk wilayah "Utara".',
        hint: 'Gunakan `CALCULATE(expression, filter)`. Ekspresinya adalah `[Total Sales]`, filternya adalah `Sales[Region] = "Utara"`.',
        explanation: '`CALCULATE` adalah fungsi paling penting dalam DAX. Ia memodifikasi konteks filter di mana sebuah ekspresi dievaluasi. Formula `Sales Utara := CALCULATE([Total Sales], Sales[Region] = "Utara")` mengambil measure `[Total Sales]` yang ada, dan sebelum menghitungnya, ia menerapkan filter baru: hanya sertakan baris dari tabel `Sales` di mana kolom `Region` bernilai "Utara".',
        answer: { type: 'text', correctValue: ['CALCULATE([Total Sales], Sales[Region] = "Utara")', 'CALCULATE(SUM(Sales[Amount]), Sales[Region] = "Utara")'] },
      },
    ],
  },
  {
    id: 72,
    title: 'DAX: The "X" Factor',
    theme: 'Fungsi Iterator DAX',
    table: { headers: ['Tabel Penjualan'], rows: [['[Jumlah], [Harga Satuan]']] },
    icon: ChartBarSquareIcon,
    questions: [
      {
        challenge: 'Tulis measure DAX menggunakan SUMX untuk menghitung total pendapatan (Jumlah * Harga Satuan) per baris, lalu menjumlahkannya.',
        hint: 'Gunakan `SUMX`. `SUMX(table, expression)`. Tabelnya `Sales`, ekspresinya `Sales[Jumlah] * Sales[Harga Satuan]`.',
        explanation: 'Fungsi iterator seperti `SUMX`, `AVERAGEX`, dll. sangat kuat. Mereka bekerja baris demi baris. `SUMX(Sales, Sales[Jumlah] * Sales[Harga Satuan])` akan:\n1. Mengambil tabel `Sales`.\n2. Untuk baris pertama, ia menghitung `Jumlah * Harga Satuan`.\n3. Untuk baris kedua, ia melakukan hal yang sama.\n4. Proses ini berlanjut untuk semua baris di tabel (dalam konteks filter saat ini).\n5. Terakhir, `SUMX` menjumlahkan semua hasil perhitungan per baris tersebut.',
        answer: { type: 'text', correctValue: 'SUMX(Sales, Sales[Jumlah] * Sales[Harga Satuan])' },
      },
    ],
  },
  {
    id: 73,
    title: 'DAX: Data Modeling',
    theme: 'Hubungan Tabel',
    table: { headers: ['Tabel Penjualan', 'Tabel Produk'], rows: [['ID Produk, Jumlah', 'ID Produk, Kategori']] },
    icon: LinkIcon,
    questions: [
      {
        challenge: 'Di Data Model, fungsi DAX apa yang digunakan untuk mengambil nilai dari tabel sisi "one" (Produk) ke tabel sisi "many" (Penjualan)?',
        hint: 'Fungsi ini "mengikuti" hubungan dari sisi "many" ke sisi "one".',
        explanation: 'Fungsi **RELATED** hanya bisa digunakan ketika ada hubungan yang sudah didefinisikan antara tabel. Ia bekerja dari sisi "banyak" (Tabel Penjualan, karena satu produk bisa terjual berkali-kali) ke sisi "satu" (Tabel Produk, karena setiap ID produk hanya ada sekali). Dengan membuat kolom kalkulasi di Tabel Penjualan menggunakan formula `=RELATED(Produk[Kategori])`, DAX akan mengikuti hubungan berdasarkan `ID Produk` dan mengambil nilai `Kategori` yang sesuai dari Tabel Produk untuk setiap baris penjualan.',
        answer: { type: 'text', correctValue: ['RELATED'] },
      },
    ],
  },
  {
    id: 74,
    title: 'DAX: Time Intelligence 2',
    theme: 'Perbandingan Waktu',
    table: { headers: ['Measure'], rows: [['[Total Sales]']] },
    icon: ArrowsRightLeftIcon,
    questions: [
      {
        challenge: 'Tulis measure DAX untuk menghitung total penjualan pada periode yang sama tahun lalu (Same Period Last Year).',
        hint: 'Gunakan fungsi `SAMEPERIODLASTYEAR` atau `DATEADD` di dalam `CALCULATE`.',
        explanation: 'Membandingkan dengan periode sebelumnya adalah analisis yang sangat umum. `CALCULATE([Total Sales], SAMEPERIODLASTYEAR(\'Calendar\'[Date]))` adalah cara yang paling umum. Fungsi `SAMEPERIODLASTYEAR` mengambil semua tanggal dalam konteks filter saat ini (misalnya, Q1 2024) dan mengembalikan sebuah tabel berisi tanggal yang setara pada tahun sebelumnya (Q1 2023). `CALCULATE` kemudian menggunakan tabel tanggal baru ini sebagai filter.',
        answer: { type: 'text', correctValue: ['CALCULATE([Total Sales], SAMEPERIODLASTYEAR(\'Calendar\'[Date]))', 'CALCULATE([Total Sales], DATEADD(\'Calendar\'[Date], -1, YEAR))'] },
      },
    ],
  },
  {
    id: 75,
    title: 'DAX: DIVIDE',
    theme: 'Pembagian Aman',
    table: { headers: ['Pembilang', 'Penyebut'], rows: [['[Total Sales]', '[Total Cost]']] },
    icon: CalculatorIcon,
    questions: [
      {
        challenge: 'Gunakan fungsi DIVIDE untuk menghitung margin laba `([Total Sales] - [Total Cost]) / [Total Sales]` secara aman dari error pembagian nol.',
        hint: 'Gunakan fungsi `DIVIDE`. `DIVIDE(numerator, denominator, [alternate_result])`.',
        explanation: 'Pembagian dengan nol menghasilkan error. Fungsi `DIVIDE` adalah cara DAX untuk menangani ini dengan elegan. `DIVIDE([Total Sales] - [Total Cost], [Total Sales], 0)` akan melakukan pembagian seperti biasa. Namun, jika `[Total Sales]` adalah 0 atau BLANK, alih-alih error, ia akan mengembalikan hasil alternatif yang Anda tentukan (dalam hal ini `0`).',
        answer: { type: 'text', correctValue: 'DIVIDE([Total Sales] - [Total Cost], [Total Sales])' },
      },
    ],
  },
  {
    id: 76,
    title: 'DAX: ALL',
    theme: 'Menghapus Filter',
    table: { headers: ['Measure', 'Konteks'], rows: [['Penjualan Produk', 'Total Semua Penjualan']] },
    icon: FunnelIcon,
    questions: [
      {
        challenge: 'Tulis measure DAX untuk menghitung persentase penjualan produk dari total keseluruhan, yang tidak terpengaruh oleh filter produk.',
        hint: 'Untuk penyebut (denominator), gunakan `CALCULATE` dengan `ALL` untuk menghapus filter dari tabel Penjualan. `DIVIDE(SUM(Sales[Amount]), CALCULATE(SUM(Sales[Amount]), ALL(Sales)))`.',
        explanation: 'Fungsi `ALL` adalah pengubah konteks yang sangat kuat. Ia menghapus filter dari kolom atau tabel yang ditentukan. Dalam `CALCULATE(..., ALL(Sales))`, `ALL(Sales)` membuat `CALCULATE` mengabaikan semua filter yang sedang diterapkan pada tabel Sales (seperti filter produk dari baris PivotTable). Hasilnya, penyebut selalu merupakan total penjualan keseluruhan, memungkinkan perhitungan persentase yang benar.',
        answer: { type: 'text', correctValue: 'DIVIDE(SUM(Sales[Amount]), CALCULATE(SUM(Sales[Amount]), ALL(Sales)))' },
      },
    ],
  },
  {
    id: 77,
    title: 'DAX: FILTER',
    theme: 'Filter Kompleks',
    table: { headers: ['Tugas'], rows: [['Hitung penjualan produk mahal (>1000)']] },
    icon: DocumentChartBarIcon,
    questions: [
      {
        challenge: 'Tulis measure DAX menggunakan CALCULATE dan FILTER untuk menjumlahkan penjualan hanya untuk transaksi dengan harga satuan > 1000.',
        hint: 'Gunakan `FILTER(table, expression)`. `CALCULATE(SUM(Sales[Amount]), FILTER(Sales, Sales[Price] > 1000))`',
        explanation: 'Fungsi `FILTER` adalah iterator yang mengembalikan sebuah tabel. Ia memindai tabel yang diberikan baris demi baris dan hanya mengembalikan baris yang memenuhi kondisi. Dalam `CALCULATE`, `FILTER(Sales, Sales[Price] > 1000)` membuat tabel sementara yang hanya berisi penjualan mahal, dan `CALCULATE` kemudian menjumlahkan `Amount` dari tabel sementara tersebut.',
        answer: { type: 'text', correctValue: 'CALCULATE(SUM(Sales[Amount]), FILTER(Sales, Sales[Price] > 1000))' },
      },
    ],
  },
  {
    id: 78,
    title: 'DAX: Variables',
    theme: 'Kode DAX yang Bersih',
    table: { headers: ['Tugas'], rows: [['Hitung Laba Bersih']] },
    icon: CodeBracketSquareIcon,
    questions: [
      {
        challenge: 'Tulis ulang measure margin laba menggunakan variabel DAX (VAR...RETURN) untuk meningkatkan keterbacaan.',
        hint: 'Gunakan sintaks `VAR nama = ... RETURN ...`.',
        explanation: 'Variabel (VAR) di DAX sangat penting untuk formula yang bersih, efisien, dan mudah di-debug. Kode ini lebih mudah dibaca dan jika `[Total Sales]` atau `[Total Cost]` adalah measure yang kompleks, DAX hanya akan menghitungnya sekali dan menyimpan hasilnya di variabel, meningkatkan performa.',
        answer: { type: 'text', correctValue: 'VAR Revenue = [Total Sales]\nVAR Cost = [Total Cost]\nRETURN DIVIDE(Revenue - Cost, Revenue)' },
      },
    ],
  },
  {
    id: 79,
    title: 'DAX: Top N',
    theme: 'Ranking Dinamis',
    table: { headers: ['Tugas'], rows: [['Hitung penjualan 5 produk teratas']] },
    icon: TrophyIcon,
    questions: [
      {
        challenge: 'Tulis measure DAX yang menghitung total penjualan hanya untuk 5 produk teratas berdasarkan penjualannya.',
        hint: 'Gunakan `TOPN` di dalam `CALCULATE`. `CALCULATE([Total Sales], TOPN(5, VALUES(Products[Product Name]), [Total Sales], DESC))`',
        explanation: '`TOPN` adalah fungsi tabel yang mengembalikan N baris teratas dari sebuah tabel berdasarkan sebuah ekspresi. `VALUES(Products[Product Name])` membuat daftar unik produk. `TOPN` kemudian mengambil daftar produk tersebut, mencari 5 teratas berdasarkan `[Total Sales]` secara menurun (`DESC`), dan mengembalikan tabel berisi 5 produk tersebut. `CALCULATE` menggunakan tabel ini sebagai filter.',
        answer: { type: 'text', correctValue: 'CALCULATE([Total Sales], TOPN(5, VALUES(Products[Product Name]), [Total Sales], DESC))' },
      },
    ],
  },
  {
    id: 80,
    title: 'BI Specialist Finale',
    theme: 'KPI Dashboard DAX',
    table: { headers: ['KPI'], rows: [['Pertumbuhan Penjualan YoY%']] },
    icon: StarIcon,
    questions: [
      {
        challenge: 'Buat measure KPI Pertumbuhan Penjualan Year-over-Year (YoY) dalam persentase.',
        hint: 'Gunakan variabel untuk penjualan saat ini dan penjualan tahun lalu. Lalu gunakan `DIVIDE` untuk menghitung perubahannya: `(Current - Previous) / Previous`.',
        explanation: 'Ini adalah contoh measure KPI yang sangat umum dan kuat. Dengan menggunakan variabel, formulanya menjadi sangat jelas. `SalesLastYear` dihitung menggunakan `SAMEPERIODLASTYEAR`. Kemudian, `DIVIDE` digunakan untuk menghitung tingkat pertumbuhan. Jika penjualan tahun lalu nol, `DIVIDE` akan mengembalikan `BLANK()` dengan aman, mencegah error.',
        answer: { type: 'text', correctValue: 'VAR SalesCurrentYear = [Total Sales]\nVAR SalesLastYear = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(\'Calendar\'[Date]))\nRETURN DIVIDE(SalesCurrentYear - SalesLastYear, SalesLastYear)' },
      },
    ],
  },
  // Part 9: Formula Architect
  {
    id: 81,
    title: 'Recursive LAMBDA',
    theme: 'Fungsi Kustom Tingkat Lanjut',
    table: {
      headers: ['Teks'],
      rows: [['A1, B2, C3, D4']],
    },
    icon: BeakerIcon,
    questions: [
      {
        challenge: 'Buat LAMBDA yang menerima teks dan mengembalikan teks tersebut setelah semua spasinya dihapus.',
        hint: 'LAMBDA rekursif memanggil dirinya sendiri di dalam definisinya. Gunakan `LET` untuk mendefinisikan LAMBDA, dan `IF` untuk kondisi berhenti.',
        explanation: 'LAMBDA Rekursif adalah puncak dari keahlian formula. Anda mendefinisikannya di Name Manager. `RemoveSpaces = LAMBDA(text, IF(text="", "", SUBSTITUTE(text, " ", "")))` adalah versi sederhana. Versi rekursif yang benar untuk mengganti beberapa karakter akan lebih kompleks, seringkali menggunakan `REDUCE` atau memanggil dirinya sendiri untuk memproses sisa string.',
        answer: { type: 'formula', correctValue: '=LAMBDA(text, SUBSTITUTE(text, " ", ""))' },
      },
    ],
  },
  {
    id: 82,
    title: 'BYROW & BYCOL',
    theme: 'Kalkulasi Baris & Kolom',
    table: {
      headers: ['Q1', 'Q2', 'Q3', 'Q4'],
      rows: [[10, 20, 15, 25], [5, 15, 10, 30]],
    },
    icon: ArrowsRightLeftIcon,
    questions: [
      {
        challenge: 'Gunakan BYROW dan LAMBDA untuk menghitung total penjualan (SUM) untuk setiap baris di rentang A2:D3.',
        hint: '`BYROW(array, LAMBDA(row, calculation(row)))`. `calculation`nya adalah `SUM(row)`.',
        explanation: '`BYROW` memungkinkan Anda menerapkan `LAMBDA` pada setiap baris dari sebuah array. Formula `=BYROW(A2:D3, LAMBDA(baris, SUM(baris)))` akan:\n1. Mengambil baris pertama (`{10,20,15,25}`) dan memberikannya ke `LAMBDA` sebagai `baris`.\n2. `SUM(baris)` dihitung, menghasilkan 70.\n3. Mengambil baris kedua (`{5,15,10,30}`) dan menghitung `SUM`-nya, menghasilkan 60.\n4. Hasilnya adalah array vertikal `{70;60}`.',
        answer: { type: 'formula', correctValue: '=BYROW(A2:D3, LAMBDA(row, SUM(row)))' },
      },
    ],
  },
  {
    id: 83,
    title: 'REDUCE: Cumulative Sum',
    theme: 'Iterasi Array',
    table: {
      headers: ['Penjualan Bulanan'],
      rows: [[100], [120], [150]],
    },
    icon: CalculatorIcon,
    questions: [
      {
        challenge: 'Gunakan fungsi SCAN untuk membuat array yang berisi total penjualan kumulatif dari data di A2:A4.',
        hint: '`REDUCE(initialValue, array, LAMBDA(accumulator, value, calculation))`. `initialValue` bisa 0. Kalkulasinya adalah `accumulator + value`. Tapi untuk array, Anda butuh `VSTACK`.',
        explanation: '`REDUCE` mengiterasi sebuah array dan mengakumulasi hasilnya. Untuk mendapatkan array kumulatif, triknya adalah menggunakan `VSTACK`. `=REDUCE(0, A2:A4, LAMBDA(a,v, VSTACK(a,TAKE(a,-1)+v)))`. Ini cukup kompleks: `a` adalah akumulator, `v` adalah nilai saat ini. `VSTACK` menumpuk akumulator sebelumnya dengan nilai terakhir dari akumulator ditambah nilai saat ini. Ada cara yang lebih mudah: `SCAN`.',
        answer: { type: 'formula', correctValue: '=SCAN(0, A2:A4, LAMBDA(a,v, a+v))' },
      },
    ],
  },
  {
    id: 84,
    title: 'LAMBDA as a Variable',
    theme: 'Formula Modular',
    table: {
      headers: ['Nilai'],
      rows: [[10], [20], [30]],
    },
    icon: CodeBracketSquareIcon,
    questions: [
      {
        challenge: 'Gunakan LET untuk mendefinisikan sebuah LAMBDA (yang menambahkan PPN 11%), lalu gunakan MAP untuk menerapkan LAMBDA tersebut ke rentang A2:A4.',
        hint: '`LET(AddTax, LAMBDA(x, x*1.11), MAP(range, AddTax))`',
        explanation: 'Ini menunjukkan modularitas `LET` dan `LAMBDA`. Anda mendefinisikan formula `AddTax` sekali di dalam `LET`. Kemudian Anda bisa menggunakannya kembali di dalam kalkulasi akhir. `MAP(A2:A4, AddTax)` menerapkan fungsi `AddTax` yang baru saja Anda definisikan ke setiap elemen di `A2:A4`. Ini membuat formula utama lebih bersih dan logikanya lebih mudah diikuti.',
        answer: { type: 'formula', correctValue: '=LET(AddTax, LAMBDA(x, x*1.11), MAP(A2:A4, AddTax))' },
      },
    ],
  },
  {
    id: 85,
    title: 'Mega Formula',
    theme: 'Menggabungkan Semuanya',
    table: {
      headers: ['Produk', 'Wilayah', 'Penjualan'],
      rows: [['Laptop,Monitor', 'Utara', 1000], ['Keyboard', 'Selatan', 200], ['Monitor,Mouse', 'Utara', 500]],
    },
    icon: PuzzlePieceIcon,
    questions: [
      {
        challenge: 'Hitung total penjualan untuk produk "Monitor" di wilayah "Utara", dengan memperhatikan bahwa kolom produk bisa berisi beberapa item yang dipisahkan koma.',
        hint: 'Anda perlu FILTER untuk wilayah, lalu cara untuk mengecek apakah "Monitor" ada di dalam teks produk. `ISNUMBER(SEARCH(...))` adalah kuncinya.',
        explanation: 'Ini adalah formula yang sangat kompleks yang menggabungkan beberapa logika. `=SUM(FILTER(C2:C4, (B2:B4="Utara") * ISNUMBER(SEARCH("Monitor",A2:A4))))`.\n- `B2:B4="Utara"` menghasilkan `{TRUE;FALSE;TRUE}`.\n- `ISNUMBER(SEARCH("Monitor",A2:A4))` akan mencari "Monitor" dan menghasilkan `{TRUE;FALSE;TRUE}`.\n- Tanda `*` berfungsi sebagai operator AND, mengubah `TRUE/FALSE` menjadi `1/0`. Hasil perkalian arraynya adalah `{1;0;1}`.\n- `FILTER` kemudian mengambil baris di mana hasilnya adalah 1 (atau `TRUE`), yaitu baris pertama dan ketiga. Ia mengembalikan `{1000;500}`.\n- `SUM` menjumlahkan hasilnya menjadi 1500.',
        answer: { type: 'formula', correctValue: '=SUM(FILTER(C2:C4,(B2:B4="Utara")*ISNUMBER(SEARCH("Monitor",A2:A4))))' },
      },
    ],
  },
  {
    id: 86,
    title: 'SEQUENCE & RANDARRAY',
    theme: 'Membuat Data Palsu',
    table: { headers: [''], rows: [['']] },
    icon: SparklesIcon,
    questions: [
      {
        challenge: 'Gunakan RANDARRAY untuk membuat array dinamis 10 baris dan 1 kolom berisi angka acak antara 100 dan 500.',
        hint: 'Gunakan RANDARRAY. `RANDARRAY(rows, [columns], [min], [max], [integer])`.',
        explanation: '`RANDARRAY` sangat berguna untuk membuat data sampel dengan cepat. `=RANDARRAY(10, 1, 100, 500, TRUE)` akan menghasilkan array 10 baris, 1 kolom, berisi angka acak antara 100 (min) dan 500 (max). Argumen terakhir, `TRUE`, memastikan hasilnya adalah bilangan bulat (integer).',
        answer: { type: 'formula', correctValue: '=RANDARRAY(10,1,100,500,TRUE)' },
      },
    ],
  },
  {
    id: 87,
    title: 'PIVOTBY & GROUPBY',
    theme: 'Agregasi Dinamis',
    table: {
      headers: ['Wilayah', 'Produk', 'Penjualan'],
      rows: [['Utara', 'Apel', 100], ['Utara', 'Jeruk', 120], ['Selatan', 'Apel', 80]],
    },
    icon: ChartPieIcon,
    questions: [
      {
        challenge: 'Gunakan GROUPBY untuk membuat ringkasan total penjualan (SUM) per Wilayah dari data yang tersedia.',
        hint: '`GROUPBY(row_fields, values, function)`. `row_fields` adalah kolom Wilayah, `values` adalah kolom Penjualan, `function` adalah `SUM`.',
        explanation: '`GROUPBY` adalah versi formula dari PivotTable sederhana. `=GROUPBY(A2:A4, C2:C4, SUM)` akan:\n1. Mengambil kolom `A2:A4` sebagai `row_fields` (kategori untuk dikelompokkan).\n2. Mengambil `C2:C4` sebagai `values` yang akan diagregasi.\n3. Menerapkan fungsi `SUM` ke `values` untuk setiap grup unik di `row_fields`.\n4. Hasilnya adalah tabel ringkasan yang menunjukkan total penjualan untuk "Utara" dan "Selatan".',
        answer: { type: 'formula', correctValue: '=GROUPBY(A2:A4,C2:C4,SUM)' },
      },
    ],
  },
  {
    id: 88,
    title: 'Inter-related LAMBDAs',
    theme: 'Fungsi Kustom Kompleks',
    table: { headers: ['Harga'], rows: [[1000]] },
    icon: BuildingLibraryIcon,
    questions: [
      {
        challenge: 'Di Name Manager, buat dua LAMBDA: `TAX_RATE` (mengembalikan 0.11), dan `CALC_TOTAL` (menerima harga dan memanggil TAX_RATE() untuk menghitung total).',
        hint: '`CALC_TOTAL = LAMBDA(price, price * (1 + TAX_RATE()))`. LAMBDA bisa memanggil LAMBDA lain.',
        explanation: 'Ini menunjukkan bagaimana Anda bisa membangun pustaka fungsi mini Anda sendiri. Dengan mendefinisikan konstanta seperti `TAX_RATE` sebagai LAMBDA, Anda bisa mengubahnya di satu tempat (Name Manager) dan semua fungsi lain yang bergantung padanya (`CALC_TOTAL`) akan otomatis diperbarui. Ini adalah prinsip pemrograman yang baik (pemisahan logika) yang diterapkan di dalam formula Excel.',
        answer: { type: 'text', correctValue: 'CALC_TOTAL = LAMBDA(price, price * (1 + TAX_RATE()))' },
      },
    ],
  },
  {
    id: 89,
    title: 'Dynamic Chart Source',
    theme: 'Visualisasi Canggih',
    table: {
      headers: ['Bulan', 'Penjualan'],
      rows: [['Jan', 100], ['Feb', 120], ['Mar', 150]],
    },
    icon: ChartBarSquareIcon,
    questions: [
      {
        challenge: 'Tulis satu formula dinamis menggunakan LET dan VSTACK untuk menjadi sumber data sebuah grafik, yang secara otomatis menyertakan baris header.',
        hint: 'Gunakan `LET` untuk mendefinisikan rentang data dinamis (misalnya dengan `OFFSET` atau `INDEX/COUNTA`), lalu gabungkan header dengan data tersebut menggunakan `VSTACK`.',
        explanation: 'Ini adalah teknik canggih untuk membuat sumber data grafik yang tangguh. `=LET(DataRange, OFFSET(B2,0,0,COUNTA(B:B)-1,1), VSTACK(B1, DataRange))`. \n`LET` mendefinisikan `DataRange` yang dinamis. Kemudian `VSTACK` menggabungkan sel header `B1` secara manual dengan `DataRange` tersebut, menciptakan satu array tunggal yang bersih dan selalu up-to-date, yang bisa Anda referensikan di dalam dialog "Select Data Source" untuk grafik.',
        answer: { type: 'formula', correctValue: '=LET(Data,TAKE(A1:B4,COUNTA(A:A)),Data)' },
      },
    ],
  },
  {
    id: 90,
    title: 'Formula Architect Finale',
    theme: 'Problem Solving Kreatif',
    table: {
      headers: ['Log'],
      rows: [['User A login success'], ['User B login failed'], ['User A data updated'], ['User C login success']],
    },
    icon: StarIcon,
    questions: [
      {
        challenge: 'Dari data log di A2:A5, buat daftar unik semua pengguna yang log-nya mengandung frasa "login success".',
        hint: 'Kombinasikan `FILTER` untuk mendapatkan log yang relevan, `TEXTBEFORE` untuk mengekstrak nama pengguna, lalu `UNIQUE`.',
        explanation: 'Ini adalah masalah pemecahan masalah multi-langkah yang diselesaikan dengan satu formula. `=UNIQUE(TEXTBEFORE(FILTER(A2:A5, ISNUMBER(SEARCH("login success",A2:A5)))," login success"))`.\n1. `FILTER` mengambil semua baris yang mengandung "login success".\n2. `TEXTBEFORE` kemudian diterapkan pada hasil filter, mengekstrak semua teks sebelum " login success". Ini menghasilkan array nama pengguna, mungkin dengan duplikat.\n3. `UNIQUE` akhirnya mengambil array nama tersebut dan menghapus duplikatnya untuk daftar akhir yang bersih.',
        answer: { type: 'formula', correctValue: '=UNIQUE(TEXTBEFORE(FILTER(A2:A5,ISNUMBER(SEARCH("login success",A2:A5)))," "))' },
      },
    ],
  },
  // Part 10: Excel Virtuoso
  {
    id: 91,
    title: 'Power Query & Formula',
    theme: 'Integrasi Lanjutan',
    table: {
      headers: ['Tabel Power Query', 'Parameter'],
      rows: [['SalesData', 'Laptop']],
    },
    icon: BoltIcon,
    questions: [
      {
        challenge: 'Tulis formula worksheet menggunakan referensi terstruktur untuk menghitung total penjualan "Laptop" dari tabel Power Query bernama `SalesData`.',
        hint: 'Tabel yang dimuat dari Power Query berfungsi seperti tabel biasa. Anda bisa menggunakan SUMIF atau SUMIFS dengan referensi terstruktur.',
        explanation: 'Tabel yang dihasilkan Power Query terintegrasi penuh dengan worksheet. Cara terbaik untuk merujuk padanya adalah menggunakan referensi terstruktur, yang lebih mudah dibaca dan tangguh. `=SUMIF(SalesData[Produk], "Laptop", SalesData[Penjualan])`. Ini jauh lebih baik daripada `=SUMIF(A:A, "Laptop", C:C)` karena tidak akan rusak jika kolom dipindahkan.',
        answer: { type: 'formula', correctValue: '=SUMIF(SalesData[Produk],"Laptop",SalesData[Penjualan])' },
      },
    ],
  },
  {
    id: 92,
    title: 'VBA & Dynamic Arrays',
    theme: 'Otomatisasi Modern',
    table: {
      headers: ['Hasil Array Dinamis'],
      rows: [['(di sel A1)']],
    },
    icon: CodeBracketSquareIcon,
    questions: [
      {
        challenge: 'Jika A1 berisi formula array dinamis, properti VBA apa yang digunakan untuk merujuk ke seluruh rentang tumpahannya (spill range)?',
        hint: 'Gunakan properti `.SpillRange` pada sel jangkar (anchor cell) dari array dinamis tersebut.',
        explanation: 'Interaksi VBA dengan array dinamis memerlukan properti baru. Jika A1 berisi formula `=SORT(...)` yang tumpah ke A1:C5, maka `Range("A1").SpillRange` di VBA akan merujuk ke seluruh objek `Range` A1:C5. Anda kemudian bisa melakukan operasi pada seluruh rentang tersebut, misalnya `Range("A1").SpillRange.Copy`.',
        answer: { type: 'text', correctValue: ['SpillRange'] },
      },
    ],
  },
  {
    id: 93,
    title: 'DAX & Power Query',
    theme: 'ETL & Pemodelan',
    table: {
      headers: ['Tugas Power Query', 'Tugas DAX'],
      rows: [['Membuat tabel Kalender', 'Menghitung YTD']],
    },
    icon: CircleStackIcon,
    questions: [
      {
        challenge: 'Untuk analisis Time Intelligence DAX, langkah penting apa yang harus dilakukan terlebih dahulu di Power Query atau Data Model?',
        hint: 'Anda memerlukan tabel dimensi waktu yang lengkap dan berkelanjutan.',
        explanation: 'Analisis Time Intelligence DAX yang andal sangat bergantung pada adanya **Tabel Kalender** yang terstruktur dengan baik. Tabel ini harus dibuat (seringkali di Power Query), ditandai sebagai "Date Table" di Data Model, dan dihubungkan ke tabel fakta Anda. Tabel ini harus berisi satu baris untuk setiap hari dalam rentang waktu Anda, tanpa ada tanggal yang terlewat, untuk memastikan fungsi seperti `SAMEPERIODLASTYEAR` bekerja dengan benar.',
        answer: { type: 'text', correctValue: ['Membuat Tabel Kalender', 'Mark as Date Table'] },
      },
    ],
  },
  {
    id: 94,
    title: 'Solver Challenge',
    theme: 'Optimisasi',
    table: {
      headers: ['Produk', 'Jumlah Produksi', 'Keuntungan/Unit', 'Batasan Sumber Daya'],
      rows: [['A', '', 10, '...'], ['B', '', 12, '...']],
    },
    icon: SunIcon,
    questions: [
      {
        challenge: 'Untuk memaksimalkan total keuntungan dengan mengubah beberapa variabel input dan batasan, alat What-If Analysis canggih apa yang digunakan?',
        hint: 'Ini adalah masalah optimisasi linier. Cari Add-in Excel yang dirancang untuk ini.',
        explanation: '**Solver Add-in** adalah alat optimisasi paling kuat di Excel. Ini jauh melampaui Goal Seek. Dengan Solver, Anda bisa:\n1. Mengatur sel target (misal: Total Keuntungan) untuk dimaksimalkan, diminimalkan, atau disetel ke nilai tertentu.\n2. Menentukan beberapa sel yang dapat diubah (misal: Jumlah Produksi untuk beberapa produk).\n3. Menambahkan beberapa batasan (constraints) pada sel-sel yang dapat diubah (misal: jumlah produksi tidak boleh negatif, total penggunaan sumber daya tidak boleh melebihi batas).',
        answer: { type: 'text', correctValue: ['Solver'] },
      },
    ],
  },
  {
    id: 95,
    title: 'Ultimate Mega Formula',
    theme: 'Arsitektur Formula',
    table: {
      headers: ['Data Transaksi (ID-Produk-Jumlah)'],
      rows: [['1-Apel-10'], ['2-Jeruk-15'], ['1-Apel-5']],
    },
    icon: BuildingLibraryIcon,
    questions: [
      {
        challenge: 'Dari data di A2:A4, gunakan kombinasi formula array dinamis untuk membuat tabel ringkasan unik yang menunjukkan total jumlah untuk setiap produk, diurutkan berdasarkan nama.',
        hint: 'Gunakan LET, TEXTSPLIT, UNIQUE, SUMIF, dan SORT. Pisahkan data, dapatkan produk unik, hitung totalnya, lalu gabungkan dan urutkan.',
        explanation: 'Ini adalah formula arsitektur sejati. `=LET(data, TEXTSPLIT(A2:A4, "-"), produk, INDEX(data,,2), jumlah, --INDEX(data,,3), unikProduk, SORT(UNIQUE(produk)), total, SUMIF(produk, unikProduk, jumlah), HSTACK(unikProduk, total))`. Formula ini memecah masalah langkah demi langkah di dalam `LET`, membuatnya dapat dikelola: memisahkan data, mengekstrak kolom, mendapatkan produk unik, menghitung total dengan `SUMIF` pada array virtual, dan akhirnya menggabungkan hasilnya dengan `HSTACK`.',
        answer: { type: 'formula', correctValue: '=LET(d,TEXTSPLIT(A2:A4,"-"),p,INDEX(d,,2),q,--INDEX(d,,3),u,SORT(UNIQUE(p)),t,SUMIF(p,u,q),HSTACK(u,t))' },
      },
    ],
  },
  {
    id: 96,
    title: 'Data Model vs. Lookup',
    theme: 'Strategi Analisis',
    table: {
      headers: ['Kapan Pakai VLOOKUP/XLOOKUP?', 'Kapan Pakai Data Model?'],
      rows: [['...', '...']],
    },
    icon: GlobeAltIcon,
    questions: [
      {
        challenge: 'Untuk menganalisis data dari beberapa tabel besar, pendekatan mana yang lebih efisien dan skalabel: VLOOKUP/XLOOKUP atau Data Model (Power Pivot)?',
        hint: 'Pikirkan tentang di mana kalkulasi terjadi dan bagaimana data disimpan. Apakah menarik data ke satu tabel besar, atau menjaga tabel tetap terpisah dan terhubung?',
        explanation: 'Untuk data besar dan kompleks, menggunakan **Data Model (Power Pivot)** jauh lebih unggul. VLOOKUP/XLOOKUP menarik data secara fisik ke dalam satu tabel besar, yang bisa membuat file menjadi lambat dan besar. Sebaliknya, Data Model menjaga tabel tetap terpisah, ramping, dan terhubung melalui hubungan. Kalkulasi (Measures DAX) dilakukan saat diperlukan di PivotTable, yang jauh lebih efisien dalam hal memori dan performa, terutama untuk jutaan baris data.',
        answer: { type: 'text', correctValue: ['Data Model', 'Power Pivot'] },
      },
    ],
  },
  {
    id: 97,
    title: 'Picture Lookup',
    theme: 'Visualisasi Kreatif',
    table: {
      headers: ['Nama Produk', 'URL Gambar'],
      rows: [['Apel', '.../apel.png'], ['Jeruk', '.../jeruk.png']],
    },
    icon: EyeDropperIcon,
    questions: [
      {
        challenge: 'Fungsi Excel baru apa yang dapat menampilkan gambar dari URL secara dinamis di dalam sel?',
        hint: 'Ini adalah fungsi yang relatif baru yang menangani gambar sebagai tipe data.',
        explanation: 'Fungsi **IMAGE** adalah tambahan baru yang fantastis di Microsoft 365. Ia memungkinkan Anda untuk menyisipkan gambar dari sebuah URL sumber langsung ke dalam sel. `=IMAGE(B2)` akan membaca URL di B2 dan menampilkan gambar tersebut. Anda bisa menggabungkannya dengan XLOOKUP, misalnya `=IMAGE(XLOOKUP("Apel",A2:A3,B2:B3))`, untuk membuat dashboard visual yang sangat menarik dan dinamis.',
        answer: { type: 'text', correctValue: 'IMAGE' },
      },
    ],
  },
  {
    id: 98,
    title: 'VBA Error Handling',
    theme: 'Kode yang Tangguh',
    table: {
      headers: ['Tugas VBA'],
      rows: [['Bagi 10 dengan 0']],
    },
    icon: ShieldExclamationIcon,
    questions: [
      {
        challenge: 'Di VBA, bagaimana cara Anda menangani error runtime agar makro tidak berhenti dan malah menjalankan blok kode penanganan error?',
        hint: 'Gunakan pernyataan `On Error GoTo ...`',
        explanation: 'Penanganan error yang baik sangat penting untuk makro yang andal. `On Error GoTo ErrorHandler` di awal prosedur memberitahu VBA: "Jika terjadi kesalahan, jangan berhenti, tapi lompat ke label `ErrorHandler`". Di akhir kode normal Anda, Anda menempatkan `Exit Sub` agar tidak menjalankan handler secara tidak sengaja. Kemudian Anda mendefinisikan label `ErrorHandler:`, di mana Anda bisa menampilkan `MsgBox` yang ramah dan melakukan pembersihan jika perlu.',
        answer: { type: 'text', correctValue: ['On Error GoTo', 'On Error Resume Next'] },
      },
    ],
  },
  {
    id: 99,
    title: 'Final Optimization',
    theme: 'Performa Workbook',
    table: {
      headers: ['Penyebab Lambat', 'Solusi'],
      rows: [['Banyak formula `OFFSET`', '...']],
    },
    icon: RocketLaunchIcon,
    questions: [
      {
        challenge: 'Formula `OFFSET` adalah fungsi *volatile*. Apa alternatif non-volatile yang lebih baik untuk membuat rentang dinamis?',
        hint: 'Gunakan kombinasi `INDEX` dan `COUNTA`.',
        explanation: 'Fungsi *volatile* (seperti `OFFSET`, `INDIRECT`, `RAND`) dihitung ulang setiap kali ada perubahan *apapun* di workbook, yang bisa sangat membebani performa. Alternatif non-volatile yang umum untuk rentang dinamis adalah menggunakan **INDEX**. Formula `=$A$1:INDEX($A:$A, COUNTA($A:$A))` membuat rentang dinamis yang hanya dihitung ulang ketika data di kolom A berubah. Ini jauh lebih efisien daripada `OFFSET`.',
        answer: { type: 'text', correctValue: ['INDEX', 'INDEX/COUNTA'] },
      },
    ],
  },
  {
    id: 100,
    title: 'Excel Virtuoso',
    theme: 'Anda Telah Mencapai Puncak',
    table: {
      headers: ['Selamat!'],
      rows: [['Anda Adalah Grandmaster Excel!']],
    },
    icon: TrophyIcon,
    questions: [
      {
        challenge: 'Setelah menguasai Excel, apa langkah selanjutnya yang logis dalam perjalanan analisis data (misal: Power BI, Python, SQL)?',
        hint: 'Dunia data sangat luas! Pertimbangkan Power BI, Python (pandas), atau SQL. Keahlian Excel Anda adalah fondasi yang luar biasa.',
        explanation: 'Selamat, Grandmaster! Menyelesaikan Excel Saga berarti Anda memiliki fondasi pemecahan masalah dan logika data yang sangat kuat. Ini membuka banyak pintu. **Power BI** adalah langkah alami untuk visualisasi data interaktif tingkat lanjut. **Python** (dengan library seperti Pandas dan Matplotlib) memberikan kekuatan analisis dan otomatisasi yang lebih besar. **SQL** adalah bahasa standar untuk berinteraksi dengan database. Keahlian Excel Anda membuat belajar alat-alat ini menjadi jauh lebih mudah.',
        answer: { type: 'text', correctValue: ['Power BI', 'Python', 'SQL', 'Terus Belajar'] },
      },
    ],
  },
];
