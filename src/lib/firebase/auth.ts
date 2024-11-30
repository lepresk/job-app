import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../auth/types';

export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
  try {
    // Create user in Firebase Auth
    const { user } = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    // Update user profile with name
    await updateProfile(user, {
      displayName: credentials.name
    });

    // Send email verification
    await sendEmailVerification(user);

    // Create base profile with required fields
    const baseProfile = {
      uid: user.uid,
      name: credentials.name,
      email: credentials.email,
      role: credentials.role,
      phone: credentials.phone,
      city: credentials.city,
      country: credentials.country,
      emailVerified: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Add recruiter-specific fields only if the role is recruiter
    const userProfile = credentials.role === 'recruiter'
      ? {
          ...baseProfile,
          company: credentials.company || null,
          companySize: credentials.companySize || null,
          industry: credentials.industry || null,
        }
      : baseProfile;

    await setDoc(doc(db, 'users', user.uid), userProfile);

    return {
      success: true,
      user: {
        id: user.uid,
        ...userProfile,
      },
      message: 'Please check your email to verify your account',
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: {
        message: error.message || 'An error occurred during registration',
      },
    };
  }
}

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    if (!user.emailVerified) {
      throw new Error('Please verify your email before logging in');
    }

    const userProfile = await getUserProfile(user);

    if (!userProfile) {
      throw new Error('User profile not found');
    }

    // Update email verification status in Firestore
    if (userProfile.emailVerified !== user.emailVerified) {
      await setDoc(doc(db, 'users', user.uid), 
        { emailVerified: user.emailVerified, updatedAt: serverTimestamp() }, 
        { merge: true }
      );
    }

    return {
      success: true,
      user: {
        ...userProfile,
        emailVerified: user.emailVerified,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message || 'Invalid email or password',
      },
    };
  }
}

export async function resendVerificationEmail(user: FirebaseUser) {
  try {
    await sendEmailVerification(user);
    return { 
      success: true,
      message: 'Verification email sent successfully' 
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message || 'Failed to send verification email',
      },
    };
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message,
      },
    };
  }
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message,
      },
    };
  }
}

export async function getUserProfile(user: FirebaseUser) {
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      return {
        id: user.uid,
        ...userDoc.data(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}