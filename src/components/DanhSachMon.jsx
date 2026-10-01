import React from 'react';
import MonAnCard from './MonAnCard';

export default function DanhSachMon({ dsMon = [], idDangChon, onChonMon, onDatMon }) {
  return (
    <div className="danh-sach-mon">
      {dsMon.map((mon) => (
        <MonAnCard
          key={mon.id}
          mon={mon}
          dangChon={idDangChon === mon.id}
          onChon={onChonMon}
          onDat={onDatMon}
        />
      ))}
    </div>
  );
}