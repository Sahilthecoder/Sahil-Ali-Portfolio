interface ValidationResult {
  isValid: boolean;
  error?: string;
}

type Validator = (value: string) => ValidationResult;

export const validators = {
  minLength: (value: string, min: number, fieldName: string): ValidationResult => {
    if (value.trim().length < min) {
      return {
        isValid: false,
        error: `${fieldName} must be at least ${min} characters long`
      };
    }
    return { isValid: true };
  },

  maxLength: (value: string, max: number, fieldName: string): ValidationResult => {
    if (value.length > max) {
      return {
        isValid: false,
        error: `${fieldName} must be less than ${max} characters`
      };
    }
    return { isValid: true };
  },

  email: (value: string): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return {
        isValid: false,
        error: 'Please enter a valid email address'
      };
    }
    return { isValid: true };
  },

  composeValidators: (...validators: Validator[]) => {
    return (value: string) => {
      for (const validator of validators) {
        const result = validator(value);
        if (!result.isValid) {
          return result;
        }
      }
      return { isValid: true };
    };
  }
};
