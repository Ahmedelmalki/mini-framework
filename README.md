# OurFrame - Custom JavaScript Framework

A lightweight, React-inspired JavaScript framework built from scratch that provides DOM abstraction, state management, routing, and event handling capabilities.

## Table of Contents
- [Core Features](#core-features)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [Element Creation](#element-creation)
  - [State Management](#state-management)
  - [Routing](#routing)
- [Complete Example](#complete-example)
- [Project Setup](#project-setup)
- [Best Practices](#best-practices)
- [Limitations](#limitations)
- [Features](#features)

## Overview

OurFrame is a custom JavaScript framework that implements the fundamental concepts found in modern frameworks like React, but with a simpler approach. It uses a Virtual DOM for efficient rendering, provides reactive state management, client-side routing, and a custom event handling system.

## Core Features

### 1. Virtual DOM & DOM Abstraction
- Efficient diffing algorithm for minimal DOM updates
- Virtual element creation and rendering
- Automatic DOM reconciliation

### 2. State Management
- React-like `useState` hook
- Automatic re-rendering on state changes
- Batched updates for performance

### 3. Routing System
- URL synchronization with application state
- Browser history support

### 4. Event Handling
- Custom event system built on top of native DOM events
- Automatic event listener cleanup
- Support for all standard DOM events


## Getting Started

### Project Structure
```
.
├── framework/
│   ├── dom.js          # Virtual DOM and rendering
│   ├── Router.js       # Routing system
│   └── state.js        # State management
├── src/
│   ├── app.js          # Main todo app component
│   ├── components.js   # Reusable UI components
│   ├── main.js         # Application entry point
│   ├── NotFound.js     # 404 page component
│   ├── routes.js       # Route definitions
│   └── style.css       # Application styles
├── .gitignore
├── example.js          # Counter example component
├── index.html          # HTML entry point
└── README.md          # Project documentation
```

## Installation

1. Clone or download the framework
2. Include it in your project structure
3. Import required modules

## Core Concepts

### Element Creation

The framework uses `ourFrame.createElement()` similar to React's createElement:

```javascript
import { ourFrame } from '../framework/dom.js';

// Basic element
const element = ourFrame.createElement('div', { class: 'container' }, 'Hello World');

// Nested elements
const card = ourFrame.createElement(
  'div',
  { class: 'card' },
  ourFrame.createElement('h1', null, 'Title'),
  ourFrame.createElement('p', null, 'Content')
);


import { state } from '../framework/state.js';

function Counter() {
  state.resetCursor(); // Required at start of component
  const [count, setCount] = state.useState(0);
  
  return ourFrame.createElement(
    'button',
    { onClick: () => setCount(count + 1) },
    `Count: ${count}`
  );
}
```

### Routing

Setting up routes:

```javascript
// routes.js
import HomePage from './pages/Home.js';
import AboutPage from './pages/About.js';

export const routes = {
  "/": HomePage,
  "/about": AboutPage,
  "/404": NotFound
};

// main.js
import { Router } from '../framework/Router.js';
import { routes } from './routes.js';

const router = new Router(routes, document.getElementById('root'));
```

## Complete Example

Here's a complete example of a todo app component:

```javascript
import { ourFrame } from "../framework/dom.js";
import { state } from "../framework/state.js";

function TodoApp() {
  state.resetCursor();
  const [todos, setTodos] = state.useState([]);
  const [input, setInput] = state.useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  return ourFrame.createElement(
    'div',
    { class: 'todo-app' },
    ourFrame.createElement(
      'form',
      {
        onSubmit: (e) => {
          e.preventDefault();
          addTodo();
        }
      },
      ourFrame.createElement('input', {
        value: input,
        onInput: (e) => setInput(e.target.value),
        placeholder: 'Add todo'
      }),
      ourFrame.createElement('button', { type: 'submit' }, 'Add')
    ),
    ourFrame.createElement(
      'ul',
      null,
      ...todos.map(todo => 
        ourFrame.createElement('li', { key: todo.id }, todo.text)
      )
    )
  );
}
```

## Project Setup

Basic project structure:

```
my-app/
├── framework/          # OurFrame core files
├── src/
│   ├── components/    # Your components
│   ├── pages/        # Page components
│   ├── main.js       # Entry point
│   └── routes.js     # Route definitions
└── index.html        # HTML entry
```

Basic HTML setup:

```html
<!DOCTYPE html>
<html>
<head>
  <title>OurFrame App</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

## Best Practices

1. Always call `state.resetCursor()` at the start of each component
2. Keep components small and focused
3. Use meaningful component and variable names
4. Handle routing through the Router instance
5. Use batch updates for state changes when possible

## Limitations

- No JSX support (uses createElement API)
- Simple state management (no context or reducers)
- Basic routing system
- No built-in dev tools

## Features

- Virtual DOM for efficient updates
- React-like component architecture
- Built-in routing system
- State management with hooks
- Event handling system
```

