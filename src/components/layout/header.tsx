import { Button } from '@/components/ui/button';
import { BriefcaseIcon, UserIcon, BuildingIcon } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';

export function Header() {
  const { user, isAuthenticated, setUser } = useAuthStore();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <BriefcaseIcon className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">Cowema Jobs</span>
        </Link>

        {isAuthenticated ? (
          <>
            <nav className="hidden space-x-6 md:flex">
              {user?.role === 'recruiter' ? (
                <>
                  <Link href="/candidates/matches" className="text-gray-600 hover:text-gray-900">
                    Daily Talent Match
                  </Link>
                  <Link href="/candidates/find" className="text-gray-600 hover:text-gray-900">
                    Find Talent
                  </Link>
                  <Link href="/jobs/post" className="text-gray-600 hover:text-gray-900">
                    Post Job
                  </Link>
                  <Link href="/applications" className="text-gray-600 hover:text-gray-900">
                    Applications
                  </Link>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/matches" className="text-gray-600 hover:text-gray-900">
                    Daily Matches
                  </Link>
                  <Link href="/jobs/find" className="text-gray-600 hover:text-gray-900">
                    Find Jobs
                  </Link>
                  <Link href="/skills" className="text-gray-600 hover:text-gray-900">
                    Skills Assessment
                  </Link>
                  <Link href="/applications" className="text-gray-600 hover:text-gray-900">
                    Applications
                  </Link>
                  <Link href="/interviews" className="text-gray-600 hover:text-gray-900">
                    Interviews
                  </Link>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                </>
              )}
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/profile">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            <nav className="hidden space-x-6 md:flex">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About Us
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}