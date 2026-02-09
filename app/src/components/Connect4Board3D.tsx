'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment,RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

interface Connect4Board3DProps {
  board: number[][];
  onColumnClick: (col: number) => void;
  currentPlayer: number;
  isAIThinking: boolean;
}

// Ball - Always fully visible
function Ball({ position, color, delay = 0 }: { position: [number, number, number], color: string, delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentY, setCurrentY] = useState(position[1] + 6);
  const [isDropping, setIsDropping] = useState(false);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    if (delay > 0) {
      setTimeout(() => setIsDropping(true), delay);
    } else {
      setIsDropping(true);
    }
  }, [delay]);

  useFrame(() => {
    if (meshRef.current && isDropping) {
      if (currentY > position[1]) {
        const newVelocity = velocity + 0.03;
        const newY = currentY - newVelocity;

        if (newY <= position[1]) {
            setCurrentY(position[1]);
            setIsDropping(false);
            
            // Sound when ball lands in slot
            const dropAudio = new Audio('/sounds/ball-drop.wav');
            dropAudio.volume = 0.5;
            dropAudio.play().catch(() => {});
          } else {
          setCurrentY(newY);
          setVelocity(newVelocity);
        }
      }
    }

    if (meshRef.current) {
      meshRef.current.position.y = currentY;
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], currentY, position[2]]} castShadow receiveShadow>
      <sphereGeometry args={[0.4, 64, 64]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.3}
        roughness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        reflectivity={0.9}
      />
    </mesh>
  );
}

// Column highlight
function ColumnHighlight({ column, visible }: { column: number, visible: boolean }) {
  if (!visible) return null;

  return (
    <group>
      <mesh position={[column - 3, 0, 0.6]}>
        <cylinderGeometry args={[0.45, 0.45, 7, 32]} />
        <meshStandardMaterial
          color="#ffeb3b"
          transparent
          opacity={0.2}
          emissive="#ffeb3b"
          emissiveIntensity={0.4}
        />
      </mesh>
      <spotLight
        position={[column - 3, 5, 2]}
        angle={0.35}
        penumbra={1}
        intensity={1}
        color="#ffffff"
      />
    </group>
  );
}

// Draggable Ball - ALWAYS VISIBLE
function DraggableBall({
  color,
  onRelease,
  isDragging,
  setIsDragging,
  onColumnChange
}: {
  color: string,
  onRelease: (col: number) => void,
  isDragging: boolean,
  setIsDragging: (val: boolean) => void,
  onColumnChange: (col: number) => void
}) {
  const [currentCol, setCurrentCol] = useState(3);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(x, 0), camera);

        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const intersection = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersection);

        const col = Math.max(0, Math.min(6, Math.round(intersection.x + 3)));
        if (col !== currentCol) {
          setCurrentCol(col);
          onColumnChange(col);
        }
      }
    };

    const handleMouseUp = () => {
        if (isDragging) {
          setIsDragging(false);
          onRelease(currentCol);
      
          // Sound when ball is released
          const releaseAudio = new Audio('/sounds/ball-release.mp3');
          releaseAudio.volume = 0.3;
          releaseAudio.play().catch(() => {});
      
          setTimeout(() => {
            setCurrentCol(3);
            onColumnChange(-1);
          }, 100);
        }
      };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, currentCol, onRelease, setIsDragging, camera, onColumnChange]);

  const xPos = currentCol - 3;

  return (
    <mesh
      ref={meshRef}
      position={[xPos, 4.5, 0.6]}
      onPointerDown={() => setIsDragging(true)}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[0.4, 64, 64]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.3}
        roughness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        reflectivity={0.9}
        emissive={color}
        emissiveIntensity={isDragging ? 0.4 : 0}
      />
    </mesh>
  );
}

// Board with circular holes - balls sit IN FRONT of board
function BoardFrame({ boardColor }: { boardColor: string }) {
  return (
    <group>
      {/* Main board */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[7.5, 7, 0.8]} />
        <meshPhysicalMaterial
          color={boardColor}
          metalness={0.4}
          roughness={0.3}
          clearcoat={0.5}
        />
      </mesh>

      {/* Circular holes */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => {
          const xPos = col - 3;
          const yPos = 2.5 - row;

          return (
            <group key={`hole-${row}-${col}`}>
              {/* Deep circular hole */}

<mesh
  position={[xPos, yPos, 0.1]}
  rotation={[Math.PI / 2, 0, 0]}
  receiveShadow
>
  <cylinderGeometry args={[0.42, 0.42, 1, 64]} />
  <meshStandardMaterial
    color="#000000"
    transparent
    opacity={0.3}
    metalness={0.8}
    roughness={0.2}
  />
</mesh>

            </group>
          );
        })
      )}

  {/* Border frame - Top */}
<RoundedBox args={[8, 0.5, 0.8]} radius={0.1} smoothness={4} position={[0, 3.75, 0]} castShadow>
  <meshStandardMaterial
    color="#1e3a8a"
    metalness={0.4}
    roughness={0.4}
  />
</RoundedBox>

{/* Border frame - Bottom */}
<RoundedBox args={[8, 0.5, 0.8]} radius={0.1} smoothness={4} position={[0, -3.75, 0]} castShadow>
  <meshStandardMaterial
    color="#1e3a8a"
    metalness={0.4}
    roughness={0.4}
  />
</RoundedBox>

{/* Border frame - Left */}
<RoundedBox args={[0.5, 8, 0.8]} radius={0.1} smoothness={4} position={[-4, 0, 0]} castShadow>
  <meshStandardMaterial
    color="#1e3a8a"
    metalness={0.4}
    roughness={0.4}
  />
</RoundedBox>

{/* Border frame - Right */}
<RoundedBox args={[0.5, 8, 0.8]} radius={0.1} smoothness={4} position={[4, 0, 0]} castShadow>
  <meshStandardMaterial
    color="#1e3a8a"
    metalness={0.4}
    roughness={0.4}
  />
</RoundedBox>


      {/* Base platform */}
      <mesh position={[0, -4.5, -0.2]} receiveShadow>
        <boxGeometry args={[8.5, 0.4, 1.4]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

function Scene({ board, onColumnClick, currentPlayer, isAIThinking }: Connect4Board3DProps) {
  const { styles } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [highlightColumn, setHighlightColumn] = useState(-1);
  const [balls, setBalls] = useState<Array<{ row: number, col: number, player: number, key: string }>>([]);

  // Get colors from theme
  const getBoardColor = () => {
    if (styles.boardInner.includes('blue-600')) return '#2563eb';
    if (styles.boardInner.includes('slate-800')) return '#1e293b';
    if (styles.boardInner.includes('indigo-900')) return '#312e81';
    return '#2563eb';
  };

  const getPlayerColor = () => {
    if (styles.player.includes('yellow')) return '#fbbf24';
    if (styles.player.includes('pink')) return '#ec4899';
    return '#fbbf24';
  };

  const getAIColor = () => {
    if (styles.ai.includes('red')) return '#ef4444';
    if (styles.ai.includes('cyan')) return '#06b6d4';
    if (styles.ai.includes('slate')) return '#cbd5e1';
    return '#ef4444';
  };

  const boardColor = getBoardColor();
  const playerColor = getPlayerColor();
  const aiColor = getAIColor();

  useEffect(() => {
    const newBalls: Array<{ row: number, col: number, player: number, key: string }> = [];
    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell !== 0) {
          newBalls.push({ row: r, col: c, player: cell, key: `${r}-${c}` });
        }
      });
    });
    setBalls(newBalls);
  }, [board]);

  const handleBallRelease = (col: number) => {
    if (!isAIThinking) {
      onColumnClick(col);
    }
  };

  const handleColumnChange = (col: number) => {
    setHighlightColumn(col);
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[8, 12, 8]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 5, 5]} intensity={0.6} color={playerColor} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color={aiColor} />
      <hemisphereLight intensity={0.4} groundColor="#1e3a5f" />

      <BoardFrame boardColor={boardColor} />

      <ColumnHighlight column={highlightColumn} visible={isDragging && highlightColumn >= 0} />

      {/* All balls FULLY VISIBLE in front of board */}
      {balls.map((ball, index) => (
        <Ball
          key={ball.key}
          position={[ball.col - 3, 2.5 - ball.row, 0.6]}
          color={ball.player === 1 ? playerColor : aiColor}
          delay={index * 50}
        />
      ))}

      {/* Draggable ball - ALWAYS VISIBLE */}
      {!isAIThinking && currentPlayer === 1 && (
        <DraggableBall
          color={playerColor}
          onRelease={handleBallRelease}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          onColumnChange={handleColumnChange}
        />
      )}

      <Environment preset="sunset" />
    </>
  );
}

export default function Connect4Board3D(props: Connect4Board3DProps) {
  return (
    <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-3xl overflow-hidden shadow-2xl">
      <Canvas
        shadows
        camera={{ position: [0, 0, 14], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Scene {...props} />
      </Canvas>
    </div>
  );
}