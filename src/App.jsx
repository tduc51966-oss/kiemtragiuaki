import React, { useState } from 'react';
import './index.css';

// Dữ liệu món ăn Huế với link ảnh CDN siêu ổn định
const INITIAL_MENU = [
 { 
    id: 1, 
    name: 'Bún bò Huế', 
    price: 45000, 
    description: 'Đặc sản Huế đậm đà chuẩn vị truyền thống', 
    image: 'https://static.vinwonders.com/production/bun-bo-hue-ngon-o-sai-gon-1.jpg',
    isOutStock: false 
  },
  { 
    id: 2, 
    name: 'Bánh bèo', 
    price: 30000, 
    description: 'Khay 10 chén nóng hổi tôm thịt xào thơm lừng', 
    image: 'https://vietfood.org.vn/wp-content/uploads/2021/05/BanhBeo2.jpg',
    isOutStock: false 
  },
  { 
    id: 3, 
    name: 'Bánh bột lọc', 
    price: 35000, 
    description: 'Nhân tôm thịt đậm vị, vỏ bánh trong suốt', 
    image: 'https://i.ytimg.com/vi/cIW9IrNk-5w/maxresdefault.jpg',
    isOutStock: true 
  },
  { 
    id: 4, 
    name: 'Bánh nậm', 
    price: 30000, 
    description: 'Gói lá dong thơm phức, nhân tôm mềm mịn', 
    image: 'https://khamphahue.com.vn/Portals/0/Medias/Nam2022/T7/Khamphahue_banh-nam-hue.jpg',
    isOutStock: false 
  },
  { 
    id: 5, 
    name: 'Nem lụi', 
    price: 50000, 
    description: 'Nướng than hoa thơm lừng kèm nước lèo đặc biệt', 
    image: 'https://cdn.hstatic.net/files/200000700229/article/cach-lam-nem-lui-1_20237bf68ee74fd38d80e6184aeb1652.jpg',
    isOutStock: false 
  },
  { 
    id: 6, 
    name: 'Chè hé Huế', 
    price: 20000, 
    description: 'Chè hạt sen thanh mát giải nhiệt', 
    image: 'https://static.vinwonders.com/production/Quan-che-Hue-2.jpeg',
    isOutStock: false 
  },
];

export default function App() {
  const [menu] = useState(INITIAL_MENU);
  const [cart, setCart] = useState([]);
  const [placedOrders, setPlacedOrders] = useState([]);

  // State Form thông tin
  const [formData, setFormData] = useState({ fullName: '', phone: '', note: '' });
  const [nameError, setNameError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Thêm món vào giỏ hàng
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === item.id);
      if (existing) {
        return prevCart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Xóa giỏ hàng
  const handleClearCart = () => {
    setCart([]);
  };

  // Tính tổng số lượng & tổng tiền giỏ hàng hiện tại
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Xử lý gửi đơn
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Vui lòng chọn ít nhất 1 món ăn trước khi đặt đơn!');
      return;
    }

    if (formData.fullName.trim().length < 2) {
      setNameError('Họ tên cần ít nhất 2 ký tự');
      return;
    }

    // Tạo đơn hàng mới
    const newOrder = {
      id: Date.now(),
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      customer: { ...formData },
      items: [...cart],
      totalAmount: totalPrice
    };

    setPlacedOrders((prev) => [newOrder, ...prev]);
    setNameError('');
    setOrderSuccess(true);
    setCart([]);
    setFormData({ fullName: '', phone: '', note: '' });

    setTimeout(() => {
      setOrderSuccess(false);
    }, 4000);
  };

  return (
    <div className="app-layout">
      {/* Header Thanh Cố Định */}
      <header className="header">
        <div className="header-brand">
          <span className="logo-icon">🏮</span>
          <h1>Quán Huế Xưa</h1>
        </div>
        <div className="cart-badge">
          🛒 Giỏ hàng: <span>[{totalItems}]</span> phần
        </div>
      </header>

      {/* Thông báo đặt hàng thành công */}
      {orderSuccess && (
        <div className="success-banner">
          🎉 Đặt món thành công! Đơn hàng của bạn đã được tiếp nhận ở danh sách bên dưới!
        </div>
      )}

      {/* Main Container */}
      <main className="container">
        {/* Cột Trái: Danh Sách Món Ăn (Grid Layout có Ảnh) */}
        <section className="menu-section">
          <h2 className="section-title">Thực đơn đặc sản</h2>
          <div className="menu-grid">
            {menu.map((item) => (
              <div key={item.id} className={`food-card ${item.isOutStock ? 'out-of-stock' : ''}`}>
                <div className="food-img-wrapper">
                  <img src={item.image} alt={item.name} className="food-img" />
                  {item.isOutStock && <span className="stock-badge">Hết món</span>}
                </div>
                <div className="food-info">
                  <h3 className="food-title">{item.name}</h3>
                  <p className="food-desc">{item.description}</p>
                </div>
                <div className="food-footer">
                  <span className="price">{item.price.toLocaleString('vi-VN')} đ</span>
                  <button
                    className="btn-add"
                    disabled={item.isOutStock}
                    onClick={() => handleAddToCart(item)}
                  >
                    {item.isOutStock ? 'Hết món' : '+ Đặt món'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cột Phải: Panel Giỏ Hàng, Form Thông Tin & Đơn Hàng Đã Đặt */}
        <aside className="sidebar-panel">
          {/* Khối Giỏ Hàng */}
          <div className="cart-block">
            <div className="panel-header">
              <h3>Giỏ hàng của bạn</h3>
              {cart.length > 0 && (
                <button className="btn-clear" onClick={handleClearCart}>
                  Xóa giỏ hàng
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart">Chưa có món nào trong giỏ hàng</p>
            ) : (
              <ul className="cart-list">
                {cart.map((c) => (
                  <li key={c.id} className="cart-item">
                    <span className="cart-item-name">{c.name} × {c.quantity}</span>
                    <span className="cart-item-price">
                      {(c.price * c.quantity).toLocaleString('vi-VN')} đ
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="total-price">
              <span>Tổng tiền:</span>
              <span className="total-amount">{totalPrice.toLocaleString('vi-VN')} đ</span>
            </div>
          </div>

          {/* Khối Form Thông Tin Nhận Món */}
          <div className="form-block">
            <h3 className="form-title">Thông tin nhận món</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label>Họ tên *</label>
                <input
                  type="text"
                  placeholder="Nhập họ tên người nhận"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (e.target.value.trim().length >= 2) setNameError('');
                  }}
                />
                {nameError && <span className="error-text">{nameError}</span>}
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Ghi chú</label>
                <textarea
                  rows="3"
                  placeholder="Ghi chú thêm cho nhà hàng..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                Xác Nhận Đặt Đơn
              </button>
            </form>
          </div>

          {/* Khối Đơn Hàng Đã Đặt */}
          {placedOrders.length > 0 && (
            <div className="orders-block">
              <h3 className="form-title">📋 Đơn hàng đã đặt ({placedOrders.length})</h3>
              <div className="orders-list">
                {placedOrders.map((order, idx) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <strong>Đơn #{placedOrders.length - idx}</strong>
                      <span className="order-time">{order.createdAt}</span>
                    </div>
                    <p className="order-customer">👤 {order.customer.fullName} {order.customer.phone ? `(${order.customer.phone})` : ''}</p>
                    <ul className="order-items-detail">
                      {order.items.map((it) => (
                        <li key={it.id}>
                          • {it.name} × {it.quantity}
                        </li>
                      ))}
                    </ul>
                    {order.customer.note && <p className="order-note">📝 Ghi chú: {order.customer.note}</p>}
                    <div className="order-total">
                      <span>Tổng tiền:</span>
                      <strong>{order.totalAmount.toLocaleString('vi-VN')} đ</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}