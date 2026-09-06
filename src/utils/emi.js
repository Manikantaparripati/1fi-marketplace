export const calculateEMI = (price, tenureMonths, interestRate = 0) => {
  // Simple 0% interest EMI calculation for prototype
  if (interestRate === 0) {
    return Math.round(price / tenureMonths);
  }
  
  // Standard EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  // Where P is principal, r is monthly interest rate, n is tenure in months
  const monthlyRate = interestRate / 12 / 100;
  const emi = price * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
