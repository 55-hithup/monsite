import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Track mouse coordinates globally
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1 range
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particleCount = 300;

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const initPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Position particles in a 3D box
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 7;
      const z = (Math.random() - 0.5) * 4;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;
    }
    return [pos, initPos];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    
    // Smooth lerp mouse coordinates
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      
      // Original positions
      const initX = initialPositions[idx];
      const initY = initialPositions[idx + 1];

      // Add a drift animation using sine/cosine based on time and index
      const angle = time * 0.15 + i * 0.05;
      const xDrift = Math.sin(angle) * 0.12;
      const yDrift = Math.cos(angle * 1.2) * 0.12;

      // Apply mouse influence
      const mouseInfluenceX = mouse.current.x * 0.4;
      const mouseInfluenceY = mouse.current.y * 0.4;

      positionsAttr.setX(i, initX + xDrift + mouseInfluenceX);
      positionsAttr.setY(i, initY + yDrift + mouseInfluenceY);
    }
    
    positionsAttr.needsUpdate = true;
    
    // Slowly rotate the overall system
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = time * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#2E8FE0"
        size={0.03}
        sizeAttenuation={true}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroWebGL() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none bg-[#0B0F1E]">
      {/* Background glow halos */}
      <div className="absolute top-[20%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-[#2E8FE0]/8 blur-[80px] md:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[30%] translate-x-1/2 translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-[#6B4FE0]/8 blur-[80px] md:blur-[130px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <Particles />
      </Canvas>
    </div>
  );
}
