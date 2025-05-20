const user = JSON.parse(localStorage.getItem("user"));

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
      }
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("Error al registrar objeto");
    return res.json();
  })
  .then(() => {
    alert("Objeto registrado correctamente");
    fetchUserObjects(); // actualizar tabla
  })
  .catch(err => alert(err));
}

function fetchUserObjects() {
  if (!user) return;
  fetch(`http://localhost:8080/api/users/${user.id}/lost-items`)
    .then(res => res.json())
    .then(objects => {
      const tbody = document.querySelector("#objects-table tbody");
      tbody.innerHTML = "";
      objects.forEach(obj => {
        const row = `<tr>
          <td>${obj.id}</td>
          <td>${obj.description}</td>
          <td>${obj.uniqueCode}</td>
          <td>${obj.qrImageUrl}</td>
        </tr>`;
        tbody.innerHTML += row;
      });
    });
}
