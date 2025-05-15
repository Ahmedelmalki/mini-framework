class Router {
    constructor() {

    }
    goTo(pathName) {
        if (window.history.length == 0) {
            window.history.replaceState(pathName)
        } else {
            window.history.pushState(pathName)
        }
    }
    
}