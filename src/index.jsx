import React from 'react';
import { createRoot } from 'react-dom/client';
import MindMapApp from './MindMapApp';
import './index.css';  // Aquí importamos los estilos globales

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<MindMapApp />);
