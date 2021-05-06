import content from './content';

const panel = (() => {

   
    let currentListId;
    let currentTodoEdit;
    

    const showError = () =>{
        console.log('falta ingresar datos');
    }

    const hideError = () => {
        console.log('piola');
    }

    const calculateId = () => {
         return content.lists.length;
    }

    const calculateTodoId = (listId) => {
        return content.lists[listId].todo.length;

    }

    const toggleAddInput = (el) => {
        el.classList.toggle('hidden');
    }


    const addList = (el) => {
        if (!el.value) {
            showError();
            return;
        }

        currentListId = calculateId();
        content.lists.push( new content.TodoListItem(currentListId,el.value));

        drawList(content.lists[currentListId])
        content.save();
        hideError();
        el.value = "";

    }

    const drawList = (obj) => {
        const listsDiv = document.querySelector('.lists');

        listsDiv.insertAdjacentHTML('beforeend',`
            <div class="list-btn-div">
                <button class="panel-btn" id="${obj.id}">${obj.title}</button>
                <button class="delete-list">X</button> 
            </div>
        `)


    }

    const clearTable = () => {
        const table = document.querySelector('table');
        table.innerHTML = `
        <tr>
            <th class="todo-h">Todo</th>
            <th class="desc-h">Description</th>
            <th class="completed-h">Completed</th>
        </tr
        `
    }


    const addTodo = (toDoEl,descriptionEl) => {
        if( !toDoEl.value || !descriptionEl.value) {
            showError();
            return;
        }

        content.lists[currentListId].todo.push( [calculateTodoId(currentListId),toDoEl.value,descriptionEl.value,false] );
        drawTodos(currentListId);
        toDoEl.value = '';
        descriptionEl.value = '';
        content.save();

    }

    const drawTodos = (id) => {
        const table = document.querySelector('table');

        clearTable();
        if (!content.lists[id].toString()) return;


        content.lists[id].todo.forEach(arr => {
            table.insertAdjacentHTML('beforeend', `
            <tr id="${arr[0]}"> 
                <td>${arr[1]}</td>
                <td>${arr[2]}</td>
                <td>
                    <input type="checkbox" ${arr[3] ? 'checked' : ""}>
                    <button class="delete-todo">x</button>
                    <button class="edit-todo">edit</button>
                </td>
            </tr>
            `)
        })
    }

    
    const deleteTodo = (listIndex,todoIndex) => {
        content.lists[listIndex].todo.splice(todoIndex,1);
        content.lists[listIndex].todo.forEach( (todo,i) => todo[0] = i);
    }

    const buttonHandler = (e) => {
        const el = e.target;
        if (el.tagName != 'BUTTON' && el.tagName != 'INPUT'){
            return ;
        }

        const elementId = el.closest('tr').id;
        if(el.classList.contains('delete-todo')) {
            deleteTodo(currentListId, elementId);
            drawTodos(currentListId);
            content.save();
            return;
        }
        if (el.classList.contains('edit-todo')) {
            currentTodoEdit = elementId;
            const parentTdElements = el.closest('tr').querySelectorAll('td');
            document.querySelector('#edit-todo-input').value = parentTdElements[0].innerText;
            document.querySelector('#edit-desc-input').value = parentTdElements[1].innerText;
            showModal();
            return;
        }

        content.lists[currentListId].todo[elementId][3] = content.lists[currentListId].todo[elementId][3] ? false : true;
       content.save(); 

    }


    const listsHandler = (e) => {
        const el = e.target;
        if(el.tagName != 'BUTTON') return;


        if(el.classList.contains('panel-btn')){
            currentListId = parseInt(el.id);
            panel.drawTodos(currentListId);
            return;
        }
        const listId = el.parentNode.children[0].id;
        if ( listId == currentListId) {
            clearTable();
        }


        deleteListItem(listId)
        if(!content.lists[currentListId]) currentListId--;
        
        if(content.lists[currentListId]) drawTodos(currentListId);

        document.querySelector('.lists').innerHTML = "";
        content.lists.forEach( obj => {
            drawList(obj);
        });

        content.save();
    }

    const deleteListItem = (index) => {
        content.lists.splice(index,1);
        content.lists.forEach ( (list,i) => list.id = i);
    }

    
    if(content.lists.length >= 1 ) {
        content.lists.forEach( obj => {
             drawList(obj) ;  
        })
        currentListId = localStorage.getItem('currentList') ? JSON.parse(localStorage.getItem('currentList')) : 0 ;
        drawTodos(currentListId);
    }


    const saveCurrentList = () =>{
        localStorage.setItem('currentList',JSON.stringify(panel.currentListId));
    }
    
    const hideModal = () => {
        const modalWindow = document.querySelector('.modal-window')
        const overlay = document.querySelector('.overlay');
        modalWindow.classList.add('hidden');
        overlay.classList.add('hidden');
    }

    const showModal = () => {
        const modalWindow = document.querySelector('.modal-window')
        const overlay = document.querySelector('.overlay');
        modalWindow.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }

    const editTodo = (id,todo,desc) => {

        content.lists[currentListId].todo[id][1] = todo;
        content.lists[currentListId].todo[id][2] = desc;
        hideModal();
        drawTodos(currentListId);
        content.save();
    }

    const submitTodo = document.querySelector('.submit-todo')
    const editTodoInput = document.querySelector('#edit-todo-input');
    const editDescInput = document.querySelector('#edit-desc-input');
    submitTodo.addEventListener('click', () => {
       editTodo(currentTodoEdit,editTodoInput.value,editDescInput.value);
       editTodoInput.value = '';
       editDescInput.value = '';
    })

    return {
        toggleAddInput,
        addList,
        addTodo,
        drawTodos,
        currentListId,
        currentTodoEdit,
        buttonHandler,
        listsHandler,
        showModal,
        hideModal,
        editTodo
    }

})();

export default panel;
