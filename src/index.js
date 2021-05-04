import panel from './display';




const showAddListBtn = document.querySelector('.lists-add-btn');
const addLists = document.querySelector('#add-lists');
const addListBtn = document.querySelector('#add-list-btn');
const addListContent = document.querySelector('#add-list-text-input');
const listsDiv = document.querySelector('.lists');

const addToDoBtn = document.querySelector("#todo-btn");
const toDoInput = document.querySelector('#todo-input')
const descInput = document.querySelector('#desc-input')


showAddListBtn.addEventListener('click', () => {
    panel.toggleAddInput(addLists);
})

addListBtn.addEventListener('click', () => {
    panel.addList(addListContent);
})

addToDoBtn.addEventListener('click', () => {
    panel.addTodo(toDoInput,descInput);
})

listsDiv.addEventListener('click', (e) =>{
    panel.currentListId = parseInt(e.target.id);
    panel.drawTodos(panel.currentListId);
    console.log(panel.currentListId);
})
