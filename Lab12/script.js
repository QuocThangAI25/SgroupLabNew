// Xử lý sự kiện click cho nút "Quick access"
document.addEventListener("DOMContentLoaded", () => {
  const quickAccessBtn = document.getElementById("quickAccessBtn");

  quickAccessBtn.addEventListener("click", () => {
    alert("Tính năng Quick Access đang được phát triển!");
  });
});
// Bắt sự kiện cuộn trang
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header"); // Đổi tên class header nếu trang bạn dùng tên khác

  // Nếu cuộn xuống lớn hơn 20px thì bật hiệu ứng mờ
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
// --- ANIMATION ON SCROLL / LOAD ---
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Nếu muốn hiệu ứng chỉ chạy 1 lần khi cuộn qua thì gỡ comment dòng dưới:
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.15, // Xuất hiện khi phần tử vào màn hình 15%
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});
