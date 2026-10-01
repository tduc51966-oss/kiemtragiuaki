import React, { useState, useRef, useEffect } from "react";

export default function FormDatMon({ onGui, choPhepGui }) {
  const [formData, setFormData] = useState({ hoTen: "", soDienThoai: "", ghiChu: "" });
  const [errors, setErrors] = useState({});
  const hoTenRef = useRef(null);

  useEffect(() => {
    if (hoTenRef.current) hoTenRef.current.focus();
  }, []);

  const kiemTraGiaTri = (name, value) => {
    const val = value.trim();
    if (name === "hoTen" && (!val || val.length < 2)) return "Họ tên cần ít nhất 2 ký tự";
    if (name === "soDienThoai") {
      const phoneRegex = /^0\d{9}$/;
      if (!phoneRegex.test(val)) return "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: kiemTraGiaTri(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loiHoTen = kiemTraGiaTri("hoTen", formData.hoTen);
    const loiSoDienThoai = kiemTraGiaTri("soDienThoai", formData.soDienThoai);

    if (loiHoTen || loiSoDienThoai) {
      setErrors({ hoTen: loiHoTen, soDienThoai: loiSoDienThoai });
      return;
    }

    if (onGui) {
      onGui({
        hoTen: formData.hoTen.trim(),
        soDienThoai: formData.soDienThoai.trim(),
        ghiChu: formData.ghiChu.trim()
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-dat-mon" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="hoTen">Họ tên</label>
        <input ref={hoTenRef} type="text" id="hoTen" name="hoTen" value={formData.hoTen} onChange={handleChange} onBlur={handleBlur} />
        {errors.hoTen && <p className="loi" role="alert" style={{ color: "red", margin: "2px 0 0 0", fontSize: "0.85rem" }}>{errors.hoTen}</p>}
      </div>

      <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="soDienThoai">Số điện thoại</label>
        <input type="text" id="soDienThoai" name="soDienThoai" value={formData.soDienThoai} onChange={handleChange} onBlur={handleBlur} />
        {errors.soDienThoai && <p className="loi" role="alert" style={{ color: "red", margin: "2px 0 0 0", fontSize: "0.85rem" }}>{errors.soDienThoai}</p>}
      </div>

      <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="ghiChu">Ghi chú</label>
        <textarea id="ghiChu" name="ghiChu" value={formData.ghiChu} onChange={handleChange} />
      </div>

      <button type="submit" disabled={!choPhepGui} style={{ padding: "8px", marginTop: "5px" }}>
        Gửi đơn
      </button>
    </form>
  );
}
