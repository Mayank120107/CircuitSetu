export function generateSimulationPayload(components, wires) {
  let parent = {};
  
  function find(i) {
    if (parent[i] === undefined) parent[i] = i;
    if (parent[i] === i) return i;
    return parent[i] = find(parent[i]);
  } 
  function union(i, j) {
    let rootI = find(i);
    let rootJ = find(j);
    if (rootI !== rootJ) parent[rootI] = rootJ;
  }
  wires.forEach(w => {
    let pin1 = `${w.from}-${w.fromSide}`;
    let pin2 = `${w.to}-${w.toSide}`;
    union(pin1, pin2);
  });
  let groups = {};
  components.forEach(c => {
    ['left', 'right'].forEach(side => {
      let pin = `${c.id}-${side}`;
      let root = find(pin);
      if (!groups[root]) groups[root] = { id: null, hasGround: false };
      
      if (c.type === 'ground') groups[root].hasGround = true;
    });
  });
  let nextNodeId = 1;
  Object.keys(groups).forEach(root => {
    if (groups[root].hasGround) {
      groups[root].id = 0;
    } else {
      groups[root].id = nextNodeId++; 
    }
  });
  let payload = components
    .filter(c => c.type !== 'ground') 
    .map(c => {
      let engType = c.type === 'battery' ? 'voltage_source' : c.type;
      let val = c.value !== undefined ? Number(c.value) : 
                (engType === 'voltage_source' ? 0.0 : 
                 engType === 'resistor' ? 0.0 : 0.0);
                
      return {
        id: c.id.toString(),
        type: engType,
        value: val,
        nodeA: groups[find(`${c.id}-left`)].id,
        nodeB: groups[find(`${c.id}-right`)].id
      };
    });

  return JSON.stringify(payload);
}