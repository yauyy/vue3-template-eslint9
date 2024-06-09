import { indexMap2 } from './index2';

export const a = 1;
export const indexMap = [1, 2].reduce(function (memo, item, index) {
  memo = index;
  return memo;
}, {});

export function getA() {
  const c = indexMap2;
  console.log(c);
}
