'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

const GraphView = () => {
  const graphRef = useRef(null);
  const networkRef = useRef(null);
  const nodesRef = useRef(new DataSet());
  const edgesRef = useRef(new DataSet());
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const initializeNetwork = () => {
    // Definir los nodos
    const nodes = [
      { id: 0, label: 'NUCLEO', color: '#ffffff', size: 40 }, // Nodo padre NUCLEO
      { id: 1, label: 'Software', color: '#3498db', group: 'software', size: 30, type: 'department' },
      { id: 2, label: 'Design', color: '#e74c3c', group: 'design', size: 30, type: 'department' },
      { id: 3, label: 'Marketing', color: '#f1c40f', group: 'marketing', size: 30, type: 'department' },
      { id: 4, label: 'Administrative', color: '#8e44ad', group: 'administrative', size: 30, type: 'department' },
      
      { id: 101, label: 'Nicolás Moreno', color: '#85c1e9', title: 'Manager of Software', group: 'software', size: 25, type: 'manager' },
      { id: 102, label: 'Nicolás Richardson', color: '#f1948a', title: 'Manager of Design', group: 'design', size: 25, type: 'manager' },
      { id: 103, label: 'Kevin Bravo', color: '#f9e79f', title: 'Manager of Marketing', group: 'marketing', size: 25, type: 'manager' },
      { id: 104, label: 'Diego Oliver', color: '#d2b4de', title: 'Manager of Administrative', group: 'administrative', size: 25, type: 'manager' },
      
      { id: 5, label: 'Backend', color: '#5dade2', group: 'software', size: 20, type: 'subnode' },
      { id: 6, label: 'Frontend', color: '#5dade2', group: 'software', size: 20, type: 'subnode' },
      { id: 7, label: 'Data Science', color: '#5dade2', group: 'software', size: 20, type: 'subnode' },
      { id: 8, label: 'AI', color: '#5dade2', group: 'software', size: 20, type: 'subnode' },

      { id: 201, label: 'Backend Manager', color: '#aed6f1', title: 'Backend Manager', group: 'software', size: 15, type: 'worker' },
      { id: 202, label: 'Backend Worker 1', color: '#aed6f1', group: 'software', size: 15, type: 'worker' },
      { id: 203, label: 'Backend Worker 2', color: '#aed6f1', group: 'software', size: 15, type: 'worker' },
      { id: 204, label: 'Frontend Manager', color: '#aed6f1', title: 'Frontend Manager', group: 'software', size: 15, type: 'worker' },
      { id: 205, label: 'Frontend Worker 1', color: '#aed6f1', group: 'software', size: 15, type: 'worker' },
      { id: 206, label: 'Frontend Worker 2', color: '#aed6f1', group: 'software', size: 15, type: 'worker' },
      { id: 207, label: 'Data Science Manager', color: '#aed6f1', title: 'Data Science Manager', group: 'software', size: 15, type: 'worker' },
      { id: 208, label: 'Data Science Worker 1', color: '#aed6f1', group: 'software', size: 15, type: 'worker' },
      { id: 209, label: 'Data Science Worker 2', color: '#aed6f1', group: 'software', size: 15, type: 'worker' },
      { id: 210, label: 'AI Manager', color: '#aed6f1', title: 'AI Manager', group: 'software', size: 15, type: 'worker' },
      { id: 211, label: 'AI Worker 1', color: '#aed6f1', group: 'software', size: 15, type: 'worker' },
      { id: 212, label: 'AI Worker 2', color: '#aed6f1', group: 'software', size: 15, type: 'worker' },

      { id: 9, label: 'UX/UI', color: '#f1948a', group: 'design', size: 20, type: 'subnode' },
      { id: 10, label: 'Graphic Design', color: '#f1948a', group: 'design', size: 20, type: 'subnode' },
      { id: 11, label: 'Posts', color: '#f1948a', group: 'design', size: 20, type: 'subnode' },

      { id: 301, label: 'UX/UI Manager', color: '#f5b7b1', title: 'UX/UI Manager', group: 'design', size: 15, type: 'worker' },
      { id: 302, label: 'UX/UI Worker 1', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },
      { id: 303, label: 'UX/UI Worker 2', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },
      { id: 304, label: 'Graphic Design Manager', color: '#f5b7b1', title: 'Graphic Design Manager', group: 'design', size: 15, type: 'worker' },
      { id: 305, label: 'Graphic Design Worker 1', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },
      { id: 306, label: 'Graphic Design Worker 2', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },
      { id: 307, label: 'Posts Manager', color: '#f5b7b1', title: 'Posts Manager', group: 'design', size: 15, type: 'worker' },
      { id: 308, label: 'Posts Worker 1', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },
      { id: 309, label: 'Posts Worker 2', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },

      { id: 12, label: 'Advertising', color: '#f9e79f', group: 'marketing', size: 20, type: 'subnode' },
      { id: 13, label: 'Strategies', color: '#f9e79f', group: 'marketing', size: 20, type: 'subnode' },

      { id: 401, label: 'Advertising Manager', color: '#fcf3cf', title: 'Advertising Manager', group: 'marketing', size: 15, type: 'worker' },
      { id: 402, label: 'Advertising Worker 1', color: '#fcf3cf', group: 'marketing', size: 15, type: 'worker' },
      { id: 403, label: 'Advertising Worker 2', color: '#fcf3cf', group: 'marketing', size: 15, type: 'worker' },
      { id: 404, label: 'Strategies Manager', color: '#fcf3cf', title: 'Strategies Manager', group: 'marketing', size: 15, type: 'worker' },
      { id: 405, label: 'Strategies Worker 1', color: '#fcf3cf', group: 'marketing', size: 15, type: 'worker' },
      { id: 406, label: 'Strategies Worker 2', color: '#fcf3cf', group: 'marketing', size: 15, type: 'worker' },

      { id: 14, label: 'Finance', color: '#d2b4de', group: 'administrative', size: 20, type: 'subnode' },
      { id: 15, label: 'Accounting', color: '#d2b4de', group: 'administrative', size: 20, type: 'subnode' },
      { id: 16, label: 'Funds', color: '#d2b4de', group: 'administrative', size: 20, type: 'subnode' },

      { id: 501, label: 'Finance Manager', color: '#d7bde2', title: 'Finance Manager', group: 'administrative', size: 15, type: 'worker' },
      { id: 502, label: 'Finance Worker 1', color: '#d7bde2', group: 'administrative', size: 15, type: 'worker' },
      { id: 503, label: 'Finance Worker 2', color: '#d7bde2', group: 'administrative', size: 15, type: 'worker' },
      { id: 504, label: 'Accounting Manager', color: '#d7bde2', title: 'Accounting Manager', group: 'administrative', size: 15, type: 'worker' },
      { id: 505, label: 'Accounting Worker 1', color: '#d7bde2', group: 'administrative', size: 15, type: 'worker' },
      { id: 506, label: 'Accounting Worker 2', color: '#d7bde2', group: 'administrative', size: 15, type: 'worker' },
      { id: 507, label: 'Funds Manager', color: '#d7bde2', title: 'Funds Manager', group: 'administrative', size: 15, type: 'worker' },
      { id: 508, label: 'Funds Worker 1', color: '#d7bde2', group: 'administrative', size: 15, type: 'worker' },
      { id: 509, label: 'Funds Worker 2', color: '#d7bde2', group: 'administrative', size: 15, type: 'worker' }
    ];

    const edges = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 0, to: 4 },

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
      { from: 3, to: 12 },
      { from: 3, to: 13 },
      { from: 4, to: 14 },
      { from: 4, to: 15 },
      { from: 4, to: 16 },

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

    nodesRef.current.clear();
    edgesRef.current.clear();

    nodesRef.current.add(nodes);
    edgesRef.current.add(edges);

    // Configuración de la red
    const data = {
      nodes: nodesRef.current,
      edges: edgesRef.current
    };

    const options = {
      nodes: {
        shape: 'dot',
        font: {
          size: 15,
          color: '#ffffff'
        },
        borderWidth: 2
      },
      edges: {
        width: 2
      },
      physics: {
        enabled: true
      },
      interaction: {
        zoomView: true,
        dragView: true,
        minZoom: 0.5, // Límite mínimo de zoom (50% del tamaño original)
        maxZoom: 1.5  // Límite máximo de zoom (150% del tamaño original)
      },
      manipulation: {
        enabled: false
      }
    };

    if (networkRef.current) {
      networkRef.current.destroy();
    }

    const networkInstance = new Network(graphRef.current, data, options);

    // Función para obtener todos los nodos hijos de un nodo dado
    const getAllChildNodes = (nodeId) => {
      let childNodes = [];
      let stack = [nodeId];

      while (stack.length) {
        const current = stack.pop();
        const directChildren = edgesRef.current.get().filter(edge => edge.from === current).map(edge => edge.to);
        childNodes = [...childNodes, ...directChildren];
        stack = [...stack, ...directChildren];
      }

      return childNodes;
    };

    networkInstance.on('click', function (params) {
      if (params.nodes.length === 1) {
        const nodeId = params.nodes[0];
        const nodePosition = networkInstance.getPositions([nodeId])[nodeId];

        const allNodes = nodesRef.current.get();
        const allEdges = edgesRef.current.get();

        const childNodes = getAllChildNodes(nodeId);

        const updatedNodes = allNodes.map(node => ({
          ...node,
          opacity: node.id === nodeId || childNodes.includes(node.id) ? 1 : 0.1,
          font: {
            color: node.id === nodeId || childNodes.includes(node.id) ? '#ffffff' : 'rgba(255, 255, 255, 0.1)'
          }
        }));

        const updatedEdges = allEdges.map(edge => ({
          ...edge,
          color: {
            color: '#848484',
            opacity: childNodes.includes(edge.to) ? 1 : 0.1
          }
        }));

        nodesRef.current.update(updatedNodes);
        edgesRef.current.update(updatedEdges);

        networkInstance.moveTo({
          position: { x: nodePosition.x, y: nodePosition.y },
          scale: networkInstance.getScale()
        });
      } else {
        const allNodes = nodesRef.current.get();
        const updatedNodes = allNodes.map(node => ({
          ...node,
          opacity: selectedDepartments.includes(node.group) ? 1 : 0.1,
          font: {
            color: selectedDepartments.includes(node.group) ? '#ffffff' : 'rgba(255, 255, 255, 0.1)'
          }
        }));

        const allEdges = edgesRef.current.get();
        const updatedEdges = allEdges.map(edge => {
          const fromNodeGroup = allNodes.find(node => node.id === edge.from).group;
          const toNodeGroup = allNodes.find(node => node.id === edge.to).group;
          const edgeOpacity = selectedDepartments.includes(fromNodeGroup) && selectedDepartments.includes(toNodeGroup) ? 1 : 0.1;
          return {
            ...edge,
            color: {
              color: '#848484',
              opacity: edgeOpacity
            }
          };
        });

        nodesRef.current.update(updatedNodes);
        edgesRef.current.update(updatedEdges);
      }
    });

    networkRef.current = networkInstance;
  };

  useEffect(() => {
    initializeNetwork();
  }, []);

  const handleFilterChange = (type) => {
    setSelectedType(type);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (networkRef.current) {
      const allNodes = nodesRef.current.get();
      const allEdges = edgesRef.current.get();

      const filteredNodes = allNodes.map(node => {
        const matchesType = selectedType === 'all' || node.type === selectedType;
        const matchesSearch = searchQuery === '' || node.label.toLowerCase().includes(searchQuery.toLowerCase());
        return {
          ...node,
          opacity: matchesType && matchesSearch ? 1 : 0.1,
          font: {
            color: matchesType && matchesSearch ? '#ffffff' : 'rgba(255, 255, 255, 0.1)'
          }
        };
      });

      const updatedEdges = allEdges.map(edge => {
        const fromNodeGroup = allNodes.find(node => node.id === edge.from).group;
        const toNodeGroup = allNodes.find(node => node.id === edge.to).group;
        const fromNodeMatches = selectedType === 'all' || fromNodeGroup === selectedType;
        const toNodeMatches = selectedType === 'all' || toNodeGroup === selectedType;
        const edgeOpacity = fromNodeMatches && toNodeMatches ? 1 : 0.1;
        return {
          ...edge,
          color: {
            color: '#848484',
            opacity: edgeOpacity
          }
        };
      });

      nodesRef.current.update(filteredNodes);
      edgesRef.current.update(updatedEdges);
    }
  }, [selectedType, searchQuery]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '200px', padding: '10px', backgroundColor: '#333', color: '#fff' }}>
        <h3>Filters</h3>
        <div>
          <button onClick={() => handleFilterChange('all')}>All</button>
          <button onClick={() => handleFilterChange('department')}>Departments</button>
          <button onClick={() => handleFilterChange('manager')}>Managers</button>
          <button onClick={() => handleFilterChange('subnode')}>Subnodes</button>
          <button onClick={() => handleFilterChange('worker')}>Workers</button>
        </div>
        <h3>Search</h3>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search nodes..."
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      <div ref={graphRef} style={{ flex: 1, backgroundColor: '#000' }} />
    </div>
  );
};

export default GraphView;
