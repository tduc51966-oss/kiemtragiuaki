import React from "react";

export default function Header({ tongPhan = 0 }) {
  const tenQuan = import.meta.env.VITE_TEN_QUAN || "Quán Huế Xưa";
  return (
    <header className="header" style={{ padding: "10px 20px", background: "#f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1 style={{ margin: 0 }}>{tenQuan}</h1>
      <div className="gio-hang-tom-tat">
        Giỏ: <span data-testid="tong-phan">[{tongPhan}]</span> phần
      </div>
    </header>
  );
}
