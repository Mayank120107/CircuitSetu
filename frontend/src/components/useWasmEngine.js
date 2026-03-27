import { useEffect, useState } from 'react';

export function useWasmEngine() {
  const [engine, setEngine] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    import('../lib/circuit_engine.js').then((Module) => {
      Module.default().then((loadedModule) => {
        setEngine(loadedModule);
        setIsReady(true);
        console.log("C++ MNA Engine Loaded via Wasm!");
      });
    });
  }, []);

  return { engine, isReady };
}
