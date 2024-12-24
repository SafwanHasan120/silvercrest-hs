import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Silvercrest High
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 