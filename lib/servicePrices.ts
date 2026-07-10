export const SERVICE_PRICES: Record<string, number> = {
  "Electrician": 299,
  "Home Cleaner": 599,
  "Plumber": 349,
  "Salon at Home": 499,
  "Carpenter": 399,
  "AC Repair": 699,
  "Washing Machine Repair": 549,
  "Appliances Repair": 449,
  "Construction Worker": 999,
};

export function getServicePrice(service: string): number {
  return SERVICE_PRICES[service] ?? 0;
}