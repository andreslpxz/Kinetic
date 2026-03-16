import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Type, Image, MousePointer2, TextCursorInput, Bot } from 'lucide-react';
import { ComponentType } from '@/types/app';

interface SidebarItemProps {
  type: ComponentType;
  label: string;
  icon: React.ReactNode;
}

const SidebarItem = ({ type, label, icon }: SidebarItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `template-${type}`,
    data: { type, isTemplate: true }
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center gap-3 p-3 mb-2 bg-white border border-gray-200 rounded-lg cursor-grab hover:border-blue-500 transition-colors shadow-sm active:cursor-grabbing"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default function Sidebar() {
  const components: SidebarItemProps[] = [
    { type: 'text', label: 'Text Block', icon: <Type size={18} /> },
    { type: 'image', label: 'Image', icon: <Image size={18} /> },
    { type: 'button', label: 'Button', icon: <MousePointer2 size={18} /> },
    { type: 'input', label: 'Input Field', icon: <TextCursorInput size={18} /> },
    { type: 'ai-agent', label: 'AI Agent', icon: <Bot size={18} /> },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Components</h2>
      <div className="flex-1">
        {components.map((comp) => (
          <SidebarItem key={comp.type} {...comp} />
        ))}
      </div>
    </div>
  );
}
