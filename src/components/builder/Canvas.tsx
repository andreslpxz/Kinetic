import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useAppStore } from '@/store/useAppStore';
import DraggableComponent from './DraggableComponent';

export default function Canvas() {
  const { nodes } = useAppStore();
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[1000px] w-full bg-white rounded-xl shadow-inner border border-gray-100 p-4 relative"
    >
      {nodes.map((node) => (
        <DraggableComponent key={node.id} node={node} />
      ))}
      {nodes.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 mt-20">
          <p className="text-xl">Canvas is empty</p>
          <p>Drag components from the sidebar to start building</p>
        </div>
      )}
    </div>
  );
}
