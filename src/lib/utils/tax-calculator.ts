export interface TaxRate {
  state: string;
  rate: number;
  description: string;
}

export const US_TAX_RATES: TaxRate[] = [
  { state: "AL", rate: 0.04, description: "Alabama State Tax" },
  { state: "AK", rate: 0.00, description: "Alaska (No State Tax)" },
  { state: "AZ", rate: 0.056, description: "Arizona State Tax" },
  { state: "AR", rate: 0.065, description: "Arkansas State Tax" },
  { state: "CA", rate: 0.0725, description: "California State Tax" },
  { state: "CO", rate: 0.029, description: "Colorado State Tax" },
  { state: "CT", rate: 0.0635, description: "Connecticut State Tax" },
  { state: "DE", rate: 0.00, description: "Delaware (No State Tax)" },
  { state: "FL", rate: 0.06, description: "Florida State Tax" },
  { state: "GA", rate: 0.04, description: "Georgia State Tax" },
  { state: "HI", rate: 0.04, description: "Hawaii State Tax" },
  { state: "ID", rate: 0.06, description: "Idaho State Tax" },
  { state: "IL", rate: 0.0625, description: "Illinois State Tax" },
  { state: "IN", rate: 0.07, description: "Indiana State Tax" },
  { state: "IA", rate: 0.06, description: "Iowa State Tax" },
  { state: "KS", rate: 0.065, description: "Kansas State Tax" },
  { state: "KY", rate: 0.06, description: "Kentucky State Tax" },
  { state: "LA", rate: 0.0445, description: "Louisiana State Tax" },
  { state: "ME", rate: 0.055, description: "Maine State Tax" },
  { state: "MD", rate: 0.06, description: "Maryland State Tax" },
  { state: "MA", rate: 0.0625, description: "Massachusetts State Tax" },
  { state: "MI", rate: 0.06, description: "Michigan State Tax" },
  { state: "MN", rate: 0.06875, description: "Minnesota State Tax" },
  { state: "MS", rate: 0.07, description: "Mississippi State Tax" },
  { state: "MO", rate: 0.04225, description: "Missouri State Tax" },
  { state: "MT", rate: 0.00, description: "Montana (No State Tax)" },
  { state: "NE", rate: 0.055, description: "Nebraska State Tax" },
  { state: "NV", rate: 0.0685, description: "Nevada State Tax" },
  { state: "NH", rate: 0.00, description: "New Hampshire (No State Tax)" },
  { state: "NJ", rate: 0.06625, description: "New Jersey State Tax" },
  { state: "NM", rate: 0.05125, description: "New Mexico State Tax" },
  { state: "NY", rate: 0.04, description: "New York State Tax" },
  { state: "NC", rate: 0.0475, description: "North Carolina State Tax" },
  { state: "ND", rate: 0.05, description: "North Dakota State Tax" },
  { state: "OH", rate: 0.0575, description: "Ohio State Tax" },
  { state: "OK", rate: 0.045, description: "Oklahoma State Tax" },
  { state: "OR", rate: 0.00, description: "Oregon (No State Tax)" },
  { state: "PA", rate: 0.06, description: "Pennsylvania State Tax" },
  { state: "RI", rate: 0.07, description: "Rhode Island State Tax" },
  { state: "SC", rate: 0.06, description: "South Carolina State Tax" },
  { state: "SD", rate: 0.045, description: "South Dakota State Tax" },
  { state: "TN", rate: 0.07, description: "Tennessee State Tax" },
  { state: "TX", rate: 0.0625, description: "Texas State Tax" },
  { state: "UT", rate: 0.0595, description: "Utah State Tax" },
  { state: "VT", rate: 0.06, description: "Vermont State Tax" },
  { state: "VA", rate: 0.053, description: "Virginia State Tax" },
  { state: "WA", rate: 0.065, description: "Washington State Tax" },
  { state: "WV", rate: 0.06, description: "West Virginia State Tax" },
  { state: "WI", rate: 0.05, description: "Wisconsin State Tax" },
  { state: "WY", rate: 0.04, description: "Wyoming State Tax" },
];

export function getTaxRateByState(state: string): number {
  const taxRate = US_TAX_RATES.find((rate) => rate.state === state.toUpperCase());
  return taxRate?.rate || 0.08; // Default to 8% if state not found
}

export function calculateTax(
  subtotal: number,
  discount: number,
  state: string,
  localTaxRate = 0
): number {
  const stateRate = getTaxRateByState(state);
  const totalRate = stateRate + localTaxRate;
  const taxableAmount = subtotal - discount;
  return taxableAmount * totalRate;
}

export function calculateTaxWithRate(
  subtotal: number,
  discount: number,
  taxRate: number
): number {
  const taxableAmount = subtotal - discount;
  return taxableAmount * taxRate;
}

export function formatTaxRate(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`;
}

export function getTaxBreakdown(
  subtotal: number,
  discount: number,
  state: string,
  localTaxRate = 0
): { stateTax: number; localTax: number; totalTax: number } {
  const stateRate = getTaxRateByState(state);
  const taxableAmount = subtotal - discount;
  
  const stateTax = taxableAmount * stateRate;
  const localTax = taxableAmount * localTaxRate;
  const totalTax = stateTax + localTax;
  
  return { stateTax, localTax, totalTax };
}
