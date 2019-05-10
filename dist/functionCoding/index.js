function curry(fn, ...args) {
    let length = fn.length;
    let lists = args || [];
    let listLen;
    return (..._args) => {
        lists = [...lists, ..._args];
        listLen = lists.length;
        if (listLen < length) {
            const that = lists;
            lists = [];
            return curry(fn, ...that);
        }
        else if (listLen === length) {
            const that = lists;
            lists = [];
            return fn.apply(this, that);
        }
    };
}
function add(a, b, c) {
    return a + b + c;
}
let resultFun = curry(add);
resultFun(1)(2)(3);
resultFun(1, 2)(3);
resultFun(1, 2, 3);
//# sourceMappingURL=index.js.map