import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

export const initializeNetwork = (graphRef, nodesRef, edgesRef, networkRef, handleNodeClick) => {
  const nodes = [
    { id: 0, label: 'NUCLEO', color: '#ffffff', size: 40, type: 'core' },
    { id: 1, label: 'Software Department', color: '#3498db', group: 'software', size: 30, type: 'department' },
    { id: 2, label: 'Design Department', color: '#e74c3c', group: 'design', size: 30, type: 'department' },
    { id: 3, label: 'Marketing Department', color: '#f1c40f', group: 'marketing', size: 30, type: 'department' },
    { id: 4, label: 'Administrative Department', color: '#8e44ad', group: 'administrative', size: 30, type: 'department' },

    { id: 101, label: 'Nicolás Moreno\nManager of Software', color: '#85c1e9', title: 'Manager of Software', group: 'software', size: 25, type: 'manager' },
    { id: 102, label: 'Nicolás Richardson\nManager of Design', color: '#f1948a', title: 'Manager of Design', group: 'design', size: 25, type: 'manager' },
    { id: 103, label: 'Kevin Bravo\nManager of Marketing', color: '#f9e79f', title: 'Manager of Marketing', group: 'marketing', size: 25, type: 'manager' },
    { id: 104, label: 'Diego Oliver\nManager of Administrative', color: '#d2b4de', title: 'Manager of Administrative', group: 'administrative', size: 25, type: 'manager' },

    { id: 5, label: 'Backend Team', color: '#5dade2', group: 'software', size: 20, type: 'subnode' },
    { id: 6, label: 'Frontend Team', color: '#5dade2', group: 'software', size: 20, type: 'subnode' },
    { id: 7, label: 'Data Science Team', color: '#5dade2', group: 'software', size: 20, type: 'subnode' },
    { id: 8, label: 'AI Team', color: '#5dade2', group: 'software', size: 20, type: 'subnode' },

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

    { id: 9, label: 'UX/UI Team', color: '#f1948a', group: 'design', size: 20, type: 'subnode' },
    { id: 10, label: 'Graphic Design Team', color: '#f1948a', group: 'design', size: 20, type: 'subnode' },
    { id: 11, label: 'Posts Team', color: '#f1948a', group: 'design', size: 20, type: 'subnode' },

    { id: 301, label: 'UX/UI Manager', color: '#f5b7b1', title: 'UX/UI Manager', group: 'design', size: 15, type: 'worker' },
    { id: 302, label: 'UX/UI Worker 1', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },
    { id: 303, label: 'UX/UI Worker 2', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },
    { id: 304, label: 'Graphic Design Manager', color: '#f5b7b1', title: 'Graphic Design Manager', group: 'design', size: 15, type: 'worker' },
    { id: 305, label: 'Graphic Design Worker 1', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },
    { id: 306, label: 'Graphic Design Worker 2', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },
    { id: 307, label: 'Posts Manager', color: '#f5b7b1', title: 'Posts Manager', group: 'design', size: 15, type: 'worker' },
    { id: 308, label: 'Posts Worker 1', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },
    { id: 309, label: 'Posts Worker 2', color: '#f5b7b1', group: 'design', size: 15, type: 'worker' },

    { id: 12, label: 'Advertising Team', color: '#f9e79f', group: 'marketing', size: 20, type: 'subnode' },
    { id: 13, label: 'Strategies Team', color: '#f9e79f', group: 'marketing', size: 20, type: 'subnode' },

    { id: 401, label: 'Advertising Manager', color: '#fcf3cf', title: 'Advertising Manager', group: 'marketing', size: 15, type: 'worker' },
    { id: 402, label: 'Advertising Worker 1', color: '#fcf3cf', group: 'marketing', size: 15, type: 'worker' },
    { id: 403, label: 'Advertising Worker 2', color: '#fcf3cf', group: 'marketing', size: 15, type: 'worker' },
    { id: 404, label: 'Strategies Manager', color: '#fcf3cf', title: 'Strategies Manager', group: 'marketing', size: 15, type: 'worker' },
    { id: 405, label: 'Strategies Worker 1', color: '#fcf3cf', group: 'marketing', size: 15, type: 'worker' },
    { id: 406, label: 'Strategies Worker 2', color: '#fcf3cf', group: 'marketing', size: 15, type: 'worker' },

    { id: 14, label: 'Finance Team', color: '#d2b4de', group: 'administrative', size: 20, type: 'subnode' },
    { id: 15, label: 'Accounting Team', color: '#d2b4de', group: 'administrative', size: 20, type: 'subnode' },
    { id: 16, label: 'Funds Team', color: '#d2b4de', group: 'administrative', size: 20, type: 'subnode' },

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
      minZoom: 0.5,
      maxZoom: 1.5
    },
    manipulation: {
      enabled: false
    }
  };

  if (networkRef.current) {
    networkRef.current.destroy();
  }

  const networkInstance = new Network(graphRef.current, data, options);
  networkInstance.on('click', (params) => handleNodeClick(params, networkInstance));

  return networkInstance;
};

export const getAllChildNodes = (nodeId, edgesRef) => {
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
