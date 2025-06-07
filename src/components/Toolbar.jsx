import React from 'react';

const Toolbar = ({ mapData, setMapData, selectedNodeId, setSelectedNodeId }) => {
  // Crear nodo hijo
  const addNode = () => {
    if (!selectedNodeId) return alert('Selecciona un nodo para agregar hijo.');

    const newNodeId = `node-${Date.now()}`;
    const newNode = { id: newNodeId, title: 'Nuevo nodo', children: [] };

    setMapData((prev) => {
      const parent = prev.nodes[selectedNodeId];
      const updatedParent = {
        ...parent,
        children: [...(parent.children || []), newNodeId],
      };

      return {
        ...prev,
        nodes: {
          ...prev.nodes,
          [newNodeId]: newNode,
          [selectedNodeId]: updatedParent,
        },
      };
    });
  };

  // Eliminar nodo (solo si no es root)
  const deleteNode = () => {
    if (!selectedNodeId) return alert('Selecciona un nodo para eliminar.');
    if (selectedNodeId === mapData.rootId) return alert('No puedes eliminar el nodo raíz.');

    setMapData((prev) => {
      const nodes = { ...prev.nodes };
      delete nodes[selectedNodeId];

      // Remover referencia del padre
      const parentId = Object.keys(nodes).find((id) =>
        nodes[id].children?.includes(selectedNodeId)
      );

      if (parentId) {
        nodes[parentId] = {
          ...nodes[parentId],
          children: nodes[parentId].children.filter((id) => id !== selectedNodeId),
        };
      }

      return {
        ...prev,
        nodes,
      };
    });

    setSelectedNodeId(null);
  };

  // Resetear mapa
  const resetMap = () => {
    setMapData({
      rootId: 'root',
      nodes: {
        root: { id: 'root', title: 'Nodo Principal', children: [] },
      },
    });
    setSelectedNodeId(null);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <button onClick={addNode}>Agregar Nodo</button>
      <button onClick={deleteNode} disabled={!selectedNodeId || selectedNodeId === mapData.rootId}>
        Eliminar Nodo
      </button>
      <button onClick={resetMap}>Resetear Mapa</button>
    </div>
  );
};

export default Toolbar;
