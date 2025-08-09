import type { TrainingChallenge } from '../types';

const productNames = ['Apel', 'Jeruk', 'Mangga', 'Pisang', 'Anggur', 'Stroberi', 'Durian', 'Rambutan'];
const regions = ['Utara', 'Selatan', 'Timur', 'Barat'];

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const generateVlookupChallenge = (): TrainingChallenge => {
    const tableProducts = shuffleArray(productNames).slice(0, 4);
    const targetProduct = getRandomItem(tableProducts);
    const tableData = {
        headers: ['Produk', 'Harga'],
        rows: tableProducts.map(p => [p, getRandomInt(5000, 25000)])
    };
    const correctPriceRow = tableData.rows.find(r => r[0] === targetProduct);
    const correctPrice = correctPriceRow ? correctPriceRow[1] : 0;
    // Target cell C2 (0-indexed: r=1, c=2)
    const targetCell = { r: 1, c: 2 }; 
    
    return {
        challenge: `Di sel C2, gunakan VLOOKUP untuk menemukan harga dari "${targetProduct}".`,
        table: tableData,
        answer: {
            type: 'formula',
            correctValue: [
                `=VLOOKUP("${targetProduct}";A2:B${tableData.rows.length + 1};2;FALSE)`,
                `=VLOOKUP("${targetProduct}";A:B;2;FALSE)`,
                `=VLOOKUP("${targetProduct}";A2:B${tableData.rows.length + 1};2;0)`,
                `=VLOOKUP("${targetProduct}";A:B;2;0)`
            ]
        },
        explanation: `VLOOKUP mencari "${targetProduct}" di kolom pertama (A), menemukan baris yang cocok, lalu mengambil nilai dari kolom kedua di baris tersebut, yaitu ${correctPrice}. FALSE memastikan pencocokan persis.`,
        targetCell,
        correctResult: correctPrice,
    };
};

const generateSumifChallenge = (): TrainingChallenge => {
    const tableRegions = shuffleArray(regions).slice(0, 2);
    const targetRegion = getRandomItem(tableRegions);
    let total = 0;
    const tableData = {
        headers: ['Wilayah', 'Penjualan'],
        rows: Array.from({ length: 5 }, () => {
            const region = getRandomItem(tableRegions);
            const sales = getRandomInt(100, 1000);
            if (region === targetRegion) {
                total += sales;
            }
            return [region, sales];
        })
    };
    // Target cell D2 (0-indexed: r=1, c=3)
    const targetCell = { r: 1, c: 3 };

    return {
        challenge: `Di sel D2, gunakan SUMIF untuk menghitung total penjualan di wilayah "${targetRegion}".`,
        table: tableData,
        answer: {
            type: 'formula',
            correctValue: [
                `=SUMIF(A2:A${tableData.rows.length + 1};"${targetRegion}";B2:B${tableData.rows.length + 1})`,
                `=SUMIF(A:A;"${targetRegion}";B:B)`
            ]
        },
        explanation: `SUMIF memeriksa kolom Wilayah (A) untuk "${targetRegion}", dan jika cocok, ia akan menjumlahkan nilai yang sesuai dari kolom Penjualan (B). Totalnya adalah ${total}.`,
        targetCell,
        correctResult: total
    };
};

const generateLeftRightChallenge = (): TrainingChallenge => {
    const prefixes = ['ID', 'SKU', 'REF'];
    const suffixes = ['-A', '-B', '-C'];
    const prefix = getRandomItem(prefixes);
    const suffix = getRandomItem(suffixes);
    const code = `${prefix}-${getRandomInt(100,999)}${suffix}`;
    const useLeft = Math.random() > 0.5;

    // Target cell C2 (0-indexed: r=1, c=2)
    const targetCell = { r: 1, c: 2 };

    if (useLeft) {
        return {
            challenge: `Di sel C2, gunakan fungsi LEFT untuk mengekstrak kode "${prefix}" dari teks di sel A2.`,
            table: { headers: ['Kode'], rows: [[code]] },
            answer: { type: 'formula', correctValue: `=LEFT(A2;${prefix.length})` },
            explanation: `Fungsi LEFT(A2; ${prefix.length}) mengambil ${prefix.length} karakter dari sisi kiri teks di A2.`,
            targetCell,
            correctResult: prefix
        }
    } else {
        return {
            challenge: `Di sel C2, gunakan fungsi RIGHT untuk mengekstrak kode "${suffix}" dari teks di sel A2.`,
            table: { headers: ['Kode'], rows: [[code]] },
            answer: { type: 'formula', correctValue: `=RIGHT(A2;${suffix.length})` },
            explanation: `Fungsi RIGHT(A2; ${suffix.length}) mengambil ${suffix.length} karakter dari sisi kanan teks di A2.`,
            targetCell,
            correctResult: suffix
        }
    }
};

const challengeGenerators = [
    generateVlookupChallenge,
    generateSumifChallenge,
    generateLeftRightChallenge
];

export const generateRandomChallenge = (): TrainingChallenge => {
    const generator = getRandomItem(challengeGenerators);
    return generator();
};