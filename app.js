const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
// const trash = document.querySelector('.delete');
// const edit = document.querySelector('.edit')
const search = document.querySelector('.search input');


// creating todos

const generateTemplate = todo => {

    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <div>
                <i class="far fa-edit edit"></i>
                <i class="far fa-trash-alt delete"></i>
            </div>
        </li>
    `;

    list.innerHTML += html;
}

addForm.addEventListener('submit', e => {

    e.preventDefault();
    const todo = addForm.add.value.trim();
    
    const fetchTodos = JSON.parse(localStorage.getItem('todos'));

    let todos = fetchTodos || [];
    if(todo.length){
        todos.push({todo: todo});
        generateTemplate(todo);
        addForm.reset();
    }

    console.log(todos);

    // add local storage
    localStorage.setItem('todos', JSON.stringify(todos));
});


// delete todos
list.addEventListener('click', e => {
    
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove()
    }

    const target = e.target.parentElement.previousElementSibling.textContent;

    const fetchTodos = JSON.parse(localStorage.getItem('todos'));
    const updatedTodos = fetchTodos.filter( todo => todo.todo !== target);

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    console.log(fetchTodos)
});

// editing todos

// list.addEventListener('click', e => {

//     if (e.target.classList.contains('edit')) {
//         console.log(e)
//     }
// });

{/* <input type="text"
    class="form-control m-auto"
    name="search"
    placeholder="" /> */}

// search todos functionality

const filterTodos = (term) => {
    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});


if (localStorage.getItem('todos')) {
    const fetchTodos = JSON.parse(localStorage.getItem('todos'));
    fetchTodos.forEach( todo => {
        generateTemplate(todo.todo);
    })
    
};