import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90" />
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Office"
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="container relative">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Find Your Dream Job in Congo-Brazzaville
          </h1>
          <p className="mb-8 text-xl text-blue-100">
            Connect with top employers and opportunities through our advanced skill-matching system. 
            Get matched with 7 relevant jobs daily based on your validated skills.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/jobs/find">Browse Jobs</Link>
            </Button>
          </div>
          
          <div className="mt-12 flex items-center space-x-8">
            <div>
              <div className="text-3xl font-bold">1,000+</div>
              <div className="text-blue-100">Active Jobs</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-blue-100">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-blue-100">Job Seekers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}