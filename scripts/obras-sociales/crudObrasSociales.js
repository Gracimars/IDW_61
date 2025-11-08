const useObrasSocialesQueryParams = () => {
  const params = new URLSearchParams(window.location.search)
  return {
    id: params.get('id'),
  }
}

const useFindObraSocial = (database) => {
  const { id } = useObrasSocialesQueryParams()
  let foundObraSocial = null
  let foundObraSocialIndex = -1
  if (id) {
    const index = database.findIndex((obraSocial) => obraSocial.id === parseInt(id))
    if (index !== -1) {
      foundObraSocial = database[index]
      foundObraSocialIndex = index
    }
  }
  return { foundObraSocial, foundObraSocialIndex }
}

const getObrasSocialesDatabase = () => {
  const obrasSociales = localStorage.getItem('dbObrasSociales') || JSON.stringify([])
  return JSON.parse(obrasSociales)
}

function createObraSocial(nombreObraSocial, descripcionObraSocial, porcentajeObraSocial) {
  const obrasSocialesDb = getObrasSocialesDatabase()
  const maxId = obrasSocialesDb.length > 0 ? Math.max(...obrasSocialesDb.map((os) => os.id)) + 1 : 1
  const obraSocialNueva = {
    id: maxId,
    nombre: nombreObraSocial,
    descripcion: descripcionObraSocial,
    porcentaje: parseFloat(porcentajeObraSocial),
  }
  const obrasSocialesFinal = [...obrasSocialesDb, obraSocialNueva]
  localStorage.setItem('dbObrasSociales', JSON.stringify(obrasSocialesFinal))
}

function editObraSocial(nombreObraSocial, descripcionObraSocial, porcentajeObraSocial) {
  const obrasSocialesDb = getObrasSocialesDatabase()
  const { foundObraSocial, foundObraSocialIndex } = useFindObraSocial(obrasSocialesDb)
  if (foundObraSocial && foundObraSocialIndex !== -1) {
    const obraSocialEditada = {
      id: foundObraSocial.id,
      nombre: nombreObraSocial,
      descripcion: descripcionObraSocial,
      porcentaje: parseFloat(porcentajeObraSocial),
    }
    obrasSocialesDb.splice(foundObraSocialIndex, 1, obraSocialEditada)
    localStorage.setItem('dbObrasSociales', JSON.stringify(obrasSocialesDb))
  } else {
    alert('El ID de la obra social no existe')
  }
}

function handleSubmitObraSocial(event) {
  event.preventDefault()
  const form = event.target
  const formData = Object.fromEntries(new FormData(form))
  const nombreObraSocial = formData['nombreObraSocial']
  const descripcionObraSocial = formData['descripcionObraSocial']
  const porcentajeObraSocial = formData['porcentajeObraSocial']
  const { id } = useObrasSocialesQueryParams()
  if (!id) {
    createObraSocial(nombreObraSocial, descripcionObraSocial, porcentajeObraSocial)
  } else {
    editObraSocial(nombreObraSocial, descripcionObraSocial, porcentajeObraSocial)
  }
  const editModal = bootstrap.Modal.getInstance(document.getElementById('editModalObraSocial'))
  if (editModal) editModal.hide()
  console.log(editModal)
  if (typeof renderObrasSociales === 'function') renderObrasSociales()
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
