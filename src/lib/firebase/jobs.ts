import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  DocumentSnapshot,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './config';

export interface JobSkill {
  id: string;
  name: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsRequired: string;
}

export interface JobPosting {
  id?: string;
  recruiterId: string;
  company: string;
  title: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  workplaceType: 'on-site' | 'hybrid' | 'remote';
  description: string;
  responsibilities: string;
  requirements: string;
  skills: JobSkill[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  benefits: string[];
  status: 'active' | 'closed' | 'draft';
  searchKeywords?: string[];
  createdAt: any;
  updatedAt: any;
}

export interface JobSearchFilters {
  keyword?: string;
  location?: string;
  type?: string;
  workplaceType?: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
}

export interface JobSearchResult {
  jobs: JobPosting[];
  lastDoc: QueryDocumentSnapshot | null;
  hasMore: boolean;
}

export async function getSkills() {
  try {
    const skillsRef = collection(db, 'skills');
    const snapshot = await getDocs(skillsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
}

export async function getCommonBenefits() {
  try {
    const benefitsRef = collection(db, 'benefits');
    const snapshot = await getDocs(benefitsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching benefits:', error);
    throw error;
  }
}

export async function createJob(jobData: Omit<JobPosting, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const searchKeywords = generateSearchKeywords(jobData);
    const docRef = await addDoc(collection(db, 'jobs'), {
      ...jobData,
      searchKeywords,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
}

export async function updateJob(jobId: string, jobData: Partial<JobPosting>) {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, {
      ...jobData,
      searchKeywords: generateSearchKeywords(jobData as JobPosting),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
}

export async function updateJobStatus(jobId: string, status: 'active' | 'closed' | 'draft') {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating job status:', error);
    throw error;
  }
}

export async function deleteJob(jobId: string) {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await deleteDoc(jobRef);
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
}

export async function getRecruiterJobs(recruiterId: string) {
  try {
    const jobsRef = collection(db, 'jobs');
    const q = query(
      jobsRef,
      where('recruiterId', '==', recruiterId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as JobPosting[];
  } catch (error) {
    console.error('Error fetching recruiter jobs:', error);
    throw error;
  }
}

export async function searchJobs(
  filters: JobSearchFilters,
  pageSize = 10,
  startAfterDoc?: DocumentSnapshot
): Promise<JobSearchResult> {
  try {
    let q = query(collection(db, 'jobs'), where('status', '==', 'active'));

    // Apply filters
    if (filters.location) {
      q = query(q, where('location', '==', filters.location));
    }
    if (filters.type) {
      q = query(q, where('type', '==', filters.type));
    }
    if (filters.workplaceType) {
      q = query(q, where('workplaceType', '==', filters.workplaceType));
    }
    if (filters.experienceLevel) {
      q = query(q, where('experienceLevel', '==', filters.experienceLevel));
    }
    if (filters.keyword) {
      q = query(q, where('searchKeywords', 'array-contains', filters.keyword.toLowerCase()));
    }
    if (filters.salaryMin) {
      q = query(q, where('salary.min', '>=', filters.salaryMin));
    }
    if (filters.salaryMax) {
      q = query(q, where('salary.max', '<=', filters.salaryMax));
    }
    if (filters.skills?.length) {
      q = query(q, where('skills', 'array-contains-any', filters.skills));
    }

    // Add pagination
    q = query(q, orderBy('createdAt', 'desc'), limit(pageSize));
    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }

    const snapshot = await getDocs(q);
    const jobs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as JobPosting[];

    return {
      jobs,
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
      hasMore: snapshot.docs.length === pageSize,
    };
  } catch (error) {
    console.error('Error searching jobs:', error);
    throw error;
  }
}

function generateSearchKeywords(job: Omit<JobPosting, 'id' | 'createdAt' | 'updatedAt'>) {
  const keywords = new Set<string>();
  
  // Add title words
  job.title.toLowerCase().split(/\s+/).forEach(word => keywords.add(word));
  
  // Add company name words
  job.company.toLowerCase().split(/\s+/).forEach(word => keywords.add(word));
  
  // Add location
  keywords.add(job.location.toLowerCase());
  
  // Add skills
  job.skills.forEach(skill => {
    keywords.add(skill.name.toLowerCase());
    keywords.add(skill.experienceLevel.toLowerCase());
  });
  
  // Add experience level
  keywords.add(job.experienceLevel.toLowerCase());
  
  // Add job type and workplace type
  keywords.add(job.type.toLowerCase());
  keywords.add(job.workplaceType.toLowerCase());
  
  // Add benefits
  job.benefits.forEach(benefit => {
    benefit.toLowerCase().split(/\s+/).forEach(word => keywords.add(word));
  });
  
  // Add salary range keywords
  keywords.add(`salary-${job.salary.currency.toLowerCase()}`);
  keywords.add(`min-${job.salary.min}`);
  keywords.add(`max-${job.salary.max}`);
  
  return Array.from(keywords);
}