# StudyApp - Plataforma de Estudos Integrada

Um site de estudos multifuncional projetado para auxiliar no gerenciamento do tempo e das tarefas de estudo, além de permitir a organização por temas.
Deploy: https://studyapp-two.vercel.app/

## Funcionalidades Principais

* **Temporizador de Estudo:** Um cronômetro integrado para auxiliar em técnicas de estudo como a Pomodoro ou para monitorar o tempo dedicado a diferentes atividades.
* **Gerenciamento de Tarefas:** Um sistema simples para adicionar, marcar como concluídas e remover tarefas de estudo.
* **Organização por Temas:** Permite categorizar e registrar o tempo de estudo dedicado a diferentes temas, facilitando o acompanhamento da dedicação a cada área.
* **Interface de Navegação:** Uma barra de navegação intuitiva para acessar as diferentes seções do aplicativo (Home, Temporizador, Cronograma e Calendário - este último em desenvolvimento).
* **Persistência Local:** Os temas de estudo e as tarefas são armazenados localmente no navegador, permitindo que o usuário retome seus dados posteriormente.

## Tecnologias Utilizadas

* **Frontend:** HTML, CSS, JavaScript
* **Ícones:** Font Awesome

### Navegação

* Utilize a barra de navegação na parte superior para acessar as diferentes seções:
    * **Home:** Página inicial com uma visão geral e a seção de tarefas.
    * **Temporizador:** Cronômetro para monitorar o tempo de estudo e registrar o tempo dedicado a temas.
    * **Cronograma:** (Em desenvolvimento) Futura seção para planejamento de horários de estudo.
    * **Calendário:** (Em desenvolvimento) Futura seção para visualização de compromissos e estudo em um calendário.

### Temporizador

1.  Selecione um tema de estudo existente no menu suspenso ou adicione um novo tema no campo "Novo tema" e clique em "Adicionar".
2.  Clique no botão de "Play" para iniciar o temporizador. O tempo decorrido será exibido.
3.  Clique no botão de "Pause" (que substitui o "Play" ao iniciar) para pausar o temporizador.
4.  Clique no botão de "Stop" para parar o temporizador. Ao parar, o tempo decorrido será registrado para o tema selecionado.
5.  O tempo registrado para cada tema será exibido abaixo do cronômetro.

### Tarefas

1.  Na página inicial, clique no botão "+". Um campo de texto aparecerá para adicionar uma nova tarefa.
2.  Digite a tarefa e pressione "Enter". A tarefa será adicionada à lista.
3.  Clique no ícone de quadrado ao lado de uma tarefa para marcá-la como concluída. O ícone mudará para um quadrado com um check, e o texto da tarefa será riscado.
4.  Clique no botão "Apagar Concluídas" para remover todas as tarefas que foram marcadas como concluídas.

## Melhorias Futuras

* Implementação das seções de Cronograma e Calendário.
* Opções de personalização do temporizador (tempos de foco e descanso).
* Sistema de priorização para as tarefas.
* Possibilidade de editar e excluir temas e tarefas existentes.
* Sincronização de dados entre diferentes dispositivos (utilizando um backend).
* Melhorias na interface do usuário e na experiência do usuário.
