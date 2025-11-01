const getProfessionals = () => {
  const storedData = localStorage.getItem("dbMedicos");
  const professionalsData = storedData ? JSON.parse(storedData) : [];
  return professionalsData;
};

const getEspecialidades = () => {
  return JSON.parse(localStorage.getItem("dbEspecialidades")) || [];
};

function renderCatalog() {
  const professionals = getProfessionals();
  const especialidades = getEspecialidades();

  if (!professionals) {
    console.log("Error al cargar los profesionales.");
    return;
  }

  const container = document.getElementById("rowDoctor");
  if (!container) {
    console.error("Ha ocurrido un error.");
    return;
  }

  container.innerHTML = "";

  if (professionals.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "col-12 text-center text-muted py-4";
    emptyDiv.innerHTML = "No hay médicos disponibles.";
    container.appendChild(emptyDiv);
    return;
  }

  professionals.forEach((doc) => {
    const colDiv = document.createElement("div");
    colDiv.className = "col doctor-card-col";
    colDiv.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img
          src="${doc.fotoUrl}"
          class="doctor-card-img"
          alt="Dr. ${doc.apellido}, ${doc.nombre}"
        />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title mb-1">Dr. ${doc.apellido}, ${doc.nombre}</h5>
          <p class="card-text text-muted mb-2">${
            especialidades.find((esp) => esp.id === doc.especialidad)?.nombre ||
            "---"
          }</p>
          <p class="card-text text-muted mb-3"><small>Matrícula N° ${
            doc.matricula
          }</small></p>
          <a href="../pages/viewProfessional.html?id=${
            doc.id
          }" class="btn btn-outline-primary mt-auto">Ver</a>
        </div>
      </div>
    `;
    container.appendChild(colDiv);
  });
}
