let task = document.getElementById('task');
let form = document.querySelector('#task-form');
let list = document.querySelector('#list');
let el = document.getElementsByTagName('li');

form.addEventListener('submit',(e) => {
    e.preventDefault();
    let txt = task.value;

    if(txt === '')
        alert('Please write something');
    else
    {
        let li = document.createElement('li');
        li.innerText = txt;
        list.insertBefore(li, list.childNodes[0]);
        task.value = "";
    }
});

list.addEventListener('click', (e) =>{
    if(e.target.tagName == 'LI')
        e.target.classList.toggle('checked');
})