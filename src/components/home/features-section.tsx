import { SearchIcon, TrendingUpIcon, UsersIcon, ShieldCheckIcon } from 'lucide-react';

const features = [
  {
    icon: SearchIcon,
    title: 'Smart Matching',
    description: 'Get matched with 7 relevant job opportunities daily based on your validated skills',
  },
  {
    icon: TrendingUpIcon,
    title: 'Skill Validation',
    description: 'Quick 5-minute assessments to validate your skills and stand out to employers',
  },
  {
    icon: UsersIcon,
    title: 'Direct Connection',
    description: 'Connect directly with employers and streamline your job search process',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Verified Companies',
    description: 'All employers are verified to ensure legitimate job opportunities',
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold">Why Choose Cowema Jobs?</h2>
          <p className="mx-auto mb-12 max-w-2xl text-gray-600">
            Our platform is designed to make your job search more efficient and effective through 
            innovative features and technology.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 inline-block rounded-lg bg-blue-100 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}