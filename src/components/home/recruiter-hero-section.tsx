import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function RecruiterHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-800 py-20 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-800/90" />
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Office Meeting"
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="container relative">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Find Top Talent in Congo-Brazzaville
          </h1>
          <p className="mb-8 text-xl text-purple-100">
            Receive 7 highly-matched candidates daily for each job posting. Our AI-powered platform 
            connects you with pre-validated talent that matches your requirements.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
              <Link href="/register">Post a Job</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/candidates/find">Browse Talent</Link>
            </Button>
          </div>
          
          <div className="mt-12 flex items-center space-x-8">
            <div>
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-purple-100">Validated Candidates</div>
            </div>
            <div>
              <div className="text-3xl font-bold">92%</div>
              <div className="text-purple-100">Match Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold">14 Days</div>
              <div className="text-purple-100">Avg. Time to Hire</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}