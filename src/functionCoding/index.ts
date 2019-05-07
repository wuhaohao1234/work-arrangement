// const compose = (f: Function, g: Function) => (x: any) => f(g(x));

const compose = (...args: Function[]): Function => {
    console.log(args)
    return (..._args: any[]) => {
        if (args.length < 2) {
            return args[0]()
        }else if (args.length === 2) {
            return args[0](args[1](_args))
        }else {
            let _result = args.shift()
            return args[0](_result)
        }
    }
}
// compose函数可能写的有点问题
const sum = (x: number, y: number): number => x + y

const ride = (x: number, y: number): number => x * x

let result = compose(sum, ride)

console.log(result(1, 2))