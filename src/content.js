const content = ( () => {

    class TodoListItem {
        constructor(id,title){
            this.id = id;
            this.title = title;
            this.todo = [];
        }



    }

    const lists = localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : [] ;

    const save = () =>{
        console.log('guardado');
        console.log(lists);
        localStorage.setItem('lists',JSON.stringify(content.lists));
    }

    return {
        lists,
        TodoListItem,
        save
    }

    
})();

export default content;