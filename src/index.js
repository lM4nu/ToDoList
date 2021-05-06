import panel from './display';

const showAddListBtn = document.querySelector('.lists-add-btn');
const addLists = document.querySelector('#add-lists');
const addListBtn = document.querySelector('#add-list-btn');
const addListContent = document.querySelector('#add-list-text-input');
const listsDiv = document.querySelector('.lists');
const table = document.querySelector('table');

const addToDoBtn = document.querySelector("#todo-btn");
const toDoInput = document.querySelector('#todo-input')
const descInput = document.querySelector('#desc-input')
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');


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
    panel.listsHandler(e);
})

table.addEventListener('click', (e) => {
    panel.buttonHandler(e);
});

overlay.addEventListener('click', () => {
    panel.hideModal();
})

closeModal.addEventListener('click', () => {
    panel.hideModal();
})
