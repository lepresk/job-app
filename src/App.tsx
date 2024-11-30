import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { VerifyEmailPage } from '@/pages/auth/verify-email';
import { ResetPasswordPage } from '@/pages/auth/reset-password';
import { JobSeekerDashboard } from '@/pages/dashboard/job-seeker';
import { RecruiterDashboard } from '@/pages/dashboard/recruiter';
import { JobSeekerProfilePage } from '@/pages/profile/job-seeker';
import { RecruiterProfilePage } from '@/pages/profile/recruiter';
import { EditProfilePage } from '@/pages/profile/edit';
import { PostJobPage } from '@/pages/jobs/post';
import { ManageJobsPage } from '@/pages/jobs/manage';
import { FindJobsPage } from '@/pages/jobs/find';
import { JobDetailsPage } from '@/pages/jobs/[id]';
import { CompanyProfilePage } from '@/pages/companies/[id]';
import { DailyMatchesPage } from '@/pages/matches/daily-matches';
import { DailyTalentMatchPage } from '@/pages/candidates/daily-matches';
import { FindTalentPage } from '@/pages/candidates/find';
import { SkillsPage } from '@/pages/skills';
import { InterviewsPage } from '@/pages/interviews';
import { InterviewCalendarPage } from '@/pages/interviews/calendar';
import { ToastProvider, ToastViewport } from './components/ui/toast';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuthStore } from '@/lib/store';
import ApplicationsPage from '@/pages/applications';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/jobs/:id" element={<JobDetailsPage />} />
              <Route path="/companies/:id" element={<CompanyProfilePage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute 
                    isAuthenticated={isAuthenticated}
                    requiredRole={user?.role}
                  >
                    {user?.role === 'jobseeker' ? (
                      <JobSeekerDashboard />
                    ) : (
                      <RecruiterDashboard />
                    )}
                  </ProtectedRoute>
                }
              />

              {/* Job Seeker Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute 
                    isAuthenticated={isAuthenticated}
                    requiredRole="jobseeker"
                  >
                    <JobSeekerProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/matches"
                element={
                  <ProtectedRoute 
                    isAuthenticated={isAuthenticated}
                    requiredRole="jobseeker"
                  >
                    <DailyMatchesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/find"
                element={
                  <ProtectedRoute 
                    isAuthenticated={isAuthenticated}
                    requiredRole="jobseeker"
                  >
                    <FindJobsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/skills"
                element={
                  <ProtectedRoute 
                    isAuthenticated={isAuthenticated}
                    requiredRole="jobseeker"
                  >
                    <SkillsPage />
                  </ProtectedRoute>
                }
              />

              {/* Recruiter Routes */}
              <Route
                path="/profile/company"
                element={
                  <ProtectedRoute 
                    isAuthenticated={isAuthenticated}
                    requiredRole="recruiter"
                  >
                    <RecruiterProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/post"
                element={
                  <ProtectedRoute 
                    isAuthenticated={isAuthenticated}
                    requiredRole="recruiter"
                  >
                    <PostJobPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/manage"
                element={
                  <ProtectedRoute 
                    isAuthenticated={isAuthenticated}
                    requiredRole="recruiter"
                  >
                    <ManageJobsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidates/matches"
                element={
                  <ProtectedRoute 
                    isAuthenticated={isAuthenticated}
                    requiredRole="recruiter"
                  >
                    <DailyTalentMatchPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidates/find"
                element={
                  <ProtectedRoute 
                    isAuthenticated={isAuthenticated}
                    requiredRole="recruiter"
                  >
                    <FindTalentPage />
                  </ProtectedRoute>
                }
              />

              {/* Common Protected Routes */}
              <Route
                path="/profile/edit"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <EditProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ApplicationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interviews"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <InterviewsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interviews/calendar"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <InterviewCalendarPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
        <ToastViewport />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;