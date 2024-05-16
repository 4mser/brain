'use client'
import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Html } from '@react-three/drei';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

const generateRandomPosition = (basePosition, spread = 5) => [
  basePosition[0] + Math.random() * spread - spread / 2,
  basePosition[1] + Math.random() * spread - spread / 2,
  basePosition[2] + Math.random() * spread - spread / 2,
];

const nodesData = [
  // Departamentos principales
  { id: 1, label: 'Software', color: '#3498db', position: [0, 0, 0], type: 'department' },
  { id: 2, label: 'Design', color: '#e74c3c', position: [15, 15, 0], type: 'department' },
  { id: 3, label: 'Marketing', color: '#f1c40f', position: [15, -15, 0], type: 'department' },
  { id: 4, label: 'Administrative', color: '#8e44ad', position: [-15, 15, 0], type: 'department' },
  
  // Encargados de los departamentos
  { id: 101, label: 'Nicolás Moreno', color: '#85c1e9', position: generateRandomPosition([2, 2, 2]), type: 'manager' },
  { id: 102, label: 'Nicolás Richardson', color: '#f1948a', position: generateRandomPosition([17, 17, 2]), type: 'manager' },
  { id: 103, label: 'Kevin Bravo', color: '#f9e79f', position: generateRandomPosition([17, -13, 2]), type: 'manager' },
  { id: 104, label: 'Diego Oliver', color: '#d2b4de', position: generateRandomPosition([-13, 17, 2]), type: 'manager' },
  
  // Subnodos del Departamento de Software
  { id: 5, label: 'Backend', color: '#5dade2', position: generateRandomPosition([10, 0, 0]), type: 'subnode' },
  { id: 6, label: 'Frontend', color: '#5dade2', position: generateRandomPosition([0, 10, 0]), type: 'subnode' },
  { id: 7, label: 'Data Science', color: '#5dade2', position: generateRandomPosition([-10, 0, 0]), type: 'subnode' },
  { id: 8, label: 'AI', color: '#5dade2', position: generateRandomPosition([0, -10, 0]), type: 'subnode' },

  // Trabajadores y encargados de subnodos del Departamento de Software
  { id: 201, label: 'Backend Manager', color: '#aed6f1', position: generateRandomPosition([12, 0, 0]), type: 'worker' },
  { id: 202, label: 'Backend Worker 1', color: '#aed6f1', position: generateRandomPosition([12.5, 0.5, 0]), type: 'worker' },
  { id: 203, label: 'Backend Worker 2', color: '#aed6f1', position: generateRandomPosition([12.5, -0.5, 0]), type: 'worker' },
  { id: 204, label: 'Frontend Manager', color: '#aed6f1', position: generateRandomPosition([0, 12, 0]), type: 'worker' },
  { id: 205, label: 'Frontend Worker 1', color: '#aed6f1', position: generateRandomPosition([0.5, 12.5, 0]), type: 'worker' },
  { id: 206, label: 'Frontend Worker 2', color: '#aed6f1', position: generateRandomPosition([-0.5, 12.5, 0]), type: 'worker' },
  { id: 207, label: 'Data Science Manager', color: '#aed6f1', position: generateRandomPosition([-12, 0, 0]), type: 'worker' },
  { id: 208, label: 'Data Science Worker 1', color: '#aed6f1', position: generateRandomPosition([-12.5, 0.5, 0]), type: 'worker' },
  { id: 209, label: 'Data Science Worker 2', color: '#aed6f1', position: generateRandomPosition([-12.5, -0.5, 0]), type: 'worker' },
  { id: 210, label: 'AI Manager', color: '#aed6f1', position: generateRandomPosition([0, -12, 0]), type: 'worker' },
  { id: 211, label: 'AI Worker 1', color: '#aed6f1', position: generateRandomPosition([0.5, -12.5, 0]), type: 'worker' },
  { id: 212, label: 'AI Worker 2', color: '#aed6f1', position: generateRandomPosition([-0.5, -12.5, 0]), type: 'worker' },

  // Subnodos del Departamento de Diseño
  { id: 9, label: 'UX/UI', color: '#f1948a', position: generateRandomPosition([18, 18, 2]), type: 'subnode' },
  { id: 10, label: 'Graphic Design', color: '#f1948a', position: generateRandomPosition([19, 19, 2]), type: 'subnode' },
  { id: 11, label: 'Posts', color: '#f1948a', position: generateRandomPosition([20, 20, 2]), type: 'subnode' },

  // Trabajadores y encargados de subnodos del Departamento de Diseño
  { id: 301, label: 'UX/UI Manager', color: '#f5b7b1', position: generateRandomPosition([21, 21, 2]), type: 'worker' },
  { id: 302, label: 'UX/UI Worker 1', color: '#f5b7b1', position: generateRandomPosition([21.5, 21.5, 2]), type: 'worker' },
  { id: 303, label: 'UX/UI Worker 2', color: '#f5b7b1', position: generateRandomPosition([21.5, 20.5, 2]), type: 'worker' },
  { id: 304, label: 'Graphic Design Manager', color: '#f5b7b1', position: generateRandomPosition([22, 22, 2]), type: 'worker' },
  { id: 305, label: 'Graphic Design Worker 1', color: '#f5b7b1', position: generateRandomPosition([22.5, 22.5, 2]), type: 'worker' },
  { id: 306, label: 'Graphic Design Worker 2', color: '#f5b7b1', position: generateRandomPosition([22.5, 21.5, 2]), type: 'worker' },
  { id: 307, label: 'Posts Manager', color: '#f5b7b1', position: generateRandomPosition([23, 23, 2]), type: 'worker' },
  { id: 308, label: 'Posts Worker 1', color: '#f5b7b1', position: generateRandomPosition([23.5, 23.5, 2]), type: 'worker' },
  { id: 309, label: 'Posts Worker 2', color: '#f5b7b1', position: generateRandomPosition([23.5, 22.5, 2]), type: 'worker' },

  // Subnodos del Departamento de Marketing
  { id: 12, label: 'Advertising', color: '#f9e79f', position: generateRandomPosition([18, -13, 2]), type: 'subnode' },
  { id: 13, label: 'Strategies', color: '#f9e79f', position: generateRandomPosition([19, -14, 2]), type: 'subnode' },

  // Trabajadores y encargados de subnodos del Departamento de Marketing
  { id: 401, label: 'Advertising Manager', color: '#fcf3cf', position: generateRandomPosition([20, -15, 2]), type: 'worker' },
  { id: 402, label: 'Advertising Worker 1', color: '#fcf3cf', position: generateRandomPosition([20.5, -15.5, 2]), type: 'worker' },
  { id: 403, label: 'Advertising Worker 2', color: '#fcf3cf', position: generateRandomPosition([20.5, -14.5, 2]), type: 'worker' },
  { id: 404, label: 'Strategies Manager', color: '#fcf3cf', position: generateRandomPosition([21, -16, 2]), type: 'worker' },
  { id: 405, label: 'Strategies Worker 1', color: '#fcf3cf', position: generateRandomPosition([21.5, -16.5, 2]), type: 'worker' },
  { id: 406, label: 'Strategies Worker 2', color: '#fcf3cf', position: generateRandomPosition([21.5, -15.5, 2]), type: 'worker' },

  // Subnodos del Departamento Administrativo
  { id: 14, label: 'Finance', color: '#d2b4de', position: generateRandomPosition([-13, 18, 2]), type: 'subnode' },
  { id: 15, label: 'Accounting', color: '#d2b4de', position: generateRandomPosition([-14, 19, 2]), type: 'subnode' },
  { id: 16, label: 'Funds', color: '#d2b4de', position: generateRandomPosition([-15, 20, 2]), type: 'subnode' },

  // Trabajadores y encargados de subnodos del Departamento Administrativo
  { id: 501, label: 'Finance Manager', color: '#d7bde2', position: generateRandomPosition([-16, 21, 2]), type: 'worker' },
  { id: 502, label: 'Finance Worker 1', color: '#d7bde2', position: generateRandomPosition([-16.5, 21.5, 2]), type: 'worker' },
  { id: 503, label: 'Finance Worker 2', color: '#d7bde2', position: generateRandomPosition([-16.5, 20.5, 2]), type: 'worker' },
  { id: 504, label: 'Accounting Manager', color: '#d7bde2', position: generateRandomPosition([-17, 22, 2]), type: 'worker' },
  { id: 505, label: 'Accounting Worker 1', color: '#d7bde2', position: generateRandomPosition([-17.5, 22.5, 2]), type: 'worker' },
  { id: 506, label: 'Accounting Worker 2', color: '#d7bde2', position: generateRandomPosition([-17.5, 21.5, 2]), type: 'worker' },
  { id: 507, label: 'Funds Manager', color: '#d7bde2', position: generateRandomPosition([-18, 23, 2]), type: 'worker' },
  { id: 508, label: 'Funds Worker 1', color: '#d7bde2', position: generateRandomPosition([-18.5, 23.5, 2]), type: 'worker' },
  { id: 509, label: 'Funds Worker 2', color: '#d7bde2', position: generateRandomPosition([-18.5, 22.5, 2]), type: 'worker' }
];

const edgesData = [
  { from: 1, to: 101 },
  { from: 2, to: 102 },
  { from: 3, to: 103 },
  { from: 4, to: 104 },
  { from: 1, to: 5 },
  { from: 1, to: 6 },
  { from: 1, to: 7 },
  { from: 1, to: 8 },
  { from: 2, to: 9 },
  { from: 2, to: 10 },
  { from: 2, to: 11 },
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
  { from: 5, to: 201 },
  { from: 5, to: 202 },
  { from: 5, to: 203 },
  { from: 6, to: 204 },
  { from: 6, to: 205 },
  { from: 6, to: 206 },
  { from: 7, to: 207 },
  { from: 7, to: 208 },
  { from: 7, to: 209 },
  { from: 8, to: 210 },
  { from: 8, to: 211 },
  { from: 8, to: 212 },
  { from: 9, to: 301 },
  { from: 9, to: 302 },
  { from: 9, to: 303 },
  { from: 10, to: 304 },
  { from: 10, to: 305 },
  { from: 10, to: 306 },
  { from: 11, to: 307 },
  { from: 11, to: 308 },
  { from: 11, to: 309 },
  { from: 12, to: 401 },
  { from: 12, to: 402 },
  { from: 12, to: 403 },
  { from: 13, to: 404 },
  { from: 13, to: 405 },
  { from: 13, to: 406 },
  { from: 14, to: 501 },
  { from: 14, to: 502 },
  { from: 14, to: 503 },
  { from: 15, to: 504 },
  { from: 15, to: 505 },
  { from: 15, to: 506 },
  { from: 16, to: 507 },
  { from: 16, to: 508 },
  { from: 16, to: 509 }
];

const Node = ({ node, updatePosition, cameraZoom }) => {
  const nodeRef = useRef();

  useFrame(() => {
    if (nodeRef.current) {
      updatePosition(node.id, nodeRef.current.position);
    }
  });

  return (
    <>
      <Sphere args={[0.5, 32, 32]} position={node.position} ref={nodeRef}>
        <meshStandardMaterial color={node.color} />
      </Sphere>
      {cameraZoom < 50 || node.type === 'department' ? (
        <Html position={[node.position[0], node.position[1], node.position[2] + 0.7]}>
          <div style={{ color: 'white', fontSize: '1rem' }}>{node.label}</div>
        </Html>
      ) : null}
    </>
  );
};

const Edge = ({ from, to }) => (
  <Line
    points={[from, to]}
    color="gray"
    lineWidth={1}
  />
);

const Dragable = ({ children, controlsEnabled }) => {
  const { camera, gl, scene } = useThree();
  const controlsRef = useRef();
  const groupRef = useRef();

  useEffect(() => {
    controlsRef.current = new DragControls(
      groupRef.current.children,
      camera,
      gl.domElement
    );

    controlsRef.current.addEventListener('hoveron', () => {
      controlsEnabled.current = false;
    });

    controlsRef.current.addEventListener('hoveroff', () => {
      controlsEnabled.current = true;
    });

    return () => {
      controlsRef.current.dispose();
    };
  }, [camera, gl.domElement, controlsEnabled]);

  return <group ref={groupRef}>{children}</group>;
};

const GraphView3D = () => {
  const [nodes, setNodes] = useState(nodesData);
  const [edges, setEdges] = useState(edgesData);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [cameraZoom, setCameraZoom] = useState(1);
  const controlsEnabledRef = useRef(controlsEnabled);
  controlsEnabledRef.current = controlsEnabled;

  const updatePosition = (id, position) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id ? { ...node, position: [position.x, position.y, position.z] } : node
      )
    );
  };

  const CameraZoomUpdater = () => {
    const { camera } = useThree();
    useFrame(() => setCameraZoom(camera.position.length()));
    return null;
  };

  return (
    <>
      <button
        onClick={() => setControlsEnabled(!controlsEnabled)}
        style={{ position: '', top: '10px', left: '10px', zIndex: 1 }}
      >
        {controlsEnabled ? 'Disable Orbit Controls' : 'Enable Orbit Controls'}
      </button>
      <Canvas style={{ height: '100vh', background: '#000000' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enabled={controlsEnabled} />
        <Dragable controlsEnabled={controlsEnabledRef}>
          {nodes.map((node) => (
            <Node key={node.id} node={node} updatePosition={updatePosition} cameraZoom={cameraZoom} />
          ))}
        </Dragable>
        {edges.map((edge, index) => {
          const fromNode = nodes.find((node) => node.id === edge.from);
          const toNode = nodes.find((node) => node.id === edge.to);
          if (!fromNode || !toNode) return null;
          return <Edge key={index} from={fromNode.position} to={toNode.position} />;
        })}
        <CameraZoomUpdater />
      </Canvas>
    </>
  );
};

export default GraphView3D;
