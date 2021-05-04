import content from './content';

const panel = (() => {

   
    let currentListId;
  
    

    const showError = () =>{
        console.log('falta ingresar datos');
    }

    const hideError = () => {
        console.log('piola');
    }

    const calculateId = () => {
        if (content.lists == []) return 0;
        else return content.lists.length;
    }


    const display = () =>{
        console.log('hola');
    }

    const toggleAddInput = (el) => {
        el.classList.toggle('hidden');
    }


    const addList = (el) => {
        if (!el.value) {
            showError();
            return;
        }
        content.lists.push( new content.TodoListItem(calculateId(),el.value));
        if (content.lists.length <2) {
            panel.currentListId = 0;
        }

        drawList(content.lists[calculateId()-1])
        content.save();
        hideError();
        el.value = "";

    }

    const drawList = (obj) => {
        const listsDiv = document.querySelector('.lists');
        const newBtnEl = document.createElement('button');
        newBtnEl.classList.add('panel-btn')
        newBtnEl.setAttribute('id', obj.id);
        newBtnEl.innerHTML = obj.title; 
        listsDiv.appendChild(newBtnEl);


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

        content.lists[panel.currentListId].todo.push( [toDoEl.value,descriptionEl.value] );
        drawTodos(panel.currentListId);
        toDoEl.value = '';
        descriptionEl.value = '';
        content.save();
        //console.log(panel.currentListId);
        //console.log(content.lists[parseInt(panel.currentListId)]);

    }

    const drawTodos = (id) => {
        const table = document.querySelector('table');

        clearTable();
        if (!content.lists[id].toString()) return;


        content.lists[id].todo.forEach(arr => {
            table.insertAdjacentHTML('beforeend', `
            <tr id="${id}">
                <td>${arr[0]}</td>
                <td>${arr[1]}</td>
                <td><input type="checkbox"></td>
            </tr>
            `)
        })
    }

    if(content.lists.length >= 1 ) {
        content.lists.forEach( obj => {
             drawList(obj) ;  
        })
        drawTodos(0);
    }


    return {
        display,
        toggleAddInput,
        addList,
        addTodo,
        drawTodos,
        currentListId
    }

})();

export default panel;
