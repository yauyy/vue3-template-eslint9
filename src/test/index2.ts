import { indexMap } from './index';
const a = 1;

export const indexMap2 = [1, 2].reduce((memo, item, index) => {
  memo[item] = index;
  return memo;
}, {});

const users = [
  { userId: 0, username: indexMap },
  { userId: 1, username: 'Alfie Carmelita' },
  { userId: 2, username: 'Gina Roshan' },
  { userId: 3, username: 'Shug Nabu' },
  { userId: 4, username: 'Rahman Fraser' },
  { userId: 5, username: 'Toshe Lyuben' },
  { userId: 6, username: 'Sergio Nilofar' },
];
