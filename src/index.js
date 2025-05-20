import { render } from "./core/render.js";

const vdom = {
  tag: 'div',
  attrs: { id: 'root' },
  children: [
    { tag: 'h1', children: ['Hello Framework'] },
    {
      tag: 'button',
      attrs: { id: 'clickMe' },
      events: {
        click: () => alert('Clicked!')
      },
      children: ['Click Me']
    }
  ]
};

const test = document.getElementById("test");
render(vdom, test);
