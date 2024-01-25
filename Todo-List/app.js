import render from "./render.js";
import store, { addTodo, deleteTodo, toggleTodo } from "./store.js";

const form = document.querySelector("#form");
const inputTitle = document.querySelector(".todo-title-input");
const todos = document.querySelector(".todos");

// Add custom event to trigger the 'render' function
window.addEventListener("todoschange", () => {
  render();
});

// Retrieving data from local storage
const storeFromLocalStorage = JSON.parse(localStorage.getItem("store"));

if (storeFromLocalStorage?.todos.length > 0) {
  store.todos = storeFromLocalStorage.todos;
} else {
  localStorage.setItem("store", JSON.stringify(store));
  render();
}

// Adding the new todo to the store
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

//Delete todo
todos.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("delete-todo-button")) {
    deleteTodo(target.closest(".todo").dataset.id);
  }
});

//handle checkbox changes
todos.addEventListener("change", (e) => {
  const target = e.target;

  if (target.classList.contains("todo-checkbox")) {
    toggleTodo(target.closest(".todo").dataset.id, target.checked);
  }
});
