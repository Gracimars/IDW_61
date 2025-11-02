const icons = {
  edit: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
    <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
  </svg>`,
  delete: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
  </svg>`,
};

let deleteId = null;

const getEspecialidades = () => {
  return JSON.parse(localStorage.getItem("dbEspecialidades")) || [];
};

function handleEditEspecialidad(id) {
  const url = new URL(window.location);
  url.searchParams.set("id", id);
  window.history.pushState({}, "", url);

  const editModal = new bootstrap.Modal(document.getElementById("editModal"));
  editModal.show();
}

function cancelEditEspecialidad() {
  const url = new URL(window.location);
  url.searchParams.delete("id");
  window.history.pushState({}, "", url);
}

function renderEspecialidades() {
  const especialidades = getEspecialidades();

  if (!especialidades) {
    console.error("Error al cargar las especialidades.");
    return;
  }

  const container = document.getElementById("rowEspecialidades");
  if (!container) {
    console.error("Ha ocurrido un error en la carga.");
    return;
  }

  container.innerHTML = "";

  if (especialidades.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `
      <td colspan="7" class="text-center text-muted py-4">
        No hay especialidades habilitadas.
      </td>
    `;
    container.appendChild(emptyRow);
    return;
  }

  especialidades.forEach((especialidad, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${especialidad.nombre}</td>
      <td class="text-center">
        <div class="d-flex gap-1 justify-content-center">
          <button class="btn btn-outline-warning btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar" onClick="handleEditEspecialidad(${
            especialidad.id
          })">
            ${icons.edit}
          </button>
          <button data-id="${
            especialidad.id
          }" class="btn btn-outline-danger btn-sm delete-btn" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar" onClick="handleDeleteEspecialidad(${
      especialidad.id
    })">
            ${icons.delete}
          </button>
        </div>
      </td>
    `;
    container.appendChild(row);
  });
}

function handleDeleteEspecialidad(id) {
  deleteId = id;
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteModalEspecialidad")
  );
  deleteModal.show();
}

function confirmDeleteEspecialidad() {
  if (deleteId) {
    deleteEspecialidad(deleteId);
    renderEspecialidades();
    deleteId = null;
    const deleteModal = bootstrap.Modal.getInstance(
      document.getElementById("deleteModal")
    );
    deleteModal.hide();
  }
}
