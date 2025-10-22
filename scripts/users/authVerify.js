const getUsersDatabase = () => {
  const users = localStorage.getItem("dbUsers") || JSON.stringify([]);
  return JSON.parse(users);
};

const handleLogin = (event) => {
  const usersDB = getUsersDatabase();

  event.preventDefault();
  const form = event.target;
  const formData = Object.fromEntries(new FormData(form));

  const loginUser = usersDB.find(
    (user) =>
      user.email === formData.email && user.password === formData.password
  );

  if (!loginUser) {
    sessionStorage.setItem("userRole", null);
    alert("Credenciales inválidas. Por favor, intenta de nuevo.");
    return;
  }

  sessionStorage.setItem("user", JSON.stringify(loginUser));
  window.location.href = "/index.html";
};

const isUserLoggedIn = () => {
  return sessionStorage.getItem("user") !== null;
};

const isAdmin = () =>
  JSON.parse(sessionStorage.getItem("user"))?.role === "administrator";

const isProtectedRoute = () => window.location.pathname.includes("/admin/");

if (isUserLoggedIn()) {
  const authButtons = document.getElementById("auth-buttons-group");
  authButtons.classList.add("d-none");
}

if (isAdmin()) {
  const adminNavbar = document.getElementById("admin-access-routes");
  adminNavbar.classList.remove("d-none");
}

if (isProtectedRoute() && !isAdmin()) {
  window.location.href = "/pages/login.html";
}
