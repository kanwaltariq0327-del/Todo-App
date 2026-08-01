let form = document.querySelector("form");
let formInput = document.querySelector(".form-input");
let Ul = document.querySelector(".todo-list");

// let allTodos = getTodo();
// updateTodoList();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
    console.log(addTodo());
})

let addTodo = () => {
    let inputText = formInput.value.trim();
    if ( inputText.length > 0 ) {
        let todoObj = {
            text: inputText,
            completed: false,
        }
    }

    allTodos.push(todoObj);
    updateTodoList();
    saveTodo();
    inputText = "";
}



