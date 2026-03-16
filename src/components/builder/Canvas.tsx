import React from 'react';
import { useDroppable, DndContext, DragEndEvent } from '@dnd-kit/core';
import { useAppStore } from '@/store/useAppStore';
import DraggableComponent from './DraggableComponent';

export default function Canvas() {
  const { nodes, addNode, updateNode } = useAppStore();
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    if (active.data.current?.isTemplate) {
      addNode(active.data.current.type);
    } else {
      const nodeId = active.id as string;
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        const currentTop = parseInt(node.styles.top || '0');
        const currentLeft = parseInt(node.styles.left || '0');
        updateNode(nodeId, {
          styles: {
            ...node.styles,
            position: 'absolute',
            top: `${currentTop + delta.y}px`,
            left: `${currentLeft + delta.x}px`,
          }
        });
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
    </DndContext>
  );
}
