import { addNode, setElClass } from "../framework/dom.js";
import { Router } from "../framework/router.js";
import { useState } from "../framework/state.js";
import { PageNotFound } from "../framework/notfound.js";

function App() {
    const [todos, setTodos] = useState([]);

    let nextId = todos.length + 1;

    const HandleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const taskName = formData.get("todo").trim();

        if (taskName.length === 0) {
            e.target.reset();
            return;
        }

        const newTask = {
            id: nextId++,
            name: taskName,
            completed: false
        };
        setTodos(prev => [...prev, newTask]);
        e.target.reset();
    };

    const toggleTodo = (id) => {
        setTodos(currentTodos =>
            currentTodos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }
                return todo;
            })
        );
    };


    const renderTodoItem = (todo) => {
        return addNode(
            "div",
            {
                class: `todo-item ${todo.completed ? "completed" : "active"}`,
                id: `id_${todo.id}`,
            },
            [
                addNode("input", {
                    type: "checkbox",
                    id: `id_${todo.id}_check`,
                    onclick: () => toggleTodo(todo.id),
                    ...(todo.completed && { checked: true }),
                }),
                addNode(
                    "label",
                    { for: `id_${todo.id}_check` },
                    [addNode("span", { class: "todo-text" }, [todo.name])]
                ),
            ]
        );
    };

    const getFilteredTodos = () => {
        const pathName = window.location.pathname;
        switch (pathName) {
            case "/completed":
                return todos.filter(todo => todo.completed);
            case "/active":
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    };

    const hanelerClear = () => {
        setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
    }

    const todoItems = getFilteredTodos().map(renderTodoItem);
    console.log("todoItems", todoItems);

    return {
        type: "div",
        props: { class: "content" },
        children: [
            addNode("h1", { class: "title" }, ["Todos"]),
            addNode("div", { class: "todo-card" }, [
                addNode(
                    "form",
                    {
                        class: "todo-form",
                        method: "post",
                        onsubmit: HandleSubmit,
                    },
                    [
                        addNode("input", {
                            class: "todo-input",
                            name: "todo",
                            placeholder: "Create new task...",
                        }),
                        addNode("button", { class: "submit-btn", type: "submit" }, ["create"]),
                    ]
                ),
                addNode("div", { class: "todos-list" }, todoItems),
            ]),
            addNode("div", { class: "todo-card-footer" }, [
                addNode("a", { href: "/" }, ["All"]),
                addNode("a", { href: "/completed" }, ["Completed"]),
                addNode("a", { href: "/active" }, ["Active"]),
                addNode("button", { class: "submit-btn", onclick: hanelerClear }, ["Clear "]),
            ]),
        ],
    };
}

const router = new Router({
    "/": App,
    "/completed": App,
    "/active": App,
    "/404page": PageNotFound,
});

export { router };
