document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que se recargue la página

  const userData = {
    username: document.getElementById("username").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
  };

  fetch("http://localhost:8080/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (res.ok) {
        alert("Usuario registrado correctamente");
        window.location.href = "index.html"; // redirige al inicio
      } else {
        return res.json().then((data) => {
          throw new Error(data.message || "Error en el registro");
        });
      }
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
