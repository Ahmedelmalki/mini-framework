import { createEffect } from "./signal.js";
export function createElement(tag, props = {}, ...children) {
    const element = document.createElement(tag);
    
    Object.entries(props || {}).forEach(([key, value]) => {
        if (key.startsWith('on')) {
            const eventName = key.toLowerCase().slice(2);
            element.addEventListener(eventName, value);
        } else if (typeof value === 'function') {
            // Handle reactive props
            createEffect(() => {
                const result = value();
                if (key === 'class' || key === 'className') {
                    element.className = result;
                } else {
                    element.setAttribute(key, result);
                }
            });
        } else {
            if (key === 'class' || key === 'className') {
                element.className = value;
            } else {
                element.setAttribute(key, value);
            }
        }
    });

    children.flat().forEach(child => {
        if (typeof child === 'function') {
            // Handle reactive children
            createEffect(() => {
                const value = child();
                element.textContent = value;
            });
        } else if (child instanceof Node) {
            element.appendChild(child);
        } else {
            element.appendChild(document.createTextNode(child));
        }
    });

    return element;
}

export const ourFrame = {
    createElement
};