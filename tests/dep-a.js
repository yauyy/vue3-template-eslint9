// dep-a.js
import { b } from './dep-b.js'; // reported: Dependency cycle detected.
console.log('🚀 ~ b:', b);
