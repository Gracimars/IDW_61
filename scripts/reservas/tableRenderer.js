const icons = {
  view: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 640 640'>
    <path d='M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z' />
  </svg>`,
  edit: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
    <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
  </svg>`,
  delete: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
  </svg>`,
}

const findTurno = (id) => {
  const turnos = getTurnosDatabase()
  const medicos = getMedicosDatabase()
  const turno = turnos.find((t) => t.id === parseInt(id))
  if (!turno) return 'N/A'
  const medico = medicos.find((m) => m.id === turno.medico)
  const fecha = new Date(turno.fechaHora)
  const fechaFormateada = fecha.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${fechaFormateada} - Dr/a. ${medico ? medico.apellido : ''}`
}

const findEspecialidad = (id) => {
  const especialidades = getEspecialidadesDatabase()
  const especialidad = especialidades.find((e) => e.id === parseInt(id))
  return especialidad ? especialidad.nombre : 'N/A'
}

const findObraSocial = (id) => {
  const obras = getObrasSocialesDatabase()
  const obra = obras.find((o) => o.id === parseInt(id))
  return obra ? obra.nombre : 'N/A'
}

const renderReservas = () => {
  const reservas = getReservasDatabase()
  const tbody = document.getElementById('rowReservas')

  if (reservas.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center py-4">No hay reservas registradas</td>
      </tr>
    `
    return
  }

  tbody.innerHTML = reservas
    .map(
      (reserva) => `
      <tr>
        <td>${reserva.id}</td>
        <td>${reserva.documento}</td>
        <td>${reserva.apellido}</td>
        <td>${reserva.nombre}</td>
        <td>${findTurno(reserva.turno)}</td>
        <td>${findEspecialidad(reserva.especialidad)}</td>
        <td>${findObraSocial(reserva.obraSocial)}</td>
        <td>${reserva.valorTotal !== null ? `$${reserva.valorTotal}` : 'N/A'}</td>
        <td class="text-center">
        <div class="d-flex gap-1 justify-content-center">
          <a href="#" class="btn btn-outline-success btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ver">
            ${icons.view}
          </a>
          <a href="#" class="btn btn-outline-warning btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar">
            ${icons.edit}
          </a>
          <button data-id="${
            reserva.id
          }" class="btn btn-outline-danger btn-sm delete-btn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar">
            ${icons.delete}
          </button>
        </div>
      </td>
      </tr>
    `
    )
    .join('')
}
