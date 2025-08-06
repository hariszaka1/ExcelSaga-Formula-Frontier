import React, { useState, useCallback, useMemo } from 'react';
import { ArrowUturnLeftIcon, CheckCircleIcon, ArrowDownIcon, ArrowRightIcon, PlusIcon, TableCellsIcon, XCircleIcon } from '@heroicons/react/24/solid';

const scenarios = [
  {
    fields: ['Wilayah', 'Produk', 'Penjualan'],
    solution: {
      rows: ['Wilayah'],
      columns: ['Produk'],
      values: ['Penjualan'],
    },
    task: 'Buat laporan yang menunjukkan total Penjualan untuk setiap Produk (kolom) di setiap Wilayah (baris).',
  },
  {
    fields: ['Tanggal', 'Kategori', 'Profit'],
    solution: {
      rows: ['Kategori'],
      columns: [],
      values: ['Profit'],
    },
    task: 'Buat ringkasan sederhana yang menjumlahkan total Profit untuk setiap Kategori (baris).',
  },
];

type DropZone = 'rows' | 'columns' | 'values';

export const PivotPro: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [placements, setPlacements] = useState<{ rows: string[], columns: string[], values: string[] }>({ rows: [], columns: [], values: [] });
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const scenario = useMemo(() => scenarios[currentScenarioIndex], [currentScenarioIndex]);
  const availableFields = useMemo(() => scenario.fields.filter(f => ![...placements.rows, ...placements.columns, ...placements.values].includes(f)), [scenario, placements]);

  const resetPlacements = useCallback(() => {
    setPlacements({ rows: [], columns: [], values: [] });
    setSelectedField(null);
    setFeedback('');
  }, []);

  const handleFieldClick = (field: string) => {
    if (selectedField === field) {
      setSelectedField(null); // Deselect
    } else {
      setSelectedField(field);
    }
  };

  const handleZoneClick = (zone: DropZone) => {
    if (!selectedField) return;
    setPlacements(prev => ({ ...prev, [zone]: [...prev[zone], selectedField] }));
    setSelectedField(null);
  };
  
  const handleRemoveField = (zone: DropZone, field: string) => {
    setPlacements(prev => ({...prev, [zone]: prev[zone].filter(f => f !== field)}));
  }

  const checkAnswer = () => {
    const isCorrect = 
      JSON.stringify(placements.rows.sort()) === JSON.stringify(scenario.solution.rows.sort()) &&
      JSON.stringify(placements.columns.sort()) === JSON.stringify(scenario.solution.columns.sort()) &&
      JSON.stringify(placements.values.sort()) === JSON.stringify(scenario.solution.values.sort());

    if (isCorrect) {
      setFeedback('Tepat sekali! PivotTable berhasil dibuat.');
      setScore(prev => prev + 1);
    } else {
      setFeedback('Belum tepat. Coba periksa kembali penempatan field Anda.');
    }
    
    setTimeout(() => {
        if (currentScenarioIndex < scenarios.length - 1) {
            setCurrentScenarioIndex(prev => prev + 1);
            resetPlacements();
        } else {
            setIsFinished(true);
        }
    }, 2000);
  };
  
  const resetGame = () => {
      setCurrentScenarioIndex(0);
      setScore(0);
      setIsFinished(false);
      resetPlacements();
  }

  const DropZoneComponent: React.FC<{zone: DropZone, title: string, icon: React.ReactNode}> = ({zone, title, icon}) => (
      <div 
          onClick={() => handleZoneClick(zone)}
          className={`p-3 border-2 border-dashed rounded-lg min-h-[100px] transition-colors ${selectedField ? 'border-sky-500 bg-sky-50 cursor-pointer' : 'border-slate-300'}`}
      >
          <h4 className="font-semibold text-slate-600 text-sm flex items-center gap-1.5 mb-2">{icon}{title}</h4>
          <div className="flex flex-wrap gap-1.5">
              {placements[zone].map(field => (
                  <div key={field} className="bg-slate-600 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                      {field}
                      <button onClick={(e) => { e.stopPropagation(); handleRemoveField(zone, field);}} className="text-white/70 hover:text-white">
                          <XCircleIcon className="w-3 h-3"/>
                      </button>
                  </div>
              ))}
          </div>
      </div>
  );
  
  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
        <TableCellsIcon className="w-16 h-16 text-teal-500 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-800 mt-4">Permainan Selesai!</h2>
        <p className="text-slate-600 mt-2">Skor akhir Anda:</p>
        <p className="text-6xl font-bold text-teal-600 my-4">{score}/{scenarios.length}</p>
        <div className="flex justify-center gap-4">
          <button onClick={resetGame} className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition">Main Lagi</button>
          <button onClick={onBack} className="px-6 py-2 bg-slate-200 text-slate-800 font-bold rounded-lg shadow-sm hover:bg-slate-300 transition">Kembali ke Arcade</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-bold text-slate-800">Pivot Pro</h2>
        <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-300 transition-colors">
          <ArrowUturnLeftIcon className="w-5 h-5" /> Kembali
        </button>
      </div>
      <p className="text-slate-500 mb-4">Skor: {score}</p>

      <p className="p-3 bg-slate-100 rounded-lg text-slate-800 mb-4 font-medium">{scenario.task}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h3 className="font-bold text-slate-700 mb-2">Field Tersedia</h3>
          <div className="space-y-2">
            {availableFields.map(field => (
              <button key={field} onClick={() => handleFieldClick(field)} className={`w-full p-2 rounded-lg border-2 text-left font-semibold transition-colors ${selectedField === field ? 'bg-sky-500 text-white border-sky-500' : 'bg-white border-slate-300 hover:bg-slate-100'}`}>
                {field}
              </button>
            ))}
             {availableFields.length === 0 && <p className="text-xs text-slate-500">Semua field sudah ditempatkan.</p>}
          </div>
        </div>
        <div className="md:col-span-2 space-y-4">
          <DropZoneComponent zone="rows" title="Baris (Rows)" icon={<ArrowDownIcon className="w-4 h-4"/>}/>
          <DropZoneComponent zone="columns" title="Kolom (Columns)" icon={<ArrowRightIcon className="w-4 h-4"/>}/>
          <DropZoneComponent zone="values" title="Nilai (Values)" icon={<PlusIcon className="w-4 h-4"/>}/>
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-4">
        <button onClick={checkAnswer} disabled={availableFields.length > 0} className="px-6 py-2 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
          Periksa PivotTable
        </button>
        {feedback && <p className={`font-semibold ${feedback.includes('Tepat') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}
      </div>
    </div>
  );
};