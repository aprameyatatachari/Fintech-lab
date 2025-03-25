import React, { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  mousePosition: { x: number; y: number };
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ mousePosition }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Base black background */}
      <div className="absolute inset-0 bg-background-dark"></div>
      
      {/* Neon grid that moves with mouse position */}
      <div 
        className="absolute inset-0 neon-grid opacity-30"
        style={{
          transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20}px, 0)`,
          transition: 'transform 0.2s ease-out'
        }}
      ></div>
      
      {/* Abstract shapes that move with parallax */}
      <div 
        className="abstract-shape w-96 h-96 rounded-full bg-neon-blue/20"
        style={{
          left: '10%',
          top: '20%',
          transform: `translate3d(${mousePosition.x * -30}px, ${mousePosition.y * -30 - scrollPosition * 0.05}px, 0)`,
        }}
      ></div>
      
      <div 
        className="abstract-shape w-80 h-80 rounded-full bg-neon-purple/20"
        style={{
          right: '15%',
          top: '10%',
          transform: `translate3d(${mousePosition.x * -25}px, ${mousePosition.y * -25 - scrollPosition * 0.03}px, 0)`,
        }}
      ></div>
      
      <div 
        className="abstract-shape w-64 h-64 rounded-full bg-gold/10"
        style={{
          left: '20%',
          bottom: '10%',
          transform: `translate3d(${mousePosition.x * -40}px, ${mousePosition.y * -40 + scrollPosition * 0.02}px, 0)`,
        }}
      ></div>
      
      <div 
        className="abstract-shape w-56 h-56 rounded-full bg-neon-pink/15"
        style={{
          right: '25%',
          bottom: '20%',
          transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20 + scrollPosition * 0.04}px, 0)`,
        }}
      ></div>
      
      {/* Overlay with subtle dots pattern */}
      <div className="absolute inset-0 neon-dots opacity-30"></div>
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark/0 to-background-dark opacity-70"></div>
    </div>
  );
};

export default ParallaxBackground;