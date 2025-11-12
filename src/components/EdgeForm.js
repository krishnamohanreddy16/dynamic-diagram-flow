import React, { useState, useEffect } from 'react';

export default function EdgeForm({ nodes, onSubmit, editEdge }) {
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');

  useEffect(() => {
    if (editEdge) {
      setSource(editEdge.source);
      setTarget(editEdge.target);
    }
  }, [editEdge]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!source || !target) {
      alert('Please select both source and target nodes');
      return;
    }

    const edgeData = {
      id: editEdge?.id || `e-${source}-${target}-${Date.now()}`,
      source,
      target,
      type: 'smoothstep'
    };

    onSubmit(edgeData);

    // clear if adding new edge
    if (!editEdge) {
      setSource('');
      setTarget('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="edge-form">
      <h3>{editEdge ? 'Edit Edge' : 'Add Edge'}</h3>

      <label>Source Node:</label><br />
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="">-- select source --</option>
        {nodes.map((n) => (
          <option key={n.id} value={n.id}>
            {n.data?.label || n.id}
          </option>
        ))}
      </select>

      <br /><br />

      <label>Target Node:</label><br />
      <select value={target} onChange={(e) => setTarget(e.target.value)}>
        <option value="">-- select target --</option>
        {nodes.map((n) => (
          <option key={n.id} value={n.id}>
            {n.data?.label || n.id}
          </option>
        ))}
      </select>

      <button type="submit" style={{ marginTop: 10 }}>
        {editEdge ? 'Update Edge' : 'Add Edge'}
      </button>
    </form>
  );
}
