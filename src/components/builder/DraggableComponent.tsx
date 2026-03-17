import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { AppNode } from '@/types/app';
import { useAppStore } from '@/store/useAppStore';
import AIAgent from './AIAgent';

interface DraggableComponentProps {
  node: AppNode;
}

export default function DraggableComponent({ node }: DraggableComponentProps) {
  const { selectNode, selectedNodeId } = useAppStore();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: node.id,
    data: { type: node.type, id: node.id, isTemplate: false }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    ...node.styles,
    border: selectedNodeId === node.id ? '2px solid #3b82f6' : '1px transparent',
    zIndex: isDragging ? 50 : undefined,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectNode(node.id);
  };

  const renderContent = () => {
    switch (node.type) {
      case 'text':
        return <p>{node.props.content}</p>;
      case 'image':
        return <img src={node.props.src} alt="Uploaded" className="max-w-full h-auto" />;
      case 'button':
        return <button className="bg-blue-600 text-white px-4 py-2 rounded pointer-events-auto">{node.props.label}</button>;
      case 'input':
        return (
          <input
            type="text"
            placeholder={node.props.placeholder}
            value={node.props.value || ''}
            onChange={(e) => {
              e.stopPropagation();
              useAppStore.getState().updateNode(node.id, {
                props: { ...node.props, value: e.target.value }
              });
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="border p-2 rounded w-full pointer-events-auto"
          />
        );
      case 'ai-agent':
        return <AIAgent node={node} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className="relative group p-2 cursor-grab active:cursor-grabbing transition-all"
    >
      {renderContent()}
    </div>
  );
}
