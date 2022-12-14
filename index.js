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
        if(!x) throw new Error('Input camp required!');
        if(this.full) throw new Error('Queue full!');

        this.data[this.lastItem] = x;
        this.renderElement();
        this.lastItem++;
    }

    pop() {
        if(this.empty) throw new Error('Queue empty!');

        document.getElementById(`${this.data[0]}`).remove();

        const aux = this.data[0];
        this.data[0] = null;
        this.data.forEach((el, index) => {
            this.data[index - 1] = el;
            this.data[index] = null
        });
        this.lastItem--;

        return aux;
    }

    renderElement() {
        const container = document.createElement('DIV');
        container.classList.add('item');
        container.innerHTML = this.data[this.lastItem];
        container.id = this.data[this.lastItem];
        container.style.animation = '1s appear ease-in';
        document.querySelector('.item-container').appendChild(container);
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
        if(!x) throw new Error('Input camp required!');
        if(this.full) throw new Error('Stack full!');

        this.data[this.lastItem] = x;
        this.renderElement();
        this.lastItem++;
    }

    pop() {
        if(this.empty) throw new Error('Stack empty!');

        document.getElementById(`${this.data[this.lastItem - 1]}`).remove();

        const aux = this.data[this.lastItem - 1];
        this.data[this.lastItem - 1] = null;
        this.lastItem--;

        return aux;
    }

    renderElement() {
        const container = document.createElement('DIV');
        container.classList.add('item');
        container.innerHTML = this.data[this.lastItem];
        container.id = this.data[this.lastItem];
        container.style.animation = '1s appear ease-in';
        document.querySelector('.item-container').appendChild(container);
    }
}

function changeData(queue, stack, direction) {
    if(direction === 'toStack') {
        const length = queue.lastItem;
        for(let i = 0; i < length; i++) stack.push(queue.pop());
        return 0;
    }

    if(direction == 'toQueue') {
        const length = stack.lastItem;
        const arrAux = new Array(length);
        for(let i = 0; i < length; i++) arrAux[i] = stack.pop();
        for(let i = 0; i < length; i++) queue.push(arrAux[(length - 1) - i]);
        return 0;
    }

    return new Error('Bad directionality!');
}

const queue = new Queue(100);
const stack = new Stack(100);

const modeSign = document.querySelector('.mode');
let target = queue;

modeSign.innerHTML = 'Queue';

document.querySelector('.push-button').addEventListener('click', () => {
    target.push(document.querySelector('.insert').value);
    document.querySelector('.insert').value = '';
});

document.querySelector('.pop-button').addEventListener('click', () => {
    target.pop();
});

document.querySelector('.mode-changer').addEventListener('click', () => {
    if(target === queue) {
        modeSign.innerHTML = 'Stack';
        changeData(queue, stack, 'toStack');
        document.querySelector('.item-container').style.flexDirection = 'column-reverse';
        target = stack;
    } else if(target == stack) {
        modeSign.innerHTML = 'Queue';
        changeData(queue, stack, 'toQueue');
        document.querySelector('.item-container').style.flexDirection = 'row';
        target = queue;
    }
});