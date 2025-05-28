
import { create } from 'zustand';

export interface TemplateElement {
  id: string;
  type: 'text' | 'date' | 'image' | 'dropdown' | 'checkbox';
  x: number;
  y: number;
  width: number;
  height: number;
  properties: {
    label?: string;
    placeholder?: string;
    value?: string;
    options?: string[];
    required?: boolean;
    fontSize?: number;
    color?: string;
    rotation?: number;
  };
  zIndex: number;
  isLocked?: boolean;
  isVisible?: boolean;
}

export interface TemplateProperties {
  title: string;
  type: string;
  users: string;
  pageSize: string;
  orientation: string;
}

interface EditorState {
  elements: TemplateElement[];
  selectedElementId: string | null;
  templateProperties: TemplateProperties;
  history: TemplateElement[][];
  historyIndex: number;
  
  // Actions
  addElement: (element: Omit<TemplateElement, 'id' | 'zIndex'>) => void;
  updateElement: (id: string, updates: Partial<TemplateElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  updateTemplateProperties: (properties: Partial<TemplateProperties>) => void;
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
  reorderElements: (fromIndex: number, toIndex: number) => void;
  reset: () => void;
}

const initialTemplateProperties: TemplateProperties = {
  title: 'قالب جديد',
  type: 'نموذج',
  users: '',
  pageSize: 'A4',
  orientation: 'Portrait',
};

export const useEditorStore = create<EditorState>((set, get) => ({
  elements: [],
  selectedElementId: null,
  templateProperties: initialTemplateProperties,
  history: [[]],
  historyIndex: 0,

  addElement: (element) => {
    const newElement: TemplateElement = {
      ...element,
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      zIndex: get().elements.length,
      isLocked: false,
      isVisible: true,
      properties: {
        ...element.properties,
        rotation: 0,
      },
    };
    
    set((state) => ({
      elements: [...state.elements, newElement],
      selectedElementId: newElement.id,
    }));
    
    get().saveToHistory();
  },

  updateElement: (id, updates) => {
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    }));
    
    get().saveToHistory();
  },

  deleteElement: (id) => {
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
    }));
    
    get().saveToHistory();
  },

  selectElement: (id) => {
    set({ selectedElementId: id });
  },

  updateTemplateProperties: (properties) => {
    set((state) => ({
      templateProperties: { ...state.templateProperties, ...properties },
    }));
  },

  saveToHistory: () => {
    const { elements, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...elements]);
    
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({
        elements: [...history[newIndex]],
        historyIndex: newIndex,
        selectedElementId: null,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({
        elements: [...history[newIndex]],
        historyIndex: newIndex,
        selectedElementId: null,
      });
    }
  },

  reorderElements: (fromIndex, toIndex) => {
    set((state) => {
      const sortedElements = [...state.elements].sort((a, b) => b.zIndex - a.zIndex);
      const [removed] = sortedElements.splice(fromIndex, 1);
      sortedElements.splice(toIndex, 0, removed);
      
      // Update z-index for all elements based on new order (highest index = top layer)
      const reorderedElements = sortedElements.map((el, index) => ({
        ...el,
        zIndex: sortedElements.length - 1 - index
      }));
      
      return {
        elements: reorderedElements,
      };
    });
    
    get().saveToHistory();
  },

  reset: () => {
    set({
      elements: [],
      selectedElementId: null,
      templateProperties: initialTemplateProperties,
      history: [[]],
      historyIndex: 0,
    });
  },
}));
