const formtarefa = document.getElementById("form");
const novatarefa = document.getElementById("tarefa");

formtarefa.onsubmit = function(a){
    a.preventDefault();
    const entrada = document.getElementById("entrada");
    tarefaAdd(entrada.value);
    formtarefa.reset();
}

function tarefaAdd(tarefa){

    const taskdiv = document.createElement("div");
    const taskinput= document.createElement("input");
    const tasklabel= document.createElement("label");
    const text = document.createTextNode(tarefa);

    taskinput.setAttribute("type", "checkbox");
    taskinput.setAttribute("name", tarefa);
    taskinput.setAttribute("id", tarefa);

    tasklabel.setAttribute("for", tarefa);
    tasklabel.appendChild(text);

    taskdiv.classList.add("tarefaCSS");
    taskdiv.appendChild(taskinput);
    taskdiv.appendChild(tasklabel);

    novatarefa.appendChild(taskdiv);
}