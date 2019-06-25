import React, { useContext, useEffect, useReducer, useRef, useMemo } from 'react';

const ReduxStoreContext = React.createContext({});

export const ReduxProvider = ({ store, children }: any) => (
  <ReduxStoreContext.Provider value={store}>
    {children}
  </ReduxStoreContext.Provider>
);

export const useReduxDispatch = () => {
  const store: any = useContext(ReduxStoreContext);
  return store.dispatch;
};

const forcedReducer = (state: any) => !state;
const useForceUpdate = () => useReducer(forcedReducer, false)[1];

export const useReduxState = () => { 
  const forceUpdate: any = useForceUpdate();
  const store: any = useContext(ReduxStoreContext);
  const state = useRef(store.getState());
  const used: any = useRef({});
  const handler = useMemo(() => ({
    get: (target: any, name: any) => {
      used.current[name] = true;
      return target[name];
    },
  }), []);
  useEffect(() => {
    const callback = () => {
      const nextState = store.getState();
      const changed = Object.keys(used.current)
        .find(key => state.current[key] !== nextState[key]);
      if (changed) {
        state.current = nextState;
        forceUpdate();
      }
    };
    const unsubscribe = store.subscribe(callback);
    return unsubscribe;
  }, []);
  return new Proxy(state.current, handler);
};