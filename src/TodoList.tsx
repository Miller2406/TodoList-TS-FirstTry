import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export const TodoList = () => {
  interface item {
    id: number;
    text: string;
    isComplete: boolean;
  }

  const [todos, setTodos] = useState<item[]>([
    { id: 1, text: "My first todo list", isComplete: false },
    { id: 2, text: "Try to do my best", isComplete: false },
    { id: 3, text: "Nah", isComplete: false },
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

  const handleAdd = () => {
    const newTodo = { id: Date.now(), text: input, isComplete: false };
    if (input != "") {
      setTodos([...todos, newTodo]);
      console.log(todos);
    }
  };

  const handleDelete = (id: number) => {
    const arr = todos.filter((d) => d.id != id);
    setTodos(arr);
    console.log(todos);
  };

  const [textarea, setTextarea] = useState<item[]>([
    {
      id: 0,
      text: "",
      isComplete: false,
    },
  ]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleTextarea = (id: number) => {
    let objTextarea = todos.filter((todo) => todo.id === id);
    console.log(objTextarea);
    setTextarea(objTextarea);
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const setEdittextarea = () => {
    setIsEditing(!isEditing);
    const newTodo = [...todos];
    const toEditTodo: item | undefined = newTodo.find(
      (t) => t.id === textarea[0].id
    );
    if (toEditTodo) {
      toEditTodo.text = textarea[0].text;
      setTodos(newTodo);
    }
  };

  return (
    <div className="main-page">
      <div className={isEditing ? "none" : "main-container"}>
        <h1>Todo List</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                onClick={() => handleToggle(todo.id)}
                title="Click to remark the task!"
                style={{
                  textDecoration: todo.isComplete ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <div>
                <FaEdit
                  title="Edit Text"
                  onClick={() => handleTextarea(todo.id)}
                />
                <FaWindowClose
                  title="Remove Text"
                  style={{ marginTop: "1px" }}
                  onClick={() => handleDelete(todo.id)}
                />
              </div>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add Todo List"
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <button onClick={() => handleAdd()}>Add</button>
      </div>
      <div className={isEditing ? "main-container" : "none"}>
        <h2>Edit a todo list</h2>
        {textarea.map(() => {
          if (isEditing) {
            return (
              <textarea
                onChange={(e) =>
                  setTextarea([
                    {
                      id: textarea[0].id,
                      text: e.currentTarget.value,
                      isComplete: textarea[0].isComplete,
                    },
                  ])
                }
              >
                {textarea[0].text}
              </textarea>
            );
          }
        })}
        <div>
          <button onClick={() => setEdittextarea()}>Done</button>
          <button onClick={() => handleCancelEdit()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
