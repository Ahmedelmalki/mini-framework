
// test 3
import { mfCreateElement } from "../logic/dom/creatElement.js";

function todos(){
  console.log("0000000000000000000000");
  
  const tmpl = /*html*/`
  <div>
    <h1>todos</h1>
    <div class="todos-box">
      <input type="text">
      <section class="todos-list">
        <!-- todos list -->
      </section>
      <section class="btns-section">
        <span>X items left</span>
        <button> All </button>
        <button> Active </button>
        <button> Complated </button>
        <button>Clear Completed</button>
      </section>
    </div>
  </div>
  ` 
  const root = document.getElementById('root')
  mfCreateElement(root, tmpl)

}

todos()

/* fucn createDiv(tag, class, innerText){
    const tag = d.createlement(tag)
    
  }
*/