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
        .then(result => {
            console.log('Delete Success');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export { getListFromServer, getItemFromServer, postItemIntoServer, updateItemInServer, deleteItemInServer }