import { Code, Users, CheckCircle } from 'lucide-react'
import Link from "next/link"
import { Navbar } from '@/app/component/navbar'
import { Hero } from '@/app/component/hero'

export default function InterviewPrepLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-black sm:text-4xl">
            Why Choose InterviewPrep?
          </h2>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Code className="h-8 w-8 text-black" />, title: "Technical Interviews", description: "Practice coding challenges and system design questions." },
              { icon: <Users className="h-8 w-8 text-black" />, title: "Behavioral Interviews", description: "Prepare for common behavioral questions and scenarios." },
              { icon: <CheckCircle className="h-8 w-8 text-black" />, title: "Mock Interviews", description: "Simulate real interview experiences with AI-powered feedback." },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-200">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-black">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-black sm:text-4xl mb-12">
            What Our Users Say
          </h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Alex Johnson", role: "Software Engineer at TechCorp", quote: "InterviewPrep helped me land my dream job. The practice questions were spot-on!" },
              { name: "Sarah Lee", role: "Product Manager", quote: "The behavioral interview prep was invaluable. I felt so much more confident during my interviews." },
              { name: "Michael Chen", role: "Data Scientist", quote: "The technical interview questions were challenging and really prepared me for the real thing." },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg">
                <p className="text-gray-800 italic mb-4">{testimonial.quote}</p>
                <div className="font-medium text-black">{testimonial.name}</div>
                <div className="text-gray-600">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">InterviewPrep</h3>
              <p className="text-gray-400">Helping you succeed in your career journey.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="#features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="#testimonials" className="text-gray-400 hover:text-white">Testimonials</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">support@interviewprep.com</p>
              <p className="text-gray-400">1-800-INTERVIEW</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2023 InterviewPrep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

