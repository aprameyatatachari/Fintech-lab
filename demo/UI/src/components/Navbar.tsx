import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const location = useLocation();
  
  // Don't show navbar on the landing page
  if (location.pathname === '/') {
    return null;
  }
  
  return (
    <nav className="backdrop-blur-md bg-space-dark/70 border-b border-gold/30 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-display text-2xl font-bold text-gold hover:text-gold-light transition-colors">
          <span className="text-white">Customer</span>Portal
        </Link>
        
        <div className="flex space-x-6">
          <Link 
            to="/customers/view" 
            className={`font-medium transition-colors ${
              location.pathname.includes('/customers/view') 
                ? 'text-gold' 
                : 'text-white hover:text-gold-light'
            }`}
          >
            View Customers
          </Link>
          <Link 
            to="/customers/create" 
            className={`font-medium transition-colors ${
              location.pathname.includes('/customers/create') 
                ? 'text-gold' 
                : 'text-white hover:text-gold-light'
            }`}
          >
            Create Customer
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
