const especialidadesDB = [
  { id: 1, nombre: 'Medicina Clínica' },
  { id: 2, nombre: 'Pediatría' },
  { id: 3, nombre: 'Cardiología' },
  { id: 4, nombre: 'Traumatología' },
  { id: 5, nombre: 'Dermatología' },
  { id: 6, nombre: 'Neurología' },
  { id: 7, nombre: 'Ginecología' },
  { id: 8, nombre: 'Oftalmología' },
  { id: 9, nombre: 'Psiquiatría' },
  { id: 10, nombre: 'Endocrinología' },
]

const obrasSociales = [
  { id: 1, nombre: 'OSDE', descripcion: 'Obra social líder en Argentina.', porcentaje: 40 },
  {
    id: 2,
    nombre: 'Swiss Medical',
    descripcion: 'Cobertura médica integral y de calidad.',
    porcentaje: 10,
  },
  {
    id: 3,
    nombre: 'Galeno',
    descripcion: 'Prestaciones médicas para toda la familia.',
    porcentaje: 20,
  },
  {
    id: 4,
    nombre: 'Medicus',
    descripcion: 'Red de servicios médicos con amplia cobertura.',
    porcentaje: 50,
  },
  {
    id: 5,
    nombre: 'Omint',
    descripcion: 'Obra social con atención personalizada.',
    porcentaje: 20,
  },
]

const medicosDB = [
  {
    id: 1,
    matricula: 12345,
    apellido: 'Pérez',
    nombre: 'Juan',
    especialidad: 1,
    descripcion:
      'Médico clínico con más de 10 años de experiencia en atención primaria y medicina interna.',
    obrasSociales: [1, 2, 3],
    fotoUrl: 'https://i.pravatar.cc/200?img=3',
    valorConsulta: 12000,
  },
  {
    id: 2,
    matricula: 23456,
    apellido: 'Rodríguez',
    nombre: 'María',
    especialidad: 2,
    descripcion:
      'Especialista en pediatría, enfocada en el desarrollo saludable de niños y adolescentes.',
    obrasSociales: [1],
    fotoUrl: 'https://i.pravatar.cc/200?img=4',
    valorConsulta: 10000,
  },
  {
    id: 3,
    matricula: 34567,
    apellido: 'Gómez',
    nombre: 'Lucía',
    especialidad: 3,
    descripcion:
      'Cardióloga con experiencia en diagnóstico y prevención de enfermedades cardiovasculares.',
    obrasSociales: [1],
    fotoUrl: 'https://i.pravatar.cc/200?img=5',
    valorConsulta: 15000,
  },
  {
    id: 4,
    matricula: 45678,
    apellido: 'Fernández',
    nombre: 'Carlos',
    especialidad: 4,
    descripcion: 'Traumatólogo especializado en lesiones deportivas y rehabilitación motora.',
    obrasSociales: [2],
    fotoUrl: 'https://i.pravatar.cc/200?img=6',
    valorConsulta: 18000,
  },
  {
    id: 5,
    matricula: 56789,
    apellido: 'Martínez',
    nombre: 'Sofía',
    especialidad: 5,
    descripcion: 'Dermatóloga enfocada en tratamientos estéticos y patologías de la piel.',
    obrasSociales: [3],
    fotoUrl: 'https://i.pravatar.cc/200?img=7',
    valorConsulta: 14000,
  },
  {
    id: 6,
    matricula: 67890,
    apellido: 'López',
    nombre: 'Diego',
    especialidad: 6,
    descripcion:
      'Neurólogo con amplia experiencia en diagnóstico y tratamiento de enfermedades del sistema nervioso.',
    obrasSociales: [1],
    fotoUrl: 'https://i.pravatar.cc/200?img=8',
    valorConsulta: 20000,
  },
]

const prevDB = localStorage.getItem('dbMedicos')
if (!prevDB) localStorage.setItem('dbMedicos', JSON.stringify(medicosDB))

const prevEspDB = localStorage.getItem('dbEspecialidades')
if (!prevEspDB) localStorage.setItem('dbEspecialidades', JSON.stringify(especialidadesDB))

const prevOSDB = localStorage.getItem('dbObrasSociales')
if (!prevOSDB) localStorage.setItem('dbObrasSociales', JSON.stringify(obrasSociales))

const prevTurnosDB = localStorage.getItem('dbTurnos')
if (!prevTurnosDB) localStorage.setItem('dbTurnos', JSON.stringify(turnosDB))

const prevReservasDB = localStorage.getItem('dbReservas')
if (!prevReservasDB) localStorage.setItem('dbReservas', JSON.stringify([]))
