let editingTurnoId = null

const getTurnosDatabase = () => {
  const turnos = localStorage.getItem('dbTurnos') || JSON.stringify([])
  return JSON.parse(turnos)
}

const getMedicosDatabase = () => {
  const medicos = localStorage.getItem('dbMedicos') || JSON.stringify([])
  return JSON.parse(medicos)
}

const handleSubmitTurno = (event) => {
  event.preventDefault()

  const turnosDB = getTurnosDatabase()
  const form = event.target
  const formData = Object.fromEntries(new FormData(form))

  const idTurno = editingTurnoId ?? Math.max(...turnosDB.map((turno) => turno.id), 0) + 1

  const dateTimeString = `${formData.fecha}T${formData.hora}:00`
  const timestamp = new Date(dateTimeString).getTime()

  const turnoEntry = {
    id: idTurno,
    medico: Number(formData.medico),
    fechaHora: timestamp,
    disponible: formData.disponible === 'on',
  }

  if (editingTurnoId) {
    const index = turnosDB.findIndex((turno) => turno.id === editingTurnoId)
    turnosDB.splice(index, 1, turnoEntry)
  } else {
    turnoExistente = turnosDB.find(
      (turno) => turno.medico === turnoEntry.medico && turno.fechaHora === turnoEntry.fechaHora
    )
    if (turnoExistente) {
      alert('el doc ya tiene un turno a esta hora, no puede atender dos pacientes che.')
      return
    }
    turnosDB.push(turnoEntry)
  }

  localStorage.setItem('dbTurnos', JSON.stringify(turnosDB))

  const modal = bootstrap.Modal.getInstance(document.getElementById('editModalTurnos'))
  modal.hide()

  cancelEditTurno()
  renderTurnos()
}

const handleSubmitBatch = (event) => {
  event.preventDefault()

  const turnosDB = getTurnosDatabase()
  const form = event.target
  const formData = Object.fromEntries(new FormData(form))

  const diaSemana = Number(formData.diaSemana)
  const horaSeleccionada = formData.hora
  const medicoId = Number(formData.medico)
  const disponible = formData.disponible === 'on'

  const hoy = new Date()
  const año = hoy.getFullYear()
  const mes = hoy.getMonth()

  const fechasCoincidentes = []
  const primerDiaMes = new Date(año, mes, hoy.getDate())
  const ultimoDiaMes = new Date(año, mes + 1, 0)

  for (let dia = new Date(primerDiaMes); dia <= ultimoDiaMes; dia.setDate(dia.getDate() + 1)) {
    if (dia.getDay() === diaSemana) {
      const [horas, minutos] = horaSeleccionada.split(':')
      const fechaTurno = new Date(
        dia.getFullYear(),
        dia.getMonth(),
        dia.getDate(),
        Number(horas),
        Number(minutos)
      )
      fechasCoincidentes.push(fechaTurno)
    }
  }

  if (fechasCoincidentes.length === 0) {
    alert('No hay coincidencias de ese día en el mes actual.')
    return
  }

  let maxId = Math.max(0, ...turnosDB.map((t) => t.id))
  let nuevosTurnos = []

  fechasCoincidentes.forEach((fecha) => {
    const timestamp = fecha.getTime()

    const existe = turnosDB.find((t) => t.medico === medicoId && t.fechaHora === timestamp)

    if (!existe) {
      nuevosTurnos.push({
        id: ++maxId,
        medico: medicoId,
        fechaHora: timestamp,
        disponible: disponible,
      })
    }
  })

  if (nuevosTurnos.length === 0) {
    alert('Todos los turnos ya existían para ese médico en esas fechas.')
    return
  }

  turnosDB.push(...nuevosTurnos)
  localStorage.setItem('dbTurnos', JSON.stringify(turnosDB))

  const modal = bootstrap.Modal.getInstance(document.getElementById('crearTurnosBatch'))
  modal.hide()

  cancelEditTurno()
  renderTurnos()
}

const loadMedicosIntoSelect = () => {
  const medicos = getMedicosDatabase()
  const selectMedicos = document.getElementById('SelectMedico')

  if (!selectMedicos) {
    console.error('No se encontró el elemento select para médicos.')
    return
  }

  if (!medicos.length) {
    selectMedicos.innerHTML = `<option value="" disabled>No hay médicos disponibles para elegir</option>`
    return
  }

  const mappedOptions = medicos
    .map(
      (medico) => `
    <option value="${medico.id}">${medico.nombre} ${medico.apellido}</option>`
    )
    .join('')
  selectMedicos.innerHTML =
    '<option value="" disabled selected>Seleccione un médico</option>' + mappedOptions
}

const loadMedicosIntoSelectBatch = () => {
  const medicos = getMedicosDatabase()
  const selectMedicos = document.getElementById('SelectMedicoBatch')

  if (!selectMedicos) {
    console.error('No se encontró el elemento select para médicos.')
    return
  }

  if (!medicos.length) {
    selectMedicos.innerHTML = `<option value="" disabled>No hay médicos disponibles para elegir</option>`
    return
  }

  const mappedOptions = medicos
    .map(
      (medico) => `
    <option value="${medico.id}">${medico.nombre} ${medico.apellido}</option>`
    )
    .join('')
  selectMedicos.innerHTML =
    '<option value="" disabled selected>Seleccione un médico</option>' + mappedOptions
}

const loadTimeOptions = () => {
  const selectHora = document.getElementById('Hora')

  if (!selectHora) {
    console.error('No se encontró el elemento select para hora.')
    return
  }

  const timeOptions = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = String(hour).padStart(2, '0')
      const minuteStr = String(minute).padStart(2, '0')
      const timeValue = `${hourStr}:${minuteStr}`
      timeOptions.push(`<option value="${timeValue}">${timeValue}</option>`)
    }
  }

  selectHora.innerHTML =
    '<option value="" disabled selected>Seleccione una hora</option>' + timeOptions.join('')
}

const loadTimeOptionsBatch = () => {
  const selectHora = document.getElementById('HoraBatch')

  if (!selectHora) {
    console.error('No se encontró el elemento select para hora.')
    return
  }

  const timeOptions = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = String(hour).padStart(2, '0')
      const minuteStr = String(minute).padStart(2, '0')
      const timeValue = `${hourStr}:${minuteStr}`
      timeOptions.push(`<option value="${timeValue}">${timeValue}</option>`)
    }
  }

  selectHora.innerHTML =
    '<option value="" disabled selected>Seleccione una hora</option>' + timeOptions.join('')
}

const openEditModalTurno = (turnoId) => {
  editingTurnoId = turnoId
  const turnosDB = getTurnosDatabase()
  const turno = turnosDB.find((t) => t.id === turnoId)

  if (turno) {
    document.getElementById('modalTitleTurno').textContent = 'Editar turno'
    document.getElementById('SelectMedico').value = turno.medico

    const date = new Date(turno.fechaHora)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    document.getElementById('Fecha').value = `${year}-${month}-${day}`
    document.getElementById('Hora').value = `${hours}:${minutes}`
    document.getElementById('Disponible').checked = turno.disponible
  }

  const modal = new bootstrap.Modal(document.getElementById('editModalTurnos'))
  modal.show()
}

const cancelEditTurno = () => {
  editingTurnoId = null
  document.getElementById('modalTitleTurno').textContent = 'Agregar turno'
  document.getElementById('SelectMedico').value = ''
  document.getElementById('Fecha').value = ''
  document.getElementById('Hora').value = ''
  document.getElementById('Disponible').checked = true
}

const cancelEditTurnoBatch = () => {
  editingTurnoId = null
  document.getElementById('SelectMedicoBatch').value = ''
  document.getElementById('DiaSemanaBatch').value = ''
  document.getElementById('HoraBatch').value = ''
  document.getElementById('DisponibleBatch').checked = true
}

function deleteTurno(id) {
  const turnosDb = getTurnosDatabase()
  const index = turnosDb.findIndex((turno) => turno.id === parseInt(id))
  if (turnosDb[index]?.id === id) {
    turnosDb.splice(index, 1)
    localStorage.setItem('dbTurnos', JSON.stringify(turnosDb))
  } else {
    alert('No se encontró turno con el id proporcionado')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('editModalTurnos')
  if (modal) {
    const today = new Date().toISOString().split('T')[0]
    document.getElementById('Fecha')?.setAttribute('min', today)
    loadMedicosIntoSelect()
    loadTimeOptions()

    loadMedicosIntoSelectBatch()
    loadTimeOptionsBatch()
  }
})
