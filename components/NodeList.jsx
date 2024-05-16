'use client'
import React, { useState, useEffect } from 'react';
import { fetchNodesAndEdges, addNode, updateNode, deleteNode } from '../utils/api';

const NodeList = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const getNodes = async () => {
      const { nodes } = await fetchNodesAndEdges();
      setNodes(nodes);
    };

    getNodes();
  }, []);

  const handleAddNode = async () => {
    const label = prompt('Enter node label:');
    const color = prompt('Enter node color (e.g., #3498db):');
    const size = parseInt(prompt('Enter node size:'), 10);
    const type = prompt('Enter node type (department, manager, subnode, worker):');
    const group = prompt('Enter node group (software, design, marketing, administrative):');
    const newNode = { label, color, size, type, group };
    const addedNode = await addNode(newNode);
    setNodes([...nodes, addedNode]);
  };

  const handleUpdateNode = async (id) => {
    const label = prompt('Enter new node label:');
    const color = prompt('Enter new node color (e.g., #3498db):');
    const size = parseInt(prompt('Enter new node size:'), 10);
    const type = prompt('Enter new node type (department, manager, subnode, worker):');
    const group = prompt('Enter new node group (software, design, marketing, administrative):');
    const updatedNode = { id, label, color, size, type, group };
    const newNode = await updateNode(updatedNode);
    setNodes(nodes.map(node => node.id === id ? newNode : node));
  };

  const handleDeleteNode = async (id) => {
    await deleteNode(id);
    setNodes(nodes.filter(node => node.id !== id));
  };

  return (
    <div>
      <h3>Node List</h3>
      <button onClick={handleAddNode}>Add Node</button>
      <ul>
        {nodes.map(node => (
          <li key={node.id}>
            {node.label} ({node.type})
            <button onClick={() => handleUpdateNode(node.id)}>Edit</button>
            <button onClick={() => handleDeleteNode(node.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NodeList;
