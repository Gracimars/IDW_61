const useEspecialidadesQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
  };
};

const useFindEspecialidad = (database) => {
  const { id } = useEspecialidadesQueryParams();

  let foundEspecialidad = null;
  let foundEspecialidadIndex = -1;

  if (id) {
    const index = database.findIndex(
      (especialidad) => especialidad.id === parseInt(id)
    );

    if (index !== -1) {
      foundEspecialidad = database[index];
      foundEspecialidadIndex = index;
    }
  }

  return { foundEspecialidad, foundEspecialidadIndex };
};

const getEspecialidadesDatabase = () => {
  const especialidades =
    localStorage.getItem("dbEspecialidades") || JSON.stringify([]);
  return JSON.parse(especialidades);
};

function createEspecialidad(nombreEspecialidad) {
  const especialidadesDb = getEspecialidadesDatabase();
  const maxId = Math.max(...especialidadesDb.map((esp) => esp.id)) + 1;

  const especialidadNueva = {
    id: maxId,
    nombre: nombreEspecialidad,
  };

  const especialidadesFinal = [...especialidadesDb, especialidadNueva];

  localStorage.setItem("dbEspecialidades", JSON.stringify(especialidadesFinal));
}

function editEspecialidad(nombreEspecialidad) {
  const especialidadesDb = getEspecialidadesDatabase();

  const { foundEspecialidad, foundEspecialidadIndex } =
    useFindEspecialidad(especialidadesDb);

  if (foundEspecialidad && foundEspecialidadIndex !== -1) {
    const especialidadEditada = {
      id: foundEspecialidad.id,
      nombre: nombreEspecialidad,
    };

    especialidadesDb.splice(foundEspecialidadIndex, 1, especialidadEditada);

    localStorage.setItem("dbEspecialidades", JSON.stringify(especialidadesDb));
  } else {
    alert("el ID de la especialidad no existe");
  }
}

function deleteEspecialidad(id) {
  const especialidadesDb = getEspecialidadesDatabase();

  const especialidadesFiltradas = especialidadesDb.filter(
    (especialidad) => especialidad.id !== id
  );

  localStorage.setItem(
    "dbEspecialidades",
    JSON.stringify(especialidadesFiltradas)
  );
}

function handleSubmitEspecialidad(event) {
  event.preventDefault();

  const form = event.target;
  const formData = Object.fromEntries(new FormData(form));

  const nombreEspecialidad = formData["nombreEspecialidad"];
  const { id } = useEspecialidadesQueryParams();

  if (!id) {
    createEspecialidad(nombreEspecialidad);
  } else {
    editEspecialidad(nombreEspecialidad);
  }

  const deleteModal = bootstrap.Modal.getInstance(
    document.getElementById("editModalEspecialidades")
  );
  deleteModal.hide();

  renderEspecialidades();

  const inputFormEspecialidades = document.getElementById(
    "especialidadNameInput"
  );

  inputFormEspecialidades.value = "";
  inputFormEspecialidades.value = "";
  const url = new URL(window.location);
  url.searchParams.delete("id");
  window.history.pushState({}, "", url);
}
