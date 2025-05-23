import { addNode, createDom, initialRender } from "../framework/dom.js"
import { useState } from "../framework/state.js"

const [task, setTask] = useState("")
const handleSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    setTask(formdata.get('task')) 
    console.log(task);
}

const vdom = {
    type: "div",
    props: {class: "content"},
    children: [
        addNode("h1",{class:"title"},["Todos"]),
        addNode("div",{class:"todo-card"},[
            addNode("div",{class:"todo-list"},[`task is: ${task}`]),
            addNode("form",{onsubmit: ()=> handleSubmit},[
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
        ])
    ]
}

const dom = createDom(vdom)
export const rerender = () => {
    document.querySelector("#main").textContent = ""
    initialRender(createDom(vdom),document.querySelector("#main"))
}

const main = document.querySelector('#main')

initialRender(dom, main)