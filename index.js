const { reduce, filter, go, pipe } = require("./fx.js");

const sum = pipe(
  filter((a) => a < 3),
  reduce((acc, cur) => acc + cur)
);

console.log(go([1, 2, 3], sum));
