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

const reduce = curry((f, arr, init = 0) => {
  let acc = init;

  for (const el of arr) {
    acc = f(acc, el);
  }

  return acc;
});
