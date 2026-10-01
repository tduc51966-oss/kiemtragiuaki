import React, { useMemo } from "react";
import { dinhDangGia } from "../utils/format";

export default function GioHang({ gio = [], dsMon = [] }) {
  const chiTietGio = useMemo(() => {
    return gio.map((item) => {
      const mon = dsMon.find((m) => m.id === item.id);
      return {
        ...item,
        ten: mon ? mon.ten : "",
        gia: mon ? mon.gia : 0,
        thanhTien: (mon ? mon.gia : 0) * item.soLuong
      };
    });
  }, [gio, dsMon]);

  const tongTien = useMemo(() => {
    return chiTietGio.reduce((sum, item) => sum + item.thanhTien, 0);
  }, [chiTietGio]);

  return (
    <div data-testid="gio-hang" className="gio-hang">
      {gio.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <ul style={{ paddingLeft: "20px" }}>
            {chiTietGio.map((item) => (
              <li key={item.id}>
                {item.ten} × {item.soLuong} — {dinhDangGia(item.thanhTien)}
              </li>
            ))}
          </ul>
          <div className="tong-tien-container" style={{ fontWeight: "bold", marginTop: "10px" }}>
            Tổng tiền: <span data-testid="tong-tien">{dinhDangGia(tongTien)}</span>
          </div>
        </>
      )}
    </div>
  );
}
