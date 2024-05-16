'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { fetchNodesAndEdges } from '../utils/api';

const GraphView = () => {
  const graphRef = useRef(null);
  const networkRef = useRef(null);
  const nodesRef = useRef(new DataSet());
  const edgesRef = useRef(new DataSet());
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const initializeNetwork = async () => {
    const { nodes, edges } = await fetchNodesAndEdges();

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
