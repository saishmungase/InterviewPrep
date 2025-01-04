
import {PreviousInterviews } from '@/app/component/prev-interview'
import { SubmitForm } from '../component/submit-form'

export default function Dashboard() {

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Interview Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SubmitForm />
          <PreviousInterviews />
        </div>
      </main>
    </div>
  )
}

