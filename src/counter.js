import { createSignal, createEffect } from '../signals/signal.js';
import { ourFrame } from '../signals/dom.js';

function Counter() {
    const [count, setCount] = createSignal(0);

    const handleClick = () => {
        setCount(count() + 1);
    };

    return ourFrame.createElement(
        'div',
        { class: 'counter-container' },
        [
            ourFrame.createElement(
                'button',
                {
                    onclick: handleClick,
                    onMount: (element) => {
                        // Set up reactive updates when component mounts
                        createEffect(() => {
                            element.textContent = `Count: ${count()}`;
                            console.log("The count is now", count());
                        });
                    }
                }
            )
        ]
    );
}

export default Counter;