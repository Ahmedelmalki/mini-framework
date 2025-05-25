import { addNode, createDom, initialRender, patch } from "../framework/dom.js"
import { useState, resetCount } from "../framework/state.js"

const [task, setTask] = useState("hello")
const handleSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    setTask(formdata.get('task'))
}

const CounterComponent = () => {
    
    let [count,setCount] = useState(0)
    return addNode("div",{},[
            addNode("div",{class: "counter"},[`${count}`]),
            addNode("button", {
                class: "btn-primary",
                onclick: ()=> {
                    setCount(e => e + 1); // Add this line to rerender after state change
                    console.log(count);
                }
            },["increment"])
        ])
    
}

let vdom = {
    type: "div",
    props: {class: "content"},
    children: [
        addNode("h1",{class:"title"},["Todos"]),
        addNode("div",{class:"todo-card"},[
            addNode("div",{class:"todo-list"},[`task is: ${task}`]),
            addNode("form",{onsubmit: handleSubmit},[
                addNode("input",{
                    placeholder:"add todo...",
                    class: "todo-input",
                    name: "task",
                    type: "text",
                },[]),
                addNode("button",{
                    class: "add-btn",
                    type: "submit",
                },["ADD"])
            ]),
            addNode(CounterComponent)
        ])
    ]
}

let oldDom = null
const main = document.querySelector('#main')
export function rerender() {
    patch(main,oldDom,vdom)
    oldDom = vdom
}

rerender()

// initialRender(dom, main)