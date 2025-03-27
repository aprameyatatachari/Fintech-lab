import { Routes, Route } from 'react-router';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import CustomersList from './pages/CustomersList';
import CustomerDetails from './pages/CustomerDetails';
import CustomerFormContainer from './pages/CustomerForm/CustomerFormContainer';
import ParallaxBackground from './components/ParallaxBackground';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) - 0.5,
        y: (event.clientY / window.innerHeight) - 0.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app-container min-h-screen font-sans text-white relative">
      <ParallaxBackground mousePosition={mousePosition} />
      <div className="relative z-10 w-full min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/customers/view" element={<CustomersList />} />
            <Route path="/customers/view/:id" element={<CustomerDetails />} />
            <Route path="/customers/create/*" element={<CustomerFormContainer />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
