import { state } from '../framework/state.js';
import { ourFrame } from '../framework/dom.js';
// Test component
function Counter() {
    state.resetCursor(); // Reset state cursor for this component
    const [count, setCount] = state.useState(0);
    console.log('Render count:', count);

    const handleClick = () => {
        console.log('Before updates');
        setCount(c => c + 1);
        setCount(c => c + 1);
        setCount(c => c + 1);
        console.log('After updates');
    };

    return ourFrame.createElement(
        'button',
        { onclick: handleClick },
        `Count: ${count}`
    );
}
export default Counter;