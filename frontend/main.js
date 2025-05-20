const user = JSON.parse(localStorage.getItem("user"));
let currentObjectCode = null;

if (user) {
  document.getElementById("status").innerText = `Logeado como ${user.username}`;
  document.getElementById("logoutBtn").style.display = "inline";
  document.getElementById("register-object-form").classList.remove("hidden");
  document.getElementById("user-objects").classList.remove("hidden");
  fetchUserObjects();
} else {
  document.getElementById("status").innerText = "No logeado";
}

function logout() {
  localStorage.removeItem("user");

  // Mostrar estado y botones
  document.getElementById("status").innerText = "No logeado";
  document.getElementById("logoutBtn").style.display = "none";

  // Ocultar secciones exclusivas para usuarios logeados
  document.getElementById("register-object-form").classList.add("hidden");
  document.getElementById("user-objects").classList.add("hidden");
  window.location.reload();
}

function registerObject() {
  const description = document.getElementById("description").value;
  const uniqueCode = document.getElementById("uniqueCode").value;
  const qrImageUrl = document.getElementById("qrImageUrl").value;

  if (!user) return alert("Debes estar logeado");

  fetch("http://localhost:8080/api/lost-items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description,
      uniqueCode,
      qrImageUrl,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("Error al registrar objeto");
    return res.json();
  })
  .then(() => {
    alert("Objeto registrado correctamente");
    document.getElementById("description").value = "";
    document.getElementById("uniqueCode").value = "";
    document.getElementById("qrImageUrl").value = "";
    fetchUserObjects(); // actualizar tabla
  })
  .catch(err => alert(err));
}

function fetchUserObjects() {
  if (!user) return;
  fetch(`http://localhost:8080/api/users/${user.id}/objects`)
    .then(res => res.json())
    .then(objects => {
      const tbody = document.querySelector("#objects-table tbody");
      tbody.innerHTML = "";
      objects.forEach(obj => {
        const row = document.createElement("tr");

        // UniqueCode como hipervínculo
        const codeCell = document.createElement("td");
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = obj.uniqueCode;
        link.addEventListener("click", () => fetchMessagesForObject(obj.uniqueCode));
        codeCell.appendChild(link);

        const descCell = document.createElement("td");
        descCell.textContent = obj.description;

        const qrCell = document.createElement("td");
        qrCell.textContent = obj.qrImageUrl;

        row.appendChild(descCell);
        row.appendChild(codeCell);
        row.appendChild(qrCell);
        tbody.appendChild(row);
      });
    })
    .catch(err => console.error("Error al cargar objetos del usuario:", err));
}

function fetchMessagesForObject(uniqueCode) {
  currentObjectCode = uniqueCode;
  fetch(`http://localhost:8080/chat/object/${uniqueCode}/messages`)
    .then(res => {
      if (!res.ok) throw new Error("No se pudieron obtener los mensajes");
      return res.json();
    })
    .then(messages => {
      const list = document.getElementById("message-list");
      list.innerHTML = "";
      document.getElementById("messages-object-code").textContent = uniqueCode;
      document.getElementById("messages-section").classList.remove("hidden");

      messages.forEach(msg => {
        const li = document.createElement("li");
        li.textContent = msg.content;
        li.classList.add("message");

        if (msg.senderId === user.id) {
          li.classList.add("message-right");
        } else {
          li.classList.add("message-left");
        }

        list.appendChild(li);
      });
    })
    .catch(err => alert(err));
}

document.getElementById("send-message-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const content = document.getElementById("new-message").value.trim();
  if (!content || !user || !currentObjectCode) return;

  fetch(`http://localhost:8080/chat/object/${currentObjectCode}/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      senderId: user.id
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("Error al enviar el mensaje");
    return res.json();
  })
  .then(() => {
    document.getElementById("new-message").value = "";
    fetchMessagesForObject(currentObjectCode); // Recargar mensajes
  })
  .catch(err => alert(err));
});
