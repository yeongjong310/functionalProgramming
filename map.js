const map = (f, arr) => {
  const result = [];

  for (const el of arr) {
    result.push(f(el));
  }

  return result;
};

map((el) => el.nodeName, document.querySelectorAll("*")); // [HTML, HEAD ...]

map((el) => el.id, [{ id: 1 }, { id: 2 }]); // [1, 2]

const m = new Map([
  ["id", 1],
  ["key", 2],
]);

new Map(map(([key, value]) => [key, value * 2], m)); // Map(2) {'id' => 2, 'key' => 4 }
