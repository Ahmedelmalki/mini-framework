let currentEffect = null

export function createSignal(initialValue) {
    let value = initialValue
    const subscribers = new Set();

    const getter = () => {
        if (currentEffect) {
            subscribers.add(currentEffect); // Track dependencies
        }
        return value
    }

    const setter = (newValue) => {
        if (newValue !== value) {
            value = newValue;
            subscribers.forEach((effect) => effect()); // Notify subscribers
        }
    }
    return [getter, setter]
}

export function createEffect(fn) {
    currentEffect = fn;
    fn();
    currentEffect = null;
}
