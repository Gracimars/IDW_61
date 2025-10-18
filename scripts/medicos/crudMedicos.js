const fotoABase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        action: params.get("action"),
        id: params.get("id")
    };
}

const getMedicosDatabase = () => {
    const medicos = localStorage.getItem("dbMedicos") || JSON.stringify([]);
    return JSON.parse(medicos);
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const medicosDB = getMedicosDatabase();
    // console.log(medicosDB);
    const form = event.target;
    const formData = Object.fromEntries(new FormData(form));
    const { action, id } = getQueryParams();
    // console.log(formData, action, id)


    // console.log((Math.max(...medicosDB.map(medico => medico.id)) + 1))
    let foundMedico = null;
    let foundMedicoIndex = -1;

    if (action === "edit" && id) {
        const index = medicosDB.findIndex(medico => medico.id === parseInt(id))

        if (index !== -1) {
            foundMedico = medicosDB[index];
            foundMedicoIndex = index;
        }
    }

    const idMedico = foundMedico?.id ?? (Math.max(...medicosDB.map(medico => medico.id)) + 1)

    // console.log(formData)

    const fotoBase64 = formData.fotoUrl.size ? await fotoABase64(formData.fotoUrl) : foundMedico ? foundMedico.fotoUrl : ""

    // console.log(fotoBase64)

    const doctorEntry = {
        id: idMedico,
        nombre: formData.nombre,
        apellido: formData.apellido,
        matricula: parseInt(formData.matricula),
        descripcion: formData.descripcion,
        valorConsulta: parseInt(formData.valorConsulta),
        obrasSociales: Object.keys(formData).filter(key => key.endsWith("OS")).map(key => formData[key]),
        fotoUrl: foundMedico && !fotoBase64 ? foundMedico.fotoUrl : fotoBase64,
        especialidad: formData.especialidad
    }

    if (foundMedico) {
        medicosDB.splice(foundMedicoIndex, 1, doctorEntry)
    } else {
        medicosDB.push(doctorEntry)
    }

    localStorage.setItem("dbMedicos", JSON.stringify(medicosDB));
}