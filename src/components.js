
// import { h, mount } from '../logic/dom.js';
// import { useState, subscribe } from '../logic/state.js';

// export function TodoApp() {
//   const [getTodos, setTodos] = useState("todos", []);
//   const [getInput, setInput] = useState("input", "");

//   const handleAdd = () => {
//     if (getInput().trim() !== "") {
//       setTodos([...getTodos(), getInput()]);
//       setInput("");
//     }
//   };

//   subscribe(render);

//   function render() {
//     document.getElementById("app").innerHTML = "";
//     mount(AppView(), document.getElementById("app"));
//   }

//   function AppView() {
//     return h("div", { class: "todo" },
//       h("input", {
//         type: "text",
//         value: getInput(),
//         oninput: (e) => setInput(e.target.value)
//       }),
//       h("button", { onclick: handleAdd }, "Add"),
//       h("ul", {},
//         ...getTodos().map(todo =>
//           h("li", {}, todo)
//         )
//       )
//     );
//   }

//   render();
// }

import { h, render } from '../logic/dom.js';
import { useState, subscribe } from '../logic/state.js';

export function TodoApp() {
  const [getTodos, setTodos] = useState("todos", []);
  const [getInput, setInput] = useState("input", "");
  const [getFilter, setFilter] = useState("filter", "all");

  const handleAdd = () => {
    if (getInput().trim() !== "") {
      setTodos([...getTodos(), {
        id: Date.now(),
        text: getInput(),
        completed: false
      }]);
      setInput("");
    }
  };

  const handleToggle = (id) => {
    setTodos(getTodos().map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(getTodos().filter(todo => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos(getTodos().filter(todo => !todo.completed));
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const getFilteredTodos = () => {
    const filter = getFilter();
    const todos = getTodos();
    
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos;
  };

  const getActiveCount = () => {
    return getTodos().filter(todo => !todo.completed).length;
  };

  function TodoItem(todo) {
    return h('li', { 
      class: todo.completed ? 'completed' : '',
      'data-id': todo.id 
    }, [
      h('div', { class: 'view' }, [
        h('input', { 
          class: 'toggle', 
          type: 'checkbox', 
          checked: todo.completed,
          onclick: () => handleToggle(todo.id)
        }),
        h('label', {}, todo.text),
        h('button')
      ])
    ]);
  }

  function AppView() {
    const filteredTodos = getFilteredTodos();
    const activeCount = getActiveCount();
    
    return h('div', { class: 'todoapp' }, [
      h('header', { class: 'header' }, [
        h('h1', {}, 'todos'),
        h('input', {
          class: 'new-todo',
          placeholder: 'What needs to be done?',
          autofocus: true,
          value: getInput(),
          onkeypress: (e) => {
            if (e.key === 'Enter') handleAdd();
          },
          oninput: (e) => setInput(e.target.value)
        })
      ]),
      
      getTodos().length > 0 ? h('section', { class: 'main' }, [
        h('input', { 
          id: 'toggle-all', 
          class: 'toggle-all', 
          type: 'checkbox',
          checked: activeCount === 0
        }),
        h('label', { for: 'toggle-all' }, 'Mark all as complete'),
        h('ul', { class: 'todo-list' },
          filteredTodos.map(todo => TodoItem(todo))
        )
      ]) : null,
      
      getTodos().length > 0 ? h('footer', { class: 'footer' }, [
        h('span', { class: 'todo-count' }, [
          h('strong', {}, activeCount.toString()),
          ` item${activeCount !== 1 ? 's' : ''} left`
        ]),
        h('ul', { class: 'filters' }, [
          h('li', {}, [
            h('a', { 
              class: getFilter() === 'all' ? 'selected' : '',
              href: '#/',
              onclick: (e) => {
                e.preventDefault();
                handleFilterChange('all');
              }
            }, 'All')
          ]),
          h('li', {}, [
            h('a', { 
              class: getFilter() === 'active' ? 'selected' : '',
              href: '#/active',
              onclick: (e) => {
                e.preventDefault();
                handleFilterChange('active');
              }
            }, 'Active')
          ]),
          h('li', {}, [
            h('a', { 
              class: getFilter() === 'completed' ? 'selected' : '',
              href: '#/completed',
              onclick: (e) => {
                e.preventDefault();
                handleFilterChange('completed');
              }
            }, 'Completed')
          ])
        ]),
        getTodos().some(todo => todo.completed) ? // wtf is this ???
          h('button', { 
            class: 'clear-completed',
            onclick: handleClearCompleted
          }, 'Clear completed'): 'kkkkkkkkkkkkkkk'
      ]) : 'mmmmmmmmmmmm'
    ]);
  }

  // Subscribe to state changes to re-render
  const unsubscribe = subscribe('*', () => {
    render(AppView(), document.getElementById("app"));
  });

  // Initial render
  render(AppView(), document.getElementById("app"));

  // Return cleanup function
  return () => {
    unsubscribe();
  };
}