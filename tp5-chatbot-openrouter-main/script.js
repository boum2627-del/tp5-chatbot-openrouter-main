document.getElementById("send-btn").addEventListener("click", sendMessage);

async function sendMessage() {

    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value;

    if (!message) return;

    chatBox.innerHTML += `<p><b>Vous:</b> ${message}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = '';

    try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await response.json();

        chatBox.innerHTML += `<p><b>IA:</b> ${data.setup} ${data.punchline}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        chatBox.innerHTML += `<p style="color:red;"><b>Error:</b> API blocked</p>`;
    }
}