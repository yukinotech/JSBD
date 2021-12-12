import { isLiteral } from "../dist/utils.js"

// legal literal
// +0
// -0
// 0
// 0.000
// 0.01000
// 0111.111 ❌
// 118.01
// 1180
// 01180 ❌
// -332
test('-332', () => {
  expect(isLiteral('-332')).toBe(3);
});
