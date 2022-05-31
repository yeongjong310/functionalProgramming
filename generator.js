function* limit(l, iter) {
  for (const a of iter) {
    if (l < a) return;
    yield a;
  }
}

function* infinity(i = 0) {
  while (true) yield i++;
}

function* odds(l) {
  for (let i = 0; i < l; i++) {
    if (i % 2) yield i;
  }
}

let iter = odds(4);

console.log(iter.next()); // 1
console.log(iter.next()); // 3
console.log(iter.next()); // undefined

let iter2 = infinity(2);

console.log(iter2.next()); // 2
console.log(iter2.next()); // 3
console.log(iter2.next()); // 4

let iter3 = limit(3, infinity(1));

console.log(iter3.next()); // 1
console.log(iter3.next()); // 2
console.log(iter3.next()); // 3
console.log(iter3.next()); // undefined
