export const fetchNodesAndEdges = async () => {
  const response = await fetch('/api/nodes');
  const data = await response.json();
  return data;
};

export const addNode = async (node) => {
  const response = await fetch('/api/nodes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(node)
  });
  const data = await response.json();
  return data;
};

export const updateNode = async (node) => {
  const response = await fetch('/api/nodes', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(node)
  });
  const data = await response.json();
  return data;
};

export const deleteNode = async (id) => {
  const response = await fetch('/api/nodes', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });
  const data = await response.json();
  return data;
};
