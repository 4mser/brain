import { v4 as uuidv4 } from 'uuid';

const initialNodes = [
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

const initialEdges = [
  { from: initialNodes[0].id, to: initialNodes[1].id },
  { from: initialNodes[0].id, to: initialNodes[2].id },
  { from: initialNodes[0].id, to: initialNodes[3].id },
  { from: initialNodes[0].id, to: initialNodes[4].id },

  { from: initialNodes[1].id, to: initialNodes[101].id },
  { from: initialNodes[2].id, to: initialNodes[102].id },
  { from: initialNodes[3].id, to: initialNodes[103].id },
  { from: initialNodes[4].id, to: initialNodes[104].id },

  { from: initialNodes[1].id, to: initialNodes[5].id },
  { from: initialNodes[1].id, to: initialNodes[6].id },
  { from: initialNodes[1].id, to: initialNodes[7].id },
  { from: initialNodes[1].id, to: initialNodes[8].id },
  { from: initialNodes[2].id, to: initialNodes[9].id },
  { from: initialNodes[2].id, to: initialNodes[10].id },
  { from: initialNodes[2].id, to: initialNodes[11].id },
  { from: initialNodes[3].id, to: initialNodes[12].id },
  { from: initialNodes[3].id, to: initialNodes[13].id },
  { from: initialNodes[4].id, to: initialNodes[14].id },
  { from: initialNodes[4].id, to: initialNodes[15].id },
  { from: initialNodes[4].id, to: initialNodes[16].id },

  { from: initialNodes[5].id, to: initialNodes[201].id },
  { from: initialNodes[5].id, to: initialNodes[202].id },
  { from: initialNodes[5].id, to: initialNodes[203].id },
  { from: initialNodes[6].id, to: initialNodes[204].id },
  { from: initialNodes[6].id, to: initialNodes[205].id },
  { from: initialNodes[6].id, to: initialNodes[206].id },
  { from: initialNodes[7].id, to: initialNodes[207].id },
  { from: initialNodes[7].id, to: initialNodes[208].id },
  { from: initialNodes[7].id, to: initialNodes[209].id },
  { from: initialNodes[8].id, to: initialNodes[210].id },
  { from: initialNodes[8].id, to: initialNodes[211].id },
  { from: initialNodes[8].id, to: initialNodes[212].id },

  { from: initialNodes[9].id, to: initialNodes[301].id },
  { from: initialNodes[9].id, to: initialNodes[302].id },
  { from: initialNodes[9].id, to: initialNodes[303].id },
  { from: initialNodes[10].id, to: initialNodes[304].id },
  { from: initialNodes[10].id, to: initialNodes[305].id },
  { from: initialNodes[10].id, to: initialNodes[306].id },
  { from: initialNodes[11].id, to: initialNodes[307].id },
  { from: initialNodes[11].id, to: initialNodes[308].id },
  { from: initialNodes[11].id, to: initialNodes[309].id },

  { from: initialNodes[12].id, to: initialNodes[401].id },
  { from: initialNodes[12].id, to: initialNodes[402].id },
  { from: initialNodes[12].id, to: initialNodes[403].id },
  { from: initialNodes[13].id, to: initialNodes[404].id },
  { from: initialNodes[13].id, to: initialNodes[405].id },
  { from: initialNodes[13].id, to: initialNodes[406].id },

  { from: initialNodes[14].id, to: initialNodes[501].id },
  { from: initialNodes[14].id, to: initialNodes[502].id },
  { from: initialNodes[14].id, to: initialNodes[503].id },
  { from: initialNodes[15].id, to: initialNodes[504].id },
  { from: initialNodes[15].id, to: initialNodes[505].id },
  { from: initialNodes[15].id, to: initialNodes[506].id },
  { from: initialNodes[16].id, to: initialNodes[507].id },
  { from: initialNodes[16].id, to: initialNodes[508].id },
  { from: initialNodes[16].id, to: initialNodes[509].id },






  

];

let nodes = [...initialNodes];
let edges = [...initialEdges];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({ nodes, edges });
      break;
    case 'POST':
      const newNode = { id: uuidv4(), ...req.body };
      nodes.push(newNode);
      res.status(201).json(newNode);
      break;
    case 'PUT':
      const { id, ...updatedNode } = req.body;
      nodes = nodes.map(node => (node.id === id ? { ...node, ...updatedNode } : node));
      res.status(200).json({ id, ...updatedNode });
      break;
    case 'DELETE':
      const { id: nodeId } = req.body;
      nodes = nodes.filter(node => node.id !== nodeId);
      edges = edges.filter(edge => edge.from !== nodeId && edge.to !== nodeId); // Remove edges related to the node
      res.status(200).json({ id: nodeId });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
