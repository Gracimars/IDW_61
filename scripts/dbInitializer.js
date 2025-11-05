const especialidadesDB = [
  { id: 1, nombre: "Medicina Clínica" },
  { id: 2, nombre: "Pediatría" },
  { id: 3, nombre: "Cardiología" },
  { id: 4, nombre: "Traumatología" },
  { id: 5, nombre: "Dermatología" },
  { id: 6, nombre: "Neurología" },
  { id: 7, nombre: "Ginecología" },
  { id: 8, nombre: "Oftalmología" },
  { id: 9, nombre: "Psiquiatría" },
  { id: 10, nombre: "Endocrinología" },
];

const dataBase = [
  // cuando armemos la db de las obras sociales hay que modificar el array para apuntar al PK id de la tabla de OSs
  {
    id: 1,
    matricula: 12345,
    apellido: "Pérez",
    nombre: "Juan",
    especialidad: 1,
    descripcion:
      "Médico clínico con más de 10 años de experiencia en atención primaria y medicina interna.",
    obrasSociales: ["OSDE", "Swiss Medical", "Galeno"],
    fotoUrl: "https://i.pravatar.cc/200?img=3",
    valorConsulta: 12000,
  },
  {
    id: 2,
    matricula: 23456,
    apellido: "Rodríguez",
    nombre: "María",
    especialidad: 2,
    descripcion:
      "Especialista en pediatría, enfocada en el desarrollo saludable de niños y adolescentes.",
    obrasSociales: ["IOMA", "PAMI"],
    fotoUrl: "https://i.pravatar.cc/200?img=4",
    valorConsulta: 10000,
  },
  {
    id: 3,
    matricula: 34567,
    apellido: "Gómez",
    nombre: "Lucía",
    especialidad: 3,
    descripcion:
      "Cardióloga con experiencia en diagnóstico y prevención de enfermedades cardiovasculares.",
    obrasSociales: ["OSDE", "Medifé", "Sancor Salud"],
    fotoUrl: "https://i.pravatar.cc/200?img=5",
    valorConsulta: 15000,
  },
  {
    id: 4,
    matricula: 45678,
    apellido: "Fernández",
    nombre: "Carlos",
    especialidad: 4,
    descripcion:
      "Traumatólogo especializado en lesiones deportivas y rehabilitación motora.",
    obrasSociales: ["Swiss Medical", "Federada Salud"],
    fotoUrl: "https://i.pravatar.cc/200?img=6",
    valorConsulta: 18000,
  },
  {
    id: 5,
    matricula: 56789,
    apellido: "Martínez",
    nombre: "Sofía",
    especialidad: 5,
    descripcion:
      "Dermatóloga enfocada en tratamientos estéticos y patologías de la piel.",
    obrasSociales: ["Galeno", "IOMA", "Sancor Salud"],
    fotoUrl: "https://i.pravatar.cc/200?img=7",
    valorConsulta: 14000,
  },
  {
    id: 6,
    matricula: 67890,
    apellido: "López",
    nombre: "Diego",
    especialidad: 6,
    descripcion:
      "Neurólogo con amplia experiencia en diagnóstico y tratamiento de enfermedades del sistema nervioso.",
    obrasSociales: ["PAMI", "OSDE"],
    fotoUrl: "https://i.pravatar.cc/200?img=8",
    valorConsulta: 20000,
  },
  {
    id: 7,
    matricula: 78901,
    apellido: "Sánchez",
    nombre: "Ana",
    especialidad: 7,
    descripcion:
      "Ginecóloga especializada en salud reproductiva y obstetricia.",
    obrasSociales: ["OSDE", "Medifé"],
    fotoUrl: "https://i.pravatar.cc/200?img=9",
    valorConsulta: 16000,
  },
  {
    id: 8,
    matricula: 89012,
    apellido: "Ramírez",
    nombre: "Luis",
    especialidad: 8,
    descripcion:
      "Oftalmólogo con experiencia en cirugía ocular y corrección de visión.",
    obrasSociales: ["Swiss Medical", "Galeno"],
    fotoUrl: "https://i.pravatar.cc/200?img=10",
    valorConsulta: 17000,
  },
  {
    id: 9,
    matricula: 90123,
    apellido: "Torres",
    nombre: "Valentina",
    especialidad: 9,
    descripcion:
      "Psiquiatra especializada en salud mental y tratamientos terapéuticos.",
    obrasSociales: ["OSDE", "PAMI"],
    fotoUrl: "https://i.pravatar.cc/200?img=11",
    valorConsulta: 19000,
  },
  {
    id: 10,
    matricula: 11234,
    apellido: "Vargas",
    nombre: "Pablo",
    especialidad: 10,
    descripcion:
      "Endocrinólogo con experiencia en trastornos hormonales y diabetes.",
    obrasSociales: ["Medifé", "Galeno"],
    fotoUrl: "https://i.pravatar.cc/200?img=12",
    valorConsulta: 17500,
  },
];

const prevDB = localStorage.getItem("dbMedicos");
if (!prevDB) localStorage.setItem("dbMedicos", JSON.stringify(dataBase));

const prevEspDB = localStorage.getItem("dbEspecialidades");
if (!prevEspDB)
  localStorage.setItem("dbEspecialidades", JSON.stringify(especialidadesDB));
