// ===== DỮ LIỆU THEO CHỦ ĐỀ =====
const THEMES = {
  animal: {
    name: "🐶 Động vật",
    words: [
      { emoji: "🐶", word: "dog" },
      { emoji: "🐱", word: "cat" },
      { emoji: "🐭", word: "mouse" },
      { emoji: "🐹", word: "hamster" },
      { emoji: "🐰", word: "rabbit" },
      { emoji: "🦊", word: "fox" },
      { emoji: "🐻", word: "bear" },
      { emoji: "🐼", word: "panda" },
      { emoji: "🐨", word: "koala" },
      { emoji: "🐯", word: "tiger" },
      { emoji: "🦁", word: "lion" },
      { emoji: "🐮", word: "cow" },
      { emoji: "🐷", word: "pig" },
      { emoji: "🐸", word: "frog" },
      { emoji: "🐵", word: "monkey" },
      { emoji: "🐔", word: "chicken" },
      { emoji: "🐧", word: "penguin" },
      { emoji: "🐦", word: "bird" },
      { emoji: "🦅", word: "eagle" },
      { emoji: "🦉", word: "owl" },
      { emoji: "🐺", word: "wolf" },
      { emoji: "🐴", word: "horse" },
      { emoji: "🦄", word: "unicorn" },
      { emoji: "🐝", word: "bee" },
      { emoji: "🦋", word: "butterfly" },
      { emoji: "🐌", word: "snail" },
      { emoji: "🐞", word: "ladybug" },
      { emoji: "🐜", word: "ant" },
    ],
  },
  fruit: {
    name: "🍎 Trái cây",
    words: [
      { emoji: "🍎", word: "apple" },
      { emoji: "🍌", word: "banana" },
      { emoji: "🍇", word: "grape" },
      { emoji: "🍊", word: "orange" },
      { emoji: "🍓", word: "strawberry" },
      { emoji: "🍒", word: "cherry" },
      { emoji: "🍉", word: "watermelon" },
      { emoji: "🍑", word: "peach" },
      { emoji: "🥝", word: "kiwi" },
      { emoji: "🍍", word: "pineapple" },
      { emoji: "🍋", word: "lemon" },
      { emoji: "🍐", word: "pear" },
      { emoji: "🥭", word: "mango" },
      { emoji: "🫐", word: "blueberry" },
      { emoji: "🍈", word: "melon" },
      { emoji: "🍅", word: "tomato" },
    ],
  },
  food: {
    name: "🍕 Đồ ăn",
    words: [
      { emoji: "🍕", word: "pizza" },
      { emoji: "🍔", word: "burger" },
      { emoji: "🌭", word: "hot dog" },
      { emoji: "🥪", word: "sandwich" },
      { emoji: "🌮", word: "taco" },
      { emoji: "🌯", word: "burrito" },
      { emoji: "🥗", word: "salad" },
      { emoji: "🍟", word: "fries" },
      { emoji: "🍗", word: "chicken" },
      { emoji: "🥩", word: "steak" },
      { emoji: "🍣", word: "sushi" },
      { emoji: "🍱", word: "bento" },
      { emoji: "🍜", word: "noodle" },
      { emoji: "🍝", word: "pasta" },
      { emoji: "🍰", word: "cake" },
      { emoji: "🧁", word: "cupcake" },
      { emoji: "🍩", word: "donut" },
      { emoji: "🍪", word: "cookie" },
      { emoji: "🍫", word: "chocolate" },
      { emoji: "🍭", word: "lollipop" },
      { emoji: "🍬", word: "candy" },
      { emoji: "🍮", word: "pudding" },
      { emoji: "🥤", word: "drink" },
      { emoji: "☕", word: "coffee" },
      { emoji: "🍵", word: "tea" },
    ],
  },
  vehicle: {
    name: "🚗 Phương tiện",
    words: [
      { emoji: "🚗", word: "car" },
      { emoji: "🚕", word: "taxi" },
      { emoji: "🚌", word: "bus" },
      { emoji: "🚎", word: "trolley" },
      { emoji: "🏎️", word: "race car" },
      { emoji: "🚓", word: "police car" },
      { emoji: "🚑", word: "ambulance" },
      { emoji: "🚒", word: "fire truck" },
      { emoji: "🚜", word: "tractor" },
      { emoji: "🚲", word: "bicycle" },
      { emoji: "🛴", word: "scooter" },
      { emoji: "🛵", word: "motorcycle" },
      { emoji: "✈️", word: "airplane" },
      { emoji: "🚀", word: "rocket" },
      { emoji: "🚢", word: "ship" },
    ],
  },
  color: {
    name: "🎨 Màu sắc",
    words: [
      { emoji: "🔴", word: "red" },
      { emoji: "🟠", word: "orange" },
      { emoji: "🟡", word: "yellow" },
      { emoji: "🟢", word: "green" },
      { emoji: "🔵", word: "blue" },
      { emoji: "🟣", word: "purple" },
      { emoji: "🟤", word: "brown" },
      { emoji: "⚫", word: "black" },
      { emoji: "⚪", word: "white" },
      { emoji: "🩷", word: "pink" },
    ],
  },
  emotion: {
    name: "😊 Cảm xúc",
    words: [
      { emoji: "😀", word: "happy" },
      { emoji: "😢", word: "sad" },
      { emoji: "😡", word: "angry" },
      { emoji: "😱", word: "scared" },
      { emoji: "🤗", word: "hug" },
      { emoji: "😍", word: "love" },
      { emoji: "🤩", word: "excited" },
      { emoji: "😎", word: "cool" },
      { emoji: "🧐", word: "curious" },
      { emoji: "🤔", word: "thinking" },
    ],
  },
};

// Gộp tất cả
function getAllWords() {
  let all = [];
  for (let key in THEMES) {
    all = all.concat(THEMES[key].words);
  }
  return all;
}

const PAIRS = 6;
let currentTheme = "animal";
let currentWords = [];

// ===== BIẾN =====
let cards = [];
let flipped = [];
let matched = 0;
let moves = 0;
let score = 0;
let lock = false;

// ===== TRỘN =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===== LẤY TỪ THEO CHỦ ĐỀ =====
function getWordsByTheme(theme) {
  if (theme === "all") return getAllWords();
  return THEMES[theme] ? THEMES[theme].words : [];
}

// ===== LẤY TỪ NGẪU NHIÊN =====
function getRandomWords() {
  let temp = shuffle([...currentWords]);
  return temp.slice(0, PAIRS);
}

// ===== KIỂM TRA ĐỘ DÀI TỪ =====
function getWordClass(word) {
  if (word.length >= 10) return "very-long-word";
  if (word.length >= 7) return "long-word";
  return "";
}

// ===== KHỞI TẠO =====
function initRound() {
  let selected = getRandomWords();

  let deck = [];
  selected.forEach((item, idx) => {
    deck.push({ ...item, id: idx, type: "image" });
    deck.push({ ...item, id: idx, type: "word" });
  });
  shuffle(deck);

  cards = deck.map((item, idx) => ({
    index: idx,
    id: item.id,
    emoji: item.emoji,
    word: item.word,
    type: item.type,
    flipped: false,
    matched: false,
  }));

  flipped = [];
  matched = 0;
  moves = 0;
  lock = false;

  document.getElementById("popup").classList.remove("show");
  render();
  updateUI();
}

// ===== RENDER =====
function render() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  cards.forEach((card, idx) => {
    let div = document.createElement("div");
    div.className = "card";
    if (card.matched) div.classList.add("matched");
    if (card.flipped) div.classList.add("flipped");

    let content =
      card.flipped || card.matched
        ? card.type === "image"
          ? card.emoji
          : card.word
        : "❓";

    // Thêm class cho từ dài
    let wordClass = card.type === "word" ? getWordClass(card.word) : "";

    div.innerHTML = `
            <div class="card-inner">
                <div class="card-front">❓</div>
                <div class="card-back ${wordClass}">${content}</div>
            </div>
        `;

    div.onclick = () => clickCard(idx);
    board.appendChild(div);
  });
}

// ===== CLICK =====
function clickCard(idx) {
  if (lock) return;
  let card = cards[idx];
  if (card.flipped || card.matched) return;
  if (flipped.length >= 2) return;

  card.flipped = true;
  flipped.push(idx);
  moves++;
  render();
  updateUI();

  if (flipped.length === 2) {
    lock = true;
    let i1 = flipped[0];
    let i2 = flipped[1];
    let c1 = cards[i1];
    let c2 = cards[i2];

    if (c1.id === c2.id && c1.type !== c2.type) {
      c1.matched = true;
      c2.matched = true;
      matched++;
      score += 10;
      flipped = [];
      lock = false;
      render();
      updateUI();

      if (matched === PAIRS) {
        setTimeout(showWin, 500);
      }
    } else {
      setTimeout(() => {
        c1.flipped = false;
        c2.flipped = false;
        flipped = [];
        lock = false;
        render();
        updateUI();
      }, 800);
    }
  }
}

// ===== UPDATE =====
function updateUI() {
  document.getElementById("pairs").textContent = matched;
  document.getElementById("moves").textContent = moves;
  document.getElementById("score").textContent = score;
}

// ===== THẮNG =====
function showWin() {
  document.getElementById("finalScore").textContent = score;
  document.getElementById("finalMoves").textContent = moves;
  document.getElementById("popup").classList.add("show");
}

// ===== RESET =====
function resetGame() {
  score = 0;
  initRound();
}

// ===== TIẾP =====
function nextRound() {
  initRound();
}

// ===== ĐỔI CHỦ ĐỀ =====
function changeTheme() {
  let select = document.getElementById("themeSelect");
  currentTheme = select.value;
  currentWords = getWordsByTheme(currentTheme);
  score = 0;
  initRound();
}

// ===== BẮT ĐẦU =====
currentWords = getWordsByTheme("animal");
initRound();
