const btns = document.querySelectorAll('.button')
const addBtn = document.querySelector('.btn-add')
const completedBtn = document.querySelector('.completed__btn')
const deletedBtn = document.querySelector('.delete__btn')
const menu = document.querySelector('.menu')
//const menuItem = document.querySelector('.menu__item')
const inputItem = document.querySelector('.add__input')
const errorShow = document.querySelector('.error')
const filterTodo = document.querySelector('.filter__todo')

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active')
    })    
})

document.addEventListener('DOMContentLoaded', getTodos)
menu.addEventListener('click', deleteItem)
addBtn.addEventListener('click', addTodo)
inputItem.addEventListener('keydown', e => {
    if (e.key === 'Enter'){
        addTodo(e)
    }
})
filterTodo.addEventListener('click', filterOption)


function addTodo(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()
    // input

    const text = inputItem.value.trim()

    if (!text){
        errorShow.classList.remove('hidden') 
        return
    }
    errorShow.classList.add('hidden')
    
    const todo = {
        id: Date.now(),
        text: text
    }

    // localStorage
    saveLocalTodos(todo)
    createNewElement(todo)

    // clear input
    inputItem.value = '' 
}

function createNewElement(todo){

    //Li
    const li = document.createElement('li')
    li.classList.add('menu__item')
    li.dataset.id = todo.id

    // P text
    const p = document.createElement('p')
    p.innerText = todo.text
    p.classList.add('menu__text')
    

    // btn completed
    const completedBtn = document.createElement('button')
    completedBtn.innerText = 'Completed'
    completedBtn.classList.add('button', 'completed__btn')

    // btn delete
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'Delete'
    deleteBtn.classList.add('button','delete__btn')

    // Append
    li.append(p,completedBtn,deleteBtn)
    menu.appendChild(li)
}

function deleteItem(e) {
    const item = e.target
    const todo = item.parentElement
    if (item.classList[1] === 'delete__btn'){
        todo.remove()
        removeLocalTodos(todo)
    }
    else if (item.classList[1] === 'completed__btn'){
        const todoCh = item.parentElement.firstElementChild
        todoCh.classList.toggle('completed') 
        todo.classList.toggle('completed') 
    }
}

function filterOption(e) {
    const todos = menu.children
    Array.from(todos).forEach(function(todo) {
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none'
                }
                break
            case 'active':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none'
                }
                break
        }
    })
}

function saveLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []
    // const todoIndex = todos.children[0].innerText
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function removeLocalTodos(todoElement) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []

    const id = Number(todoElement.dataset.id)
    todos = todos.filter(todo => todo.id !== id)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || []
    
    // input
    todos.forEach(createNewElement)
}