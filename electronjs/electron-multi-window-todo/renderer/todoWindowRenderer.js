const addTodo = document.getElementById('add-todo');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    message.send('todo:submit', addTodo.value);

    addTodo.value = "";
});
