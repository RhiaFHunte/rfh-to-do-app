const input = document.querySelector(".todo-input"); // Ensure the correct selector if not working
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];

function getTodoHtml(todo, index) {
    let checked = todo.status === "completed" ? "checked" : "";
    return `
    <li class="todo-item">
        <label for="todo-${index}">
            <input id="todo-${index}" type="checkbox" ${checked} onclick="updateStatus(this)">
            <span ${checked ? 'class="completed"' : ''}>${todo.name}</span>
        </label>
        <button class="delete-btn" data-index="${index}" onclick="remove(this)">
            <i class="fa fa-times"></i>
        </button>
    </li>
    `;
}

function showTodos() {
    if (todosJson.length === 0) {
        todosHtml.innerHTML = '';
        emptyImage.style.display = 'block';
    } else {
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
        emptyImage.style.display = 'none';
    }
}

function addTodo(todo) {
    if (!todo) return; // Check for empty todo before proceeding
    todosJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
    input.value = ""; // Clear the input after the todo is added
}

input.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        addTodo(input.value.trim());
    }
});

addButton.addEventListener("click", () => {
    addTodo(input.value.trim());
});










