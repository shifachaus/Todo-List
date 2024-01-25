const store = {
  todos: [
    {
      id: "1",
      title: "Complete Task A",
      completed: false,
    },
    {
      id: "2",
      title: "Read Book",
      completed: true,
    },
  ],
};

// Handler for the Proxy
const storeHandler = {
  get(target, property) {
    return target[property];
  },

  set(target, property, value) {
    target[property] = value;

    if (property == "todos") {
      window.dispatchEvent(new Event("todoschange"));
    }

    localStorage.setItem("store", JSON.stringify(store));
    return true;
  },
};

// Creating a Proxy for the store using the defined handler
const storeProxy = new Proxy(store, storeHandler);

// add a new todo to the store
export function addTodo(newTodo) {
  storeProxy.todos = [...storeProxy.todos, newTodo];
}

//  delete a todo from the store
export function deleteTodo(id) {
  storeProxy.todos = storeProxy.todos.filter((todo) => {
    return todo.id !== id;
  });
}

// toggle the completion status of a todo
export function toggleTodo(id, checked) {
  storeProxy.todos = storeProxy.todos.map((todo) => {
    if (todo.id == id) {
      return { ...todo, completed: checked };
    } else {
      return todo;
    }
  });
}

export default storeProxy;
