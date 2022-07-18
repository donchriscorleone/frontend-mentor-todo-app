const themeSwitcher = document.querySelector('button.btn-switch');
const body = document.querySelector('body');

themeSwitcher.addEventListener('click', (e) => {
    const bodyClass = body.classList;
    if (bodyClass.contains('dark-theme')) {
        bodyClass.remove('dark-theme');
        bodyClass.add('light-theme');
    } else {
        bodyClass.add('dark-theme');
        bodyClass.remove('light-theme');
    }
})

let todos = [
    {id: 1, text: 'Jog around the park 3x', isDone: true},
    {id: 2, text: '10 minutes meditation', isDone: false},
    {id: 3, text: 'Read for 1 hour', isDone: false},
    {id: 4, text: 'Pick up groceries', isDone: false},
    {id: 5, text: 'Complete Todo App on Frontend Mentor', isDone: false},
]

const itemsLeft = document.querySelector('.todo-item-action .todo-text');
itemsLeft.innerText = `${getItemsLeft()} items left`;

const list = document.querySelector('.todo-list');
const listAction = document.querySelector('.todo-item-action');
todos.forEach(todo => {
    const listItem = createListItem(todo);
    listAction.before(listItem);
})

const btnControls = document.querySelectorAll('button.btn-control');
btnControls.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let filtered = [];
        if (btn.innerText === 'All')
            filtered = todos; 
        else if (btn.innerText === 'Active')
            filtered = todos.filter(x => !x.isDone); 
        else if (btn.innerText === 'Completed')
            filtered = todos.filter(x => x.isDone); 
        
        const tempList = document.querySelectorAll('li.todo-item:not(.todo-item-action)');
        tempList.forEach(z => {
            if (filtered.findIndex(f => f.id == z.id) === -1) z.style.display = 'none';
            else z.style.display = 'flex';
        })
        // itemsLeft.innerText = `${tempList.length} items left`;


        btn.classList.add('btn-active');
        btnControls.forEach(b => {
            if (btn !== b) b.classList.remove('btn-active');
        })
    })
})

const input = document.getElementById('input-todo');
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const ids = todos.map(x => x.id);
        const newTodo = {id: ids.pop() + 1, text: e.target.value, isDone: false};
        todos.push(newTodo);

        const listItem = createListItem(newTodo);
        listAction.before(listItem);

        itemsLeft.innerText = `${getItemsLeft()} items left`;
        e.target.value = '';
    }
})

const btnClear = document.querySelector('.btn-clear');
btnClear.addEventListener('click', (e) => {
    todos = todos.filter(x => !x.isDone);
    const tempList = document.querySelectorAll('li.todo-item:not(.todo-item-action)');
    tempList.forEach(z => {
        if (todos.findIndex(f => f.id == z.id) === -1) z.style.display = 'none';
        else z.style.display = 'flex';
    })
})

const btnsClose = document.querySelectorAll('.btn-close')
btnsClose.forEach(btn => {
    btn.addEventListener('click', (e) => {
        todos = todos.filter(t => t.id != btn.dataset.closeId);
        const tempList = document.querySelectorAll('li.todo-item:not(.todo-item-action)');
        tempList.forEach(z => {
            if (todos.findIndex(f => f.id == z.id) === -1) z.style.display = 'none';
            else z.style.display = 'flex';
        })
        itemsLeft.innerText = `${getItemsLeft()} items left`;
    })
})

// Helper functions

function createListItem(todo) {
    const listItem = document.createElement('li');
    listItem.id = `${todo.id}`;
    const checkboxContainer = createCheckboxContainer(todo);
    const checkbox = checkboxContainer.querySelector('input');

    const todoText = document.createElement('span');
    todoText.className = todo.isDone ? 'todo-text todo-done' : 'todo-text';
    todoText.innerText = todo.text;
    checkbox.addEventListener('change', (e) => {
        if (todo.isDone) checkbox.checked = true;

        else {
            todo.isDone = true;
            todoText.className = todo.isDone ? 'todo-text todo-done' : 'todo-text';
            itemsLeft.innerText = `${getItemsLeft()} items left`;
        }
    })

    const closeBtn = document.createElement('button');
    closeBtn.dataset.closeId = `${todo.id}`
    closeBtn.className = 'btn btn-sr btn-close';
    closeBtn.innerText = 'Close';

    listItem.className = 'todo-item';
        
    listItem.appendChild(checkboxContainer);
    listItem.appendChild(todoText);
    listItem.appendChild(closeBtn);
    return listItem;
}

function createCheckboxContainer(todo) {
    const checkboxContainer = document.createElement('div');
    const input = createCheckbox(todo.id);
    const label = createLabel(`checkbox-${todo.id}`);

    input.checked = todo.isDone; 
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.className = "checkbox-container";
    return checkboxContainer
}

function createCheckbox(id) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'checkbox-'+id;
    checkbox.id = 'checkbox-'+id;
    return checkbox;
}

function createLabel(labelFor) {
    const label = document.createElement('label');
    label.htmlFor = labelFor
    return label;
}

function getItemsLeft() {
    return todos.length - todos.filter(x => x.isDone).length
}