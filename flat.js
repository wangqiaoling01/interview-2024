const flat = (arr) => {
    const isDeep = () => arr.some(item => item instanceof Array);
    if (!isDeep(arr)) {
        return arr;
    }
    const result = Array.prototype.concat.apply([], arr);
    return flat(result);
};
const a  = flat([1,2,3,[4,5,[6,7]]])
console.log(a);