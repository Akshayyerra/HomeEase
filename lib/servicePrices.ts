export const servicePrices: Record<
  string,
  number
> = {
  plumbing: 299,
  electrician: 399,
  cleaning: 499,
  painting: 799,
  carpentry: 499,
  acrepair: 699,
  appliance: 599,
};

export function getServicePrice(
  service?: string
) {
  if (!service) {
    return 299;
  }

  return (
    servicePrices[
      service.toLowerCase()
    ] || 299
  );
}