const user = JSON.parse(localStorage.getItem("user"));
const statusDiv = document.getElementById("status");
const logoutBtn = document.getElementById("logoutBtn");

if (statusDiv) {
  if (user) {
    statusDiv.textContent = `Bienvenido, ${user.username}`;
    if (logoutBtn) logoutBtn.style.display = "inline";
  } else {
    statusDiv.textContent = "No logeado";
  }
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
}
