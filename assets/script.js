// CRUD operarion (create - read - update - delete)

const input = document.querySelector("input")
const tasks = document.querySelector(".tasks")
const btn = document.querySelector(".create")
const p = document.querySelector("p")

const todoList = []

// read 
let tasksCountainer = document.querySelector(".tasks")

function displaytasks(list = todoList) {
    tasksCountainer.innerHTML = ""
    if (todoList.length === 0) {
        tasksCountainer.innerHTML = '<h5 class="text-danger p-2">No Tasks Yet....!</h5>'
    }
    list.forEach((task, index) => {
        tasksCountainer.innerHTML += `
        <div class="mb-3">
            <div class="task all-tasks shadow-sm bg-body-tertiary rounded-0 border border-1 p-2">
                <div class="name">
                    <p class="m-0">${task.name}</p>
                    <p class="text-secondary">${task.hours}:${task.minutes}:${task.secounds}, ${task.day}/${task.month}/${task.year}</p>
                </div>
                ${task.status === true ? ` 
                <button class="btn-img done-cir border-0 bg-light" onclick="changeTaskStatus(${index})">
                </button>`: `
                <button class="btn-img todo-sq bg-light" onclick="changeTaskStatus(${index})">
                    
                </button>`
            }
            </div>
        </div>`
    });
}

displaytasks()

// add task operation
let addTaskInput = document.querySelector("input")
const times = new Date()
const hours = times.getHours()
if (hours >= 12) {
    update = `${hours - 12}`
} else {
    update = `0${hours}`
}

function addTask() {
    let newTask = {
        id: Date.now(),
        name: addTaskInput.value,
        status: false,
        hours: update,
        minutes: times.getMinutes(),
        secounds: times.getSeconds(),
        day: times.getDay(),
        month: (times.getMonth() + 1),
        year: times.getFullYear(),
    }
    if (addTaskInput.value.trim() === "") {
        p.innerHTML += `
            <p class="text-danger" > please enter your task</p> `
        return
    }
    p.innerHTML = ""

    todoList.push(newTask)
    tasksCountainer.innerHTML = ""
    addTaskInput.value = ""
    Swal.fire({
        position: "top-left",
        icon: "success",
        title: "Task Added Successfully",
        showConfirmButton: false,
        timer: 1500
    });
    displaytasks()
}

// completed tasks
function getCompletedTasks() {
    const completedTasks = todoList.filter(task => task.status === true);
    console.log(completedTasks);
    displaytasks()
}

// todo tasks
function gettodoTasks() {
    const todoTasks = todoList.filter(task => task.status === false);
    console.log(todoTasks);
    displaytasks()
}

// change task status (update)
function changeTaskStatus(selectedIndex) {
    tasksCountainer.innerHTML = ""
    todoList[selectedIndex].status = !todoList[selectedIndex].status
    displaytasks()
}

// buttons
const allBtn = document.querySelector(".al")
const todoBtn = document.querySelector(".todo");
const completedBtn = document.querySelector(".completed")
const buttons = [todoBtn, completedBtn, allBtn];

function removeActive() {
    buttons.forEach(btn => btn.classList.remove("active"));
}

todoBtn.onclick = () => {
    removeActive();
    todoBtn.classList.add("active");
    const todoTasks = todoList.filter(task => !task.status);
    displaytasks(todoTasks);

    console.log(todoTasks);
};

completedBtn.onclick = () => {
    removeActive();
    completedBtn.classList.add("active");
    const completedTasks = todoList.filter(task => task.status)
    displaytasks(completedTasks)
}

allBtn.onclick = () => {
    removeActive();
    allBtn.classList.add("active");
    displaytasks(todoList)
}




// bom (localStorage) // dom