const paymentButtons = document.querySelectorAll('.pay-btn');
const qrCards = document.querySelectorAll('.qr-card');
const copyButtons = document.querySelectorAll('.copy-btn');

function setActiveMethod(methodName) {
  paymentButtons.forEach((button) => {
    const isActive = button.dataset.method === methodName;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  qrCards.forEach((card) => {
    const isVisible = card.dataset.qr === methodName;
    card.classList.toggle('active', isVisible);
  });
}

paymentButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveMethod(button.dataset.method);
  });
});

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const text = button.dataset.copy || '';

    try {
      await navigator.clipboard.writeText(text);
      const oldLabel = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('copied');

      setTimeout(() => {
        button.textContent = oldLabel;
        button.classList.remove('copied');
      }, 1300);
    } catch (error) {
      button.textContent = 'Copy failed';
      setTimeout(() => {
        button.textContent = button.dataset.originalLabel || 'Copy ID';
      }, 1300);
    }
  });
});

copyButtons.forEach((button) => {
  button.dataset.originalLabel = button.textContent;
});

setActiveMethod('easypaisa');
