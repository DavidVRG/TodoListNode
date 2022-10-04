const addUI = document.querySelector('.addUI');
const showAddUI = document.querySelector('.add');
const exitAddUI = document.querySelector('.exit');
const todos = document.querySelector('.todos');
const refresh = document.querySelector('.refresh');

/* FUNCTION START */
generateTodos()

/* TOGGLE ADDUI */
showAddUI.addEventListener('click', () => {
    addUI.classList.toggle('showFlex')
})

/* EXIT ADDUI */
exitAddUI.addEventListener('click', () => {
    addUI.classList.remove('showFlex')
})

/* GENERATE AND REFRESH TODOS */
function generateTodos() {
    fetch('/todo/generate')
    .then(res => res.json())
    .then(data => {
        todos.innerHTML = '';
        data.forEach(element => {
            const newTodo = document.createElement('tr')
            newTodo.setAttribute('id',element._id)

            const title = document.createElement('td')
            title.innerHTML = element.text

            const btns = document.createElement('td')

            const removeBtn = document.createElement('button')
            removeBtn.setAttribute('class', 'remove')
            removeBtn.innerHTML = 'Remove'

            const updateBtn = document.createElement('button')
            updateBtn.setAttribute('class', 'update')
            updateBtn.innerHTML = 'Update'
            
            btns.appendChild(removeBtn)
            btns.appendChild(updateBtn)

            newTodo.appendChild(title)
            newTodo.appendChild(btns)
            todos.append(newTodo)
        });
        deleteTodo()
        updateTodo()
    })
}

refresh.addEventListener('click', () => {
    window.location.replace('/todo');
})

/* DELETE TODO */
function deleteTodo() {
    const deleteBtn = document.querySelectorAll('.remove')
    deleteBtn.forEach(element => {
        element.addEventListener('click', async() => {
            const id = await element.parentElement.parentElement.id;

                await fetch('/todo', {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id: id}),
                })
                .then(res => {
                    if(res.ok){
                        window.location.replace('/todo');
                    }else{
                        alert('Todo remove error!')
                    }
                })          
        })
    })
}

/* UPDATE TODO */
function updateTodo() {
    const updateBtn = document.querySelectorAll('.update');
    updateBtn.forEach(element => {
        element.addEventListener('click', async () => {

            /* VARIABLES AND VALUES */
            const id = await element.parentElement.parentElement.id;
            const showUpdate = document.querySelector('.updateTodo');
            const exit = document.querySelector('.exitUpdate');

            /* SHOW AND HIDE */
            await showUpdate.classList.toggle('showFlex')
            exit.addEventListener('click', () =>{
                showUpdate.classList.remove('showFlex')
            })
            
            /* FORM AND UP TO SERVER */
            showUpdate.addEventListener('submit', async (event) => {
                event.preventDefault()
                const value = await document.getElementById('newText').value;
                fetch('/todo', {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id: id, text: value}),
                })
                .then(res => {
                    if(res.ok){
                        window.location.replace('/todo');
                    }else{
                        alert('Update error!')
                    }
                })
            })
        })
    })
}