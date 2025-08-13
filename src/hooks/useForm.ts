import type { FormEvent } from 'react';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

type ValidationRule<T> = {
  validator: (value: T, values?: FormValues) => boolean | string;
  message: string;
};

type ValidationRules<T> = {
  [K in keyof T]?: Array<ValidationRule<T[K]>>;
};

type FormValues = {
  [key: string]: any;
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

interface UseFormOptions<T extends FormValues> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => FormErrors<T>;
  validationRules?: ValidationRules<T>;
  onError?: (errors: FormErrors<T>) => void;
}

export function useForm<T extends FormValues>({
  initialValues,
  onSubmit,
  validate,
  validationRules,
  onError,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Validate a single field
  const validateField = useCallback(
    (name: string, value: any): string | undefined => {
      if (!validationRules || !validationRules[name as keyof T]) return undefined;

      const rules = validationRules[name as keyof T] || [];
      for (const rule of rules) {
        const result = rule.validator(value, values);
        if (result !== true) {
          return typeof result === 'string' ? result : rule.message;
        }
      }
      return undefined;
    },
    [validationRules, values]
  );

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newErrors: FormErrors<T> = {};

    // Run custom validation function if provided
    if (validate) {
      const customErrors = validate(values);
      Object.assign(newErrors, customErrors);
      isValid = Object.keys(customErrors).length === 0;
    }

    // Run field-level validations
    if (validationRules) {
      Object.keys(validationRules).forEach((field) => {
        const error = validateField(field, values[field as keyof T]);
        if (error) {
          newErrors[field as keyof T] = error;
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  }, [validate, validateField, validationRules, values]);

  // Handle input change
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      let finalValue: any = value;

      // Handle checkboxes and file inputs
      if (type === 'checkbox') {
        finalValue = (e.target as HTMLInputElement).checked;
      } else if (type === 'number') {
        finalValue = value === '' ? '' : Number(value);
      } else if (type === 'file') {
        finalValue = (e.target as HTMLInputElement).files;
      }

      // Update the field value
      const newValues = {
        ...values,
        [name]: finalValue,
      };

      setValues(newValues);

      // Validate the field if it's been touched
      if (touched[name]) {
        const error = validateField(name, finalValue);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [touched, validateField, values]
  );

  // Handle blur event
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      // Validate the field on blur
      const error = validateField(name, values[name as keyof T]);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [validateField, values]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

      const isValid = validateForm();
      if (!isValid) {
        onError?.(errors);
        return;
      }

      try {
        setIsSubmitting(true);
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [errors, onSubmit, onError, validateForm, values]
  );

  // Set a field value programmatically
  const setFieldValue = useCallback(
    (name: string, value: any) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Re-validate the field if it's been touched
      setTouched((prev) => {
        if (prev[name]) {
          const error = validateField(name, value);
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
          }));
        }
        return prev;
      });
    },
    [validateField]
  );

  // Set multiple field values at once
  const setValuesWithValidation = useCallback(
    (newValues: Partial<T>) => {
      setValues((prev) => ({
        ...prev,
        ...newValues,
      }));

      // Re-validate all touched fields
      const newErrors = { ...errors };
      let hasChanges = false;

      Object.keys(newValues).forEach((key) => {
        if (touched[key]) {
          const error = validateField(key, newValues[key as keyof T]);
          if (error !== errors[key as keyof T]) {
            newErrors[key as keyof T] = error;
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        setErrors(newErrors);
      }
    },
    [errors, touched, validateField]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues: setValuesWithValidation,
    resetForm,
    validate: validateForm,
  };
}

export default useForm;
