import React from 'react';
import { dinhDangGia } from '../utils/format';

export default function MonAnCard({ mon, dangChon, onChon, onDat }) {
  const handleDatMon = (e) => {
    e.stopPropagation();
    if (!mon.daHet && onDat) {
      onDat(mon.id);
    }
  };

  return (
    <article
      className={`mon-an-card ${dangChon ? 'dang-chon' : ''} ${mon.daHet ? 'het-hang' : ''}`}
      onClick={() => onChon && onChon(mon.id)}
    >
      <div>
        <h3>{mon.ten}</h3>
        <p className="mo-ta">{mon.moTa}</p>
      </div>
      <div>
        <div className="gia-va-trang-thai">
          <span className="gia">{dinhDangGia(mon.gia)}</span>
          {mon.daHet && <span className="het-mon">Hết món</span>}
        </div>
        <button
          type="button"
          disabled={mon.daHet}
          onClick={handleDatMon}
          style={{ width: '100%' }}
        >
          Đặt món
        </button>
      </div>
    </article>
  );
}