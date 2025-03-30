const timerElement = document.querySelector("#timer");
const marcasLista = document.querySelector("#marcasLista");

let intervaloID = 0;
let timer = 0;
let marks = [];

const formatarTempo = (tempo) => {
    const horas = Math.floor(tempo / 360000);
    const minutos = Math.floor((tempo % 360000) / 6000);
    const segundos = Math.floor((tempo % 6000) / 100);

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

const toggleTimer = () => {
    const botao = document.querySelector("#iniciar");
    const action = botao.getAttribute('action');

    clearInterval(intervaloID);

    if (action == 'start' || action == 'continue'){
        intervaloID = setInterval(() => {
            timer += 1;
            setTimer(timer)
        }, 10)

        botao.setAttribute('action', 'pause');
        botao.innerHTML = '<i class="fa-solid fa-pause" style="color: black;"></i>';
    } else if (action == 'pause') {
        botao.setAttribute('action', 'continue');
        botao.innerHTML = '<i class="fa-solid fa-play" style="color: black;"></i>'
    }
}

const setTimer = (tempo) => {
    timerElement.innerText = formatarTempo(tempo);
}

document.querySelector('#iniciar').addEventListener('click', toggleTimer);