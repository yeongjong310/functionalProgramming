const go = (...callbacks) => {
  return callbacks.reduce(
    (value, callback, index) => (index > 0 ? callback(value) : callback),
    undefined
  );
};

const queryStr = (obj) => go(obj, Object.entries);
const mul10 = (a) => a * 10;
const add5 = (a) => a + 5;

console.log(queryStr({ limit: 10, offset: 10, type: "notice" }));

console.log(go(5, add5, mul10)); // 100
