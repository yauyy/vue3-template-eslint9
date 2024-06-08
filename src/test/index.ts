export const a = 1;
export const indexMap = [1, 2].reduce(function (memo, item, index) {
  memo = index;
}, {});
