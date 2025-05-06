function test() {
  const test = document.getElementById("test");
  const p = document.createElement("p");
  p.className = "paragraph";
  p.textContent = `Lorem ipsum dolor sit amet consectetur adipiscing elit
    . Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placer
    at in id. Placerat in id cursus mi pretium tellus duis. Pretium 
    tellus duis convallis tempus leo eu aenean.`;
  test.appendChild(p);
}

test();

// test 2
import { mfCreateElement } from "../logic/dom/creatElement.js";

const vdom = {
  tag: 'div',
  attrs: { id: 'root' },
  children: [
    { tag: 'h1', attrs: {}, children: ['Hello World'] },
    { tag: 'button', attrs: { id: 'clickMe' }, children: ['Click me'] }
  ]
};

function test2(){
    const test = document.getElementById("test");
    const p2 = mfCreateElement(vdom)
    console.log(p2); 
    test.appendChild(p2)
}

test2()

