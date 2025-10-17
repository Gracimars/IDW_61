console.log('Script dbInitializer.js loaded')

const dataBase = [
  // cuando armemos la db de las obras sociales hay que modificar el array para apuntar al PK id de la tabla de OSs
  {
    id: 1,
    matricula: 12345,
    apellido: 'Pérez',
    nombre: 'Juan',
    especialidad: 'Médico Clínico',
    descripcion:
      'Médico clínico con más de 10 años de experiencia en atención primaria y medicina interna.',
    obrasSociales: ['OSDE', 'Swiss Medical', 'Galeno'],
    fotoUrl: 'https://i.pravatar.cc/200?img=3',
    valorConsulta: 12000,
  },
  {
    id: 2,
    matricula: 23456,
    apellido: 'Rodríguez',
    nombre: 'María',
    especialidad: 'Pediatra',
    descripcion:
      'Especialista en pediatría, enfocada en el desarrollo saludable de niños y adolescentes.',
    obrasSociales: ['IOMA', 'PAMI'],
    fotoUrl: 'https://i.pravatar.cc/200?img=4',
    valorConsulta: 10000,
  },
  {
    id: 3,
    matricula: 34567,
    apellido: 'Gómez',
    nombre: 'Lucía',
    especialidad: 'Cardióloga',
    descripcion:
      'Cardióloga con experiencia en diagnóstico y prevención de enfermedades cardiovasculares.',
    obrasSociales: ['OSDE', 'Medifé', 'Sancor Salud'],
    fotoUrl: '',
    valorConsulta: 15000,
  },
  {
    id: 4,
    matricula: 45678,
    apellido: 'Fernández',
    nombre: 'Carlos',
    especialidad: 'Traumatólogo',
    descripcion: 'Traumatólogo especializado en lesiones deportivas y rehabilitación motora.',
    obrasSociales: ['Swiss Medical', 'Federada Salud'],
    fotoUrl: '',
    valorConsulta: 18000,
  },
  {
    id: 5,
    matricula: 56789,
    apellido: 'Martínez',
    nombre: 'Sofía',
    especialidad: 'Dermatóloga',
    descripcion: 'Dermatóloga enfocada en tratamientos estéticos y patologías de la piel.',
    obrasSociales: ['Galeno', 'IOMA', 'Sancor Salud'],
    fotoUrl: '',
    valorConsulta: 14000,
  },
  {
    id: 6,
    matricula: 67890,
    apellido: 'López',
    nombre: 'Diego',
    especialidad: 'Neurólogo',
    descripcion:
      'Neurólogo con amplia experiencia en diagnóstico y tratamiento de enfermedades del sistema nervioso.',
    obrasSociales: ['PAMI', 'OSDE'],
    fotoUrl: '',
    valorConsulta: 20000,
  },
  {
    id: 7,
    matricula: 78901,
    apellido: 'Sánchez',
    nombre: 'Ana',
    especialidad: 'Ginecóloga',
    descripcion: 'Ginecóloga especializada en salud reproductiva y obstetricia.',
    obrasSociales: ['OSDE', 'Medifé'],
    fotoUrl: '',
    valorConsulta: 16000,
  },
  {
    id: 8,
    matricula: 89012,
    apellido: 'Ramírez',
    nombre: 'Luis',
    especialidad: 'Oftalmólogo',
    descripcion: 'Oftalmólogo con experiencia en cirugía ocular y corrección de visión.',
    obrasSociales: ['Swiss Medical', 'Galeno'],
    fotoUrl: '',
    valorConsulta: 17000,
  },
  {
    id: 9,
    matricula: 90123,
    apellido: 'Torres',
    nombre: 'Valentina',
    especialidad: 'Psiquiatra',
    descripcion: 'Psiquiatra especializada en salud mental y tratamientos terapéuticos.',
    obrasSociales: ['OSDE', 'PAMI'],
    fotoUrl: 'https://i.pravatar.cc/200?img=9',
    valorConsulta: 19000,
  },
  {
    id: 10,
    matricula: 11234,
    apellido: 'Vargas',
    nombre: 'Pablo',
    especialidad: 'Endocrinólogo',
    descripcion: 'Endocrinólogo con experiencia en trastornos hormonales y diabetes.',
    obrasSociales: ['Medifé', 'Galeno'],
    fotoUrl: 'https://i.pravatar.cc/200?img=10',
    valorConsulta: 17500,
  },
]

localStorage.setItem('dbMedicos', JSON.stringify(dataBase))

const icons = {
  agregar: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 640 640'>
    <path d='M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z' />
  </svg>`,
  editar: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
    <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
  </svg>`,
  eliminar: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
  </svg>`,
}

function renderProfessionals(professionals) {
  console.log('Rendering professionals:', professionals.length)
  const container = document.getElementById('rowDoctor')
  if (!container) {
    console.error('Container #rowDoctor not found')
    return
  }

  container.innerHTML = ''

  professionals.forEach((doc, index) => {
    const badges = doc.obrasSociales
      .map((os) => `<span class="badge text-dark background_lightBrown">${os}</span>`)
      .join(' ')

    const row = document.createElement('tr')
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${doc.nombre} ${doc.apellido}</td>
      <td>${doc.especialidad}</td>
      <td>${badges}</td>
      <td>${doc.matricula}</td>
      <td>$${Math.round(doc.valorConsulta)}</td>
      <td class="text-center">
        <div class="d-flex gap-1 justify-content-center">
          <a href="#" data-id="${doc.id}" class="btn btn-outline-success btn-sm" title="Agregar">
            ${icons.agregar}
          </a>
          <a href="#" data-id="${doc.id}" class="btn btn-outline-warning btn-sm" title="Editar">
            ${icons.editar}
          </a>
          <a href="#" data-id="${doc.id}" class="btn btn-outline-danger btn-sm" title="Eliminar">
            ${icons.eliminar}
          </a>
        </div>
      </td>
    `
    container.appendChild(row)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const storedData = localStorage.getItem('dbMedicos')
  const professionals = storedData ? JSON.parse(storedData) : dataBase
  console.log('Datos cargados:', professionals)
  renderProfessionals(professionals)
})
