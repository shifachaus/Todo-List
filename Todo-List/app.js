import render from "./render.js";
import store, { addTodo, deleteTodo, toggleTodo } from "./store.js";

window.addEventListener("todoschange", () => {
  render();
});

// Initial render
render();

// form

const form = document.querySelector("#form");
const inputTitle = document.querySelector(".todo-title-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoTitle = inputTitle.value;

  const newTodo = {
    id: crypto.randomUUID(),
    title: todoTitle,
    completed: false,
  };

  addTodo(newTodo);
});

const todos = document.querySelector(".todos");

todos.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("delete-todo-button")) {
    deleteTodo(target.closest(".todo").dataset.id);
  }
});

todos.addEventListener("change", (e) => {
  const target = e.target;

  if (target.classList.contains("todo-checkbox")) {
    toggleTodo(target.closest(".todo").dataset.id, target.checked);
  }
});
