import React, { useState } from 'react';
import NodeForm from './NodeForm';
import EdgeForm from './EdgeForm';
import "./Slidebar.css"

export default function Sidebar({
  nodes,
  edges,
  addNode,
  addEdge,
  updateNode,
  updateEdge,
  deleteNodeById,
  deleteEdgeById
}) {
  const [editNode, setEditNode] = useState(null);
  const [editEdge, setEditEdge] = useState(null);

  // Handles node submit (add or update)
  const handleNodeSubmit = (nodeData) => {
    if (editNode) {
      updateNode(nodeData);
      setEditNode(null);
    } else {
      addNode(nodeData);
    }
  };

  // Handles edge submit (add or update)
  const handleEdgeSubmit = (edgeData) => {
    if (editEdge) {
      updateEdge(edgeData);
      setEditEdge(null);
    } else {
      addEdge(edgeData);
    }
  };

  return (
    <aside className="sidebar">
      <h2>Diagram Controls</h2>

      {/* Node Form Section */}
      <NodeForm onSubmit={handleNodeSubmit} editNode={editNode} />

      {/* Edge Form Section */}
      <EdgeForm nodes={nodes} onSubmit={handleEdgeSubmit} editEdge={editEdge} />

      {/* Existing Nodes Section */}
      <div style={{ marginTop: '20px' }}>
        <h3>Nodes</h3>
        {nodes.length === 0 && <p>No nodes yet.</p>}
        {nodes.map((n) => (
          <div
            key={n.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
              borderBottom: '1px solid #ddd',
              paddingBottom: '4px'
            }}
          >
            <span>{n.data?.label || n.id}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setEditNode(n)}>Edit</button>
              <button onClick={() => deleteNodeById(n.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Existing Edges Section */}
      <div style={{ marginTop: '20px' }}>
        <h3>Edges</h3>
        {edges.length === 0 && <p>No edges yet.</p>}
        {edges.map((e) => (
          <div
            key={e.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
              borderBottom: '1px solid #ddd',
              paddingBottom: '4px'
            }}
          >
            <span>
              {e.source} → {e.target}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setEditEdge(e)}>Edit</button>
              <button onClick={() => deleteEdgeById(e.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
