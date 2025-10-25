import { expect, test } from 'vitest';
import { UndernutritionAdultResult, UndernutritionSeniorResult } from './UndernutritionResult';

// TEST UndernutritionAdultResult --------------------------------------------
test ('no undernutrition', () => {
    expect(UndernutritionAdultResult(70, 175, 68, "one-month", 35, false, false, false, false)).toBe("no");
});
test ('no undernutrition with 1 etiological factor', () => {
    expect(UndernutritionAdultResult(70, 175, 68, "one-month", 35, false, true, false, false)).toBe("no");
});
test ('no undernutrition with 2 phenotypic factors', () => {
    expect(UndernutritionAdultResult(45, 175, 66, "six-month", 35, false, false, false, false)).toBe("no");
});
test ('moderate undernutrition', () => {
    expect(UndernutritionAdultResult(65, 180, 60, "one-month", 32, false, true, true, false)).toBe("no");
});
test ('moderate undernutrition', () => {
    expect(UndernutritionAdultResult(51, 169, 56, "six-month", 32, false, false, false, true)).toBe("moderate");
});
test ('severe undernutrition', () => {
    expect(UndernutritionAdultResult(50, 160, 60, "six-month", 28, true, true, true, true)).toBe("severe");
});
test ('severe undernutrition', () => {
    expect(UndernutritionAdultResult(60, 170, 50, "one-month", 28, true, true, false, false)).toBe("severe");
});
test ('severe undernutrition', () => {
    expect(UndernutritionSeniorResult(50, 160, 60, "six-month", 28, true, true, true, true)).toBe("severe");
});

// TEST UndernutritionSeniorResult --------------------------------------------
test ('no undernutrition', () => {
    expect(UndernutritionSeniorResult(70, 175, 68, "one-month", 35, false, false, false, false)).toBe("no");
});
test ('no undernutrition with 1 etiological factor', () => {
    expect(UndernutritionSeniorResult(70, 175, 68, "one-month", 35, false, true, false, false)).toBe("no");
});
test ('no undernutrition with 2 phenotypic factors', () => {
    expect(UndernutritionSeniorResult(45, 175, 66, "six-month", 35, false, false, false, false)).toBe("no");
});
test ('moderate undernutrition', () => {
    expect(UndernutritionSeniorResult(65, 180, 60, "one-month", 32, false, true, true, false)).toBe("moderate");
});
test ('moderate undernutrition', () => {
    expect(UndernutritionSeniorResult(57, 168, 56, "six-month", 32, false, false, false, true)).toBe("moderate");
});
test ('moderate undernutrition', () => {
    expect(UndernutritionSeniorResult(78, 165, 55, "six-month", 32, true, false, false, true)).toBe("moderate");
});
test ('severe undernutrition', () => {
    expect(UndernutritionSeniorResult(50, 160, 60, "six-month", 28, true, true, true, true)).toBe("severe");
});
test ('severe undernutrition', () => {
    expect(UndernutritionSeniorResult(60, 170, 50, "one-month", 28, true, true, false, false)).toBe("severe");
});
test ('severe undernutrition', () => {
    expect(UndernutritionSeniorResult(50, 160, 60, "six-month", 28, true, true, true, true)).toBe("severe");
});