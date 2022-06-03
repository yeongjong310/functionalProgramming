const go = (init, ...callbacks) => {
  return callbacks.reduce((acc, callback) => callback(acc), init);
};

const pipe =
  (callback, ...callbacks) =>
  (...inits) =>
    go(callback(...inits), ...callbacks);

const curry =
  (f) =>
  (arg, ...args) =>
    args.length > 0 ? f(arg, ...args) : (...args) => f(arg, ...args);

const filter = curry((f, iter) => {
  const result = [];

  for (const el of iter) {
    if (f(el)) result.push(el);
  }

  return result;
});

const map = curry((f, iter) => {
  const result = [];

  for (const el of iter) {
    result.push(f(el));
  }

  return result;
});

const reduce = curry((f, init, iter) => {
  let acc;

  if (!iter) {
    iter = init[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    acc = init;
  }

  for (const el of iter) {
    acc = f(acc, el);
  }

  return acc;
});

const range = (l) => Array.from({ length: l }, (v, index) => index);

const L = {
  range: function* (l) {
    let i = -1;

    while (i < l) {
      yield ++i;
    }
  },
};

const take = (l, iter) => {
  const result = [];

  for (const el of iter) {
    result.push(el);
    if (result.length === l) break;
  }

  return result;
};

function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

// test("range", 10, () => reduce((a, b) => a + b), range(1000000));
// test("L.range", 10, () => reduce((a, b) => a + b), L.range(1000000)); // L.range가 좀 더 빠르다.

// test("range", 10, () => take(5, range(1000000)));
// test("L.range", 10, () => take(5, L.range(1000000))); // 반복을 중간에 중단하는 경우 더 효율성이 뛰어나다.
