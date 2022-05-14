/**
 * Array to List
 */
export const arrayToList = (arr) => {
    const list = {};
    list.value = arr[0];
    list.rest = arr.length > 1 ? arrayToList(arr.slice(1), list) : null;
    return list;
};

export const listToArray = (list) => {
    const arr = new Array();

    return function listToArr(list) {
        const value = list.value;
        if (value !== undefined) {
            arr.push(value);
            const rest = list.rest;
            if (rest != null) {
                listToArr(rest);
            }
        }
        return arr;
    }(list);
};

/**
 * Keys and values to list
 */
export const getKeyValuePairs = (keyValues) => {
    return Object.entries(keyValues);
};

/**
 * Invert keys and values
 */
export const invertKeyValue = (keyValues) => {
    return Object.fromEntries(
        Object.entries(keyValues).map(e => [e[1], e[0]])
    );
};

/**
 * Get all methods from object
 */
export const getAllMethodsFromObject = (obj) => {
    return Object.getOwnPropertyNames(obj).filter(it => typeof obj[it] === 'function');
};

/**
 * Groups
 */
export class Groups {
    groups;
    constructor(groups) {
        this.groups = groups;
        Object.defineProperty(this, 'length', {
            get: function () {
                return this.groups.length;
            }
        });
    }
    static from(args) {
        return new Groups(args);
    }
    has(val) {
        return this.groups.includes(val);
    }
    add(val) {
        if (!this.groups.includes(val)) {
            this.groups.push(val);
        }
    }
    delete(val) {
        const index = this.groups.indexOf(val);
        if (index != -1) {
            this.groups.splice(index, 1);
        }
    }
}

export class Clock {
    t;
    run() {
        this.t = setInterval(() => console.log(this.getHHMMSS(Date.now())), 1000);
    }
    getHHMMSS(timeMs) {
        return new Date(timeMs).toLocaleTimeString('ru-RU', { hour12: false });
    }
    stop() {
        clearInterval(this.t);
    }
}
