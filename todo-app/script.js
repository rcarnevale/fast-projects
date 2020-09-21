const form = document.getElementById('form');
const input = document.getElementById('input');
const toDos = document.getElementById('toDos');

const toDosStorage = JSON.parse(localStorage.getItem('todo'));

if(toDosStorage){
    toDosStorage.forEach(toDo => {
        console.log(toDo)
        AddToDO(toDo);
    })
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    AddToDO();
});

function AddToDO(toDoReceived) {
    let todo = input.value;

    if(toDoReceived) todo = toDoReceived.text;

    if (todo) {
        const todoEl = document.createElement('li');

        if(toDoReceived && toDoReceived.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.innerText = todo;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            storeLocal();
        })

        todoEl.addEventListener('contextmenu', (event) => {
            event.preventDefault();

            todoEl.remove();

            storeLocal();
        })

        toDos.appendChild(todoEl);

        input.value = '';

        storeLocal();
    }
}

function storeLocal() {
    const toDosEl = document.querySelectorAll('li');

    const toDos = [];

    toDosEl.forEach(toDoEl => {
        toDos.push({
            text:toDoEl.innerText,
            completed: toDoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todo', JSON.stringify(toDos));
}

