import { expect, test } from 'vitest';
import { SRIScoreMajorCriterion, SRIScoreMinorCriterion } from './SRIScore';

test('should return 4', () => {
    expect(SRIScoreMajorCriterion(15, 16, true, 3, 0.8, 0.7)).toBe(4);
});
test('should return 2', () => {
    expect(SRIScoreMajorCriterion(17, 16, false, 3.6, 0.8, 0.7)).toBe(2);
});
test('should return 0', () => {
    expect(SRIScoreMajorCriterion(0, 0, false, 0, 0, 0)).toBe(0);
});

test('should return 3', () => {
    expect(SRIScoreMinorCriterion(17, 11, true, false)).toBe(3);
});
test('should return 4', () => {
    expect(SRIScoreMinorCriterion(17, 12, true, true)).toBe(4);
}); 
test('should return 0', () => {
    expect(SRIScoreMinorCriterion(0, 0, false, false)).toBe(0);
});
test('should return 0', () => {
    expect(SRIScoreMinorCriterion(15, 9, false, false)).toBe(0);
});