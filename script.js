  const buttons = document.querySelectorAll('.exam-type, .exam-item');
  const examTypeButtons = document.querySelectorAll('.exam-type');
  const cards = document.querySelectorAll('.card');

  let selectedType = null;
  const selectedItems = new Set();

  function filterCards() {
    if (!selectedType && selectedItems.size === 0) {
      cards.forEach(card => card.classList.remove('hidden'));
      return;
    }

    cards.forEach(card => {
      const tags = card.dataset.tags.split(' ');
      const matchType = !selectedType || tags.includes(selectedType);
      const matchItems = [...selectedItems].every(t => tags.includes(t));
      card.classList.toggle('hidden', !(matchType && matchItems));
    });
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
        }
      }

      filterCards();
    });
  });