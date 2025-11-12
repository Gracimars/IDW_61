const fotoABase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const getQueryParamsMedicos = () => {
  const params = new URLSearchParams(window.location.search)
  return {
    action: params.get('action'),
    id: params.get('id'),
  }
}

const useFindMedico = (database) => {
  const { action, id } = getQueryParamsMedicos()

  let foundMedico = null
  let foundMedicoIndex = -1

  if (action === 'edit' && id) {
    const index = database.findIndex((medico) => medico.id === parseInt(id))

    if (index !== -1) {
      foundMedico = database[index]
      foundMedicoIndex = index
    }
  }

  return { foundMedico, foundMedicoIndex }
}

const getMedicosDatabase = () => {
  const medicos = localStorage.getItem('dbMedicos') || JSON.stringify([])
  return JSON.parse(medicos)
}

const handleSubmit = async (event) => {
  event.preventDefault()

  const medicosDB = getMedicosDatabase()
  const { foundMedico, foundMedicoIndex } = useFindMedico(medicosDB)

  const form = event.target
  const formData = Object.fromEntries(new FormData(form))

  const idMedico = foundMedico?.id ?? Math.max(...medicosDB.map((medico) => medico.id)) + 1

  const fotoBase64 = formData.fotoUrl.size
    ? await fotoABase64(formData.fotoUrl)
    : foundMedico
    ? foundMedico.fotoUrl
    : ''

  const obrasSocialesIds = Object.entries(formData)
    .filter(([key, value]) => key.startsWith('OS') && value)
    .map(([key, value]) => Number(value))

  const doctorEntry = {
    id: idMedico,
    nombre: formData.nombre,
    apellido: formData.apellido,
    matricula: parseInt(formData.matricula),
    descripcion: formData.descripcion,
    valorConsulta: parseInt(formData.valorConsulta),
    obrasSociales: obrasSocialesIds,
    fotoUrl: foundMedico && !fotoBase64 ? foundMedico.fotoUrl : fotoBase64,
    especialidad: Number(formData.especialidad),
  }

  if (foundMedico) {
    medicosDB.splice(foundMedicoIndex, 1, doctorEntry)
  } else {
    medicosDB.push(doctorEntry)
  }
  const myModalAlternative = new bootstrap.Modal('#modalMedicos', {
    backdrop: 'static',
    keyboard: false,
  })

  const modalContent = document.getElementById('modal-medicos__body')
  modalContent.innerHTML = `${foundMedico ? 'Modificaste' : 'Creaste'} al médico con éxito!`
  myModalAlternative.show()

  localStorage.setItem('dbMedicos', JSON.stringify(medicosDB))
}

function renderObrasSocialesCheckboxes(selectedIds = []) {
  const obrasSociales = JSON.parse(localStorage.getItem('dbObrasSociales')) || []
  const container = document.getElementById('obrasSocialesCheckboxes')
  if (!container) return

  container.innerHTML = obrasSociales
    .map(
      (os) => `
      <div class="col-12 col-md-6 col-xl-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            name="OS${os.id}"
            id="OS${os.id}"
            value="${os.id}"
            ${selectedIds.includes(os.id) ? 'checked' : ''}
          />
          <label class="form-check-label" for="OS${os.id}">${os.nombre}</label>
        </div>
      </div>
    `
    )
    .join('')
}

const formInitializer = () => {
  const medicosDB = getMedicosDatabase()
  const { foundMedico, foundMedicoIndex } = useFindMedico(medicosDB)

  const especialidades = JSON.parse(localStorage.getItem('dbEspecialidades')) || []
  const selectEspecialidades = document.getElementById('SelectEspecialidad')

  if (!selectEspecialidades) {
    console.error('No se encontró el elemento select para especialidades.')
    return
  }

  if (!especialidades.length) {
    selectEspecialidades.innerHTML = `<option value="" disabled>No hay especialidades disponibles para elegir</option>`
    return
  }

  const mappedOptions = especialidades
    .map(
      (esp) => `
    <option value="${esp.id}" ${esp.id === foundMedico?.especialidad ? 'selected' : ''}>${
        esp.nombre
      }</option>`
    )
    .join('')
  selectEspecialidades.innerHTML = mappedOptions

  renderObrasSocialesCheckboxes(foundMedico?.obrasSociales || [])

  if (foundMedico && foundMedicoIndex !== -1) {
    document.getElementById('Nombre').value = foundMedico.nombre
    document.getElementById('Apellido').value = foundMedico.apellido
    document.getElementById('Matricula').value = foundMedico.matricula
    document.getElementById('ValorConsulta').value = foundMedico.valorConsulta
    document.getElementById('Descripcion').value = foundMedico.descripcion
  }
}

function deleteMedico(id) {
  const medicosDb = getMedicosDatabase()
  const index = medicosDb.findIndex((medico) => medico.id === parseInt(id))
  if (medicosDb[index]?.id === id) {
    medicosDb.splice(index, 1)
    localStorage.setItem('dbMedicos', JSON.stringify(medicosDb))
  } else {
    alert('No se encontro médico con el id proporcionado')
  }
}
