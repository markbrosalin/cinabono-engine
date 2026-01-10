// import { SayHelloClass, sayHello, StaticSayHelloClass } from "./utils";

// // Генератор уникальных входных данных для исключения кэширования
// const getText = (i: number) => `Hello world ${i}`;

// const results = {
//     firstSum: 0,
//     secondSum: 0,
//     thirdSum: 0,
// };

// function measureTime(fn: () => void, name = "Function", path: string) {
//     return () => {
//         const start = performance.now();
//         fn();
//         const end = performance.now();
//         //console.log(`⏱️ [${name}] выполнено за ${(end - start).toFixed(3)} ms`);

//         results[path as keyof typeof results] += end - start;
//     };
// }
// // 1
// const timedSayHello = measureTime(
//     () => {
//         for (let i = 0; i < 1_000; i++) {
//             sayHello(getText(i));
//         }
//     },
//     "sayHello (10k вызовов)",
//     "firstSum"
// );

// // 2. Статичный метод (обернули ОДИН раз)
// const staticClass = measureTime(
//     () => {
//         for (let i = 0; i < 1_000; i++) {
//             StaticSayHelloClass.hello(getText(i));
//         }
//     },
//     "StaticSayHelloClass.hello (10k вызовов)",
//     "secondSum"
// );

// const inst = new SayHelloClass("");

// const instance = measureTime(
//     () => {
//         for (let i = 0; i < 1_000; i++) {
//             inst.setText(getText(i)); // Меняем через метод
//             inst.hello();
//         }
//     },
//     "SayHelloClass.hello (10k вызовов)",
//     "thirdSum"
// );

// self.addEventListener("message", () => {
//     for (let i = 0; i < 10000; i++) {
//         timedSayHello();

//         staticClass();

//         instance();
//     }
//     console.log(results.firstSum, "ms");
//     console.log(results.secondSum, "ms");
//     console.log(results.thirdSum, "ms");

//     self.postMessage("Worker: Done!");
// });
