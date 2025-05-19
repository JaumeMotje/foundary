// Reemplaza con el código único correspondiente (NO expongas en URL)
const uniqueCode = "abc123";  // <-- cámbialo dinámicamente si hace falta
const senderId = 2;           // <-- pon 1 si es el dueño de las llaves, 2 si es quien las encontró

const messagesUrl = `http://localhost:8080/chat/object/${uniqueCode}/messages`;
const postUrl = `http://localhost:8080/chat/object/${uniqueCode}/message`;

const messagesDiv = document.getElementById("messages");
const form = document.getElementById("form");
const contentInput = document.getElementById("content");

async function loadMessages() {
  try {
    const res = await fetch(messagesUrl);
    const messages = await res.json();
    messagesDiv.innerHTML = "";

    messages.forEach(msg => {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("message");
      msgDiv.classList.add(msg.senderId === senderId ? "mine" : "theirs");
      msgDiv.textContent = msg.content;
      messagesDiv.appendChild(msgDiv);
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (err) {
    console.error("Error al cargar mensajes:", err);
  }
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const content = contentInput.value.trim();
  if (!content) return;

  try {
    await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content, senderId })
    });

    contentInput.value = "";
    await loadMessages();
  } catch (err) {
    console.error("Error al enviar mensaje:", err);
  }
});

loadMessages();
setInterval(loadMessages, 5000);
