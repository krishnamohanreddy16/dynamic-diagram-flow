import React, { useEffect, useState } from 'react';
import Diagram from './components/Diagram';
import Sidebar from './components/Sidebar';
import initialMetadata from './metadata.json';
import './index.css';

function App() {
  // try localStorage first, else metadata.json
  const [nodes, setNodes] = useState(() => {
    const saved = localStorage.getItem('diagram:nodes');
    return saved ? JSON.parse(saved) : initialMetadata.nodes || [];
  });
  const [edges, setEdges] = useState(() => {
    const saved = localStorage.getItem('diagram:edges');
    return saved ? JSON.parse(saved) : initialMetadata.edges || [];
  });

  // sync to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem('diagram:nodes', JSON.stringify(nodes));
  }, [nodes]);
  useEffect(() => {
    localStorage.setItem('diagram:edges', JSON.stringify(edges));
  }, [edges]);

  // Handlers passed to Diagram
  const handleNodesChangeFromDiagram = (newNodes) => setNodes(newNodes);
  const handleEdgesChangeFromDiagram = (newEdges) => setEdges(newEdges);
  const handleConnectFromDiagram = (newEdges) => setEdges(newEdges);

  // Add node/edge APIs used by Sidebar
  function addNode(node) {
    setNodes(prev => [...prev, node]);
  }

  function addEdge(edge) {
    setEdges(prev => [...prev, edge]);
  }

  function deleteNodeById(id) {
    setNodes(prev => prev.filter(n => n.id !== id));
    // also remove edges connected to it
    setEdges(prev => prev.filter(e => e.source !== id && e.target !== id));
  }

  function deleteEdgeById(id) {
    setEdges(prev => prev.filter(e => e.id !== id));
  }

  function updateNode(updatedNode) {
    setNodes(prev => prev.map(n => n.id === updatedNode.id ? updatedNode : n));
  }

  function clearAll() {
    setNodes([]);
    setEdges([]);
    localStorage.removeItem('diagram:nodes');
    localStorage.removeItem('diagram:edges');
  }

  function updateEdge(updatedEdge) {
  setEdges(prev => prev.map(e => e.id === updatedEdge.id ? updatedEdge : e));
}


  return (
    <div className="app">
      <Sidebar
        nodes={nodes}
        edges={edges}
        addNode={addNode}
        addEdge={addEdge} updateEdge={updateEdge}
        deleteNodeById={deleteNodeById}
        deleteEdgeById={deleteEdgeById}
        updateNode={updateNode}
      />
      <div className="diagram">
        <Diagram
          initialNodes={nodes}
          initialEdges={edges}
          onNodesChangeExternal={handleNodesChangeFromDiagram}
          onEdgesChangeExternal={handleEdgesChangeFromDiagram}
          onConnectExternal={handleConnectFromDiagram}
        />
      </div>
    </div>
  );
}

export default App;
