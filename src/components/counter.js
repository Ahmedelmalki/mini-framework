import { useState } from "../../framework/state.js"
import { addNode } from "../../framework/dom.js"

const CounterComponent = () => {
    const [count,setCount] = useState(0)

    return (
        addNode("div",{},[
            addNode("div",{className: "counter"},[`${count}`]),
            addNode("button", {
                className: "btn-primary",
                onclick: ()=> {
                    setCount(count + 1);
                    // Log the updated value after state change
                    setTimeout(() => {
                        console.log(count + 1);
                    });
                }
            },["increment"])
        ])
    )
}

export { CounterComponent }