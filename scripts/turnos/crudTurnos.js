let editingTurnoId = null;

const getTurnosDatabase = () => {
  const turnos = localStorage.getItem("dbTurnos") || JSON.stringify([]);
  return JSON.parse(turnos);
};

const getMedicosDatabase = () => {
  const medicos = localStorage.getItem("dbMedicos") || JSON.stringify([]);
  return JSON.parse(medicos);
};

const handleSubmitTurno = (event) => {
  event.preventDefault();

  const turnosDB = getTurnosDatabase();
  const form = event.target;
  const formData = Object.fromEntries(new FormData(form));

  const idTurno =
    editingTurnoId ?? Math.max(...turnosDB.map((turno) => turno.id), 0) + 1;

  const dateTimeString = `${formData.fecha}T${formData.hora}:00`;
  const timestamp = new Date(dateTimeString).getTime();

  const turnoEntry = {
    id: idTurno,
    medico: Number(formData.medico),
    fechaHora: timestamp,
    disponible: formData.disponible === "on",
  };

  if (editingTurnoId) {
    const index = turnosDB.findIndex((turno) => turno.id === editingTurnoId);
    turnosDB.splice(index, 1, turnoEntry);
  } else {
    turnoExistente = turnosDB.find(
      (turno) =>
        turno.medico === turnoEntry.medico &&
        turno.fechaHora === turnoEntry.fechaHora
    );
    if (turnoExistente) {
      alert(
        "el doc ya tiene un turno a esta hora, no puede atender dos pacientes che."
      );
      return;
    }
    turnosDB.push(turnoEntry);
  }

  localStorage.setItem("dbTurnos", JSON.stringify(turnosDB));

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("editModalTurnos")
  );
  modal.hide();

  cancelEditTurno();
  renderTurnos();
};

const loadMedicosIntoSelect = () => {
  const medicos = getMedicosDatabase();
  const selectMedicos = document.getElementById("SelectMedico");

  if (!selectMedicos) {
    console.error("No se encontró el elemento select para médicos.");
    return;
  }

  if (!medicos.length) {
    selectMedicos.innerHTML = `<option value="" disabled>No hay médicos disponibles para elegir</option>`;
    return;
  }

  const mappedOptions = medicos
    .map(
      (medico) => `
    <option value="${medico.id}">${medico.nombre} ${medico.apellido}</option>`
    )
    .join("");
  selectMedicos.innerHTML =
    '<option value="" disabled selected>Seleccione un médico</option>' +
    mappedOptions;
};

const loadTimeOptions = () => {
  const selectHora = document.getElementById("Hora");

  if (!selectHora) {
    console.error("No se encontró el elemento select para hora.");
    return;
  }

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = String(hour).padStart(2, "0");
      const minuteStr = String(minute).padStart(2, "0");
      const timeValue = `${hourStr}:${minuteStr}`;
      timeOptions.push(`<option value="${timeValue}">${timeValue}</option>`);
    }
  }

  selectHora.innerHTML =
    '<option value="" disabled selected>Seleccione una hora</option>' +
    timeOptions.join("");
};

const openEditModalTurno = (turnoId) => {
  editingTurnoId = turnoId;
  const turnosDB = getTurnosDatabase();
  const turno = turnosDB.find((t) => t.id === turnoId);

  if (turno) {
    document.getElementById("modalTitleTurno").textContent = "Editar turno";
    document.getElementById("SelectMedico").value = turno.medico;

    const date = new Date(turno.fechaHora);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    document.getElementById("Fecha").value = `${year}-${month}-${day}`;
    document.getElementById("Hora").value = `${hours}:${minutes}`;
    document.getElementById("Disponible").checked = turno.disponible;
  }

  const modal = new bootstrap.Modal(document.getElementById("editModalTurnos"));
  modal.show();
};

const cancelEditTurno = () => {
  editingTurnoId = null;
  document.getElementById("modalTitleTurno").textContent = "Agregar turno";
  document.getElementById("SelectMedico").value = "";
  document.getElementById("Fecha").value = "";
  document.getElementById("Hora").value = "";
  document.getElementById("Disponible").checked = true;
};

function deleteTurno(id) {
  const turnosDb = getTurnosDatabase();
  const index = turnosDb.findIndex((turno) => turno.id === parseInt(id));
  if (turnosDb[index]?.id === id) {
    turnosDb.splice(index, 1);
    localStorage.setItem("dbTurnos", JSON.stringify(turnosDb));
  } else {
    alert("No se encontró turno con el id proporcionado");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("editModalTurnos");
  if (modal) {
    loadMedicosIntoSelect();
    loadTimeOptions();
  }
});
