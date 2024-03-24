/**
 * 深拷贝
 * @param {*} obj
 * @returns obj
 */
const deepClone = (obj) => {
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }
    let result;
    if (Array.isArray(obj)) {
        result = [];
    } else {
        result = {};
    }
    for (const key in obj) {
        obj.hasOwnProperty(key) && (
            result[key] = deepClone(obj[key])
        );
    }
    return result;
};

const obj1 = {
    a: 1,
    b: 2,
    c: {
        x: 1,
        y: {
            z: 3
        }
    }
}
const obj2 = deepClone(obj1);
console.log(obj2);


const isObject = (obj) => typeof obj === 'object' && !(obj == null);

/**
 * @description 深度比较
 * @param {*} obj1
 * @param {*} obj2
 * @returns Boolean
 */
const isEqual = (obj1, obj2) => {
    if (!isObject(obj1) && !isObject(obj2)) {
        return obj1 === obj2;
    }
    if (obj1 === obj2) {
        return true;
    }
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    for (const key in obj1) {
        const result = isEqual(obj1[key], obj2[key]);
        if (!result) {
            return false;
        }
    }
    return true;
};

console.log(obj1 === obj2);
console.log(isEqual(obj1, obj2));