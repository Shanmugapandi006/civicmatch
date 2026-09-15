"use client"
import React, { useCallback } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: 'attr-1',
    position: { x: 50, y: 50 },
    data: { label: 'Citizen: Farmer' },
    style: { border: '2px solid #3B5BBD', borderRadius: '50px', padding: '10px' }
  },
  {
    id: 'attr-2',
    position: { x: 50, y: 150 },
    data: { label: 'Income < ₹2 Lakhs' },
    style: { border: '2px solid #3B5BBD', borderRadius: '50px', padding: '10px' }
  },
  {
    id: 'rule-1',
    position: { x: 250, y: 100 },
    data: { label: 'Rule: Landholding Farmer' },
    style: { border: '2px solid #0D9488', borderRadius: '50px', padding: '10px' }
  },
  {
    id: 'scheme-1',
    position: { x: 500, y: 100 },
    data: { label: 'PM-KISAN' },
    style: { backgroundColor: '#1E3A8A', color: 'white', borderRadius: '50px', padding: '10px', border: 'none' }
  }
];

const initialEdges = [
  { id: 'e1-3', source: 'attr-1', target: 'rule-1', animated: true, style: { stroke: '#10B981' } },
  { id: 'e2-3', source: 'attr-2', target: 'rule-1', animated: true, style: { stroke: '#10B981' } },
  { id: 'e3-4', source: 'rule-1', target: 'scheme-1', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } }
];

export function EvidenceGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ height: '300px', width: '100%', border: '1px solid #E2E8F0', borderRadius: '0.5rem', background: '#F8FAFC' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
