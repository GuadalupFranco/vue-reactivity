class PlatziReactive {
    constructor(options) {
        this.origin = options.data();

        // Destiny
        this.$data = new Proxy(this.origin, {
            get(target, name) {
                if (name in target) {
                    return target[name];
                }
                console.warn("The property", name, "doesn't exists")
                return "";
            }
        })
    }

    mount(){
        document.querySelectorAll("*[p-text]").forEach(el => {
            this.pText(el, this.$data, el.getAttribute("p-text"))
        })
    }

    pText(el, target, name) {
        el.innerText = target[name];
    }

    pModel(){}
}

var Platzi = {
    createApp(options){
        return new PlatziReactive(options)
    }
}