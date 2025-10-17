const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        action: params.get("action"),
        id: params.get("id")
    };
}

const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = Object.fromEntries(new FormData(form));
    const { action, id } = getQueryParams();
    console.log(formData, action, id)

    const doctorEntry = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        matricula: parseInt(formData.matricula),
        descripcion: formData.descripcion,
        obrasSociales: Object.keys(formData).filter(key => key.endsWith("OS")).map(key => formData[key])
    }

    console.log(doctorEntry)
}