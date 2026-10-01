import React from "react";

export default function Khung({ tieuDe, hanhDong, children }) {
  return (
    <section className="khung" style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px" }}>
      <div className="khung-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <h2 style={{ margin: 0, fontSize: "1.2rem" }}>{tieuDe}</h2>
        {hanhDong && <div className="khung-hanh-dong">{hanhDong}</div>}
      </div>
      <div className="khung-noi-dung">{children}</div>
    </section>
  );
}
