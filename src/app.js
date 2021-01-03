// get history from json-server
import "@babel/polyfill"
import {
    getListFromServer,
    getItemFromServer,
    postItemIntoServer,
    updateItemInServer,
    deleteItemInServer
} from './request'

// initialize history
const initialize = async() => {
    const historyList = await getListFromServer();
    historyList.forEach(item => renderItem(item))
}
window.addEventListener('load', initialize)

// add todos
const todoList = document.querySelector(".todo-list");
const addButton = document.querySelector(".add-btn");
const inputText = document.querySelector(".inputbox");

function renderItem(item) {
    const todoItem = document.createElement("li");
    if (item.completed === true) {
        todoItem.setAttribute("class", "finished")
    }
    todoItem.setAttribute("id", item.id)
    let isChecked = item.completed ? "checked" : "";
    let canEdit = item.completed ? "false" : "true";

    todoItem.innerHTML =
        `<input type="checkbox" onclick="toggleTodo(${item.id})" ${isChecked}> 
    <span id="text-${item.id}" onfocus="editTodo(${item.id})" class="single-line" contenteditable="${canEdit}" > ${item.text} </span>
    <button class="del" onclick="removeTodo(${item.id})">✖️</button>`;
    todoList.appendChild(todoItem);
}

addButton.addEventListener('click', addItem);

function addItem(e) {
    e.preventDefault();
    const textContent = inputText.value.trim();
    inputText.value = '';
    let newTodo = {
        id: new Date().getTime(),
        text: textContent,
        completed: false,
    }
    if (textContent.length !== 0) {
        renderItem(newTodo);
        postItemIntoServer(newTodo);
    }
}

//delete todos
window.removeTodo = removeTodo;

function removeTodo(id) {
    deleteItemInServer(id);
    todoList.removeChild(document.getElementById(id));
}

//toggle todos
window.toggleTodo = toggleTodo;

function toggleTodo(id) {
    getItemFromServer(id)
        .then(result => updateItemInServer({...result, completed: !result.completed }))
        .then(document.getElementById(id).classList.toggle("finished"))
    const spanElement = document.getElementById("text-" + id);
    getItemFromServer(id).then(result => result.completed ? spanElement.setAttribute("contentEditable", true) : spanElement.setAttribute("contentEditable", false))
}

//edit todos

window.editTodo = editTodo;

function editTodo(id) {
    const textSpan = document.getElementById("text-" + id);
    const originalText = textSpan.innerText;
    textSpan.addEventListener('blur', function() {
        const newText = textSpan.innerText.trim()
        if (newText.length) {
            getItemFromServer(id).then(result => updateItemInServer({...result, text: newText }))
            textSpan.innerText = newText;
        } else {
            textSpan.innerText = originalText;
        }
    })
}

//clear todos
const clearButton = document.querySelector(".clear")
clearButton.onclick = async function() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
    const historyList = await getListFromServer();
    historyList.map(item => item.id).forEach(id => deleteItemInServer(id));
}