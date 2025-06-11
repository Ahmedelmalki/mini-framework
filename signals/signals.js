
function createSignal(initialValue) {
    let value = initialValue

    const getter = () => {
        return value
    }

    const setter = (newValue) => {
        value = newValue
    }

    return [getter, setter]
}

const original = 1;
const [count, setCount] = createSignal(original);

console.log('Current count: ', count());

setCount(2);

console.log('And now it is', count());
console.log('The original is the same', original);