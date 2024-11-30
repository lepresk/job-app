import { UsersIcon, SparklesIcon, ClockIcon, BarChart } from 'lucide-react';

const features = [
  {
    icon: UsersIcon,
    title: 'Daily Talent Matches',
    description: 'Receive 7 pre-screened candidates daily for each job posting, matched using our AI algorithm',
  },
  {
    icon: SparklesIcon,
    title: 'Validated Skills',
    description: 'All candidates complete skill assessments to ensure they meet your requirements',
  },
  {
    icon: ClockIcon,
    title: 'Efficient Hiring',
    description: 'Streamlined process with integrated interview scheduling and candidate tracking',
  },
  {
    icon: BarChart,
    title: 'Analytics & Insights',
    description: 'Detailed recruitment analytics to optimize your hiring process and decisions',
  },
];

export function RecruiterFeatures() {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold">Streamline Your Recruitment</h2>
          <p className="mx-auto mb-12 max-w-2xl text-gray-600">
            Our intelligent platform helps you find and hire the best talent quickly and efficiently.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 inline-block rounded-lg bg-purple-100 p-3 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
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