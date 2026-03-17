"use client";

import dynamic from 'next/dynamic';
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { useAppStore } from '@/store/useAppStore';

const Canvas = dynamic(() => import('@/components/builder/Canvas'), { ssr: false });
const Sidebar = dynamic(() => import('@/components/builder/Sidebar'), { ssr: false });
const PropertyInspector = dynamic(() => import('@/components/builder/PropertyInspector'), { ssr: false });

export default function Home() {
  const { nodes, addNode, updateNode } = useAppStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta, over } = event;

    // Problem 3: Validate drops within the canvas
    if (over?.id !== 'canvas') return;

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
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <main className="flex h-screen w-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex-1 relative overflow-auto p-8">
          <Canvas />
        </div>
        <PropertyInspector />
      </main>
    </DndContext>
  );
}
