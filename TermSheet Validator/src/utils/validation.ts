import { TermSheetData, ValidationError } from '../types';

export const validateTermSheetData = (data: Partial<TermSheetData>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.companyName) {
    errors.push({
      field: 'companyName',
      message: 'Company name is required',
      severity: 'error'
    });
  }

  if (data.valuation !== undefined && data.valuation <= 0) {
    errors.push({
      field: 'valuation',
      message: 'Valuation must be greater than 0',
      severity: 'error'
    });
  }

  if (data.equityPercentage !== undefined && (data.equityPercentage < 0 || data.equityPercentage > 100)) {
    errors.push({
      field: 'equityPercentage',
      message: 'Equity percentage must be between 0 and 100',
      severity: 'error'
    });
  }

  return errors;
};