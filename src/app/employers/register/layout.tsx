export default function EmployerLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen flex">
        {/* Left side - Hero/Welcome section */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-r from-blue-800 to-blue-600">
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/images/employer-hero.jpg')",
                opacity: 0.6
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative w-full flex flex-col justify-center px-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Grow Your Team
            </h1>
            <p className="text-xl text-gray-200">
              Connect with talented students and build your future workforce
            </p>
          </div>
        </div>
  
        {/* Right side - Registration form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 py-12">
          <div className="w-full max-w-2xl">
            {children}
          </div>
        </div>
      </div>
    );
  }