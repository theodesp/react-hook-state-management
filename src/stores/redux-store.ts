import { createStore } from 'redux';
import { Todo } from '../Example5';

export type AppState = {
  todos: Todo[];
};

const reducer = (state: AppState = {todos: []}, action: any) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, 
        todos: [
          ...state.todos,
        {
          id: state.todos.reduce((maxId: number, todo: Todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ] };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((todo: Todo) => todo.id !== action.id) };
    case 'TOGGLE_TODO':
      return { ...state, todos: state.todos.map((todo: Todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      ) };
    case 'EDIT_TODO':
      return { ...state, todos: state.todos.map((todo: Todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      ) };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;