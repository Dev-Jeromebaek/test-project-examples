const { sum, sumOf } = require('./sum');

/**
 *
 * 단일 테스트 test, it
 *
 */
test('1 + 2 = 3', () => {
  expect(sum(1, 2)).toBe(3);
});

it('1 + 2가 잘 수행 됨', () => {
  expect(sum(1, 2)).toBe(3);
});

/**
 *
 * 복합 테스트 describe
 *
 */
describe('sum', () => {
  //? 1+2 실행
  it('calculates 1 + 2', () => {
    expect(sum(1, 2)).toBe(3);
  });

  //? 배열 더하기
  it('calculates all numbers', () => {
    const array = [1, 2, 3, 4, 5];
    expect(sumOf(array)).toBe(15);
  });
});
