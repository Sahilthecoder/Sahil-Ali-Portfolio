import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export type FormValues = z.infer<typeof formSchema>;

export const FORM_DEFAULT_VALUES: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const FORM_ERROR_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  minLength: (length: number) => `Must be at least ${length} characters`,
  maxLength: (length: number) => `Must be less than ${length} characters`,
  somethingWentWrong: 'Something went wrong. Please try again.',
  submissionSuccess: 'Your message has been sent successfully!',
} as const;

export const FORM_LABELS = {
  name: 'Full Name',
  email: 'Email Address',
  subject: 'Subject',
  message: 'Your Message',
  submit: 'Send Message',
  submitting: 'Sending...',
} as const;
