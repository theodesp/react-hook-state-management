import React from 'react';
import { useAppContext } from './hooks/useAppState';

const Toolbar: React.FC = () => {
  // In other components such as this, we can use the
  // useAppContext() hook to fetch the 'state' and 'actions'
  // from higher up in the component tree.
  //
  // This takes the `value` given in `<AppContext.Provider>`
  // in the top-level component above (MyApp.js).
  const { state, actions } = useAppContext()

  return (
    <div>
      <button onClick={actions.increment}> + </button>
      <button onClick={actions.decrement}> - </button>
      <div>{state.count}</div>
    </div>
  )
}

export default Toolbar;