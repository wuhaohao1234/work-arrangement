// type Curr1<A, R> = (a: A) => R 
// interface Curr2<A, B, R> {
//   (a: A): Curr1<B, R>;
//   (a: A, b: B): R;
// }
// interface Curr3<A, B, C, R> {
//   (a: A): Curr2<B, C, R>;
//   (a: A, b: B): Curr1<C, R>;
//   (a: A, b: B, c: C): R;
// }
// interface Curr4<A, B, C, D, R> {
//   (a: A): Curr3<B, C, D, R>;
//   (a: A, b: B): Curr2<C, D, R>;
//   (a: A, b: B, c: C): Curr1<D, R>;
//   (a: A, b: B, c: C, d: D): R;
// }
// type IAdd =　<T>(a: T, b: T, c: T) => T

function curry<T>(fn: Function, ...args: T[]) {
    let length: number = fn.length
    let lists: T[] = args || []
    let listLen: number
    return (..._args: T[]) => {
        lists = [...lists, ..._args]
        listLen = lists.length
        if (listLen < length) {
            const that: T[] = lists
            lists = []
            return curry(fn, ...that)
          } else if (listLen === length) {
            const that: T[] = lists
            lists = []
            return fn.apply(this, that)
          }
    }
}
function add(a: number, b: number, c: number): number {
  return a + b + c
}

let resultFun = curry(add)

resultFun(1)(2)(3)
resultFun(1, 2)(3)
resultFun(1, 2, 3)