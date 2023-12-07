import { useState } from "react";

export const TodoList = () => {
  interface item {
    id: number;
    text: string;
    isComplete: boolean;
  }

  const [todos, setTodos] = useState<item[]>([
    { id: 1, text: "My first todo list", isComplete: false },
    { id: 2, text: "Try to do my best copy", isComplete: false },
  ]);

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      })
    );
  };

  const [input, setInput] = useState<string>("");

  const handleClick = () => {
    const newTodo = { id: Date.now(), text: input, isComplete: false };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="main-container">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{
              textDecoration: todo.isComplete ? "line-through" : "none",
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add Todo List"
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};
