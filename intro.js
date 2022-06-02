const go = (init, ...callbacks) => {
  return callbacks.reduce((acc, callback) => callback(acc), init);
};

const pipe =
  (...callbacks) =>
  (init) =>
    go(init, ...callbacks);

const queryStr = (obj) => go(obj, Object.entries);
const mul10 = (a) => a * 10;
const add5 = (a) => a + 5;

console.log(queryStr({ limit: 10, offset: 10, type: "notice" }));

console.log(go(5, add5, mul10)); // 100

console.log(go(5, pipe(add5, mul10))); // 100

console.log(pipe(add5, mul10)(5)); // 100
