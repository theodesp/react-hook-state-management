import React from 'react';
import { StateProvider } from './hooks/useStateValue';
import { useStateValue } from './hooks/useStateValue';

const ThemedButton: React.FC = () => {
  const [{ theme }, dispatch]: any = useStateValue();
  return (
    <button
      style={{color: theme.primary}}
      onClick={() => dispatch({
        type: 'changeTheme',
        newTheme: { primary: 'blue'}
      })}
    >
      Make me blue!
    </button>
  );
}

const App: React.FC = () => {
  const initialState = {
    theme: { primary: 'green' }
  };
  
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'changeTheme':
        return {
          ...state,
          theme: action.newTheme
        };
        
      default:
        return state;
    }
  };
  
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
        <ThemedButton></ThemedButton>
    </StateProvider>
  );
}

export default App;