import type { LoginCredentials, AuthResponse } from './types';
import { validateCredentials } from './validation';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isValid = validateCredentials(credentials.email, credentials.password, credentials.role);

    if (!isValid) {
      return {
        success: false,
        error: {
          message: 'Invalid email or password',
        },
      };
    }

    // Mock user data based on role
    const userData = {
      id: Math.random().toString(),
      email: credentials.email,
      name: credentials.role === 'recruiter' ? 'Recruiter Name' : 'Job Seeker Name',
      role: credentials.role,
      phone: '+242 XX XXX XXXX',
      city: 'Brazzaville',
      country: 'Congo',
      ...(credentials.role === 'recruiter' && {
        company: 'Demo Company',
        companySize: '11-50' as const,
        industry: 'Technology',
      }),
    };

    // Validate role-specific credentials
    if (credentials.role === 'jobseeker' && credentials.email !== 'jobseeker@example.com') {
      return {
        success: false,
        error: {
          message: 'Invalid job seeker credentials',
        },
      };
    }

    if (credentials.role === 'recruiter' && credentials.email !== 'recruiter@company.com') {
      return {
        success: false,
        error: {
          message: 'Invalid recruiter credentials',
        },
      };
    }

    return {
      success: true,
      user: userData,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: 'An error occurred during login',
      },
    };
  }
};