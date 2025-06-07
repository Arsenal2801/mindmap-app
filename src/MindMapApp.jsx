import React, { useState } from 'react';
import MindMap from './components/MindMap';
import Toolbar from './components/Toolbar';
import NodeEditor from './components/NodeEditor';

const initialData = {
  rootKey: 'root',
  nodes: {
    root: { key: 'root', content: 'Nodo Principal', children: [] },
  },
};

const MindMapApp = () => {
  const [mapData, setMapData] = useState(initialData);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectNode = (nodeKey) => {
    setSelectedNodeId(nodeKey);
    setIsEditing(true);
  };

  const handleUpdateNode = (updatedNode) => {
    setMapData((prevData) => ({
      ...prevData,
      nodes: {
        ...prevData.nodes,
        [updatedNode.key]: updatedNode,
      },
    }));
    setIsEditing(false);
  };

  const handleCloseEditor = () => {
    setIsEditing(false);
  };

  return (
    <div className="app-container">
      <h1>Mi Aplicación de Mapas Mentales</h1>
      <Toolbar
        mapData={mapData}
        setMapData={setMapData}
        selectedNodeId={selectedNodeId}
        setSelectedNodeId={setSelectedNodeId}
      />
      <MindMap
        mapData={mapData}
        onSelectNode={handleSelectNode}
        selectedNodeId={selectedNodeId}
      />
      {isEditing && selectedNodeId && (
        <NodeEditor
          node={mapData.nodes[selectedNodeId]}
          onUpdateNode={handleUpdateNode}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
};

export default MindMapApp;
