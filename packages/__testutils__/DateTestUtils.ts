import MockDate from 'mockdate';

export const STUB_DATE = Date.UTC(2019, 4, 24, 12, 13, 14, 15);

export function mockDate(millis = STUB_DATE): void {
  MockDate.set(millis);
}

export function resetMockDate(): void {
  MockDate.reset();
}
