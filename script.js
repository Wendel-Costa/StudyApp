/* Elementos do Temporizador */
const timerElement = document.querySelector("#timer");
const marcasLista = document.querySelector("#marcasLista");
const temaSelect = document.querySelector("#temaSelect");
const novoTemaInput = document.querySelector("#novoTema");
const addTemaButton = document.querySelector("#addTema");

/* Elementos de Tarefas */
const taskList = document.querySelector("#taskList");
const tarefasLista = document.querySelector("#tarefasLista");
const addTaskButton = document.querySelector(".conteudo-blocoTask-adicionar-botao");
const deleteCompletedButton = document.querySelector("#deleteCompleted");

let intervaloID = 0;
let timer = 0;
let temas = typeof localStorage.getItem("temas") === "string"
    ? JSON.parse(localStorage.getItem("temas"))
    : { "Estudo": 0 };

if (temas === null || Array.isArray(temas)) {
    temas = { "Estudo": 0 };
    localStorage.setItem("temas", JSON.stringify(temas));
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ====== TEMPORIZADOR ====== */
const formatarTempo = (tempo) => {
    const horas = Math.floor(tempo / 360000);
    const minutos = Math.floor((tempo % 360000) / 6000);
    const segundos = Math.floor((tempo % 6000) / 100);
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
};

const toggleTimer = () => {
    const botao = document.querySelector("#iniciar");
    const action = botao.getAttribute('action');
    clearInterval(intervaloID);

    if (action === 'start' || action === 'continue') {
        intervaloID = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
        botao.setAttribute('action', 'pause');
        botao.innerHTML = '<i class="fa-solid fa-pause" style="color: black;"></i>';
    } else if (action === 'pause') {
        botao.setAttribute('action', 'continue');
        botao.innerHTML = '<i class="fa-solid fa-play" style="color: black;"></i>';
    }
};

const setTimer = (tempo) => {
    if (timerElement) timerElement.innerText = formatarTempo(tempo);
};

const pararTimer = () => {
    clearInterval(intervaloID);
    const tema = temaSelect?.value || "Estudo";
    if (timer > 0) {
        temas[tema] = (temas[tema] || 0) + timer;
        localStorage.setItem("temas", JSON.stringify(temas));
        atualizarMarcas();
    }
    timer = 0;
    setTimer(0);
    const iniciarBotao = document.querySelector("#iniciar");
    if (iniciarBotao) {
        iniciarBotao.setAttribute('action', 'start');
        iniciarBotao.innerHTML = '<i class="fa-solid fa-play" style="color: black;"></i>';
    }
};

const atualizarMarcas = () => {
    const marcasContainer = marcasLista || document.querySelector("#marcasListaIndex");
    if (!marcasContainer) return;
    marcasContainer.innerHTML = ""; // Limpa a lista inicialmente
    // Só exibe marcas se o temporizador foi parado e há tempo registrado
    if (timer > 0 || Object.values(temas).some(tempo => tempo > 0)) {
        for (const [tema, tempo] of Object.entries(temas)) {
            if (tempo > 0) { // Só exibe temas com tempo maior que 0
                const p = document.createElement("p");
                p.textContent = `${tema}: ${formatarTempo(tempo)}`;
                marcasContainer.appendChild(p);
            }
        }
    }
};

const atualizarTemas = () => {
    if (!temaSelect) return;
    temaSelect.innerHTML = '<option value="">Escolha um tema</option>';
    for (const tema of Object.keys(temas)) {
        const option = document.createElement("option");
        option.value = tema;
        option.textContent = tema;
        temaSelect.appendChild(option);
    }
};

const adicionarTema = () => {
    const novoTema = novoTemaInput.value.trim();
    if (novoTema && !temas[novoTema]) {
        temas[novoTema] = 0;
        localStorage.setItem("temas", JSON.stringify(temas));
        atualizarTemas();
        temaSelect.value = novoTema; // Seleciona o novo tema automaticamente
        novoTemaInput.value = "";
    }
};

/* ====== TAREFAS ====== */
const renderTasks = (targetElement) => {
    if (!targetElement) return;
    targetElement.innerHTML = "";
    tasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.classList.add("task-item");
        div.innerHTML = `
            <i class="fa-regular ${task.completed ? 'fa-square-check' : 'fa-square'} task-checkbox" data-index="${index}"></i>
            <p class="conteudo-blocoTask-tasks-task-texto ${task.completed ? 'completed' : ''}">${task.text}</p>
        `;
        targetElement.appendChild(div);
    });
};

const adicionarTarefa = () => {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("conteudo-blocoTask-tasks-task-texto");
    input.placeholder = "Digite a tarefa e pressione Enter";
    taskList.innerHTML = "";
    taskList.appendChild(input);
    input.focus();

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && input.value.trim()) {
            tasks.push({ text: input.value.trim(), completed: false });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks(taskList);
            if (tarefasLista) renderTasks(tarefasLista);
        }
    });
};

const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (taskList) renderTasks(taskList);
    if (tarefasLista) renderTasks(tarefasLista);
};

const deleteCompletedTasks = () => {
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (taskList) renderTasks(taskList);
    if (tarefasLista) renderTasks(tarefasLista);
};

/* ====== INICIALIZAÇÃO ====== */
const carregarDados = () => {
    // Corrige estrutura de temas se estiver incorreta
    let dadosTemas = JSON.parse(localStorage.getItem("temas"));
    if (!dadosTemas || Array.isArray(dadosTemas)) {
        dadosTemas = { "Estudo": 0 };
        localStorage.setItem("temas", JSON.stringify(dadosTemas));
    }
    temas = dadosTemas;

    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    atualizarTemas();
    atualizarMarcas();
    if (taskList) renderTasks(taskList);
    if (tarefasLista) renderTasks(tarefasLista);
};

/* ====== EVENTOS ====== */
if (document.querySelector("#iniciar")) {
    document.querySelector("#iniciar").addEventListener("click", toggleTimer);
    document.querySelector("#parar")?.addEventListener("click", pararTimer);
    addTemaButton?.addEventListener("click", adicionarTema);
}
if (addTaskButton) {
    addTaskButton.addEventListener("click", adicionarTarefa);
}
[tarefasLista, taskList].forEach(lista => {
    if (lista) {
        lista.addEventListener("click", (e) => {
            if (e.target.classList.contains("task-checkbox")) {
                const index = e.target.dataset.index;
                toggleTaskCompletion(index);
            }
        });
    }
});
if (deleteCompletedButton) {
    deleteCompletedButton.addEventListener("click", deleteCompletedTasks);
}

carregarDados();