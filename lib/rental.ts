export const RENTAL_PERIODS = [
  { label: "1 month", months: 1 },
  { label: "3 months", months: 3 },
  { label: "6 months", months: 6 },
  { label: "12 months", months: 12 },
];

export function monthsFromPeriod(label: string): number {
  return RENTAL_PERIODS.find((p) => p.label === label)?.months ?? 1;
}
