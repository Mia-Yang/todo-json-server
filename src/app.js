// get history from json-server
import "@babel/polyfill"

async function getListFromServer() {
    try {
        const response = await fetch("http://localhost:3000/todos", { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

// get item from json-server
async function getItemFromServer(id) {
    try {
        const response = await fetch(`http://localhost:3000/todos/${id}`, { method: 'GET' });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// post list on json-server 
function postItemIntoServer(item) {
    fetch(`http://localhost:3000/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Post Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// update list on json-server 
function updateItemInServer(item) {
    // console.log(id)
    fetch(`http://localhost:3000/todos/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Update Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// DELETE item in json-server 
function deleteItemInServer(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log('Delete Success:', data);
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

async function toggleTodo(id) {
    // fetch(`http://localhost:3000/todos/${id}`, { method: 'GET' })
    //     .then(response => response.json())
    //     .then(result => updateItemInServer({...result, completed: !result.completed }))
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });

    getItemFromServer(id).then(result => updateItemInServer({...result, completed: !result.completed }))



    document.getElementById(id).classList.toggle("finished")
}