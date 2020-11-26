// get history from json-server
import "@babel/polyfill"

function getListFromServer() {
    return fetch("http://localhost:3000/todos", { method: 'GET' })
        .then(response => response.json())
        .then(result => result)
        .catch(error => {
            console.error('Error:', error);
        });
}

// get item from json-server
function getItemFromServer(id) {
    const item = fetch(`http://localhost:3000/todos/${id}`, { method: 'GET' })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    return item;
}

// post list on json-server 
function postItemIntoServer(item) {
    fetch(`https://localhost:3000/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// update list on json-server 
function updateItemInServer(item) {
    // console.log(id)
    fetch(`https://localhost:3000/todos/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// DELETE item in json-server 
function deleteItemInServer(id) {
    fetch(`https://localhost:3000/todos/${id}`, {
            method: 'DELTE',
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// clear todos in json-server
function clearTodosInServer() {

}


// initialize history
const initialize = async() => {
    const arr = await getListFromServer();
    arr.forEach(item => renderItem(item))
}
window.addEventListener('load', initialize)

// add todos
const todoList = document.querySelector(".todo-list");
const addButton = document.querySelector(".add-btn");
const inputText = document.querySelector(".inputbox");
addButton.addEventListener('click', addItem)

function renderItem(item) {
    const todoItem = document.createElement("li");
    if (item.completed === true) {
        todoItem.setAttribute("class", "finished")
    }
    todoItem.setAttribute("id", item.id)
    let isChecked = item.completed ? "checked" : "";

    todoItem.innerHTML =
        `<input type="checkbox" onclick="toggleTodo(${item.id})" ${isChecked}> 
    <span id="text-${item.id}" onfocus="editTodo(${item.id})" class="single-line" contenteditable > ${item.text} </span>
    <button class="del" onclick="removeTodo(${item.id})">✖️</button>`;
    todoList.appendChild(todoItem);
}