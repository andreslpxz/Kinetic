"use client";

import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('@/components/builder/Canvas'), { ssr: false });
const Sidebar = dynamic(() => import('@/components/builder/Sidebar'), { ssr: false });
const PropertyInspector = dynamic(() => import('@/components/builder/PropertyInspector'), { ssr: false });

export default function Home() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 relative overflow-auto p-8">
        <Canvas />
      </div>
      <PropertyInspector />
    </main>
  );
}
