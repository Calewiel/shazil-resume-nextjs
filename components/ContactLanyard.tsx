'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useGLTF, Text, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
}

function ContactCard({ position }: { position: [number, number, number] }) {
  const cardRef = useRef<RapierRigidBody>(null);
  const [hovered, setHovered] = useState(false);
  
  // Try to load your GLB file, fallback to basic geometry
  let cardModel;
  try {
    cardModel = useGLTF('/assets/card.glb');
  } catch (error) {
    console.log('GLB file not found, using basic geometry');
  }

  useFrame((state) => {
    if (cardRef.current && hovered) {
      // Gentle swing animation when hovered
      const time = state.clock.getElapsedTime();
      cardRef.current.setRotation({ x: 0, y: Math.sin(time * 2) * 0.1, z: 0 }, false);
    }
  });

  const handleClick = (contactType: string, value: string) => {
    switch(contactType) {
      case 'email':
        window.open(`mailto:${value}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${value.replace(/\D/g, '')}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://linkedin.com/${value}`, '_blank');
        break;
      case 'website':
        window.open(`https://${value}`, '_blank');
        break;
    }
  };

  return (
    <RigidBody
      ref={cardRef}
      position={position}
      type="dynamic"
      colliders="cuboid"
      restitution={0.2}
      friction={0.7}
    >
      {/* Card Background */}
      {cardModel ? (
        <primitive object={cardModel.scene} scale={[1, 1, 1]} />
      ) : (
        <mesh
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <boxGeometry args={[4.5, 2.8, 0.08]} />
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.1}
            metalness={0.05}
            transparent
            opacity={0.95}
          />
        </mesh>
      )}
      
      {/* Card shadow/border */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[4.6, 2.9, 0.02]} />
        <meshStandardMaterial color="#e8e8e8" />
      </mesh>
      
      {/* Header Section */}
      <Text
        position={[0, 1.0, 0.05]}
        fontSize={0.28}
        color="#2c3e50"
        anchorX="center"
        anchorY="center"
        font="https://fonts.gstatic.com/s/nunito/v25/XRXV3I6Li01BKofIOOaBXso.woff2"
        fontWeight="700"
        letterSpacing={-0.02}
      >
        Shazil Sindhu
      </Text>
      
      <Text
        position={[0, 0.7, 0.05]}
        fontSize={0.12}
        color="#7f8c8d"
        anchorX="center"
        anchorY="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
        maxWidth={4}
        textAlign="center"
      >
        Strategic SaaS Product Leader | AI-Driven Growth
      </Text>
      
      {/* Divider */}
      <mesh position={[0, 0.4, 0.05]}>
        <boxGeometry args={[3.5, 0.015, 0.001]} />
        <meshBasicMaterial color="#3498db" />
      </mesh>
      
      {/* Contact Information */}
      <group position={[0, 0, 0.05]}>
        {/* Email */}
        <group position={[-1.6, 0.1, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.18}
            color="#3498db"
            anchorX="left"
            anchorY="center"
          >
            📧
          </Text>
          <Text
            position={[0.3, 0, 0]}
            fontSize={0.11}
            color="#2c3e50"
            anchorX="left"
            anchorY="center"
            font="https://fonts.gstatic.com/s/nunito/v25/XRXV3I6Li01BKofIOOaBXso.woff2"
            fontWeight="600"
            onClick={() => handleClick('email', 'snsindhu@gmail.com')}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            snsindhu@gmail.com
          </Text>
        </group>
        
        {/* Phone */}
        <group position={[-1.6, -0.2, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.18}
            color="#27ae60"
            anchorX="left"
            anchorY="center"
          >
            📱
          </Text>
          <Text
            position={[0.3, 0, 0]}
            fontSize={0.11}
            color="#2c3e50"
            anchorX="left"
            anchorY="center"
            font="https://fonts.gstatic.com/s/nunito/v25/XRXV3I6Li01BKofIOOaBXso.woff2"
            fontWeight="600"
            onClick={() => handleClick('phone', '(804) 873-9174')}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            (804) 873-9174
          </Text>
        </group>
        
        {/* LinkedIn */}
        <group position={[-1.6, -0.5, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.18}
            color="#0077b5"
            anchorX="left"
            anchorY="center"
          >
            💼
          </Text>
          <Text
            position={[0.3, 0, 0]}
            fontSize={0.11}
            color="#2c3e50"
            anchorX="left"
            anchorY="center"
            font="https://fonts.gstatic.com/s/nunito/v25/XRXV3I6Li01BKofIOOaBXso.woff2"
            fontWeight="600"
            onClick={() => handleClick('linkedin', 'in/shazilsindhu')}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            in/shazilsindhu
          </Text>
        </group>
        
        {/* S.C.A.L.E Framework */}
        <group position={[-1.6, -0.8, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.18}
            color="#9b59b6"
            anchorX="left"
            anchorY="center"
          >
            🌐
          </Text>
          <Text
            position={[0.3, 0, 0]}
            fontSize={0.11}
            color="#2c3e50"
            anchorX="left"
            anchorY="center"
            font="https://fonts.gstatic.com/s/nunito/v25/XRXV3I6Li01BKofIOOaBXso.woff2"
            fontWeight="700"
            onClick={() => handleClick('website', 'scaleframework.notion.site')}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            S.C.A.L.E Framework
          </Text>
        </group>
      </group>
      
      {/* Footer */}
      <Text
        position={[0, -1.1, 0.05]}
        fontSize={0.08}
        color="#95a5a6"
        anchorX="center"
        anchorY="center"
        font="https://fonts.gstatic.com/s/nunito/v25/XRXV3I6Li01BKofIOOaBXso.woff2"
        fontStyle="italic"
      >
        ✨ Click to connect! ✨
      </Text>
    </RigidBody>
  );
}

function LanyardString() {
  // Try to load your lanyard texture, fallback to generated pattern
  let lanyardTexture;
  try {
    lanyardTexture = useTexture('/assets/lanyard.png');
  } catch (error) {
    console.log('Lanyard texture not found, using generated pattern');
  }

  // Generate fallback texture if needed
  const generatedTexture = useRef<THREE.CanvasTexture>();
  if (!lanyardTexture && !generatedTexture.current) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    
    // Black background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 512, 128);
    
    // Add pattern
    ctx.fillStyle = '#333333';
    for (let i = 0; i < 512; i += 64) {
      ctx.fillRect(i, 10, 54, 108);
    }
    
    // Add atom symbols
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#ffffff';
    
    for (let i = 32; i < 512; i += 64) {
      // Draw simplified atom
      ctx.beginPath();
      ctx.arc(i, 64, 12, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.ellipse(i, 64, 16, 6, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.ellipse(i, 64, 16, 6, Math.PI / 3, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(i, 64, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    generatedTexture.current = new THREE.CanvasTexture(canvas);
    generatedTexture.current.wrapS = THREE.RepeatWrapping;
    generatedTexture.current.wrapT = THREE.RepeatWrapping;
  }

  return (
    <RigidBody type="fixed" position={[0, 2, 0]}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 4]} />
        <meshStandardMaterial 
          map={lanyardTexture || generatedTexture.current}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </RigidBody>
  );
}

function Scene({ position, gravity }: LanyardProps) {
  return (
    <Physics gravity={gravity} debug={false}>
      {/* Lighting Setup */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight 
        position={[2, 8, 5]} 
        intensity={0.6} 
        color="#f8f9fa"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Lanyard Hook */}
      <RigidBody type="fixed" position={[0, 4.5, 0]}>
        <mesh>
          <torusGeometry args={[0.2, 0.06, 8, 16]} />
          <meshStandardMaterial 
            color="#2c3e50" 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </RigidBody>
      
      {/* Lanyard String */}
      <LanyardString />
      
      {/* Contact Card */}
      <ContactCard position={position!} />
      
      {/* Invisible floor for physics */}
      <RigidBody type="fixed" position={[0, -8, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[20, 1, 20]} />
        </mesh>
      </RigidBody>
    </Physics>
  );
}

export default function ContactLanyard({ 
  position = [0, -1, 0], 
  gravity = [0, -9.81, 0] 
}: LanyardProps) {
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      width: '350px',
      height: '500px',
      zIndex: 100,
      pointerEvents: 'auto',
      borderRadius: '15px',
      overflow: 'hidden'
    }}>
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene position={position} gravity={gravity} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 6}
          autoRotate={false}
          dampingFactor={0.05}
          enableDamping={true}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}