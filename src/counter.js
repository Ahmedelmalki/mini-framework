import { createSignal, createEffect } from '../signals/signal.js';
import { ourFrame } from '../signals/dom.js';
// Test component
function Counter() {
    const [count, setCount] = createSignal(0);
    createEffect(() => {
        document.getElementById("count").textContent = `Count: ${count()}`;
        console.log("The count is now", count());
    });

    const handleClick = () => {
        setCount(count() + 1);
    };

    return ourFrame.createElement(
        'button',
        {
            onclick: handleClick,
            id: "count"
        },
        `Count: ${count()}`
    );
}
export default Counter;