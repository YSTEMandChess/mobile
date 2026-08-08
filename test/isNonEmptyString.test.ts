import { isNonEmptyString } from '@/utils/isNonEmptyString';

describe('isNonEmptyString', () => {
  it.each([
    ['text', true],
    ['  text  ', true],
    ['', false],
    ['   ', false],
    [undefined, false],
    [null, false],
    [42, false],
  ])('returns the expected result for %p', (value, expected) => {
    expect(isNonEmptyString(value)).toBe(expected);
  });
});
