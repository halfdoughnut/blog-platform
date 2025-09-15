import React, { useEffect, useRef } from 'react';

const KawaiiLibraryBackground = () => {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const createKawaiiElements = () => {
      const container = containerRef.current;
      if (!container) return;

      container.innerHTML = '';

      // Kawaii book colors and faces
      const kawaiiColors = [
        { bg: '#FFB6C1', face: '(◕‿◕)', shadow: '#FF69B4' }, // Pink
        { bg: '#87CEEB', face: '(｡◕‿◕｡)', shadow: '#4682B4' }, // Sky blue
        { bg: '#98FB98', face: '(◕ω◕)', shadow: '#32CD32' }, // Light green
        { bg: '#DDA0DD', face: '(◕‿◕)♡', shadow: '#9370DB' }, // Plum
        { bg: '#F0E68C', face: '(^‿^)', shadow: '#DAA520' }, // Khaki
        { bg: '#FFA07A', face: '(◡‿◡)', shadow: '#FF4500' }, // Light salmon
      ];

      // Create floating kawaii books
      for (let i = 0; i < 20; i++) {
        const bookContainer = document.createElement('div');
        bookContainer.className = 'kawaii-book-container';
        bookContainer.style.position = 'absolute';
        bookContainer.style.left = Math.random() * 100 + '%';
        bookContainer.style.top = Math.random() * 100 + '%';
        bookContainer.style.animationDelay = Math.random() * 15 + 's';
        bookContainer.style.animationDuration = (10 + Math.random() * 20) + 's';

        const book = document.createElement('div');
        book.className = 'kawaii-book';
        const colorData = kawaiiColors[Math.floor(Math.random() * kawaiiColors.length)];
        
        const bookSize = 30 + Math.random() * 20;
        book.style.width = bookSize + 'px';
        book.style.height = bookSize * 1.3 + 'px';
        book.style.backgroundColor = colorData.bg;
        book.style.border = '2px solid ' + colorData.shadow;
        book.style.borderRadius = '4px';
        book.style.position = 'relative';
        book.style.boxShadow = `3px 3px 8px ${colorData.shadow}40`;
        book.style.cursor = 'pointer';

        // Add kawaii face
        const face = document.createElement('div');
        face.className = 'kawaii-face';
        face.innerHTML = colorData.face;
        face.style.position = 'absolute';
        face.style.top = '30%';
        face.style.left = '50%';
        face.style.transform = 'translate(-50%, -50%)';
        face.style.fontSize = (bookSize / 4) + 'px';
        face.style.color = colorData.shadow;
        face.style.fontWeight = 'bold';
        face.style.textShadow = '1px 1px 2px rgba(255,255,255,0.8)';

        // Add sparkles
        const sparkle = document.createElement('div');
        sparkle.className = 'book-sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.top = '-10px';
        sparkle.style.right = '-10px';
        sparkle.style.fontSize = (bookSize / 5) + 'px';
        sparkle.style.animation = 'sparkleAnimation 2s ease-in-out infinite';

        book.appendChild(face);
        book.appendChild(sparkle);
        bookContainer.appendChild(book);
        container.appendChild(bookContainer);
      }

      // Create kawaii hearts
      for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'kawaii-heart';
        heart.innerHTML = '💖';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (10 + Math.random() * 15) + 'px';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.animationDuration = (8 + Math.random() * 12) + 's';
        container.appendChild(heart);
      }

      // Create kawaii stars
      for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.className = 'kawaii-star';
        star.innerHTML = ['⭐', '🌟', '✨', '🎀', '🌸'][Math.floor(Math.random() * 5)];
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = (8 + Math.random() * 10) + 'px';
        star.style.animationDelay = Math.random() * 20 + 's';
        star.style.animationDuration = (15 + Math.random() * 25) + 's';
        container.appendChild(star);
      }
    };

    createKawaiiElements();

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Update elements based on mouse
    const updateKawaiiElements = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate(${mouseX * 3}px, ${mouseY * 3}px)`;
      }

      const books = containerRef.current?.querySelectorAll('.kawaii-book-container') || [];
      books.forEach((book, i) => {
        const factor = (i % 4 + 1) * 0.2;
        const translateX = mouseX * factor * 8;
        const translateY = mouseY * factor * 8;
        const rotation = mouseX * factor * 5;
        book.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`;
      });

      requestAnimationFrame(updateKawaiiElements);
    };
    
    updateKawaiiElements();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Kawaii CSS Animations */}
      <style jsx>{`
        @keyframes kawaiiFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-20px) rotate(5deg) scale(1.05);
          }
          50% {
            transform: translateY(-10px) rotate(-3deg) scale(1.1);
          }
          75% {
            transform: translateY(-25px) rotate(2deg) scale(1.03);
          }
        }
        
        @keyframes kawaiiBounce {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.1);
          }
        }
        
        @keyframes kawaiiPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes sparkleAnimation {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: rotate(180deg) scale(1.3);
            opacity: 1;
          }
        }
        
        @keyframes kawaiiWiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        
        .kawaii-book-container {
          animation: kawaiiFloat infinite ease-in-out;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .kawaii-book {
          transition: all 0.3s ease;
          animation: kawaiiWiggle 4s ease-in-out infinite;
        }
        
        .kawaii-book:hover {
          transform: scale(1.2) rotate(5deg) !important;
          filter: brightness(1.2);
        }
        
        .kawaii-face {
          animation: kawaiiPulse 3s ease-in-out infinite;
        }
        
        .kawaii-heart {
          animation: kawaiiBounce infinite ease-in-out, kawaiiPulse 2s ease-in-out infinite;
        }
        
        .kawaii-star {
          animation: kawaiiFloat infinite linear, sparkleAnimation 3s ease-in-out infinite;
        }
        
        .book-sparkle {
          animation: sparkleAnimation 2s ease-in-out infinite;
        }
      `}</style>

      {/* Kawaii Background Container */}
      <div 
        className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 182, 193, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(135, 206, 235, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(152, 251, 152, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, 
              #fef7ff 0%, 
              #f0f9ff 25%, 
              #ecfdf5 50%, 
              #fef3c7 75%, 
              #fef7ff 100%
            )
          `,
          zIndex: -1
        }}
      >
        {/* Parallax layer */}
        <div ref={parallaxRef} className="absolute inset-0">
          {/* Kawaii clouds */}
          <div 
            className="absolute top-10 left-10 w-20 h-12 opacity-30"
            style={{
              background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
              borderRadius: '50px',
              animation: 'kawaiiFloat 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute top-16 right-20 w-16 h-8 opacity-25"
            style={{
              background: 'radial-gradient(ellipse, rgba(255, 182, 193, 0.6) 0%, transparent 70%)',
              borderRadius: '50px',
              animation: 'kawaiiFloat 12s ease-in-out infinite reverse'
            }}
          />
          
          {/* Kawaii rainbow */}
          <div 
            className="absolute top-5 left-1/2 w-40 h-20 opacity-20"
            style={{
              background: 'linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)',
              borderRadius: '100px 100px 0 0',
              transform: 'translateX(-50%)',
              animation: 'kawaiiPulse 6s ease-in-out infinite'
            }}
          />
        </div>

        {/* Animated elements container */}
        <div ref={containerRef} className="absolute inset-0" />
        
        {/* Kawaii border decoration */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            border: '3px solid rgba(255, 182, 193, 0.2)',
            borderRadius: '20px',
            margin: '10px',
            background: 'linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
          }}
        />
      </div>
    </>
  );
};

export default KawaiiLibraryBackground;
