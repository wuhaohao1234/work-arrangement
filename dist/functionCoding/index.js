const compose = (...args) => {
    console.log(args);
    return (..._args) => {
        if (args.length < 2) {
            return args[0]();
        }
        else if (args.length === 2) {
            return args[0](args[1](_args));
        }
        else {
            let _result = args.shift();
            return args[0](_result);
        }
    };
};
const sum = (x, y) => x + y;
const ride = (x, y) => x * x;
let result = compose(sum, ride);
console.log(result(1, 2));
//# sourceMappingURL=index.js.map