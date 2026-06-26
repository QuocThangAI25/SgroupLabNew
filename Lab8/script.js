const LEVELS = [
  {
    id: 1,
    name: "Dễ",
    pairs: 4, // 4 cặp = 8 thẻ
    cols: 4, // 4 cột
    rows: 2, // 2 hàng
    timeLimit: 0, // 0 = không giới hạn
    emojis: ["🍎", "🍌", "🍇", "🍊"],
  },
  {
    id: 2,
    name: "Trung bình",
    pairs: 6,
    cols: 4,
    rows: 3,
    timeLimit: 0,
    emojis: ["🍎", "🍌", "🍇", "🍊", "🍓", "🍒"],
  },
  {
    id: 3,
    name: "Khó",
    pairs: 8,
    cols: 4,
    rows: 4,
    timeLimit: 60, // 60 giây
    emojis: ["🍎", "🍌", "🍇", "🍊", "🍓", "🍒", "🍉", "🍑"],
  },
  {
    id: 4,
    name: "Siêu khó",
    pairs: 10,
    cols: 5,
    rows: 4,
    timeLimit: 45,
    emojis: ["🍎", "🍌", "🍇", "🍊", "🍓", "🍒", "🍉", "🍑", "🥝", "🍍"],
  },
  {
    id: 5,
    name: "Thách thức",
    pairs: 12,
    cols: 6,
    rows: 4,
    timeLimit: 30,
    emojis: [
      "🍎",
      "🍌",
      "🍇",
      "🍊",
      "🍓",
      "🍒",
      "🍉",
      "🍑",
      "🥝",
      "🍍",
      "🍋",
      "🍐",
    ],
  },
];

// =============================================
// 2. BIẾN TOÀN CỤC - QUẢN LÝ TRẠNG THÁI GAME
// =============================================
let currentLevelIndex = 0; // Level hiện tại (0 = level 1)
let cards = []; // Mảng chứa tất cả thẻ
let flippedCards = []; // Lưu các thẻ đang lật (tối đa 2)
let matchedPairs = 0; // Số cặp đã ghép đúng
let totalPairs = 0; // Tổng số cặp của level
let moves = 0; // Số lượt lật
let isLocked = false; // Khóa khi đang kiểm tra 2 thẻ
let timer = 0; // Thời gian còn lại
let timerInterval = null; // ID của interval đếm giờ
let gameCompleted = false; // Đã hoàn thành level chưa

// =============================================
// 3. HÀM TIỆN ÍCH
// =============================================

// Xáo trộn mảng (thuật toán Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// =============================================
// 4. HÀM KHỞI TẠO LEVEL
// =============================================
function initLevel(levelIndex) {
  // Lấy thông tin level
  const level = LEVELS[levelIndex];
  currentLevelIndex = levelIndex;
  totalPairs = level.pairs;

  // Dừng đồng hồ cũ nếu có
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // Reset trạng thái
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  isLocked = false;
  gameCompleted = false;
  timer = level.timeLimit;

  // Tạo bộ thẻ: mỗi icon xuất hiện 2 lần
  let deck = [];
  for (let i = 0; i < level.pairs; i++) {
    deck.push(level.emojis[i]);
    deck.push(level.emojis[i]);
  }
  // Xáo trộn thẻ
  shuffleArray(deck);

  // Tạo mảng cards với thông tin chi tiết
  cards = deck.map((emoji, index) => ({
    id: index,
    emoji: emoji,
    flipped: false, // true = đang lật
    matched: false, // true = đã ghép đôi
  }));

  // Cập nhật giao diện
  updateUI();
  renderBoard();

  // Nếu có giới hạn thời gian thì bắt đầu đếm
  if (level.timeLimit > 0) {
    startTimer();
  }

  // Ẩn popup chiến thắng nếu đang hiển thị
  document.getElementById("winPopup").classList.remove("show");
}

// =============================================
// 5. HÀM HIỂN THỊ BẢNG THẺ
// =============================================
function renderBoard() {
  const board = document.getElementById("board");
  const level = LEVELS[currentLevelIndex];

  // Thiết lập số cột cho grid
  board.style.gridTemplateColumns = `repeat(${level.cols}, 1fr)`;
  board.innerHTML = ""; // Xóa thẻ cũ

  // Tạo từng thẻ
  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.dataset.index = index;

    // Hiển thị nội dung thẻ
    if (card.matched) {
      // Thẻ đã ghép đôi: hiện icon và màu xanh
      cardElement.textContent = card.emoji;
      cardElement.classList.add("matched");
    } else if (card.flipped) {
      // Thẻ đang lật: hiện icon
      cardElement.textContent = card.emoji;
      cardElement.classList.add("flipped");
    } else {
      // Thẻ úp: hiện dấu ?
      cardElement.textContent = "❓";
    }

    // Gắn sự kiện click
    cardElement.addEventListener("click", () => {
      handleCardClick(index);
    });

    board.appendChild(cardElement);
  });
}

// =============================================
// 6. HÀM XỬ LÝ CLICK VÀO THẺ
// =============================================
function handleCardClick(index) {
  // Kiểm tra điều kiện: không được click khi đang khóa, game đã xong, hoặc thẻ đã ghép
  if (isLocked || gameCompleted) return;

  const card = cards[index];

  // Không được click thẻ đã lật hoặc đã ghép
  if (card.flipped || card.matched) return;

  // Không được lật quá 2 thẻ
  if (flippedCards.length >= 2) return;

  // Lật thẻ
  card.flipped = true;
  moves++;
  flippedCards.push(index);

  // Cập nhật giao diện
  renderBoard();
  updateUI();

  // Kiểm tra nếu đã lật đủ 2 thẻ
  if (flippedCards.length === 2) {
    isLocked = true; // Khóa không cho click tiếp

    const index1 = flippedCards[0];
    const index2 = flippedCards[1];
    const card1 = cards[index1];
    const card2 = cards[index2];

    // So sánh 2 thẻ
    if (card1.emoji === card2.emoji) {
      // Nếu giống nhau -> ghép đôi thành công
      card1.matched = true;
      card2.matched = true;
      matchedPairs++;
      flippedCards = [];
      isLocked = false;

      renderBoard();
      updateUI();

      // Kiểm tra đã ghép hết chưa
      if (matchedPairs === totalPairs) {
        gameCompleted = true;
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
        // Hiển thị popup chiến thắng sau 0.5 giây
        setTimeout(showWinPopup, 500);
      }
    } else {
      // Nếu khác nhau -> lật lại sau 0.8 giây
      setTimeout(() => {
        // Lật úp 2 thẻ
        card1.flipped = false;
        card2.flipped = false;
        flippedCards = [];
        isLocked = false;
        renderBoard();
      }, 800);
    }
  }
}

// =============================================
// 7. HÀM CẬP NHẬT GIAO DIỆN
// =============================================
function updateUI() {
  document.getElementById("levelDisplay").textContent =
    LEVELS[currentLevelIndex].id;
  document.getElementById("pairsCount").textContent = matchedPairs;
  document.getElementById("totalPairs").textContent = totalPairs;
  document.getElementById("movesCount").textContent = moves;
  document.getElementById("timerDisplay").textContent = timer;
}

// =============================================
// 8. HÀM ĐẾM GIỜ
// =============================================
function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById("timerDisplay").textContent = timer;

    // Hết giờ
    if (timer <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      gameCompleted = true;
      alert("⏰ Hết giờ! Bạn đã thua. Hãy thử lại!");
      resetCurrentLevel();
    }
  }, 1000);
}

// =============================================
// 9. HÀM HIỂN THỊ POPUP CHIẾN THẮNG
// =============================================
function showWinPopup() {
  const level = LEVELS[currentLevelIndex];
  const timeUsed = level.timeLimit > 0 ? level.timeLimit - timer : timer;

  document.getElementById("winLevel").textContent = level.id;
  document.getElementById("winMoves").textContent = moves;
  document.getElementById("winTime").textContent = timeUsed;

  // Tính số sao dựa trên số lượt lật
  let stars = "⭐⭐⭐";
  if (moves > totalPairs * 2.5) stars = "⭐";
  else if (moves > totalPairs * 1.8) stars = "⭐⭐";
  document.getElementById("winStars").textContent = stars;

  document.getElementById("winPopup").classList.add("show");
}

// =============================================
// 10. HÀM ĐIỀU KHIỂN
// =============================================

// Chơi lại level hiện tại
function resetCurrentLevel() {
  initLevel(currentLevelIndex);
}

// Chuyển sang level tiếp theo
function nextLevel() {
  if (currentLevelIndex < LEVELS.length - 1) {
    initLevel(currentLevelIndex + 1);
  } else {
    // Đã hết level
    alert("🎉 Chúc mừng! Bạn đã hoàn thành tất cả các level!");
    initLevel(0); // Quay lại level 1
  }
}

// Hiển thị menu chọn level
function showLevelMenu() {
  // Tạo một menu đơn giản bằng prompt
  let menuText = "📋 CHỌN LEVEL:\n\n";
  LEVELS.forEach((level, index) => {
    const status = index === currentLevelIndex ? " ✅ Đang chơi" : "";
    menuText += `${index + 1}. ${level.name} - ${level.pairs} cặp${status}\n`;
  });
  menuText += "\nNhập số level (1-5):";

  const choice = prompt(menuText);
  if (choice !== null) {
    const levelNum = parseInt(choice);
    if (levelNum >= 1 && levelNum <= LEVELS.length) {
      initLevel(levelNum - 1);
    } else {
      alert("❌ Vui lòng nhập số từ 1 đến " + LEVELS.length);
    }
  }
}

// =============================================
// 11. KHỞI TẠO GAME LẦN ĐẦU
// =============================================
initLevel(0);
