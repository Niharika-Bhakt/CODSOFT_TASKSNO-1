function sendMessage() {
    const inputField = document.getElementById('messageInput');
    const messageText = inputField.value.trim();
    
    if (messageText === "") return;

    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'sent');
    
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <p>${messageText}</p>
        <span class="time">${currentTime}</span>
    `;
    chatMessages.appendChild(messageDiv);
    inputField.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.getElementById('messageInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});