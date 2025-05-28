import { addNode } from "./dom.js"


export function PageNotFound() {

    return {
        type: "div",
        props: {class: "content"},
        children: [
            addNode("div",{},[
                addNode("h3",{class:"err-msg"},["404 Page Not Found!"]),
                addNode("a",{href: "/", class: "link"}, ["back to home!"])
            ])
        ]
    }
}