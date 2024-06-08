export const a = 1;
export const indexMap = [].reduce(function (memo, item, index) {
  memo[item] = index;
}, {});
