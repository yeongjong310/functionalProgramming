const reduce = (f, arr, init = 0) => {
  let acc = init;

  for (const el of arr) {
    acc = f(acc, el);
  }

  return acc;
};

console.log(reduce((acc, cur) => acc + cur, [1, 2, 3, 4, 5])); // 15
console.log(reduce((acc, cur) => acc + cur, ["a", "b", "c", "d", "e"], "z")); // zabcde
