const go = (...callbacks) => {
  return reduce((acc, callback) => callback(acc), callbacks);
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

const takeAll = take(Infinity);

const L = {};

L.range = function* (l) {
  let i = -1;

  while (i < l) {
    yield ++i;
  }
};

L.map = curry(function* (f, iter) {
  let cur;
  iter = iter[Symbol.iterator]();

  while (!(cur = iter.next()).done) {
    yield f(cur.value);
  }
});
L.filter = curry(function* (f, iter) {
  for (const el of iter) {
    if (f(el)) yield el;
  }
});
L.entries = function* (iter) {
  for (let key in iter) {
    yield [(key, iter[key])];
  }
};
L.flatten = curry(function* f(count = 1, iter) {
  for (const el of iter) {
    if (count > 0 && el && el[Symbol.iterator]) {
      yield* f(--count, el);
    } else yield el;
  }
});
L.flatMap = pipe(L.map, L.flatten());

const filter = curry(pipe(L.filter, takeAll));

const map = curry(pipe(L.map, takeAll));

const go1 = (v, f) => (v instanceof Promise ? v.then((v) => f(v)) : f(v));

const reduce = curry((f, init, iter) => {
  let acc;

  if (!iter) {
    iter = init[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    acc = init;
  }

  return go1(acc, function recur(acc) {
    let cur;

    while (!(cur = iter.next()).done) {
      acc = f(acc, cur.value);
      if (acc instanceof Promise) return acc.then(recur);
    }

    return acc;
  });
});

const flatten = pipe(L.flatten(), takeAll);

const flatMap = pipe(L.flatMap, takeAll);

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

// console.log(...L.flatMap((a) => a ** 2, [1, 2, [3]]));

// test("range", 10, () => reduce((a, b) => a + b), range(1000000));
// test("L.range", 10, () => reduce((a, b) => a + b), L.range(1000000)); // L.range가 좀 더 빠르다.

// test("range", 10, () => take(5, range(1000000)));
// test("L.range", 10, () => take(5, L.range(1000000))); // 반복을 중간에 중단하는 경우 더 효율성이 뛰어나다.

go(
  Promise.resolve([1, 2, 3]),
  (iter) => new Promise((resolve) => resolve(iter)),
  map((a) => a + 1),
  console.log
);

go(
  Promise.resolve(1),
  (a) => a + 1,
  (a) => Promise.resolve(a + 100),
  console.log
);

go1(Promise.resolve(1), console.log);
