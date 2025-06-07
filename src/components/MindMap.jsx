// src/components/MindMap.jsx
import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Idea Principal' },
    type: 'default',
  },
  {
    id: '2',
    position: { x: 200, y: 100 },
    data: { label: 'Idea Secundaria' },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', label: 'relación' },
];

const MindMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: 600 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={12} />
      </ReactFlow>
    </div>
  );
};

export default MindMap;
