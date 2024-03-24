class EventEmitter {
    constructor() {
        this.eventMap = new Map();
    }
    on(eventName, callback) {
        const queue = this.eventMap[eventName] || [];
        if (!queue.length) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(callback);
    }
    emit(eventName, ...args) {
        (
            this.eventMap[eventName] || []
        ).forEach(fn => fn.apply(this, args));
    }
    off(eventName, callback) {
        const queue = this.eventMap[eventName] || [];
        this.eventMap[eventName] = queue.filter(item => item !== callback);
    }
    once(eventName, callback) {
        const oneTimeFn = (...args) => {
            this.off(eventName, oneTimeFn);
            callback.apply(this, args);
        };
        this.on(eventName, oneTimeFn);
    }
}

const eventEmitter = new EventEmitter();

const fnA = () => {
    console.log('a');
};
const fnB = () => {
    console.log('b');
};
eventEmitter.on('a', fnA);
eventEmitter.emit('a'); // a
eventEmitter.emit('a'); // a
eventEmitter.off('a', fnA);
eventEmitter.emit('a'); // null

eventEmitter.once('b', fnB);
eventEmitter.emit('b'); // b
eventEmitter.emit('b'); // null
eventEmitter.emit('b'); // null

