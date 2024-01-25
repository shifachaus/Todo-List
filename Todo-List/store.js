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

const storeHandler = {
  get(target, property) {
    return target[property];
  },

  set(target, property, value) {
    target[property] = value;

    if (property == "todos") {
      window.dispatchEvent(new Event("todoschange"));
    }

    return true;
  },
};

const storeProxy = new Proxy(store, storeHandler);

export function addTodo(newTodo) {
  storeProxy.todos = [...storeProxy.todos, newTodo];
}

export function deleteTodo(id) {
  storeProxy.todos = storeProxy.todos.filter((todo) => {
    return todo.id !== id;
  });
}

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
