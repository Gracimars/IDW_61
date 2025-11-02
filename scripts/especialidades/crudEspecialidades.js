const useQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
  };
};

const useFindEspecialidad = (database) => {
  const { id } = useQueryParams();

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
