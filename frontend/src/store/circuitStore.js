import { create } from 'zustand';

const useCircuitStore = create((set, get) => ({
  components: [],
  results: {},
  addComponent: (component) => set((state) => ({
    components: [...state.components, component]
  })),

  updateComponentValue: (id, newValue) => set((state) => ({
    components: state.components.map(comp => 
      comp.id === id ? { ...comp, value: newValue } : comp
    )
  })),

  setResults: (data) => set({ results: data }),

  getEnginePayload: () => {
    const { components } = get();
    const payload = components.map(c => ({
      type: c.type,       
      nodeA: c.nodeA,  
      nodeB: c.nodeB,  
      value: c.value  
    }));
    
    return JSON.stringify({ components: payload });
  }
}));

export default useCircuitStore;
