import { useAuthStore } from '@/lib/store';
import { JobSeekerHeroSection } from '@/components/home/job-seeker-hero-section';
import { JobSeekerFeatures } from '@/components/home/job-seeker-features';
import { RecruiterHeroSection } from '@/components/home/recruiter-hero-section';
import { RecruiterFeatures } from '@/components/home/recruiter-features';
import { RecentJobsSection } from '@/components/home/recent-jobs-section';
import { Footer } from '@/components/layout/footer';

export function HomePage() {
  const { user } = useAuthStore();

  const isRecruiter = user?.role === 'recruiter';

  return (
    <>
      <main>
        {isRecruiter ? (
          <>
            <RecruiterHeroSection />
            <RecruiterFeatures />
          </>
        ) : (
          <>
            <JobSeekerHeroSection />
            <JobSeekerFeatures />
            <RecentJobsSection />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}