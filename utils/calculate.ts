// Calculation utilities for microfinance operations

/**
 * Calculate EMI (Equated Monthly Installment)
 * @param principal - Loan amount
 * @param rate - Annual interest rate (as percentage)
 * @param tenure - Loan tenure in months
 * @returns EMI amount
 */
export function calculateEMI(principal: number, rate: number, tenure: number): number {
  const monthlyRate = rate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
  return Math.round(emi * 100) / 100;
}

/**
 * Calculate total interest payable
 * @param principal - Loan amount
 * @param rate - Annual interest rate (as percentage)
 * @param tenure - Loan tenure in months
 * @returns Total interest amount
 */
export function calculateTotalInterest(principal: number, rate: number, tenure: number): number {
  const emi = calculateEMI(principal, rate, tenure);
  return (emi * tenure) - principal;
}

/**
 * Calculate outstanding principal
 * @param principal - Original loan amount
 * @param emi - Monthly installment
 * @param rate - Annual interest rate (as percentage)
 * @param monthsPaid - Number of months paid
 * @returns Outstanding principal amount
 */
export function calculateOutstandingPrincipal(
  principal: number,
  emi: number,
  rate: number,
  monthsPaid: number
): number {
  const monthlyRate = rate / 12 / 100;
  const outstanding = principal * Math.pow(1 + monthlyRate, monthsPaid) -
    emi * ((Math.pow(1 + monthlyRate, monthsPaid) - 1) / monthlyRate);
  return Math.max(0, Math.round(outstanding * 100) / 100);
}

