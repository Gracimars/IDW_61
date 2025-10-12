const dataBase = [ // cuando armemos la db de las obras sociales hay que modificar el array para apuntar al PK id de la tabla de OSs
    {
        id: 1,
        matricula: 12345,
        apellido: "Pérez",
        nombre: "Juan",
        especialidad: "3f7b2a0c-84d1-4e6b-97a0-5c2f1a1b45e3",
        descripcion: "Médico clínico con más de 10 años de experiencia en atención primaria y medicina interna.",
        obrasSociales: ["OSDE", "Swiss Medical", "Galeno"],
        fotoUrl: "",
        valorConsulta: 12000.50
    },
    {
        id: 2,
        matricula: 23456,
        apellido: "Rodríguez",
        nombre: "María",
        especialidad: "9d8c6f40-3e12-4e65-97df-817f9324d91a",
        descripcion: "Especialista en pediatría, enfocada en el desarrollo saludable de niños y adolescentes.",
        obrasSociales: ["IOMA", "PAMI"],
        fotoUrl: "",
        valorConsulta: 10000.00
    },
    {
        id: 3,
        matricula: 34567,
        apellido: "Gómez",
        nombre: "Lucía",
        especialidad: "b44a99b5-17a3-45c7-8f7c-93aebd9040da",
        descripcion: "Cardióloga con experiencia en diagnóstico y prevención de enfermedades cardiovasculares.",
        obrasSociales: ["OSDE", "Medifé", "Sancor Salud"],
        fotoUrl: "",
        valorConsulta: 15000.75
    },
    {
        id: 4,
        matricula: 45678,
        apellido: "Fernández",
        nombre: "Carlos",
        especialidad: "e8b1d6b0-f5c9-4b63-9b0f-c2381d4d7a8c",
        descripcion: "Traumatólogo especializado en lesiones deportivas y rehabilitación motora.",
        obrasSociales: ["Swiss Medical", "Federada Salud"],
        fotoUrl: "",
        valorConsulta: 18000.00
    },
    {
        id: 5,
        matricula: 56789,
        apellido: "Martínez",
        nombre: "Sofía",
        especialidad: "0a9f4e12-2f34-4f11-9eac-9f86d3e3c4e0",
        descripcion: "Dermatóloga enfocada en tratamientos estéticos y patologías de la piel.",
        obrasSociales: ["Galeno", "IOMA", "Sancor Salud"],
        fotoUrl: "",
        valorConsulta: 14000.20
    },
    {
        id: 6,
        matricula: 67890,
        apellido: "López",
        nombre: "Diego",
        especialidad: "2f8c9d3a-86c2-4e1a-98f7-abc6d9e1e5b2",
        descripcion: "Neurólogo con amplia experiencia en diagnóstico y tratamiento de enfermedades del sistema nervioso.",
        obrasSociales: ["PAMI", "OSDE"],
        fotoUrl: "",
        valorConsulta: 20000.00
    }
];


if (!localStorage.getItem("dbMedicos")) localStorage.setItem("dbMedicos", JSON.stringify(dataBase))