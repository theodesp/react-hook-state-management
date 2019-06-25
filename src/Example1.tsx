import React from "react";
import { AppContext, useAppState, useAppContext } from "./hooks/useAppState";
import "./App.css";
import { Header, MainSection } from "./Example5";

const TodoList: React.FC = () => {
  const { state, actions } = useAppContext();

  return (
    <div>
      <Header addTodo={actions.addTodo} />
      <MainSection
        todos={state.todos}
        deleteTodo={actions.deleteTodo}
        editTodo={actions.editTodo}
        toggleTodo={actions.toggleTodo}
      />
    </div>
  );
};

const App: React.FC = () => {
  const { state, actions } = useAppState();
  return (
    <AppContext.Provider value={{ state, actions }}>
      <div>
        <TodoList />
      </div>
    </AppContext.Provider>
  );
};

export default App;
