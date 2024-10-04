// Arrays con los meses y días
const meses = ["Un", "Du", "Trin", "Kuar", "Fim", "Sez", "Sen", "Oxt", "Nin", "Daz", "Ondu", "Dotrin", "Kater", "Fimun", "Sezfim", "Sezdar"];
const diasSemana = ["Luf", "Tyimvulf", "Klafu", "Gasmulf", "Dim", "Glof", "Syrim"];
let currentYear = 102;
let currentMonth = 0; // Índice del mes
let currentDayOfWeek = 0; // Índice del día de la semana (Luf)

// Ciclos de las lunas
const lunares = {
  timvulf: 21,  // olf Timvulf
  klafu: 29,    // olf Klafu
  gasmulf: 13,  // olf Gasmulf
  dim: 25       // olf Dim
};

// Festividades y Tasks
const festividades = {
  50: "Festival de la Luna",
  200: "Día del Sol",
  512: "Fin de Año",
  1: "Tarea importante",  
  3: "Otra tarea"          
};

// Función para cambiar el mes
function cambiarMes(mesIndex) {
  if (mesIndex >= meses.length) {
    currentMonth = 0;  // Reiniciar al primer mes si se supera el último mes
    currentYear++;      // Aumentar el año cuando se pasa de diciembre
  } else if (mesIndex < 0) {
    currentMonth = meses.length - 1;  // Ir al último mes si retrocede de enero
    currentYear--;      // Reducir el año cuando se retrocede a diciembre
  } else {
    currentMonth = mesIndex;
  }

  // Calcular el nuevo día de la semana al cambiar el mes
  let diasPrevios = 0;
  for (let i = 0; i < currentMonth; i++) {
    diasPrevios += diasPorMes[i];
  }
  
  // Ajustar el día de la semana basado en los días anteriores
  currentDayOfWeek = diasPrevios % diasSemana.length;

  actualizarMesYAnoEnAside(); // Actualiza el mes y año en el <aside>
  actualizarDiaDeLaSemanaEnAside(); // Actualizar el día de la semana inicial
  actualizarDias(); // Actualizar los días del calendario
}


// Función para cambiar el año
function cambiarAno(ano) {
  currentYear = ano;
  actualizarMesYAnoEnAside(); // Actualiza el mes y año en el <aside>
  actualizarDias(); // Actualizar también los días, por si cambia la fase lunar
}

// Función para actualizar el nombre del mes y año en el <aside>
function actualizarMesYAnoEnAside() {
  const asideElement = document.querySelector('#currentMonthYear');
  asideElement.textContent = `${meses[currentMonth]} ${currentYear}`;

}

// Función para actualizar el día de la semana en el <aside>
function actualizarDiaDeLaSemanaEnAside() {
  const dayElement = document.querySelector('#currentDay');
  dayElement.textContent = diasSemana[currentDayOfWeek];
}

// Función para obtener el día del año actual (basado en el mes y el día actual)
function obtenerDiaDelAno() {
  const diaActual = parseInt(document.querySelector('.calendar__day.today .calendar__date').textContent);
  const diasPrevios = currentMonth * 32; // Sumar los días de los meses anteriores
  return diasPrevios + diaActual;
}

// Función para obtener la fase de una luna según su ciclo
function obtenerFaseLuna(dia, cicloLuna) {
  return dia % cicloLuna;
}

// Función para actualizar las fases lunares en el calendario con logs
function actualizarLunas() {
  const diasEnElAno = obtenerDiaDelAno(); // Obtenemos el día actual en el año

  // Verificación: imprimir día actual en el año
  console.log(`Día en el año para calcular fases lunares: ${diasEnElAno}`);

  // Calculamos la fase de cada luna basándonos en su ciclo
  const faseTimvulf = obtenerFaseLuna(diasEnElAno, lunares.timvulf);
  const faseKlafu = obtenerFaseLuna(diasEnElAno, lunares.klafu);
  const faseGasmulf = obtenerFaseLuna(diasEnElAno, lunares.gasmulf);
  const faseDim = obtenerFaseLuna(diasEnElAno, lunares.dim);

  // Verificación: imprimir fases lunares calculadas
  console.log(`Fase de Timvulf: ${faseTimvulf}, Fase de Klafu: ${faseKlafu}, Fase de Gasmulf: ${faseGasmulf}, Fase de Dim: ${faseDim}`);

  // Actualizamos los elementos de las fases lunares en el sidebar
  document.querySelector('.sidebar__list-item .olfTimvulf').textContent = `Fase: ${faseTimvulf}`;
  document.querySelector('.sidebar__list-item .olfKlafu').textContent = `Fase: ${faseKlafu}`;
  document.querySelector('.sidebar__list-item .olfGasmulf').textContent = `Fase: ${faseGasmulf}`;
  document.querySelector('.sidebar__list-item .olfDim').textContent = `Fase: ${faseDim}`;
}



// Función para mostrar festividades
function mostrarFestividades(dia) {
  return festividades[dia] || "";
}

// Array que representa la cantidad de días por mes
const diasPorMes = [32, 30, 28, 32, 31, 30, 29, 31, 32, 29, 30, 28, 32, 31, 30, 29]; // Ajusta esto según tu calendario

// Función para actualizar los días del calendario con logs para depuración
function actualizarDias() {
  const dias = document.querySelectorAll('.calendar__day');
  let diasPrevios = 0;

  // Sumar los días de los meses anteriores al actual
  for (let i = 0; i < currentMonth; i++) {
    diasPrevios += diasPorMes[i];
  }

  // Verificación: imprimir mes actual y días anteriores al mes
  console.log(`Mes actual: ${currentMonth}, Días anteriores: ${diasPrevios}`);

  // Número de días en el mes actual
  const diasEnElMes = diasPorMes[currentMonth];

  dias.forEach((diaElem, index) => {
    if (index < diasEnElMes) {
      const diaActual = index + 1;
      const diaDelAno = diasPrevios + diaActual;

      // Mostrar el día en el calendario
      diaElem.querySelector('.calendar__date').textContent = diaActual;
      diaElem.style.display = ''; // Mostrar el día

      // Verificar si hay festividades
      const festividad = mostrarFestividades(diaDelAno);
      console.log(`Festividad en el día ${diaDelAno}: ${festividad}`);
      diaElem.querySelector('.calendar__task').textContent = festividad;
    } else {
      // Ocultar los días sobrantes
      diaElem.style.display = 'none';
    }
  });

  // Llamada a la función para actualizar las fases lunares
  actualizarLunas();
}

// Función para actualizar las fases lunares en el calendario
function actualizarLunas() {
  const diasEnElAno = obtenerDiaDelAno(); // Obtenemos el día actual en el año

  // Calculamos la fase de cada luna basándonos en su ciclo
  const faseTimvulf = obtenerFaseLuna(diasEnElAno, lunares.timvulf);
  const faseKlafu = obtenerFaseLuna(diasEnElAno, lunares.klafu);
  const faseGasmulf = obtenerFaseLuna(diasEnElAno, lunares.gasmulf);
  const faseDim = obtenerFaseLuna(diasEnElAno, lunares.dim);

  // Actualizamos los elementos de las fases lunares en el sidebar
  document.querySelector('.sidebar__list-item .olfTimvulf').textContent = `Fase: ${faseTimvulf}`;
  document.querySelector('.sidebar__list-item .olfKlafu').textContent = `Fase: ${faseKlafu}`;
  document.querySelector('.sidebar__list-item .olfGasmulf').textContent = `Fase: ${faseGasmulf}`;
  document.querySelector('.sidebar__list-item .olfDim').textContent = `Fase: ${faseDim}`;
}


// Listeners para botones de cambiar mes y año
document.querySelector('#nextMonthBtn').addEventListener('click', () => {
  cambiarMes(currentMonth + 1);
});

document.querySelector('#prevMonthBtn').addEventListener('click', () => {
  cambiarMes(currentMonth - 1);
});

document.querySelector('#nextYearBtn').addEventListener('click', () => {
  cambiarAno(currentYear + 1);
});

document.querySelector('#prevYearBtn').addEventListener('click', () => {
  cambiarAno(currentYear - 1);
});

// Inicializar el calendario con el año y mes actual
document.addEventListener('DOMContentLoaded', () => {
  actualizarMesYAnoEnAside();
  actualizarDiaDeLaSemanaEnAside();
  actualizarDias();
});


