export function dinhDangGia(gia) {
  return new Intl.NumberFormat("vi-VN").format(gia) + " đ";
}
