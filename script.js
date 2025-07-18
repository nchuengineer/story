  const buttons = document.querySelectorAll('.exam-type, .exam-item');
  const examTypeButtons = document.querySelectorAll('.exam-type');
  const cards = document.querySelectorAll('.card');

  let selectedType = null;
  const selectedItems = new Set();

function filterCards() {
  if (!selectedType && selectedItems.size === 0) {
    cards.forEach(card => card.classList.remove('hidden'));
  } else {
    cards.forEach(card => {
      const tags = card.dataset.tags.split(' ');
      const matchType = !selectedType || tags.includes(selectedType);
      const matchItems = [...selectedItems].every(t => tags.includes(t));
      card.classList.toggle('hidden', !(matchType && matchItems));
    });
  }
  const clearBtn = document.getElementById('clear-items');
  if (selectedItems.size === 0) {
    clearBtn.classList.add('active');
  } else {
    clearBtn.classList.remove('active');
  }
}
  

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const tag = button.dataset.tag;
      button.blur();

      if (button.classList.contains('exam-type')) {
        if (selectedType === tag) {
          examTypeButtons.forEach(b => b.classList.remove('active'));
          selectedType = null;
        } else {
          examTypeButtons.forEach(b => b.classList.remove('active'));
          button.classList.add('active');
          selectedType = tag;
        }
      } else {
        if (selectedItems.has(tag)) {
          selectedItems.delete(tag);
          button.classList.remove('active');
        } else {
          selectedItems.add(tag);
          button.classList.add('active');
          document.getElementById('clear-items').classList.remove('active');
        }
      }

      filterCards();
    });
        document.getElementById('clear-items').addEventListener('click', () => {
    // 清除所有考試項目的選取標籤
    selectedItems.clear();

    // 移除所有 exam-item 按鈕的 active 樣式
    document.querySelectorAll('.exam-item').forEach(btn => {
        btn.classList.remove('active');
    });

    // 呼叫重新篩選函式
    filterCards();
    });
    document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('clear-items').classList.add('active');
    filterCards();
    });
  });
    // 顯示或隱藏「回到最上方」按鈕
    window.addEventListener('scroll', () => {
    const topBtn = document.getElementById('back-to-top');
    if (document.documentElement.scrollTop > 200) {
        topBtn.style.display = 'block';
    } else {
        topBtn.style.display = 'none';
    }
    });

    // 點擊按鈕後平滑滾動回頂部
    document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    });
    // Pop-up 廣告出現與關閉
    document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.getElementById('popup-overlay');
    const popupClose = document.getElementById('popup-close');

    // 點右上角 X 關閉
    popupClose.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });

    // 點畫面其他地方也關閉（但不要點到圖片本身）
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
        popupOverlay.style.display = 'none';
        }
    });
    });