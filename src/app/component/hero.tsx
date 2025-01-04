import Link from "next/link"



export const Hero = () => {
    
    return <section className="bg-black text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        Ace Your Next Interview
      </h1>
      <p className="mt-6 text-xl max-w-2xl mx-auto text-gray-300">
        Prepare for your dream job with our comprehensive interview preparation platform. Practice, learn, and succeed.
      </p>
      <div className="mt-10">
        <Link href={'/dashboard'} className="bg-white p-2 font-bold rounded-lg text-black hover:bg-gray-200">
          Start Practicing Now
        </Link> 
      </div>
    </div>
  </section>
}