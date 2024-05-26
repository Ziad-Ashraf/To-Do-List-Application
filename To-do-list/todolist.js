let input = document.getElementById("inputBox");
let tasksList = document.getElementById("list-container");

function addTask() {
    let li = document.createElement("li");
    if(input.value === '') {
        window.alert("You need to type your task");
    } else {
        window.alert("Task Added Successfully");

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(input.value);
        
        let task = input.value;
        input.value = '';

        localStorage.setItem('tasks', JSON.stringify(tasks));

        let checker = document.createElement("input");
        checker.type = "checkbox";
        checker.name = "taskStatus";
        checker.classList.add("checkBox");

        checker.onclick = () => {checkedNotChecked(checker, li)};

        let deleteBtn = document.createElement("button");
        let btnText = document.createTextNode("Delete");
        let liText = document.createTextNode(task);

        deleteBtn.onclick = () => { removeTask(li, task) };
        deleteBtn.appendChild(btnText);
        deleteBtn.id = "delete";

        li.appendChild(checker);
        li.appendChild(liText);
        li.appendChild(deleteBtn);
        tasksList.appendChild(li);
    }
}

function checkedNotChecked(checker, li) {
    if (checker.checked) {
        li.style.textDecoration = "line-through";
    } else {
        li.style.textDecoration = "none";
    }
}

function removeTask(taskElement, task) {
    taskElement.remove();
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let updatedTasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function clearTasks() {
    localStorage.clear();
    tasksList.innerHTML = "";
    console.clear();
}

window.onload = function getTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");

        let checker = document.createElement("input");
        checker.type = "checkbox";
        checker.name = "taskStatus";
        checker.classList.add("checkBox");

        checker.onclick = () => {checkedNotChecked(checker, li)};

        let deleteBtn = document.createElement("button");
        let btnText = document.createTextNode("Delete");
        let liText = document.createTextNode(task);

        deleteBtn.onclick = () => { removeTask(li, task) };
        deleteBtn.appendChild(btnText);
        deleteBtn.id = "delete";

        li.appendChild(checker);
        li.appendChild(liText);
        li.appendChild(deleteBtn);
        tasksList.appendChild(li);
    });
};

document.getElementById("add").addEventListener("click", addTask);
document.getElementById("btn").addEventListener("click", clearTasks);
