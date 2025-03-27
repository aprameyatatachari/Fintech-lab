import { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  mousePosition: { x: number; y: number };
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  animationDelay: number;
}

const ParallaxBackground = ({ mousePosition }: ParallaxBackgroundProps) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const starCount = 100;
      const newStars: Star[] = [];
      const colors = ['#FFFFFF', '#A9CCEC', '#D6C4FF'];
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.7 + 0.3,
          animationDelay: Math.random() * 5,
        });
      }
      setStars(newStars);
    };

    // Generate shooting stars periodically
    const generateShootingStars = () => {
      const newShootingStar = {
        id: Date.now(),
        x: Math.random() * 50,
        y: Math.random() * 50,
        size: Math.random() * 2 + 1,
        color: '#FFFFFF',
        opacity: 0.8,
        animationDelay: 0,
      };
      
      setShootingStars(prev => [...prev, newShootingStar]);
      
      // Remove the shooting star after animation completes
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, 3000);
    };

    generateStars();
    
    // Generate a shooting star every 2-4 seconds
    const intervalId = setInterval(() => {
      generateShootingStars();
    }, Math.random() * 2000 + 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-space-black via-space-blue to-space-purple"
        style={{
          transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
          transition: 'transform 0.1s ease',
        }}
      />
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkling"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
            transform: `translate(${mousePosition.x * (-5 - star.size * 3)}px, ${mousePosition.y * (-5 - star.size * 3)}px)`,
            transition: 'transform 0.2s ease',
          }}
        />
      ))}
      
      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute h-px w-20 animate-shooting-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: star.color,
            boxShadow: `0 0 4px ${star.color}`,
            opacity: star.opacity,
            transform: 'rotate(45deg)',
          }}
        />
      ))}
      
      {/* Additional nebula effects */}
      <div 
        className="absolute w-1/3 h-1/3 rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(229,178,43,0.3) 0%, rgba(229,178,43,0) 70%)',
          left: '15%',
          top: '30%',
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          transition: 'transform 0.5s ease',
        }}
      />
      
      <div 
        className="absolute w-1/2 h-1/2 rounded-full opacity-5 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(169,204,236,0.3) 0%, rgba(169,204,236,0) 70%)',
          right: '10%',
          top: '20%',
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: 'transform 0.4s ease',
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
