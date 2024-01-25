import store from "./store.js";

function render() {
  const todosContainer = document.querySelector(".todos");

  const todoEl = store.todos
    ?.map((todo) => {
      return `<li class="todo" data-id=${todo.id}>
	<span class="todo-title ${todo.completed ? "completed" : ""}">
	${todo.title}</span>

	<div class="toggle-delete">
	  <input
		type="checkbox"
		name="completed"
		id="todo-checkbox"
		class="todo-checkbox"
		${todo.completed ? "checked" : ""}
	  />
	  <button class="delete-todo-button">X</button>
	</div>

  </li>`;
    })
    .join("");

  todosContainer.innerHTML = todoEl;
}

export default render;
