import React from 'react';
import { AppContext, useAppState } from './hooks/useAppState'
import Toolbar from './toolbar';
import './App.css';

const App: React.FC = () => {
  const { state, actions } = useAppState();
  return (
    <AppContext.Provider value={{ state, actions }}>
      <div>
        <Toolbar />
      </div>
    </AppContext.Provider>
  );
}

export default App;
