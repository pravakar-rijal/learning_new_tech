message.on('todo:add', (data)=>{
    const todoList = document.querySelector('.todo-list');
    const newTodo = document.createElement('li');
    newTodo.innerText = data;
    todoList.appendChild(newTodo);
});

message.on('todo:clear', () => {
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = "";
})





