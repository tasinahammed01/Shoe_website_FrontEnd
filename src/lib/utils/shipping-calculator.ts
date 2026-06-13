export interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  isDefault?: boolean;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 9.99,
    estimatedDays: "5-7",
    isDefault: true,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 19.99,
    estimatedDays: "2-3",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "1 business day",
    price: 39.99,
    estimatedDays: "1",
  },
  {
    id: "free",
    name: "Free Shipping",
    description: "5-7 business days",
    price: 0,
    estimatedDays: "5-7",
  },
];

export function calculateShippingCost(
  subtotal: number,
  shippingOptionId: string,
  freeShippingThreshold = 100
): number {
  // Free shipping for orders over threshold
  if (subtotal >= freeShippingThreshold) {
    return 0;
  }

  const option = SHIPPING_OPTIONS.find((opt) => opt.id === shippingOptionId);
  return option?.price || SHIPPING_OPTIONS[0].price;
}

export function getShippingOptionById(id: string): ShippingOption | undefined {
  return SHIPPING_OPTIONS.find((opt) => opt.id === id);
}

export function getDefaultShippingOption(): ShippingOption {
  return SHIPPING_OPTIONS.find((opt) => opt.isDefault) || SHIPPING_OPTIONS[0];
}

export function getEstimatedDeliveryDate(
  shippingOptionId: string
): { startDate: Date; endDate: Date } {
  const option = getShippingOptionById(shippingOptionId) || getDefaultShippingOption();
  const days = option.estimatedDays.split("-").map(Number);
  
  const startDate = new Date();
  const endDate = new Date();
  
  startDate.setDate(startDate.getDate() + (days[0] || 5));
  endDate.setDate(endDate.getDate() + (days[1] || days[0] || 7));
  
  return { startDate, endDate };
}

export function formatDeliveryDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function validateShippingAddress(
  address: Partial<ShippingAddress>
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!address.firstName?.trim()) {
    errors.firstName = "First name is required";
  }
  if (!address.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }
  if (!address.addressLine1?.trim()) {
    errors.addressLine1 = "Address is required";
  }
  if (!address.city?.trim()) {
    errors.city = "City is required";
  }
  if (!address.state?.trim()) {
    errors.state = "State is required";
  }
  if (!address.postalCode?.trim()) {
    errors.postalCode = "Postal code is required";
  }
  if (!address.country?.trim()) {
    errors.country = "Country is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
