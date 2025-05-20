document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("error");

  try {
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    const data = await response.json();

    // Guardar sesión
    localStorage.setItem("user", JSON.stringify(data));

    // Redirigir a inicio
    window.location.href = "index.html";

  } catch (err) {
    errorDiv.textContent = err.message;
  }
});
