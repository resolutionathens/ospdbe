document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const wordInput = document.getElementById('wordInput');
    const lookupBtn = document.getElementById('lookupBtn');
    const confirmModal = document.getElementById('confirmModal');
    const resultModal = document.getElementById('resultModal');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const closeBtn = document.getElementById('closeBtn');
    const resultMessage = document.getElementById('resultMessage');

    // Show confirm modal when lookup is clicked
    lookupBtn.addEventListener('click', () => {
        const word = wordInput.value.trim();
        if (word) {
            confirmModal.style.display = 'block';
        }
    });

    // Handle "Yes" click
    yesBtn.addEventListener('click', () => {
        const word = wordInput.value.trim();
        confirmModal.style.display = 'none';
        showResult(true, word);
    });

    // Handle "No" click
    noBtn.addEventListener('click', () => {
        const word = wordInput.value.trim();
        confirmModal.style.display = 'none';
        showResult(false, word);
    });

    // Close result modal
    closeBtn.addEventListener('click', () => {
        resultModal.style.display = 'none';
        wordInput.value = ''; // Clear input
    });

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === confirmModal) {
            confirmModal.style.display = 'none';
        }
        if (event.target === resultModal) {
            resultModal.style.display = 'none';
            wordInput.value = ''; // Clear input
        }
    });

    // Show result modal
    function showResult(isValid, word) {
        const modalContent = resultModal.querySelector('.modal-content');
        modalContent.className = 'modal-content ' + (isValid ? 'success' : 'error');
        
        resultMessage.textContent = isValid 
            ? `Yes, "${word}" is a valid Scrabble word.`
            : `No, "${word}" is not a valid Scrabble word.`;
        
        resultModal.style.display = 'block';
    }

    // Allow Enter key to trigger lookup
    wordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            lookupBtn.click();
        }
    });
});
