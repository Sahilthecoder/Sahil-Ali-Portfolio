import type { ChangeEvent, FocusEvent, FormEvent } from 'react';
import { useState } from 'react';

import { useForm } from '@/hooks/useForm';
import { validators } from '@/validation/validation';

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type UseContactFormReturn = {
  formData: ContactFormState;
  errors: Record<keyof ContactFormState, string | undefined>;
  isSubmitting: boolean;
  submitSuccess: boolean;
  touched: Record<keyof ContactFormState, boolean>;
  formError: string | null;
  handleChange: (
    field: keyof ContactFormState
  ) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (field: keyof ContactFormState) => void;
  handleSubmit: (e: FormEvent) => void;
  resetForm: () => void;
};

export function useContactForm(): UseContactFormReturn {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFormSubmit = async (values: ContactFormState): Promise<void> => {
    try {
      setFormError(null);
      
      const response = await fetch('https://formspree.io/f/xpwrjjqj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormError('Failed to send message. Please try again later or contact me directly at sahilsheikhali12@gmail.com');
      throw error;
    }
  };

  const {
    values: formData,
    errors,
    touched,
    isSubmitting,
    handleChange: baseHandleChange,
    handleBlur: baseHandleBlur,
    handleSubmit: baseHandleSubmit,
    resetForm,
  } = useForm<ContactFormState>({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationRules: {
      name: [
        {
          validator: (value) => {
            const result = validators.composeValidators(
              (v) => validators.minLength(v, 2, 'Name'),
              (v) => validators.maxLength(v, 50, 'Name')
            )(value);
            return result.isValid ? true : result.error || '';
          },
          message: 'Name must be between 2-50 characters',
        },
      ],
      email: [
        {
          validator: (value) => {
            const result = validators.email(value);
            return result.isValid ? true : result.error || '';
          },
          message: 'Please enter a valid email address',
        },
      ],
      subject: [
        {
          validator: (value) => {
            const result = validators.composeValidators(
              (v) => validators.minLength(v, 3, 'Subject'),
              (v) => validators.maxLength(v, 100, 'Subject')
            )(value);
            return result.isValid ? true : result.error || '';
          },
          message: 'Subject must be between 3-100 characters',
        },
      ],
      message: [
        {
          validator: (value) => {
            const result = validators.composeValidators(
              (v) => validators.minLength(v, 10, 'Message'),
              (v) => validators.maxLength(v, 1000, 'Message')
            )(value);
            return result.isValid ? true : result.error || '';
          },
          message: 'Message must be between 10-1000 characters',
        },
      ],
    },
    onSubmit: handleFormSubmit,
  });

  const handleBlur = (field: keyof ContactFormState) => {
    baseHandleBlur({
      target: {
        name: field,
        value: formData[field as keyof typeof formData],
      },
    } as FocusEvent<HTMLInputElement | HTMLTextAreaElement>);
  };

  const handleChange =
    (field: keyof ContactFormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      baseHandleChange({
        target: {
          ...e.target,
          name: field,
          value: e.target.value,
        },
      } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    baseHandleSubmit(e);
  };

  const resetContactForm = () => {
    resetForm();
    setSubmitSuccess(false);
    setFormError(null);
  };

  return {
    formData,
    errors: errors as Record<keyof ContactFormState, string | undefined>,
    isSubmitting,
    submitSuccess,
    touched: touched as Record<keyof ContactFormState, boolean>,
    formError,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm: resetContactForm,
  };
}
