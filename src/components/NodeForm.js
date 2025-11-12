import React, { useState, useEffect } from 'react';

export default function NodeForm({ onSubmit, editNode }) {
  const [label, setLabel] = useState('');
  const [posX, setPosX] = useState(100);
  const [posY, setPosY] = useState(100);

  // when editing, load data into form
  useEffect(() => {
    if (editNode) {
      setLabel(editNode.data?.label || '');
      setPosX(editNode.position?.x || 100);
      setPosY(editNode.position?.y || 100);
    }
  }, [editNode]);

  function handleSubmit(e) {
    e.preventDefault();
    const nodeData = {
      id: editNode?.id || Date.now().toString(),
      type: 'default',
      position: { x: Number(posX), y: Number(posY) },
      data: { label: label || 'New Node' }
    };
    onSubmit(nodeData);
    // clear inputs if new node
    if (!editNode) {
      setLabel('');
      setPosX(100);
      setPosY(100);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="node-form">
      <h3>{editNode ? 'Edit Node' : 'Add Node'}</h3>

      <div>
        <label>Label:</label><br />
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Enter node label"
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <label>Position X:</label><br />
        <input
          type="number"
          value={posX}
          onChange={(e) => setPosX(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <label>Position Y:</label><br />
        <input
          type="number"
          value={posY}
          onChange={(e) => setPosY(e.target.value)}
        />
      </div>

      <button type="submit" style={{ marginTop: 10 }}>
        {editNode ? 'Update Node' : 'Add Node'}
      </button>
    </form>
  );
}
