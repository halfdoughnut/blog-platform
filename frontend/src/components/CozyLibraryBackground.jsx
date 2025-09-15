import React, { useEffect, useRef } from 'react';

const CozyLibraryBackground = () => {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const createLibraryElements = () => {
      const container = containerRef.current;
      if (!container) return;

      container.innerHTML = '';

      // Create floating dust particles
      for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-dust';
        particle.style.position = 'absolute';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(251, 191, 36, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 25) + 's';
        container.appendChild(particle);
      }

      // Create floating book pages
      for (let i = 0; i < 15; i++) {
        const page = document.createElement('div');
        page.className = 'floating-page';
        page.style.position = 'absolute';
        page.style.width = (Math.random() * 8 + 4) + 'px';
        page.style.height = (Math.random() * 12 + 8) + 'px';
        page.style.backgroundColor = 'rgba(245, 245, 220, 0.4)';
        page.style.border = '1px solid rgba(245, 245, 220, 0.2)';
        page.style.left = Math.random() * 100 + '%';
        page.style.top = Math.random() * 100 + '%';
        page.style.animationDelay = Math.random() * 30 + 's';
        page.style.animationDuration = (20 + Math.random() * 30) + 's';
        page.style.borderRadius = '1px';
        container.appendChild(page);
      }

      // Create light rays
      for (let i = 0; i < 8; i++) {
        const ray = document.createElement('div');
        ray.className = 'light-ray';
        ray.style.position = 'absolute';
        ray.style.width = '2px';
        ray.style.height = Math.random() * 200 + 100 + 'px';
        ray.style.background = 'linear-gradient(to bottom, rgba(251, 191, 36, 0.1), transparent)';
        ray.style.left = Math.random() * 100 + '%';
        ray.style.top = Math.random() * 50 + '%';
        ray.style.animationDelay = Math.random() * 10 + 's';
        ray.style.animationDuration = (8 + Math.random() * 12) + 's';
        ray.style.transformOrigin = 'top center';
        container.appendChild(ray);
      }
    };

    createLibraryElements();

    // Mouse parallax effect
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Update parallax elements
    const updateParallax = () => {
      if (parallaxRef.current) {
        const transform = `translate(${mouseX * 5}px, ${mouseY * 5}px)`;
        parallaxRef.current.style.transform = transform;
      }

      const particles = containerRef.current?.querySelectorAll('.floating-dust') || [];
      particles.forEach((particle, i) => {
        const factor = (i % 3 + 1) * 0.3;
        const translateX = mouseX * factor * 10;
        const translateY = mouseY * factor * 10;
        particle.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });

      requestAnimationFrame(updateParallax);
    };
    
    updateParallax();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* CSS Keyframes for animations */}
      <style jsx>{`
        @keyframes floatDust {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translate(-30px, -40px) rotate(90deg);
            opacity: 0.7;
          }
          50% {
            transform: translate(25px, -20px) rotate(180deg);
            opacity: 0.4;
          }
          75% {
            transform: translate(-15px, 30px) rotate(270deg);
            opacity: 0.6;
          }
        }
        
        @keyframes floatPage {
          0%, 100% {
            transform: translate(0px, 0px) rotate(0deg);
            opacity: 0.4;
          }
          33% {
            transform: translate(-20px, -30px) rotate(5deg);
            opacity: 0.6;
          }
          66% {
            transform: translate(15px, -15px) rotate(-3deg);
            opacity: 0.3;
          }
        }
        
        @keyframes lightRays {
          0%, 100% {
            opacity: 0.1;
            transform: scaleY(1) rotate(0deg);
          }
          50% {
            opacity: 0.3;
            transform: scaleY(1.2) rotate(2deg);
          }
        }
        
        @keyframes subtleGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(251, 191, 36, 0.2);
          }
        }
        
        .floating-dust {
          animation: floatDust infinite linear;
          filter: blur(0.5px);
        }
        
        .floating-page {
          animation: floatPage infinite ease-in-out;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .light-ray {
          animation: lightRays infinite ease-in-out;
          filter: blur(1px);
        }
        
        .library-shelf {
          background: linear-gradient(
            180deg,
            rgba(139, 69, 19, 0.1) 0%,
            rgba(101, 67, 33, 0.15) 50%,
            rgba(139, 69, 19, 0.1) 100%
          );
          border: 1px solid rgba(139, 69, 19, 0.2);
          animation: subtleGlow 8s ease-in-out infinite;
        }
      `}</style>

      {/* Main background container */}
      <div 
        className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(139, 69, 19, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(101, 67, 33, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #1c1917 0%, #292524 20%, #1f2937 40%, #374151 60%, #1f2937 80%, #1c1917 100%)
          `,
          zIndex: -1
        }}
      >
        {/* Parallax layer */}
        <div ref={parallaxRef} className="absolute inset-0">
          {/* Bookshelf silhouettes */}
          <div className="absolute bottom-0 left-0 w-full h-3/4 opacity-20">
            {/* Left bookshelf */}
            <div 
              className="absolute left-0 top-0 w-1/5 h-full library-shelf"
              style={{
                background: 'linear-gradient(90deg, rgba(139, 69, 19, 0.3) 0%, rgba(139, 69, 19, 0.1) 100%)',
                clipPath: 'polygon(0 0, 90% 0, 95% 100%, 0 100%)'
              }}
            />
            
            {/* Right bookshelf */}
            <div 
              className="absolute right-0 top-0 w-1/5 h-full library-shelf"
              style={{
                background: 'linear-gradient(90deg, rgba(139, 69, 19, 0.1) 0%, rgba(139, 69, 19, 0.3) 100%)',
                clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 5% 100%)'
              }}
            />
            
            {/* Center bookshelf (background) */}
            <div 
              className="absolute left-1/4 top-10 w-1/2 h-4/5 library-shelf opacity-60"
              style={{
                background: 'linear-gradient(90deg, rgba(139, 69, 19, 0.05) 0%, rgba(139, 69, 19, 0.15) 50%, rgba(139, 69, 19, 0.05) 100%)',
                borderRadius: '0 0 10px 10px'
              }}
            />
            
            {/* Window light effect */}
            <div 
              className="absolute left-1/2 top-0 w-1/3 h-2/3 opacity-30"
              style={{
                background: 'radial-gradient(ellipse at center top, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
                transform: 'translateX(-50%)'
              }}
            />
          </div>
          
          {/* Floor reflection */}
          <div 
            className="absolute bottom-0 left-0 w-full h-1/4 opacity-40"
            style={{
              background: 'linear-gradient(to top, rgba(139, 69, 19, 0.1) 0%, transparent 100%)'
            }}
          />
        </div>

        {/* Animated elements container */}
        <div ref={containerRef} className="absolute inset-0" />
        
        {/* Subtle vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.3) 100%)'
          }}
        />
      </div>
    </>
  );
};

export default CozyLibraryBackground;
