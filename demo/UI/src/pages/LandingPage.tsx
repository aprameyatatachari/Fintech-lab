import { Link } from 'react-router';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center max-w-4xl mx-auto px-4 py-16">
        <h1 className="font-display text-6xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold-light via-gold to-gold-dark">
          Customer Portal
        </h1>
        <p className="text-xl md:text-2xl text-star-white/80 mb-12 max-w-2xl mx-auto">
          Fintech Lab, Aprameya Tatachari, 230958006
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            to="/customers/view" 
            className="px-8 py-4 rounded-lg font-medium text-lg bg-space-blue border-2 border-gold hover:bg-gold/10 transition-all transform hover:scale-105 shadow-lg shadow-gold/20"
          >
            View All Customers
          </Link>
          <Link 
            to="/customers/create" 
            className="px-8 py-4 rounded-lg font-medium text-lg bg-gold text-space-dark hover:bg-gold-light transition-all transform hover:scale-105 shadow-lg shadow-gold/30"
          >
            Create New Customer
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="animate-bounce text-gold/70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
