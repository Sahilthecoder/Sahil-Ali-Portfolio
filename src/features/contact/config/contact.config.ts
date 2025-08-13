export const BACKGROUND_IMAGES = [
  {
    url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    alt: 'Professional workspace with laptop and notebook',
    credit: 'Photo by fauxels from Pexels',
  },
  {
    url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    alt: 'Modern office space with clean design',
    credit: 'Photo by Pixabay from Pexels',
  },
  {
    url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    alt: 'Team collaboration in a modern office',
    credit: 'Photo by fauxels from Pexels',
  },
] as const;

export const CONTACT_METHODS = [
  {
    id: 'email',
    icon: 'FiMail',
    label: 'Email',
    getHref: (email: string) => `mailto:${email}`,
    getText: (email: string) => email,
  },
  {
    id: 'phone',
    icon: 'FiPhone',
    label: 'Phone',
    getHref: (phone: string) => `tel:${phone}`,
    getText: (phone: string) => phone,
  },
  {
    id: 'github',
    icon: 'FiGithub',
    label: 'GitHub',
    getHref: (url: string) => url,
    getText: () => 'GitHub',
  },
  {
    id: 'linkedin',
    icon: 'FiLinkedin',
    label: 'LinkedIn',
    getHref: (url: string) => url,
    getText: () => 'LinkedIn',
  },
] as const;
