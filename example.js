import { ourFrame } from '../framework/dom.js';
import { useState } from '../framework/state.js';

function Counter() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  
  // Log render count for debugging batching
  console.log(`Rendering Counter, render #${renderCount}`);
  
  const handleClick = () => {
    console.log('Button clicked, current count:', count);
    
    // Test batch updates
    setCount(c => {
      console.log('First update, c =', c);
      return c + 1;
    });
    setCount(c => {
      console.log('Second update, c =', c);
      return c + 1;
    });
    setCount(c => {
      console.log('Third update, c =', c);
      return c + 1;
    });
    
    // Track number of rerenders
    setRenderCount(r => r + 1);
  };

  return ourFrame.createElement(
    'div',
    { class: 'counter-container' },
    [
      ourFrame.createElement(
        'h2',
        null,
        [`Count: ${count}`]
      ),
      ourFrame.createElement(
        'button',
        { 
          onclick: handleClick,
          class: 'increment-button' 
        },
        ['Increment 3x']
      ),
      ourFrame.createElement(
        'p',
        { class: 'render-info' },
        [`Number of renders: ${renderCount}`]
      )
    ]
  );
}

// Mount the app
const container = document.getElementById('root');
ourFrame.render(Counter(), container);