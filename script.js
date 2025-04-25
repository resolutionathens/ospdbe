// Sends a message and Becky's opinion to the agent endpoint and returns the reply
async function sendToAgent(word, beckyThinksIsWord) {
    const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, beckyThinksIsWord })
    });
    const data = await response.json();
    return data.reply;
}

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

    // When 'Look Up' is clicked, show the confirm modal
    lookupBtn.addEventListener('click', () => {
        const word = wordInput.value.trim();
        if (!word) {
            alert('Enter a word to look up.');
            return;
        }
        confirmModal.style.display = 'block';
    });

    // Handle "Yes" click (Becky thinks it IS a word)
    yesBtn.addEventListener('click', async () => {
        const word = wordInput.value.trim();
        confirmModal.style.display = 'none';
        // Show result modal and thinking indicator
        resultModal.style.display = 'block';
        document.getElementById('thinkingIndicator').style.display = 'flex';
        resultMessage.style.display = 'none';
        const reply = await sendToAgent(word, true);
        showResult(reply);
    });

    // Handle "No" click (Becky thinks it is NOT a word)
    noBtn.addEventListener('click', async () => {
        const word = wordInput.value.trim();
        confirmModal.style.display = 'none';
        // Show result modal and thinking indicator
        resultModal.style.display = 'block';
        document.getElementById('thinkingIndicator').style.display = 'flex';
        resultMessage.style.display = 'none';
        const reply = await sendToAgent(word, false);
        showResult(reply);
    });

    // Close result modal
    closeBtn.addEventListener('click', () => {
        resultModal.style.display = 'none';
        wordInput.value = ''; // Clear input
        // Reset thinking/result state
        document.getElementById('thinkingIndicator').style.display = 'none';
        resultMessage.style.display = 'block';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === resultModal) {
            resultModal.style.display = 'none';
            wordInput.value = ''; // Clear input
            // Reset thinking/result state
            document.getElementById('thinkingIndicator').style.display = 'none';
            resultMessage.style.display = 'block';
        }
    });

    // Show result modal
    function showResult(agentReply) {
        const modalContent = resultModal.querySelector('.modal-content');
        modalContent.className = 'modal-content success';
        // Hide thinking indicator, show result message
        document.getElementById('thinkingIndicator').style.display = 'none';
        resultMessage.textContent = agentReply;
        resultMessage.style.display = 'block';
        resultModal.style.display = 'block';
    }

    // Allow Enter key to trigger lookup
    wordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            lookupBtn.click();
        }
    });


});
