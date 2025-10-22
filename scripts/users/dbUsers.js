const users = [
  {
    id: 1,
    role: "administrator",
    email: "admin@admin.com",
    password: "IDW2025!@",
  },
  {
    id: 2,
    role: "user",
    email: "usuarioBase@idw2025UNER.com",
    password: "usuario123",
  },
];

const prevUsersDB = localStorage.getItem("dbUsers");
if (!prevUsersDB) {
  localStorage.setItem("dbUsers", JSON.stringify(users));
}
