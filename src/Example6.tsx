import React, { useCallback } from 'react';
import store from './stores/redux-store';
import { ReduxProvider, useReduxState, useReduxDispatch } from './stores/redux-bindings';
import { MainSection, Header } from './Example5';

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <TodoList />
  </ReduxProvider>
);

const TodoList: React.FC = () => {
  const state = useReduxState();
  const dispatch = useReduxDispatch();

  const addTodo = useCallback((text: string) => dispatch({ type: 'ADD_TODO', text: text, }), []);
  const deleteTodo = useCallback((id: number) => dispatch({ type: 'DELETE_TODO', id: id, }), []);
  const editTodo = useCallback((id: number, text: string) => 
    dispatch({ type: 'EDIT_TODO', id: id, text: text }), []);
  const toggleTodo = useCallback((id: number) => dispatch({ type: 'TOGGLE_TODO', id: id }), []);

  return (
    <div>
      <Header addTodo={addTodo} />
      <MainSection
        todos={state.todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  );
};

export default App;