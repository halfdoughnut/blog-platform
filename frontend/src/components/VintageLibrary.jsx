import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Typewriter Sound Hook
const useTypewriterSound = () => {
  const [audioContext, setAudioContext] = useState(null);
  
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(ctx);
    
    return () => ctx.close();
  }, []);

  const playTypewriterSound = () => {
    if (!audioContext) return;
    
    // Create typewriter clicking sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  return playTypewriterSound;
};

// Detailed Bookshelf Component
function DetailedBookshelf() {
  const shelfRef = useRef();
  
  // Create detailed books with vintage colors
  const books = useMemo(() => {
    const vintageColors = [
      '#8B4513', '#A0522D', '#CD853F', '#DEB887', '#D2691E', '#F4A460',
      '#2F4F4F', '#708090', '#556B2F', '#8FBC8F', '#9ACD32', '#6B8E23',
      '#B22222', '#DC143C', '#A52A2A', '#800000', '#CD5C5C', '#F08080',
      '#191970', '#000080', '#0000CD', '#4169E1', '#1E90FF', '#6495ED'
    ];
    
    const bookTitles = [
      'Classic Literature', 'Poetry & Prose', 'Philosophy', 'History', 
      'Science & Nature', 'Art & Culture', 'Mathematics', 'Languages',
      'Memoirs', 'Essays', 'Biography', 'Ancient Texts', 'Modern Classics',
      'Literary Theory', 'World History', 'Natural Science'
    ];
    
    return Array.from({ length: 120 }, (_, i) => ({
      position: [
        ((i % 12) - 5.5) * 0.6,
        (Math.floor(i / 12) - 5) * 0.8,
        Math.random() * 0.1 - 0.05
      ],
      height: 0.6 + Math.random() * 0.4,
      width: 0.4 + Math.random() * 0.2,
      depth: 0.15 + Math.random() * 0.1,
      color: vintageColors[Math.floor(Math.random() * vintageColors.length)],
      title: bookTitles[Math.floor(Math.random() * bookTitles.length)],
      tilt: (Math.random() - 0.5) * 0.2
    }));
  }, []);

  useFrame((state) => {
    if (shelfRef.current) {
      // Subtle breathing animation
      const time = state.clock.elapsedTime;
      shelfRef.current.rotation.x = Math.sin(time * 0.1) * 0.02;
      shelfRef.current.position.y = Math.sin(time * 0.15) * 0.05;
    }
  });

  return (
    <group ref={shelfRef} position={[0, 0, -12]}>
      {/* Wooden shelves */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={`shelf-${i}`} position={[0, (i - 4) * 1.2, 0.5]}>
          <boxGeometry args={[16, 0.12, 2]} />
          <meshLambertMaterial color="#8B4513" />
        </mesh>
      ))}
      
      {/* Back wall */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[20, 15]} />
        <meshLambertMaterial color="#654321" />
      </mesh>
      
      {/* Books */}
      {books.map((book, i) => (
        <group key={i} position={book.position} rotation={[0, 0, book.tilt]}>
          {/* Book spine */}
          <mesh>
            <boxGeometry args={[book.width, book.height, book.depth]} />
            <meshLambertMaterial color={book.color} />
          </mesh>
          
          {/* Book pages */}
          <mesh position={[0, 0, book.depth * 0.3]}>
            <boxGeometry args={[book.width * 0.9, book.height * 0.95, book.depth * 0.8]} />
            <meshLambertMaterial color="#F5F5DC" />
          </mesh>
          
          {/* Subtle book title */}
          {i % 8 === 0 && (
            <Text
              position={[0, 0, book.depth * 0.7]}
              fontSize={0.06}
              color="#2F2F2F"
              anchorX="center"
              anchorY="middle"
              rotation={[0, 0, Math.PI / 2]}
            >
              {book.title}
            </Text>
          )}
        </group>
      ))}
      
      {/* Vintage desk items */}
      <group position={[-2.5, -3.5, 1]}>
        {/* Inkwell */}
        <mesh>
          <cylinderGeometry args={[0.1, 0.12, 0.15, 16]} />
          <meshLambertMaterial color="#2F4F4F" />
        </mesh>
        
        {/* Quill pen */}
        <mesh position={[0.3, 0.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.01, 0.02, 0.8, 8]} />
          <meshLambertMaterial color="#8B4513" />
        </mesh>
      </group>
      
      {/* Old books stack */}
      <group position={[2.8, -3.2, 0.8]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.1, 0.6]} />
          <meshLambertMaterial color="#A0522D" />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.7, 0.1, 0.55]} />
          <meshLambertMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.75, 0.1, 0.5]} />
          <meshLambertMaterial color="#CD853F" />
        </mesh>
      </group>
    </group>
  );
}

// Vintage Library Scene
function VintageLibraryScene() {
  const { scene } = useThree();
  
  useEffect(() => {
    // Warm, cozy fog
    scene.fog = new THREE.Fog(0x2F2F2F, 8, 25);
    
    // Set background to warm brown
    scene.background = new THREE.Color(0x3F3F3F);
  }, [scene]);

  return (
    <>
      {/* Warm ambient lighting */}
      <ambientLight intensity={0.3} color="#FFE4B5" />
      
      {/* Main warm directional light (simulating window light) */}
      <directionalLight
        position={[5, 6, 8]}
        intensity={1.2}
        color="#FFF8DC"
        castShadow
      />
      
      {/* Warm reading lamp effect */}
      <pointLight 
        position={[-3, -2, 3]} 
        color="#FFD700" 
        intensity={0.8} 
        distance={6}
      />
      
      {/* Cozy corner light */}
      <pointLight 
        position={[4, -1, 4]} 
        color="#F4A460" 
        intensity={0.6} 
        distance={8}
      />
      
      {/* Library components */}
      <DetailedBookshelf />
      
      {/* Vintage atmosphere particles */}
      <group>
        {Array.from({ length: 30 }, (_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 15
            ]}
          >
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshBasicMaterial color="#FFD700" opacity={0.1} transparent />
          </mesh>
        ))}
      </group>
    </>
  );
}

// Main Vintage Library Component
function VintageLibrary() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 75,
          near: 0.1,
          far: 1000 
        }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <VintageLibraryScene />
      </Canvas>
    </div>
  );
}

// Export both the component and the typewriter sound hook
export { useTypewriterSound };
export default VintageLibrary;
