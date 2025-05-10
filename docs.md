# Mini-Framework Documentation

This is a lightweight JavaScript framework that provides core functionality for building modern web applications. It includes:

- Virtual DOM for efficient DOM updates
- State management system
- Routing for single-page applications
- Component-based architecture

## Core Concepts

### 1. Virtual DOM

The framework uses a Virtual DOM approach to efficiently update the real DOM. Instead of directly manipulating the DOM, you create a JavaScript object representation of your UI, and the framework handles the efficient rendering.

### 2. Components

Components are functions that return a virtual DOM structure. They can maintain their own state and respond to user events.

### 3. State Management

The framework includes a simple yet powerful state management system that allows for creating reactive UIs. State changes trigger UI updates automatically.

### 4. Routing

A built-in routing system allows for creating single-page applications with multiple views.

## API Reference

### DOM Manipulation

#### `h(tag, attributes, ...children)`

Creates a virtual DOM node:

```javascript
import { h } from '../logic/dom.js';

// Create a div with a class and child text
const vNode = h('div', { class: 'container' }, 'Hello World');

// Create a button with an event handler
const button = h('button', { 
  onclick: () => alert('Clicked!')
}, 'Click me');

// Nested elements
const card = h('div', { class: 'card' }, [
  h('h2', {}, 'Card Title'),
  h('p', {}, 'Card content goes here'),
  button
]);
```

#### `render(component, container)`

Renders a component or virtual DOM tree to a container:

```javascript
import { render } from '../logic/dom.js';

function MyComponent() {
  return h('div', {}, 'Hello from component');
}

// Render to DOM
const container = document.getElementById('app');
render(MyComponent, container);

// Can also render a vnode directly
render(h('div', {}, 'Hello World'), container);
```

### State Management

#### `useState(key, initialValue)`

Creates a stateful value and functions to read and update it:

```javascript
import { useState } from '../logic/state.js';

function Counter() {
  // Create a state value with key 'count' and initial value 0
  const [getCount, setCount] = useState('count', 0);
  
  return h('div', {}, [
    h('p', {}, `Count: ${getCount()}`),
    h('button', { 
      onclick: () => setCount(getCount() + 1) 
    }, 'Increment')
  ]);
}
```

#### `subscribe(keyOrCallback, callback)`

Subscribe to state changes:

```javascript
// Subscribe to a specific state key
subscribe('count', (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`);
});

// Subscribe to all state changes
subscribe(() => {
  console.log('Some state changed');
});
```

### Routing

#### `route(path, component)`

Register a route:

```javascript
import { route } from '../logic/router.js';

route('/', HomePage);
route('/about', AboutPage);
route('/products/:id', ProductPage); // Dynamic route with parameter
```

#### `initRouter(container)`

Initialize the router:

```javascript
import { initRouter } from '../logic/router.js';

const container = document.getElementById('app');
initRouter(container);
```

#### `navigateTo(path)`

Programmatically navigate to a route:

```javascript
import { navigateTo } from '../logic/router.js';

function handleClick() {
  navigateTo('/about');
}
```

#### `Link(to, attrs, ...children)`

Create a link component that works with the router:

```javascript
import { Link } from '../logic/router.js';

function Nav() {
  return h('nav', {}, [
    Link('/', { class: 'nav-link' }, 'Home'),
    Link('/about', { class: 'nav-link' }, 'About')
  ]);
}
```

## Example: Todo App

Here's a simple example of a Todo application built with the framework:

```javascript
import { h, render } from '../logic/dom.js';
import { useState } from '../logic/state.js';

function TodoApp() {
  const [getTodos, setTodos] = useState('todos', []);
  const [getInput, setInput] = useState('input', '');
  
  const handleAdd = () => {
    if (getInput().trim() !== '') {
      setTodos([...getTodos(), getInput()]);
      setInput('');
    }
  };
  
  return h('div', { class: 'todo-app' }, [
    h('h1', {}, 'Todo App'),
    h('div', { class: 'input-group' }, [
      h('input', {
        type: 'text',
        value: getInput(),
        oninput: (e) => setInput(e.target.value),
        onkeypress: (e) => {
          if (e.key === 'Enter') handleAdd();
        }
      }),
      h('button', { onclick: handleAdd }, 'Add')
    ]),
    h('ul', { class: 'todo-list' },
      getTodos().map(todo => 
        h('li', {}, todo)
      )
    )
  ]);
}

render(TodoApp, document.getElementById('app'));
```

## Why This Approach?

This framework was designed with simplicity and performance in mind:

1. **Virtual DOM**: By using a virtual DOM, we minimize direct DOM manipulation, which is slow. Instead, we calculate the minimum changes needed and apply them efficiently.

2. **Functional Components**: Components are just functions that return virtual DOM structures, making them easy to understand and compose.

3. **Centralized State Management**: The state management system provides a single source of truth for your application state, making it easier to debug and reason about.

4. **Routing**: The routing system enables creating single-page applications with multiple views without page reloads.

## Best Practices

1. **Component Composition**: Break your UI into small, reusable components
2. **State Isolation**: Keep state as localized as possible
3. **Pure Components**: When possible, make components pure functions of their inputs
4. **Descriptive Keys**: Use meaningful keys for state to make debugging easier
