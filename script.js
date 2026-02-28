document.getElementById("send-btn").addEventListener("click", sendMessage);

// ENTER key support
document.getElementById("user-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function addMessage(content, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.innerHTML = content;

    const chatBox = document.getElementById("chat-box");
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function playSound() {
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
    audio.play();
}

async function sendMessage() {

    const input = document.getElementById('user-input');
    const message = input.value;

    if (!message) return;

    addMessage("<b>Vous:</b> " + message, "user");
    playSound();

    input.value = '';

    // Typing animation
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot");
    typingDiv.innerHTML = "IA est en train d'écrire...";
    document.getElementById("chat-box").appendChild(typingDiv);

    try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await response.json();

        typingDiv.remove();

        addMessage("<b>IA:</b> " + data.setup + " " + data.punchline, "bot");
        playSound();

    } catch (error) {
        typingDiv.remove();
        addMessage("<b>Error:</b> API blocked", "bot");
    }
}
