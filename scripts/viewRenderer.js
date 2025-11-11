const getUsers = () => {
  const storedData = localStorage.getItem('dbMedicos')
  const professionalsData = storedData ? JSON.parse(storedData) : []
  return professionalsData
}

const getObrasSociales = () => {
  const storedData = localStorage.getItem('dbObrasSociales')
  return storedData ? JSON.parse(storedData) : []
}

function renderProfessionalView(id) {
  const professionals = getUsers()
  if (!professionals) {
    return
  }

  const container = document.getElementById('professional-card')
  if (!container) {
    console.error('Ha ocurrido un error.')
    return
  }

  container.innerHTML = ''
  const doc = professionals.find((doc) => doc.id === Number(id))

  const obrasSocialesList = getObrasSociales()
  const badges = doc.obrasSociales
    .map((osId) => {
      const os = obrasSocialesList.find((o) => o.id === osId)
      return os ? `<span class="badge text-dark background_lightBrown">${os.nombre}</span>` : ''
    })
    .join(' ')

  container.innerHTML = `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-lg-8 ">
          <div class="card shadow-sm   h-100 background_verdecito ">
            <div class="card-body p-4">
              <div class="row mb-3">
                <div class="col-md-4">
                  <img src="${doc.fotoUrl}" class="img-fluid doctor-card-img" alt="Dr. ${doc.apellido}, ${doc.nombre}" style="height: 200px; object-fit: cover; border-radius: 50%;">
                </div>
                <div class="col-md-8 mt-4">
                  <h1 class="card-title mb-0 fw-bold">Dr. ${doc.apellido}, ${doc.nombre}</h2>
                  <p class="card-text text-muted h4 fw-bold mt-3"><small>Matrícula N° ${doc.matricula}</small></p>
                </div>
              </div>
              <div class="p-md-3 mt-5">
                <p class="card-text text-muted">${doc.descripcion}</p>
                <p class="card-text text-muted"><strong>Especialidad:</strong> ${doc.especialidad}</p>
                <p class="card-text text-muted"><strong>Valor de Consulta:</strong> ${doc.valorConsulta}</p>
                <p class="card-text text-muted"><strong>Obras Sociales:  ${badges}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
