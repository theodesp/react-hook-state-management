import React from "react";
import { useState, useMemo, useContext } from "react";
import { Todo } from "../Example5";

const AppContext = React.createContext({});

/**
 * Our custom React hook to manage state
 */

type AppState = {
  todos: Todo[];
};

const useAppState = () => {
  const initialState: AppState = { todos: [] };
  // Manage the state using React.useState()
  const [state, setState] = useState<AppState>(initialState);

  // Build our actions. We'll use useMemo() as an optimization,
  // so this will only ever be called once.
  const actions = useMemo(() => getActions(setState), [setState]);

  return { state, actions };
};

// Define your actions as functions that call setState().
// It's a bit like Redux's dispatch(), but as individual
// functions.
const getActions = (
  setState: React.Dispatch<React.SetStateAction<AppState>>
) => ({
  deleteTodo: (id: number) => {
    setState((prevState: AppState) => ({
      ...prevState,
      todos: prevState.todos.filter((todo: Todo) => todo.id !== id)
    }));
  },
  editTodo: (id: number, text: string) => {
    setState((prevState: AppState) => ({
      ...prevState,
      todos: prevState.todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    }));
  },
  toggleTodo: (id: number) => {
    setState((prevState: AppState) => ({
      ...prevState,
      todos: prevState.todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  },
  addTodo: (text: string) => {
    setState((prevState: AppState) => ({
      ...prevState,
      todos: [
        ...prevState.todos,
        {
          id: prevState.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text
        }
      ]
    }));
  }
});

// Sub-components can use this function. It will pick up the
// `state` and `actions` given by useAppState() higher in the
// component tree.
const useAppContext = (): any => {
  return useContext(AppContext);
};

export { AppContext, useAppState, useAppContext };
