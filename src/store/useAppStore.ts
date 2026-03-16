import { create } from 'zustand';
import { AppState, AppNode, ComponentType } from '../types/app';
import { nanoid } from 'nanoid';

interface AppStore extends AppState {
  addNode: (type: ComponentType, parentId?: string | null) => void;
  removeNode: (id: string) => void;
  updateNode: (id: string, updates: Partial<AppNode>) => void;
  selectNode: (id: string | null) => void;
  reorderNodes: (nodes: AppNode[]) => void;
  updateAgentSettings: (settings: Partial<AppState['agentSettings']>) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  nodes: [],
  selectedNodeId: null,
  agentSettings: {
    systemPrompt: 'You are a helpful assistant.',
    model: 'moonshotai/kimi-k2-instruct-0905',
    temperature: 0.7,
  },
  addNode: (type, parentId = null) => set((state) => {
    const newNode: AppNode = {
      id: nanoid(),
      type,
      props: {
        content: type === 'text' ? 'New Text' : '',
        label: type === 'button' ? 'Click Me' : '',
        placeholder: type === 'input' ? 'Enter something...' : '',
        src: type === 'image' ? 'https://via.placeholder.com/150' : '',
      },
      styles: {
        padding: '8px',
        margin: '4px',
      },
      logic_actions: [],
      parentId,
    };
    return { nodes: [...state.nodes, newNode] };
  }),
  removeNode: (id) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== id),
    selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
  })),
  updateNode: (id, updates) => set((state) => ({
    nodes: state.nodes.map(node => node.id === id ? { ...node, ...updates } : node),
  })),
  selectNode: (id) => set({ selectedNodeId: id }),
  reorderNodes: (nodes) => set({ nodes }),
  updateAgentSettings: (settings) => set((state) => ({
    agentSettings: { ...state.agentSettings, ...settings },
  })),
}));
