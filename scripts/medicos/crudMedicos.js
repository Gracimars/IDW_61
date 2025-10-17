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




const handleSubmit = (event) => {
    event.preventDefault();
    const medicosDB = getMedicosDatabase();
    // console.log(medicosDB);
    const form = event.target;
    const formData = Object.fromEntries(new FormData(form));
    const { action, id } = getQueryParams();
    // console.log(formData, action, id)


    // console.log((Math.max(...medicosDB.map(medico => medico.id)) + 1))

    const doctorEntry = {
        id: action === "edit" && id ? parseInt(id) : (Math.max(...medicosDB.map(medico => medico.id)) + 1),
        nombre: formData.nombre,
        apellido: formData.apellido,
        matricula: parseInt(formData.matricula),
        descripcion: formData.descripcion,
        obrasSociales: Object.keys(formData).filter(key => key.endsWith("OS")).map(key => formData[key])
    }

    if (action === "edit" && id) {
        const index = medicosDB.findIndex(medico => medico.id === parseInt(id));
        if (index !== -1) {
            medicosDB.splice(index, 1, doctorEntry)
        } else {
            medicosDB.push(doctorEntry)
        }
    } else {
        medicosDB.push(doctorEntry)
    }

    localStorage.setItem("dbMedicos", JSON.stringify(medicosDB));
}