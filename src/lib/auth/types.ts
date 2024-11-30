export interface LoginCredentials {
  email: string;
  password: string;
  role: 'jobseeker' | 'recruiter';
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  phone: string;
  city: string;
  country: string;
  company?: string;
  companySize?: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
  industry?: string;
}

export interface AuthError {
  message: string;
  field?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: AuthError;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'jobseeker' | 'recruiter';
  phone: string;
  city: string;
  country: string;
  company?: string;
  companySize?: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
  industry?: string;
  createdAt?: string;
  updatedAt?: string;
}