export type ComponentType = 'text' | 'image' | 'button' | 'input' | 'ai-agent';

export interface ComponentStyles {
  padding?: string;
  margin?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  [key: string]: string | undefined;
}

export interface LogicAction {
  type: 'click' | 'change' | 'submit';
  action: 'navigate' | 'alert' | 'update-state' | 'trigger-ai';
  payload: any;
}

export interface AppNode {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  styles: ComponentStyles;
  logic_actions: LogicAction[];
  children?: AppNode[];
  parentId?: string | null;
}

export interface AppState {
  nodes: AppNode[];
  selectedNodeId: string | null;
  agentSettings: {
    systemPrompt: string;
    model: string;
    temperature: number;
  };
}
