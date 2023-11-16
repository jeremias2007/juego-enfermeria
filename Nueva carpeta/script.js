const questions = [
    // ... (preguntas anteriores)
    { question: "¿Cuándo se tiene registro de las primeras prácticas para el tratamiento de enfermedades mentales en la historia?", answer: "Las primeras prácticas para el tratamiento de enfermedades mentales se registran en la antigüedad, con métodos como exorcismos y rituales místicos." },
    { question: "¿Cómo influyeron las creencias religiosas en la percepción de los trastornos mentales en la antigüedad?", answer: "Las creencias religiosas influyeron significativamente en la percepción de los trastornos mentales, a menudo atribuyéndolos a posesiones demoníacas o castigos divinos." },
    // ... (otras preguntas y respuestas)
    { question: "¿Cómo ha contribuido la tecnología, como la telepsiquiatría, en la evolución de la atención a la salud mental?", answer: "La tecnología, incluida la telepsiquiatría, ha mejorado la accesibilidad a la atención de la salud mental, permitiendo la prestación de servicios a distancia." }
];

const questionContainer = document.getElementById('question-container');
const spinner = document.getElementById('spinner');
const countdownElement = document.getElementById('countdown');
const spinBtn = document.getElementById('spin-btn');

let currentQuestionIndex = 0;
let countdown;
let timeoutId;

function spin() {
    // Detener el temporizador si ya está en marcha
    clearTimeout(timeoutId);
    
    // Reiniciar el contador
    clearInterval(countdown);
    countdownElement.textContent = '20';

    // Desactivar el botón de giro durante 20 segundos
    spinBtn.disabled = true;

    // Obtener una pregunta aleatoria
    const randomIndex = Math.floor(Math.random() * questions.length);
    const newQuestion = questions[randomIndex];

    // Mostrar la pregunta
    questionContainer.innerHTML = `<p id="question">${newQuestion.question}</p>`;
    
    // Ocultar la respuesta
    document.getElementById('answer').style.display = 'none';

    // Actualizar el índice de la pregunta actual
    currentQuestionIndex = randomIndex;

    // Mostrar la ruleta girando
    spinner.style.animation = 'spin 2s ease-out';
    setTimeout(() => {
        // Detener la animación después de 2 segundos
        spinner.style.animation = '';

        // Activar el temporizador para mostrar la respuesta después de 20 segundos
        timeoutId = setTimeout(showAnswer, 20000);
        // Iniciar el contador regresivo
        countdown = setInterval(updateCountdown, 1000);
    }, 2000);
}

function showAnswer() {
    // Mostrar la respuesta junto a la pregunta
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('answer').innerHTML = `<p id="answer">Respuesta: ${currentQuestion.answer}</p>`;
    document.getElementById('answer').style.display = 'block';

    // Reactivar el botón de giro
    spinBtn.disabled = false;
}

function updateCountdown() {
    // Actualizar el contador regresivo
    let seconds = parseInt(countdownElement.textContent, 10);
    seconds -= 1;
    countdownElement.textContent = seconds;

    // Cuando el contador llega a cero, mostrar la respuesta
    if (seconds <= 0) {
        showAnswer();
        clearInterval(countdown);
    }
}