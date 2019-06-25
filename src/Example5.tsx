import React, { useState } from 'react';
import classnames from 'classnames';

export type Todo = {
  id: number;
  completed: boolean;
  text: string;
}

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text
      }
    ]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text } : todo)));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return [
    todos,
    {
      addTodo,
      deleteTodo,
      editTodo,
      toggleTodo,
    }
  ];
};

const App = () => {
  const [
    todos,
    { addTodo, deleteTodo, editTodo, toggleTodo }
  ]: any = useTodos();

  return (
    <div>
      <Header addTodo={addTodo} />
      <MainSection
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  );
};

type TodoTextInputProps = {
  text?: string
  editing?: boolean;
  placeholder?: string;
  onSave: (text: string) => void;
  newTodo: boolean;
}
type TodoTextInputState = {
  text: string;
}

export class TodoTextInput extends React.Component<TodoTextInputProps, TodoTextInputState> {
  state = {
    text: this.props.text || ''
  };

  handleSubmit = (e: React.KeyboardEvent<any>) => {
    const text = e.currentTarget.value.trim();
    if (e.which === 13) { // Enter Key
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ text: e.currentTarget.value });
  };

  handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    if (!this.props.newTodo) {
      this.props.onSave(e.currentTarget.value);
    }
  };

  render() {
    return (
      <input
        className={classnames({
          edit: this.props.editing,
          "new-todo": this.props.newTodo
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}

type HeaderProps = {
  addTodo?: (text: string) => void;
}

export const Header = ({ addTodo }: HeaderProps ) => {
  const onSave = (text: string) => {
    if (text.length !== 0) {
      addTodo && addTodo(text);
    }
  };
  return (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo={true}
      onSave={onSave}
      placeholder="Tell me what you want to do!"
    />
  </header>
  )
}

  type MainSectionProps = {
    todos: Todo[];
    deleteTodo: (id: number) => void;
    editTodo: (id: number, text: string) => void;
    toggleTodo: (id: number) => void;
  }

  export const MainSection = ({
    todos,
    deleteTodo,
    editTodo,
    toggleTodo,
  }: MainSectionProps) => {
    return (
      <section className="main">
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
        />
      </section>
    );
  };

type TodoListProps = MainSectionProps

  const TodoList = ({ todos, editTodo, deleteTodo, toggleTodo }: TodoListProps) => (
    <ul className="todo-list">
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );

  type TodoItemProps = Pick<MainSectionProps, 'toggleTodo' | 'deleteTodo' | 'editTodo'> & {
    todo: Todo;
  }
  type TodoItemPropsState = {
    editing: boolean;
  }

  export class TodoItem extends React.Component<TodoItemProps, TodoItemPropsState> {
    state = {
      editing: false
    };
  
    handleDoubleClick = () => {
      this.setState({ editing: true });
    };
  
    handleSave = (id: number, text: string) => {
      if (text.length === 0) {
        this.props.deleteTodo(id);
      } else {
        this.props.editTodo(id, text);
      }
      this.setState({ editing: false });
    };
  
    render() {
      const { todo, toggleTodo, deleteTodo } = this.props;
  
      let element;
      if (this.state.editing) {
        element = (
          <TodoTextInput
            text={todo.text}
            editing={this.state.editing}
            onSave={text => this.handleSave(todo.id, text)}
            newTodo={false}
          />
        );
      } else {
        element = (
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
            <button className="destroy" onClick={() => deleteTodo(todo.id)} />
          </div>
        );
      }
  
      return (
        <li
          className={classnames({
            completed: todo.completed,
            editing: this.state.editing
          })}
        >
          {element}
        </li>
      );
    }
  }



export default App;