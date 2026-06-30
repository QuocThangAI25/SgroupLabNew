window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    // Nếu cuộn xuống hơn 50px
    header.classList.add("scrolled");
  } else {
    // Nếu quay lại đỉnh trang
    header.classList.remove("scrolled");
  }
});
// Khởi tạo hiệu ứng cuộn mượt trực tiếp bằng thư viện Lenis
const lenis = new Lenis({
  duration: 1.2, // Thời gian trượt (giây) - số càng lớn trượt càng lâu và mượt
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Hàm tạo độ trôi chậm dần khi dừng hẳn
  direction: "vertical",
  smooth: true,
  mouseMultiplier: 1, // Tốc độ phản hồi của con lăn chuột
  smoothTouch: false, // Tắt trên điện thoại vì điện thoại vốn đã tự cuộn mượt bằng tay
});

// Kích hoạt vòng lặp cập nhật khung hình cuộn mượt
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
// Sự kiện lắng nghe hành vi cuộn trang của người dùng
window.addEventListener("scroll", () => {
  // 1. Lấy khoảng cách mà người dùng đã cuộn xuống (tính từ đỉnh trang)
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  // 2. Tính tổng chiều cao thực tế của toàn bộ nội dung trang web
  const totalHeight = document.documentElement.scrollHeight;

  // 3. Lấy chiều cao của khung hiển thị màn hình (khu vực người dùng nhìn thấy)
  const clientHeight = document.documentElement.clientHeight;

  // 4. Tính toán phần trăm cuộn: Khoảng cách đã cuộn / (Tổng chiều cao trang - Khung màn hình)
  const scrolledPercentage = (scrollTop / (totalHeight - clientHeight)) * 100;

  // 5. Cập nhật trực tiếp thuộc tính chiều rộng (width) cho thanh tiến độ trong CSS
  const progressBar = document.getElementById("scroll-progress-bar");
  if (progressBar) {
    progressBar.style.width = scrolledPercentage + "%";
  }
});
// Sự kiện kích hoạt khi TOÀN BỘ trang (hình ảnh, cấu trúc, dữ liệu) đã tải xong hoàn toàn
window.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("loader-progress-bar");
  const preloader = document.getElementById("preloader");

  if (!progressBar || !preloader) return;

  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 5;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      setTimeout(() => {
        preloader.classList.add("loaded");
      }, 300);
    }

    progressBar.style.width = progress + "%";
  }, 80);
});
// Khởi tạo thư viện hiệu ứng cuộn xuất hiện
AOS.init({
  duration: 1000, // Thời gian diễn ra hiệu ứng (1000ms = 1 giây)
  once: true, // Hiệu ứng chỉ chạy 1 lần khi cuộn xuống (cuộn lên không bị ẩn đi chạy lại)
  offset: 120, // Khoảng cách (px) tính từ mép màn hình trước khi kích hoạt hiệu ứng
  easing: "ease-out", // Kiểu chuyển động mượt mà chậm dần khi gần kết thúc
});

//
// Lắng nghe sự kiện click vào các thẻ link menu có dấu #
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Chặn hành vi nhảy "bụp" lập tức của trình duyệt

    // Lấy tên ID từ thuộc tính href (Ví dụ: "#lich-dien" sẽ lấy ra "lich-dien")
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Ép thư viện Lenis thực hiện lệnh cuộn mượt đến vị trí thẻ đó
      lenis.scrollTo(targetElement, {
        offset: -90, // Cách mép trên 90px để không bị menu cố định che mất chữ
        duration: 1.5, // Thời gian cuộn (1.5 giây), số càng lớn cuộn càng từ tốn sang trọng
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Hiệu ứng trượt chậm dần khi dừng
      });
    }
  });
});
