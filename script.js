let form = document.querySelector("form");
let formInput = document.querySelector("#form-input");
let Ul = document.querySelector(".todo-list");

let allTodos = getTodo();
updateTodoList();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

// --------------------------------------------------------
function addTodo() {
  const inputText = formInput.value.trim();
  if (inputText.length > 0) {
    const todoObj = {
      text: inputText,
      completed: false,
    };

    allTodos.push(todoObj);
    updateTodoList();
    saveTodo();
    formInput.value = "";
  }
}

// --------------------------------------------------------
function updateTodoList() {
  Ul.innerHTML = "";
  allTodos.forEach((todo, todoIdx) => {
    todoItem = createTodoItem(todo, todoIdx);
    Ul.appendChild(todoItem);
  });
}

// --------------------------------------------------------
function createTodoItem(todo, todoIdx) {
  const id = `todo-${todoIdx}`;
  const todoText = todo.text;
  const li = document.createElement("li");
  li.classList.add("todo");
  li.innerHTML = `
        <li class="todo">
          <input type="checkbox" id=${id} />
          <label for="${id}">
            <svg
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label for="${id}" class="todo-text"> ${todoText} </label>
          <button id="delete-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
        </li>`;

  const deleteBtn = li.querySelector("#delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteTodo(todoIdx);
  });
  const checkbox = li.querySelector("input");
  checkbox.addEventListener("change", function () {
    allTodos[todoIdx].completed = checkbox.checked;
    saveTodo();
  });
  checkbox.checked = todo.completed;
  return li;
}

// --------------------------------------------------------
function deleteTodo(todoIdx) {
  allTodos.splice(todoIdx, 1);
  updateTodoList();
  saveTodo();
}

// -------------------------------------------------------------------------------------
function saveTodo() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}

// -------------------------------------------------------------------------------------
function getTodo() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
