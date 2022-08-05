class Queue {
    constructor(size) {
        this.data = new Array(size);
        this.size = size;
        this.lastItem = 0;
    }

    get empty() { return this.data[0] ? false : true; }

    get full() { return this.data[this.size - 1] ? true : false; }

    get top() { return this.data[0] }

    push(x) {
        this.data[this.lastItem] = x;
        this.renderElement();
        this.lastItem++;
    }

    pop() {
        const aux = this.data[0];
        this.data[0] = null;
        this.data.forEach((el, index) => {
            this.data[index - 1] = el;
            this.data[index] = null
        });

        return aux;
    }

    renderElement() {
        const container = document.createElement('DIV');
        container.classList.add('item');
        container.innerHTML = this.data[this.lastItem];
        document.querySelector('.main-container').appendChild(container);
    }
}

class Stack {
    constructor(size) {
        this.data = new Array(size);
        this.size = size;
        this.lastItem = 0;
    }

    get empty() { return this.data[0] ? false : true; }

    get full() { return this.data[this.size - 1] ? true : false; }

    get top() { return this.data[this.lastItem - 1] }

    push(x) {
        this.data[this.lastItem] = x;
        this.lastItem++;
    }

    pop() {
        const aux = this.data[this.lastItem - 1];
        this.data[this.lastItem - 1] = null;
        this.lastItem--;

        return aux;
    }
}