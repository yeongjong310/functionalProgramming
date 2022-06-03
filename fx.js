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

const filter = curry((f, arr) => {
  const result = [];

  for (const el of arr) {
    if (f(el)) result.push(el);
  }

  return result;
});

const map = curry((f, arr) => {
  const result = [];

  for (const el of arr) {
    result.push(f(el));
  }

  return result;
});

const reduce = curry((f, init, arr) => {
  let acc;

  if (!arr) {
    arr = init[Symbol.iterator]();
    acc = arr.next().value;
  } else {
    acc = init;
  }

  for (const el of arr) {
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

console.log(...L.range(4));
