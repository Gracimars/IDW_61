/*--------------------- Especialidades ---------------------*/

const getEspecialidadesDatabase = () => {
  const especialidades = localStorage.getItem('dbEspecialidades') || JSON.stringify([])
  return JSON.parse(especialidades)
}

const cargarEspecialidades = () => {
  const especialidades = getEspecialidadesDatabase()
  const selectEspecialidades = document.getElementById('SelectEspecialidad')

  if (!selectEspecialidades) return

  if (!especialidades.length) {
    selectEspecialidades.innerHTML = `<option value="" disabled>No hay especialidades disponibles.</option>`
    return
  }

  const especialidadesOptions = especialidades
    .map((esp) => `<option value="${esp.id}">${esp.nombre}</option>`)
    .join('')

  selectEspecialidades.innerHTML = `<option value="" selected disabled>Seleccione una especialidad</option>${especialidadesOptions}`
}

/*--------------------- Turnos ---------------------*/

const getTurnosDatabase = () => {
  const turnos = localStorage.getItem('dbTurnos') || JSON.stringify([])
  return JSON.parse(turnos)
}

const getMedicosDatabase = () => {
  const medicos = localStorage.getItem('dbMedicos') || JSON.stringify([])
  return JSON.parse(medicos)
}

const cargarTurnos = () => {
  const turnos = getTurnosDatabase()
  const medicos = getMedicosDatabase()
  const selectTurnos = document.getElementById('SelectTurno')

  if (!selectTurnos) return

  const turnosDisponibles = turnos.filter((turno) => turno.disponible)

  if (!turnosDisponibles.length) {
    selectTurnos.innerHTML = `<option value="" disabled>No hay turnos disponibles</option>`
    return
  }

  const turnosOptions = turnosDisponibles
    .map((turno) => {
      const medico = medicos.find((m) => m.id === turno.medico)
      const fecha = new Date(turno.fechaHora)
      const fechaFormateada = fecha.toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      return `<option value="${turno.id}" data-medico="${turno.medico}">${fechaFormateada} - Dr/a. ${medico?.apellido}</option>`
    })
    .join('')

  selectTurnos.innerHTML = `<option value="" selected disabled>Seleccione un turno</option>${turnosOptions}`
}

const filtrarTurnosPorEspecialidad = (especialidadId) => {
  const turnos = getTurnosDatabase()
  const medicos = getMedicosDatabase()
  const selectTurnos = document.getElementById('SelectTurno')

  if (!selectTurnos) return

  const medicosEspecialidad = medicos.filter((m) => m.especialidad === parseInt(especialidadId))
  const medicosIds = medicosEspecialidad.map((m) => m.id)

  const turnosFiltrados = turnos.filter(
    (turno) => turno.disponible && medicosIds.includes(turno.medico)
  )

  if (!turnosFiltrados.length) {
    selectTurnos.innerHTML = `<option value="" disabled>No hay turnos disponibles para esta especialidad</option>`
    return
  }

  const filtroTurnosOptions = turnosFiltrados
    .map((turno) => {
      const medico = medicos.find((m) => m.id === turno.medico)
      const fecha = new Date(turno.fechaHora)
      const fechaFormateada = fecha.toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      return `<option value="${turno.id}" data-medico="${turno.medico}">${fechaFormateada} - Dr/a. ${medico?.apellido}</option>`
    })
    .join('')

  selectTurnos.innerHTML = `<option value="" selected disabled>Seleccione un turno</option>${filtroTurnosOptions}`
}

/*--------------------- Obras Sociales ---------------------*/

const getObrasSocialesDatabase = () => {
  const obrasSociales = localStorage.getItem('dbObrasSociales') || JSON.stringify([])
  return JSON.parse(obrasSociales)
}

const cargarObrasSociales = () => {
  const obrasSociales = getObrasSocialesDatabase()
  const selectObrasSociales = document.getElementById('SelectObraSocial')

  if (!selectObrasSociales) return

  if (!obrasSociales.length) {
    selectObrasSociales.innerHTML = `<option value="" disabled>No hay obras sociales disponibles</option>`
    return
  }

  const obrasSocialesOptions = obrasSociales
    .map(
      (os) => `<option value="${os.id}" data-porcentaje="${os.porcentaje}">${os.nombre}</option>`
    )
    .join('')

  selectObrasSociales.innerHTML = `<option value="" selected disabled>Seleccione una obra social</option>${obrasSocialesOptions}`
}

/*--------------------- Valor Total ---------------------*/

const calcularValorTotal = () => {
  const selectTurnos = document.getElementById('SelectTurno')
  const selectObrasSociales = document.getElementById('SelectObraSocial')
  const inputValorTotal = document.getElementById('valorTotal')
  const medicos = getMedicosDatabase()

  const turnoSeleccionado = selectTurnos.options[selectTurnos.selectedIndex]
  const obraSocialSeleccionada = selectObrasSociales.options[selectObrasSociales.selectedIndex]

  if (
    !turnoSeleccionado ||
    !obraSocialSeleccionada ||
    !turnoSeleccionado.value ||
    !obraSocialSeleccionada.value
  ) {
    inputValorTotal.value = ''
    return
  }
  const medicoId = parseInt(turnoSeleccionado.dataset.medico)
  const medico = medicos.find((m) => m.id === medicoId)
  const porcentajeDescuento = parseFloat(obraSocialSeleccionada.dataset.porcentaje) || 0

  if (medico) {
    const valorConsulta = medico.valorConsulta
    const descuento = (valorConsulta * porcentajeDescuento) / 100
    const valorTotal = valorConsulta - descuento
    inputValorTotal.value = valorTotal
    inputValorTotal.dataset.valorNumerico = valorTotal
  }
}

const handleSubmitBooking = async (event) => {
  event.preventDefault()

  const form = event.target
  const formData = Object.fromEntries(new FormData(form))
  const inputValorTotal = document.getElementById('valorTotal')

  const reservaEntry = {
    documento: formData.documento,
    apellido: formData.apellido,
    nombre: formData.nombre,
    turno: formData.turno,
    especialidad: formData.especialidad,
    obraSocial: formData.obraSocial,
    valorTotal: parseFloat(inputValorTotal.dataset.valorNumerico) || null,
  }

  const turnosDB = getTurnosDatabase()
  const medicosDB = getMedicosDatabase()
  const especialidadesDB = getEspecialidadesDatabase()
  const obrasSocialesDB = getObrasSocialesDatabase()

  const turno = turnosDB.find((t) => t.id === parseInt(reservaEntry.turno))
  const medico = medicosDB.find((m) => m.id === turno?.medico)
  const especialidad = especialidadesDB.find((e) => e.id === parseInt(reservaEntry.especialidad))
  const obraSocial = obrasSocialesDB.find((os) => os.id === parseInt(reservaEntry.obraSocial))

  const modalContent = document.getElementById('modal-reservas__body')
  modalContent.innerHTML = `
    <strong>Verifica tus datos:</strong><br><br>
    <p class="mb-2"><strong>Documento:</strong> ${reservaEntry.documento}</p>
    <p class="mb-2"><strong>Nombre:</strong> ${reservaEntry.apellido}, ${reservaEntry.nombre}</p>
    <p class="mb-2"><strong>Especialidad:</strong> ${especialidad?.nombre}</p>
    <p class="mb-2"><strong>Médico:</strong> Dr/a. ${medico?.apellido}</p>
    <p class="mb-2"><strong>Obra Social:</strong> ${obraSocial?.nombre}</p>
    <p class="mb-2"><strong>Valor Total:</strong> $${reservaEntry.valorTotal}</p>
  `

  const myModalAlternative = new bootstrap.Modal('#modalReservas', {
    backdrop: 'static',
    keyboard: false,
  })

  const confirmBtn = document.getElementById('modal-confirm-btn')
  const cancelBtn = document.getElementById('modal-cancel-btn')

  confirmBtn.onclick = () => {
    const reservasDB = getReservasDatabase()
    const idReserva = Math.max(0, ...reservasDB.map((r) => r.id)) + 1

    reservaEntry.id = idReserva
    reservasDB.push(reservaEntry)
    localStorage.setItem('dbReservas', JSON.stringify(reservasDB))

    const turnoIndex = turnosDB.findIndex((t) => t.id === parseInt(reservaEntry.turno))
    if (turnoIndex !== -1) {
      turnosDB[turnoIndex].disponible = false
      localStorage.setItem('dbTurnos', JSON.stringify(turnosDB))
    }

    showBookingAlert('¡Reserva confirmada exitosamente!', 'success')
    myModalAlternative.hide()
    form.reset()
    inputValorTotal.value = ''
  }

  cancelBtn.onclick = () => {
    myModalAlternative.hide()
  }

  myModalAlternative.show()
}

/*--------------------- Reservas ---------------------*/

const getReservasDatabase = () => {
  const reservas = localStorage.getItem('dbReservas') || JSON.stringify([])
  return JSON.parse(reservas)
}

const formBookingInitializer = () => {
  cargarEspecialidades()
  cargarObrasSociales()
  cargarTurnos()

  const selectEspecialidades = document.getElementById('SelectEspecialidad')
  const selectTurnos = document.getElementById('SelectTurno')
  const selectObrasSociales = document.getElementById('SelectObraSocial')

  if (selectTurnos) selectTurnos.disabled = true

  if (selectEspecialidades) {
    selectEspecialidades.addEventListener('change', (e) => {
      filtrarTurnosPorEspecialidad(e.target.value)
      if (selectTurnos) selectTurnos.disabled = false
    })
  }

  if (selectTurnos) {
    selectTurnos.addEventListener('change', calcularValorTotal)
  }

  if (selectObrasSociales) {
    selectObrasSociales.addEventListener('change', calcularValorTotal)
  }
}

function showBookingAlert(message, type = 'success') {
  const alertContainer = document.getElementById('alert-container')
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show mt-4 m-auto col-12 col-md-8" role="alert" id="auto-hide-alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `
  setTimeout(() => {
    const alert = document.getElementById('auto-hide-alert')
    if (alert) {
      alert.classList.remove('show')
      alert.classList.add('hide')
      setTimeout(() => {
        if (alert && alert.parentNode) alert.parentNode.removeChild(alert)
      }, 300)
    }
  }, 3000)
}
