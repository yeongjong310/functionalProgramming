const filter = (f, arr) => {
  const result = [];

  for (const el of arr) {
    if (f(el)) result.push(el);
  }

  return result;
};

console.log(filter((el) => el < 10, [1, 2, 3, 4, 5, 11, 12, 13, 14, 15]));
