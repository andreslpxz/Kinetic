import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Trash2 } from 'lucide-react';

export default function PropertyInspector() {
  const { selectedNodeId, nodes, updateNode, removeNode, agentSettings, updateAgentSettings } = useAppStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="w-80 h-full bg-white border-l border-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4">Properties</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Global Agent Settings
            </label>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">System Prompt</label>
                <textarea
                  className="w-full border p-2 rounded text-sm h-32"
                  value={agentSettings.systemPrompt}
                  onChange={(e) => updateAgentSettings({ systemPrompt: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Model</label>
                <input
                  className="w-full border p-2 rounded text-sm"
                  value={agentSettings.model}
                  onChange={(e) => updateAgentSettings({ model: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handlePropChange = (key: string, value: string) => {
    updateNode(selectedNode.id, {
      props: { ...selectedNode.props, [key]: value },
    });
  };

  const handleStyleChange = (key: string, value: string) => {
    updateNode(selectedNode.id, {
      styles: { ...selectedNode.styles, [key]: value },
    });
  };

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Properties</h2>
        <button
          onClick={() => removeNode(selectedNode.id)}
          className="text-red-500 hover:text-red-700 p-1"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Component: {selectedNode.type}
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold border-b pb-1">Props</h3>
          {Object.keys(selectedNode.props).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 capitalize">{key}</label>
              <input
                className="w-full border p-2 rounded text-sm"
                value={selectedNode.props[key]}
                onChange={(e) => handlePropChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold border-b pb-1">Styles</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Padding</label>
            <input
              className="w-full border p-2 rounded text-sm"
              value={selectedNode.styles.padding || ''}
              onChange={(e) => handleStyleChange('padding', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Margin</label>
            <input
              className="w-full border p-2 rounded text-sm"
              value={selectedNode.styles.margin || ''}
              onChange={(e) => handleStyleChange('margin', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Background Color</label>
            <input
              type="color"
              className="w-full h-10 border p-1 rounded"
              value={selectedNode.styles.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
