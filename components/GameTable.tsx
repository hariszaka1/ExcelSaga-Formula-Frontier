
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface TableData {
    headers: string[];
    rows: (string | number)[][];
}

interface GameTableProps {
    table: TableData;
    onRangeSelect: (range: string) => void;
}


const toColName = (col: number): string => {
    let s = '', t;
    while (col >= 0) {
      t = col % 26;
      s = String.fromCharCode(t + 65) + s;
      col = Math.floor(col / 26) - 1;
    }
    return s;
};

const toA1 = (row: number, col: number): string => `${toColName(col)}${row}`;

const isCellInRange = (
    cellRow: number,
    cellCol: number,
    start: { row: number; col: number } | null,
    end: { row: number; col: number } | null
): boolean => {
    if (!start || !end) return false;
    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);
    const minCol = Math.min(start.col, end.col);
    const maxCol = Math.max(start.col, end.col);
    return cellRow >= minRow && cellRow <= maxRow && cellCol >= minCol && cellCol <= maxCol;
};


export const GameTable: React.FC<GameTableProps> = ({ table, onRangeSelect }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selection, setSelection] = useState<{
        start: { row: number; col: number } | null;
        end: { row: number; col: number } | null;
        type: 'cell' | 'row' | 'col';
    }>({ start: null, end: null, type: 'cell' });
    const tableRef = useRef<HTMLDivElement>(null);
    const numCols = table.headers.length;
    const numRows = table.rows.length + 1;

    const getRangeString = useCallback((start, end, type) => {
        if (!start || !end) return '';

        const minRow = Math.min(start.row, end.row);
        const maxRow = Math.max(start.row, end.row);
        const minCol = Math.min(start.col, end.col);
        const maxCol = Math.max(start.col, end.col);
        
        if (type === 'row') return `${minRow}:${maxRow}`;
        if (type === 'col') return `${toColName(minCol)}:${toColName(maxCol)}`;

        const startA1 = toA1(minRow, minCol);
        const endA1 = toA1(maxRow, maxCol);
        return startA1 === endA1 ? startA1 : `${startA1}:${endA1}`;
    }, []);

    const handleMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
            if (selection.start && selection.end) {
                const rangeStr = getRangeString(selection.start, selection.end, selection.type);
                if (rangeStr) onRangeSelect(rangeStr);
            }
        }
    }, [isDragging, selection, onRangeSelect, getRangeString]);
    
    const handleCellMouseDown = (row: number, col: number) => {
        setIsDragging(true);
        setSelection({ start: { row, col }, end: { row, col }, type: 'cell' });
    };
    
    const handleRowHeaderMouseDown = (row: number) => {
        setIsDragging(true);
        setSelection({
            start: { row, col: 0 },
            end: { row, col: numCols - 1 },
            type: 'row'
        });
    };
    
    const handleColHeaderMouseDown = (col: number) => {
        setIsDragging(true);
        setSelection({
            start: { row: 1, col },
            end: { row: numRows, col },
            type: 'col'
        });
    };
    
    const handleMouseOver = (row: number, col: number) => {
        if (!isDragging) return;
        
        let newEnd = selection.end;
        switch (selection.type) {
            case 'cell':
                newEnd = { row, col };
                break;
            case 'row':
                newEnd = { ...selection.end, row };
                break;
            case 'col':
                newEnd = { ...selection.end, col };
                break;
        }
        setSelection(prev => ({ ...prev, end: newEnd }));
    };
    
    useEffect(() => {
        const handleMouseUpGlobal = (e: MouseEvent) => {
            if (isDragging) {
                handleMouseUp();
            }
        };

        if (isDragging) {
            document.addEventListener('mouseup', handleMouseUpGlobal);
        }
        
        return () => {
            document.removeEventListener('mouseup', handleMouseUpGlobal);
        };
    }, [isDragging, handleMouseUp]);

    return (
        <div ref={tableRef} onMouseUp={handleMouseUp} className="my-6 overflow-x-auto" style={{ userSelect: 'none' }}>
            <table className="w-full text-sm text-left text-slate-600 border-collapse">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="p-2 border border-slate-300 bg-slate-200 sticky left-0 top-0 z-20 w-12"
                            aria-label="Select all"
                        ></th>
                        {table.headers.map((_, colIndex) => {
                            const isSelected = isCellInRange(1, colIndex, selection.start, selection.end);
                            return (
                                <th
                                    key={colIndex}
                                    scope="col"
                                    onMouseDown={() => handleColHeaderMouseDown(colIndex)}
                                    onMouseOver={() => handleMouseOver(1, colIndex)}
                                    className={`px-4 py-2 border border-slate-300 text-center font-semibold text-slate-500 bg-slate-200 sticky top-0 z-10 min-w-[100px] cursor-pointer transition-colors ${isSelected ? 'bg-green-200' : 'hover:bg-slate-300'}`}
                                >
                                    {String.fromCharCode(65 + colIndex)}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white">
                        <th
                            scope="row"
                            onMouseDown={() => handleRowHeaderMouseDown(1)}
                            onMouseOver={() => handleMouseOver(1, 0)}
                            className={`px-4 py-3 border border-slate-300 text-center font-semibold text-slate-500 bg-slate-200 sticky left-0 z-10 cursor-pointer transition-colors ${isCellInRange(1, 0, selection.start, selection.end) ? 'bg-green-200' : 'hover:bg-slate-300'}`}
                        >1</th>
                        {table.headers.map((header, cellIndex) => {
                            const isSelected = isCellInRange(1, cellIndex, selection.start, selection.end);
                            const isActive = selection.start?.row === 1 && selection.start?.col === cellIndex;
                            return (
                                <td
                                    key={cellIndex}
                                    onMouseDown={() => handleCellMouseDown(1, cellIndex)}
                                    onMouseOver={() => handleMouseOver(1, cellIndex)}
                                    className={`relative px-4 py-3 border border-slate-200 font-bold text-slate-700 cursor-pointer transition-colors ${isSelected ? 'bg-green-100/50' : ''} ${isActive && !isDragging ? 'ring-2 ring-inset ring-green-500 z-10' : ''}`}
                                >
                                    {header}
                                    {isActive && !isDragging && (
                                        <div className="absolute -right-[2px] -bottom-[2px] w-1.5 h-1.5 bg-green-500 border-2 border-white cursor-nwse-resize"></div>
                                    )}
                                </td>
                            )
                        })}
                    </tr>
                    {table.rows.map((row, rowIndex) => {
                        const actualRowIndex = rowIndex + 2;
                        return (
                            <tr key={rowIndex} className="bg-white even:bg-slate-50/50">
                                <th
                                    scope="row"
                                    onMouseDown={() => handleRowHeaderMouseDown(actualRowIndex)}
                                    onMouseOver={() => handleMouseOver(actualRowIndex, 0)}
                                    className={`px-4 py-3 border border-slate-300 text-center font-semibold text-slate-500 bg-slate-200 sticky left-0 z-10 cursor-pointer transition-colors ${isCellInRange(actualRowIndex, 0, selection.start, selection.end) ? 'bg-green-200' : 'hover:bg-slate-300'}`}
                                >{actualRowIndex}</th>
                                {row.map((cell, cellIndex) => {
                                    const isSelected = isCellInRange(actualRowIndex, cellIndex, selection.start, selection.end);
                                    const isActive = selection.start?.row === actualRowIndex && selection.start?.col === cellIndex;
                                    return (
                                        <td
                                            key={cellIndex}
                                            onMouseDown={() => handleCellMouseDown(actualRowIndex, cellIndex)}
                                            onMouseOver={() => handleMouseOver(actualRowIndex, cellIndex)}
                                            className={`relative px-4 py-3 border border-slate-200 cursor-pointer transition-colors ${isSelected ? 'bg-green-100/50' : ''} ${isActive && !isDragging ? 'ring-2 ring-inset ring-green-500 z-10' : ''}`}
                                        >
                                            {cell}
                                            {isActive && !isDragging && (
                                                <div className="absolute -right-[2px] -bottom-[2px] w-1.5 h-1.5 bg-green-500 border-2 border-white cursor-nwse-resize"></div>
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};
