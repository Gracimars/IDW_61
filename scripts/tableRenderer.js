const icons = {
  agregar: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 640 640'>
    <path d='M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z' />
  </svg>`,
  editar: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
    <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
  </svg>`,
  eliminar: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
  </svg>`,
}

function renderProfessionals(professionals) {
  console.log('Rendering professionals:', professionals.length)
  const container = document.getElementById('rowDoctor')
  if (!container) {
    console.error('Container #rowDoctor not found')
    return
  }

  container.innerHTML = ''

  professionals.forEach((doc, index) => {
    const badges = doc.obrasSociales
      .map((os) => `<span class="badge text-dark background_lightBrown">${os}</span>`)
      .join(' ')

    const row = document.createElement('tr')
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${doc.nombre} ${doc.apellido}</td>
      <td>${doc.especialidad}</td>
      <td>${badges}</td>
      <td>${doc.matricula}</td>
      <td>$${Math.round(doc.valorConsulta)}</td>
      <td class="text-center">
        <div class="d-flex gap-1 justify-content-center">
          <a href="#" data-id="${doc.id}" class="btn btn-outline-success btn-sm" title="Agregar">
            ${icons.agregar}
          </a>
          <a href="#" data-id="${doc.id}" class="btn btn-outline-warning btn-sm" title="Editar">
            ${icons.editar}
          </a>
          <a href="#" data-id="${doc.id}" class="btn btn-outline-danger btn-sm" title="Eliminar">
            ${icons.eliminar}
          </a>
        </div>
      </td>
    `
    container.appendChild(row)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const storedData = localStorage.getItem('dbMedicos')
  const professionals = storedData ? JSON.parse(storedData) : dataBase
  renderProfessionals(professionals)
})
