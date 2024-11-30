import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './config';
import type { JobPosting } from '@/lib/types';

export interface DashboardStats {
  activeJobs: number;
  totalCandidates: number;
  interviewsScheduled: number;
  averageTimeToHire: string;
  activeApplications: number;
  validatedSkills: number;
  profileViews: number;
  profileStrength: number;
}

export interface RecentApplication {
  id: string;
  candidateName: string;
  jobTitle: string;
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
}

export async function getRecruiterDashboardData(userId: string) {
  try {
    // Get active jobs
    const jobsQuery = query(
      collection(db, 'jobs'),
      where('recruiterId', '==', userId),
      where('status', '==', 'active')
    );
    const jobsSnapshot = await getDocs(jobsQuery);
    const jobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Get recent applications
    const applicationsQuery = query(
      collection(db, 'applications'),
      where('recruiterId', '==', userId),
      orderBy('appliedDate', 'desc'),
      limit(5)
    );
    const applicationsSnapshot = await getDocs(applicationsQuery);
    const applications = applicationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get interviews count
    const interviewsQuery = query(
      collection(db, 'interviews'),
      where('recruiterId', '==', userId),
      where('status', '==', 'scheduled')
    );
    const interviewsSnapshot = await getDocs(interviewsQuery);

    // Calculate stats
    const stats: DashboardStats = {
      activeJobs: jobs.length,
      totalCandidates: applications.length,
      interviewsScheduled: interviewsSnapshot.size,
      averageTimeToHire: '21 days', // This would need more complex calculation in production
      activeApplications: 0,
      validatedSkills: 0,
      profileViews: 0,
      profileStrength: 0,
    };

    return {
      stats,
      recentJobs: jobs as JobPosting[],
      recentApplications: applications as RecentApplication[],
    };
  } catch (error) {
    console.error('Error fetching recruiter dashboard data:', error);
    throw error;
  }
}

export async function getJobSeekerDashboardData(userId: string) {
  try {
    // Get active applications
    const applicationsQuery = query(
      collection(db, 'applications'),
      where('jobSeekerId', '==', userId),
      orderBy('appliedDate', 'desc')
    );
    const applicationsSnapshot = await getDocs(applicationsQuery);
    const applications = applicationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get validated skills
    const skillsQuery = query(
      collection(db, 'skills'),
      where('userId', '==', userId),
      where('isValidated', '==', true)
    );
    const skillsSnapshot = await getDocs(skillsQuery);

    // Get job matches
    const matchesQuery = query(
      collection(db, 'jobMatches'),
      where('jobSeekerId', '==', userId),
      orderBy('matchScore', 'desc'),
      limit(5)
    );
    const matchesSnapshot = await getDocs(matchesQuery);
    const matches = matchesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Calculate stats
    const stats: DashboardStats = {
      activeApplications: applications.filter(app => 
        ['pending', 'reviewing', 'shortlisted'].includes(app.status)
      ).length,
      validatedSkills: skillsSnapshot.size,
      profileViews: 28, // This would need analytics integration in production
      profileStrength: 75, // This would be calculated based on profile completion
      activeJobs: 0,
      totalCandidates: 0,
      interviewsScheduled: 0,
      averageTimeToHire: '',
    };

    return {
      stats,
      applications: applications as RecentApplication[],
      jobMatches: matches as JobPosting[],
    };
  } catch (error) {
    console.error('Error fetching job seeker dashboard data:', error);
    throw error;
  }
}