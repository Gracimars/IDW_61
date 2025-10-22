const users = [
  {
    id: 1,
    role: "administrator",
    username: "admin",
    password: "IDW2025!@",
  },
  {
    id: 2,
    role: "user",
    username: "usuarioBase",
    password: "usuario123",
  },
];

const prevUsersDB = localStorage.getItem("dbUsers");
if (!prevUsersDB) {
  localStorage.setItem("dbUsers", JSON.stringify(users));
}
