import React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

function Diagram({ initialNodes, initialEdges, onNodesChangeExternal, onEdgesChangeExternal, onConnectExternal }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // keep parent in sync
  React.useEffect(() => onNodesChangeExternal(nodes), [nodes]);
  React.useEffect(() => onEdgesChangeExternal(edges), [edges]);

  function onConnect(params) {
    const newEdges = addEdge({ ...params, id: `e${Date.now()}` }, edges);
    setEdges(newEdges);
    onConnectExternal(newEdges);
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges}
                 onNodesChange={onNodesChange}
                 onEdgesChange={onEdgesChange}
                 onConnect={onConnect}
                 fitView
      >
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
}

export default function DiagramWrapper(props) {
  // wrap in provider so components can share context if needed
  return (
    <ReactFlowProvider>
      <Diagram {...props} />
    </ReactFlowProvider>
  );
}
