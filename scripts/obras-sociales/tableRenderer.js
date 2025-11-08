const icons = {
  edit: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
    <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
  </svg>`,
  delete: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
  </svg>`,
}

let deleteId = null

const getObrasSociales = () => {
  return JSON.parse(localStorage.getItem('dbObrasSociales')) || []
}

function handleEditObraSocial(id) {
  const url = new URL(window.location)
  url.searchParams.set('id', id)
  window.history.pushState({}, '', url)

  const obrasSociales = getObrasSociales()
  const obraSocial = obrasSociales.find((os) => Number(os.id) === Number(id))

  const inputFormObraSocial = document.getElementById('obraSocialNameInput')
  const inputFormDescripcion = document.getElementById('obraSocialDescripcionInput')
  const inputFormPorcentaje = document.getElementById('obraSocialPorcentajeInput')

  inputFormObraSocial.value = obraSocial?.nombre || ''
  inputFormDescripcion.value = obraSocial?.descripcion || ''
  inputFormPorcentaje.value = obraSocial?.porcentaje || ''

  const editModal = new bootstrap.Modal(document.getElementById('editModalObraSocial'))
  editModal.show()
}

function cancelEditObraSocial() {
  const inputFormObraSocial = document.getElementById('obraSocialNameInput')
  const inputFormDescripcion = document.getElementById('obraSocialDescripcionInput')
  const inputFormPorcentaje = document.getElementById('obraSocialPorcentajeInput')

  if (inputFormObraSocial) inputFormObraSocial.value = ''
  if (inputFormDescripcion) inputFormDescripcion.value = ''
  if (inputFormPorcentaje) inputFormPorcentaje.value = ''

  const url = new URL(window.location)
  url.searchParams.delete('id')
  window.history.pushState({}, '', url)
}

function renderObrasSociales() {
  const obrasSociales = getObrasSociales()

  if (!obrasSociales) {
    console.error('Error al cargar las obras sociales.')
    return
  }

  const container = document.getElementById('rowObrasSociales')
  if (!container) {
    console.error('Ha ocurrido un error en la carga.')
    return
  }

  container.innerHTML = ''

  if (obrasSociales.length === 0) {
    const emptyRow = document.createElement('tr')
    emptyRow.innerHTML = `
      <td colspan="7" class="text-center text-muted py-4">
        No hay obras sociales habilitadas.
      </td>
    `
    container.appendChild(emptyRow)
    return
  }

  obrasSociales.forEach((obraSocial, index) => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${obraSocial.nombre || ''}</td>
      <td>${obraSocial.descripcion || ''}</td>
      <td>${
        typeof obraSocial.porcentaje === 'number' && !isNaN(obraSocial.porcentaje)
          ? obraSocial.porcentaje + '%'
          : ''
      }</td>
      <td class="text-center">
        <div class="d-flex gap-1 justify-content-center">
          <button class="btn btn-outline-warning btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar" onClick="handleEditObraSocial(${
            obraSocial.id
          })">
            ${icons.edit}
          </button>
          <button data-id="${
            obraSocial.id
          }" class="btn btn-outline-danger btn-sm delete-btn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar" onClick="handleDeleteObraSocial(${
      obraSocial.id
    })">
            ${icons.delete}
          </button>
        </div>
      </td>
    `
    container.appendChild(row)
  })
}

function handleDeleteObraSocial(id) {
  deleteId = id
  const deleteModal = new bootstrap.Modal(document.getElementById('deleteModalObraSocial'))
  deleteModal.show()
}

function confirmDeleteObraSocial() {
  if (deleteId) {
    deleteObraSocial(deleteId)
    renderObrasSociales()
    deleteId = null
    const deleteModal = bootstrap.Modal.getInstance(
      document.getElementById('deleteModalObraSocial')
    )
    deleteModal.hide()
  }
}

function deleteObraSocial(id) {
  const obrasSocialesDB = getObrasSocialesDatabase()
  const updatedObrasSociales = obrasSocialesDB.filter((os) => os.id !== id)
  localStorage.setItem('dbObrasSociales', JSON.stringify(updatedObrasSociales))
}
