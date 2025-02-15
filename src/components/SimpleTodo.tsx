import React, { useState } from "react";

type Todo = {
  text: string;
  done: boolean;
};

export default function SimpleTodo() {
  const [addTodoText, setAddTodoText] = useState("");

  const [todos, setTodos] = useState<Todo[]>([
    { text: "Sample Todo", done: false },
    { text: "Another Todo", done: false },
    { text: "Third Todo", done: false },
  ]);

  function addTodo(text: string, done: boolean) {
    setTodos([...todos, { text, done }]);
    setAddTodoText("");
  }

  function deleteTodo(index: number) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  function updateTodo(index: number, newText: string, done: boolean) {
    console.log("updateTodo", index, newText, done);
    const newTodos = [...todos];
    const todoToUpdate = { ...newTodos[index] };
    newTodos[index] = todoToUpdate;

    todoToUpdate.text = newText;
    todoToUpdate.done = done;

    setTodos(newTodos);
  }

  return (
    <>
      <div className="flex md:flex-row flex-col justify-center gap-2 mx-auto mb-4 w-full md:w-5/12 text-xl">
        <input
          type="text"
          value={addTodoText}
          onChange={(e) => setAddTodoText(e.target.value)}
          className="block flex-grow border-2 border-gray-600 rounded-md text-gray-800 text-center"
          placeholder="Add your task"
        />
        <button
          className="flex-grow-0 flex-1 bg-green-500 px-4 py-2 rounded-lg w-full md:w-1/5 font-bold text-white"
          onClick={() => addTodo(addTodoText, false)}
        >
          ＋
        </button>
      </div>
      <ul className="mx-auto w-full md:w-5/12 font-orbitron list-none">
        {todos.map((todo, i) => (
          <TodoItem
            key={i}
            todo={todo}
            onTodoChange={(text, done) => updateTodo(i, text, done)}
            deleteTodo={() => deleteTodo(i)}
          />
        ))}
      </ul>
    </>
  );
}

function TodoItem({
  todo,
  onTodoChange,
  deleteTodo,
}: {
  todo: Todo;
  onTodoChange: (text: string, done: boolean) => void;
  deleteTodo: () => void;
}) {
  const [innerText, setInnerText] = useState(todo.text);
  const [editing, setEditing] = useState(false);

  function onSubmitText(e: React.FormEvent) {
    e.preventDefault();
    setEditing(false);
    onTodoChange(innerText, todo.done);
  }

  return (
    <li className="flex justify-between items-center bg-white p-2 border-2 rounded-lg">
      <input
        type="checkbox"
        disabled={editing}
        checked={todo.done}
        onChange={() => onTodoChange(todo.text, !todo.done)}
        className="w-5 h-5 text-blue-600"
      />
      {editing ? (
        <>
          <form className="flex flex-grow flex-1" onSubmit={(e) => onSubmitText(e)}>
            <input
              type="text"
              className="flex-grow text-center"
              value={innerText}
              onChange={(e) => setInnerText(e.target.value)}
            />
            <button className="bg-green-500 px-2 py-1 rounded text-white" type="submit">
              ✔
            </button>
          </form>
        </>
      ) : (
        <>
          <span className={"flex-grow text-center" + (todo.done ? " line-through" : "")}>{todo.text}</span>
          <button
            className="bg-yellow-500 px-2 py-1 rounded text-white"
            onClick={() => {
              setEditing(true);
            }}
          >
            ✎
          </button>
        </>
      )}
      {/* Prompt confirmar? */}
      <button className="bg-red-500 px-2 py-1 rounded text-white" onClick={deleteTodo}>
        🗑
      </button>
    </li>
  );
}
