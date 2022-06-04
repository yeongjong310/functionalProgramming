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

const take = curry((l, iter) => {
  const result = [];

  for (const el of iter) {
    result.push(el);
    if (result.length === l) break;
  }

  return result;
});
const L = {
  range: function* (l) {
    let i = -1;

    while (i < l) {
      yield ++i;
    }
  },
  map: curry(function* (f, iter) {
    let cur;
    iter = iter[Symbol.iterator]();

    while (!(cur = iter.next()).done) {
      yield f(cur.value);
    }
  }),
  filter: curry(function* (f, iter) {
    for (const el of iter) {
      if (f(el)) yield el;
    }
  }),
  entries: curry(function* (iter) {
    for (let key in iter) {
      yield [(key, iter[key])];
    }
  }),
};

const filter = curry(pipe(L.filter, take(Infinity)));

const map = curry(pipe(L.map, take(Infinity)));

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

const join = curry((sep, iter) => {
  reduce((a, b) => `a${sep}b`, iter);
});

const find = curry((f, iter) =>
  go(
    iter,
    L.filter((a) => f(a)),
    take(1),
    ([v]) => v
  )
);

function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

// test("range", 10, () => reduce((a, b) => a + b), range(1000000));
// test("L.range", 10, () => reduce((a, b) => a + b), L.range(1000000)); // L.range가 좀 더 빠르다.

// test("range", 10, () => take(5, range(1000000)));
// test("L.range", 10, () => take(5, L.range(1000000))); // 반복을 중간에 중단하는 경우 더 효율성이 뛰어나다.
