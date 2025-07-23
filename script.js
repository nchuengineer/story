document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.exam-type, .exam-item');
  const examTypeButtons = document.querySelectorAll('.exam-type');
  const cards = document.querySelectorAll('.card');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');

  let selectedType = null;
  const selectedItems = new Set();

  function filterCards() {
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';

    cards.forEach(card => {
      const tags = card.dataset.tags.split(' ');
      const cardText = card.textContent.toLowerCase();
      const matchSearch = !keyword || cardText.includes(keyword);
      const matchType = !selectedType || tags.includes(selectedType);
      const matchItems = [...selectedItems].every(t => tags.includes(t));

      card.classList.toggle('hidden', !(matchSearch && matchType && matchItems));
    });

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
  });

  document.getElementById('clear-items').addEventListener('click', () => {
    selectedItems.clear();
    document.querySelectorAll('.exam-item').forEach(btn => {
      btn.classList.remove('active');
    });
    filterCards();
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterCards();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchInput.value ? 'block' : 'none';
      }
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterCards();
      searchInput.focus();
      clearSearchBtn.style.display = 'none';
    });

    clearSearchBtn.style.display = searchInput.value ? 'block' : 'none';
  }

  filterCards();

  // Back to top button
  window.addEventListener('scroll', () => {
    const topBtn = document.getElementById('back-to-top');
    if (document.documentElement.scrollTop > 200) {
      topBtn.style.display = 'block';
    } else {
      topBtn.style.display = 'none';
    }
  });

  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Pop-up overlay
  const popupOverlay = document.getElementById('popup-overlay');
  const popupClose = document.getElementById('popup-close');

  popupClose?.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
  });

  popupOverlay?.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.style.display = 'none';
    }
  });
});
