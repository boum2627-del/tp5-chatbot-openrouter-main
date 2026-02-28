document.getElementById("send-btn").addEventListener("click", sendMessage);

function addMessage(content, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.innerHTML = content;

    const chatBox = document.getElementById("chat-box");
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {

    const input = document.getElementById('user-input');
    const message = input.value;

    if (!message) return;

    // Message utilisateur
    addMessage("<b>Vous:</b> " + message, "user");

    input.value = '';

    try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await response.json();

        // Message IA
        addMessage("<b>IA:</b> " + data.setup + " " + data.punchline, "bot");

    } catch (error) {
        addMessage("<b>Error:</b> API blocked", "bot");
    }
}
