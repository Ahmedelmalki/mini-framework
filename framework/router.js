import { patch } from "../framework/dom.js";
import { reset } from "../framework/state.js";
class Router {
    constructor(paths) {
        this.paths = paths
    }
    init(){
        const current = window.location.pathname
        this.navigate(current)
    }
    navigate(pathName){
        if (window.history.length > 0) {
            window.history.pushState(null, null, pathName)
        } else {
            window.history.replaceState(null, null, pathName)
        }
        this.paths[pathName]()
    }
    rerender(){
        reset();
        const vdom = App(); // Always get fresh vdom with latest state
        patch(main, oldDom, vdom);
        oldDom = vdom;
    }
}