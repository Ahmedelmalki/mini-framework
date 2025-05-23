# OurFrame - Custom JavaScript Framework

A lightweight, React-inspired JavaScript framework built from scratch that provides DOM abstraction, state management, routing, and event handling capabilities.

## Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Architecture](#architecture)

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
- Client-side routing with `useLocation` and `useNavigate`
- URL synchronization with application state
- Browser history support

### 4. Event Handling
- Custom event system built on top of native DOM events
- Automatic event listener cleanup
- Support for all standard DOM events

### 5. Effect System
- `useEffect` hook for side effects
- Dependency tracking and cleanup
- Lifecycle management

## Getting Started

### Project Structure
```
project/
├── framework/
│   ├── dom.js      # Virtual DOM and rendering
│   ├── state.js    # State management
│   ├── route.js    # Routing system
│   └── effect.js   # Effect hooks
├── src/
│   ├── main.js     # Application entry point
│   └── app.js      # Main application component
└── index.html      # HTML entry point
```

### Basic Setup

1. Create your HTML file:
```html
<!DOCTYPE html>
<html>
<head>
    <title>OurFrame App</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="src/main.js"></script>
</body>
</html>
```

2. Set up your main.js:
```javascript
import { ourFrame } from "../framework/dom.js";
import App from "./app.js";
import { injectRerender, state } from "../framework/state.js";
import { effect } from "../framework/effect.js";

const container = document.getElementById("root");
let currentApp = null;

function initialRender() {
    state.startRendering();
    currentApp = App();
    ourFrame.render(currentApp, container);
    state.endRendering();
}

function rerender() {
    state.startRendering();
    effect.resetEffects();
    state.resetCursor();
    
    const newApp = App();
    ourFrame.patch(container, currentApp, newApp);
    currentApp = newApp;
    state.endRendering();
}

injectRerender(rerender);
initialRender();
```

## API Reference

### ourFrame.createElement(type, props, ...children)

Creates a virtual element that represents a DOM node.

**Parameters:**
- `type` (string): HTML tag name (e.g., 'div', 'span', 'button')
- `props` (object): Element properties and attributes
- `children` (...any): Child elements or text content

**Example:**
```javascript
// Create a simple div with text
const element = ourFrame.createElement('div', null, 'Hello World');

// Create a button with click handler
const button = ourFrame.createElement('button', {
    onClick: () => console.log('Clicked!'),
    className: 'my-button'
}, 'Click me');

// Create nested elements
const container = ourFrame.createElement('div', { className: 'container' },
    ourFrame.createElement('h1', null, 'Title'),
    ourFrame.createElement('p', null, 'Content')
);
```

### state.useState(initialValue)

Creates a state variable with a setter function, similar to React's useState.

**Parameters:**
- `initialValue` (any): Initial state value

**Returns:**
- Array: `[currentValue, setterFunction]`

**Example:**
```javascript
import { state } from "../framework/state.js";

function MyComponent() {
    state.resetCursor(); // Always call this at the start of components
    
    const [count, setCount] = state.useState(0);
    const [name, setName] = state.useState('');
    
    return ourFrame.createElement('div', null,
        ourFrame.createElement('p', null, `Count: ${count}`),
        ourFrame.createElement('button', {
            onClick: () => setCount(count + 1)
        }, 'Increment'),
        ourFrame.createElement('input', {
            value: name,
            onInput: (e) => setName(e.target.value)
        })
    );
}
```

### route.useLocation()

Returns the current URL pathname and automatically updates when the route changes.

**Returns:**
- String: Current pathname

**Example:**
```javascript
import { route } from "../framework/route.js";

function MyComponent() {
    const location = route.useLocation();
    
    return ourFrame.createElement('div', null,
        ourFrame.createElement('p', null, `Current path: ${location}`)
    );
}
```

### route.useNavigate()

Returns a navigation function to programmatically change routes.

**Returns:**
- Function: `navigate(path)` - navigates to the specified path

**Example:**
```javascript
import { route } from "../framework/route.js";

function MyComponent() {
    const navigate = route.useNavigate();
    
    return ourFrame.createElement('div', null,
        ourFrame.createElement('button', {
            onClick: () => navigate('/about')
        }, 'Go to About'),
        ourFrame.createElement('button', {
            onClick: () => navigate('/home')
        }, 'Go to Home')
    );
}
```

### effect.useEffect(callback, dependencies)

Executes side effects with optional dependency tracking and cleanup.

**Parameters:**
- `callback` (function): Effect function, can return a cleanup function
- `dependencies` (array): Array of dependencies to watch for changes

**Example:**
```javascript
import { effect } from "../framework/effect.js";

function MyComponent() {
    const [count, setCount] = state.useState(0);
    
    // Effect that runs on every render
    effect.useEffect(() => {
        console.log('Component rendered');
    });
    
    // Effect with dependencies
    effect.useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);
    
    // Effect with cleanup
    effect.useEffect(() => {
        const timer = setInterval(() => {
            console.log('Timer tick');
        }, 1000);
        
        return () => clearInterval(timer); // Cleanup function
    }, []);
    
    return ourFrame.createElement('div', null, `Count: ${count}`);
}
```

## Examples

### Simple Counter Component
```javascript
function Counter() {
    state.resetCursor();
    
    const [count, setCount] = state.useState(0);
    
    return ourFrame.createElement('div', null,
        ourFrame.createElement('h2', null, 'Counter Example'),
        ourFrame.createElement('p', null, `Current count: ${count}`),
        ourFrame.createElement('button', {
            onClick: () => setCount(count + 1)
        }, '+'),
        ourFrame.createElement('button', {
            onClick: () => setCount(count - 1)
        }, '-'),
        ourFrame.createElement('button', {
            onClick: () => setCount(0)
        }, 'Reset')
    );
}
```

### Form Input Example
```javascript
function ContactForm() {
    state.resetCursor();
    
    const [name, setName] = state.useState('');
    const [email, setEmail] = state.useState('');
    const [message, setMessage] = state.useState('');
    
    const handleSubmit = () => {
        console.log('Form submitted:', { name, email, message });
        // Reset form
        setName('');
        setEmail('');
        setMessage('');
    };
    
    return ourFrame.createElement('form', null,
        ourFrame.createElement('input', {
            type: 'text',
            placeholder: 'Name',
            value: name,
            onInput: (e) => setName(e.target.value)
        }),
        ourFrame.createElement('input', {
            type: 'email',
            placeholder: 'Email',
            value: email,
            onInput: (e) => setEmail(e.target.value)
        }),
        ourFrame.createElement('textarea', {
            placeholder: 'Message',
            value: message,
            onInput: (e) => setMessage(e.target.value)
        }),
        ourFrame.createElement('button', {
            type: 'button',
            onClick: handleSubmit
        }, 'Submit')
    );
}
```

### Routing Example
```javascript
function App() {
    state.resetCursor();
    
    const location = route.useLocation();
    const navigate = route.useNavigate();
    
    // Simple routing logic
    let currentPage;
    switch(location) {
        case '/about':
            currentPage = ourFrame.createElement('div', null, 'About Page');
            break;
        case '/contact':
            currentPage = ourFrame.createElement('div', null, 'Contact Page');
            break;
        default:
            currentPage = ourFrame.createElement('div', null, 'Home Page');
    }
    
    return ourFrame.createElement('div', null,
        // Navigation
        ourFrame.createElement('nav', null,
            ourFrame.createElement('button', {
                onClick: () => navigate('/')
            }, 'Home'),
            ourFrame.createElement('button', {
                onClick: () => navigate('/about')
            }, 'About'),
            ourFrame.createElement('button', {
                onClick: () => navigate('/contact')
            }, 'Contact')
        ),
        // Current page content
        currentPage
    );
}
```

## Architecture

### How It Works

1. **Virtual DOM**: The framework creates a virtual representation of the DOM using JavaScript objects. When state changes, it compares the old and new virtual DOM trees and only updates the parts that changed.

2. **State Management**: Uses a cursor-based system to track state across re-renders. Each component must call `state.resetCursor()` to ensure proper state tracking.

3. **Rendering Cycle**: 
   - Component functions are called to generate virtual DOM
   - Virtual DOM is compared with previous version (diffing)
   - Only changed elements are updated in the real DOM
   - Effects are processed after rendering

4. **Event System**: Events are attached directly to DOM elements but managed through the framework's virtual DOM system for proper cleanup and updates.

5. **Routing**: Uses the browser's History API and custom events to synchronize URL changes with application state.

### Key Concepts

- **Components are Functions**: Every component is a function that returns virtual DOM elements
- **State Reset Required**: Always call `state.resetCursor()` at the beginning of component functions
- **Immutable Updates**: State updates should use immutable patterns (create new objects/arrays)
- **Effect Dependencies**: Use dependency arrays to control when effects run
- **Manual Navigation**: Use `navigate()` function instead of anchor tags for routing

### Performance Considerations

- The framework batches state updates to prevent excessive re-renders
- Only changed DOM nodes are updated through the diffing algorithm
- Event listeners are properly cleaned up to prevent memory leaks
- Effects with empty dependency arrays run only once

## TodoMVC Implementation

The framework includes a complete TodoMVC implementation demonstrating all features:
- State management for todo items
- Event handling for user interactions
- Routing for different views (All, Active, Completed)
- Dynamic rendering based on state changes

This serves as both an example of the framework's capabilities and a reference implementation for building applications with OurFrame.