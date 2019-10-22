const stats = require('./stats');

describe('stats', () => {
  it('최댓값 구하기', () => {
    expect(stats.max([1, 2, 3, 4])).toBe(4);
  });
  it('최솟값 구하기', () => {
    expect(stats.min([1, 2, 3, 4])).toBe(1);
  });
  it('평균값 구하기', () => {
    expect(stats.avg([1, 2, 3, 4, 5])).toBe(3);
  });
  describe('중앙값 구하기', () => {
    it('오름차순 정렬', () => {
      expect(stats.sort([5, 4, 1, 2, 3])).toEqual([1, 2, 3, 4, 5]);
    });
    it('1~5 중앙값 구하기', () => {
      expect(stats.median([1, 2, 3, 4, 5])).toBe(3);
    });
    it('1~6 중앙값 구하기', () => {
      expect(stats.median([1, 2, 3, 4, 5, 6])).toBe(3.5);
    });
  });
  describe('모드', () => {
    it('가장 많이 사용된 숫자 확인', () => {
      expect(stats.mode([1, 2, 2, 2, 3])).toBe(2);
    });
    it('가장 많이 사용한 숫자 없음', () => {
      expect(stats.mode([1, 2, 3])).toBe(null);
    });
    it('빈도 높은 숫자 여러개', () => {
      expect(stats.mode([1, 2, 2, 3, 3, 4])).toEqual([2, 3]);
    });
  });
});
