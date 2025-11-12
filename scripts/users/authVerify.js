const userResponseAdapter = (user) => ({
  id: user.id,
  nombre: user.firstName,
  apellido: user.lastName,
  email: user.email,
  username: user.username,
  role: user.role || 'user',
})

const handleLogin = async (event) => {
  event.preventDefault()
  const form = event.target
  const formData = Object.fromEntries(new FormData(form))

  try {
    const loginResponse = await fetch('https://dummyjson.com/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        expiresInMins: 1440,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error('credenciales invalidas che')
      }
      return res.json()
    })

    const currentUser = await fetch('https://dummyjson.com/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${loginResponse.accessToken}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error('fallo el EP para traer el usuario locooooo, llamen al backend')
      }
      return res.json()
    })

    const userSanitizado = userResponseAdapter(currentUser)

    if (userSanitizado?.role !== 'admin') {
      throw new Error('no es admin este, no puede hacer login')
    }

    sessionStorage.setItem('user', JSON.stringify(userSanitizado))
    sessionStorage.setItem('accessToken', JSON.stringify(loginResponse.accessToken))

    window.location.href = '../index.html'
  } catch (error) {
    alert(`${error}.`)
  }
}

const isUserLoggedIn = () => {
  return sessionStorage.getItem('user') !== null
}

const isAdmin = () => JSON.parse(sessionStorage.getItem('user'))?.role === 'admin'

const isProtectedRoute = () => window.location.pathname.includes('/admin/')

const handleLogout = () => {
  sessionStorage.removeItem('user')
  window.location.href = 'index.html'
}

if (isUserLoggedIn()) {
  const authButtons = document.getElementById('auth-buttons-group')
  authButtons?.classList?.add('d-none')
}

if (isAdmin()) {
  const adminNavbar = document.getElementById('admin-access-routes')
  adminNavbar.classList.remove('d-none')
}

if (isProtectedRoute() && !isAdmin()) {
  window.location.href = '../../login.html'
}
