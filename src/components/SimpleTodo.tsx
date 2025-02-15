import uid from "@/lib/uid";
import React, { useState } from "react";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};
const commonButtonStyles = "px-4 py-2 rounded-lg font-bold text-white";

export default function SimpleTodo() {
  const [addTodoText, setAddTodoText] = useState("");

  const [todos, setTodos] = useState<Todo[]>([
    { text: "Sample Todo", done: false, id: uid() },
    { text: "Another Todo", done: true, id: uid() },
    { text: "Third Todo", done: false, id: uid() },
  ]);

  function addTodo(text: string, done: boolean) {
    setTodos([{ text, done, id: uid() }, ...todos]);
    setAddTodoText("");
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearCompletedTodos() {
    setTodos(todos.filter((todo) => !todo.done));
  }

  function updateTodo(id: string, newText: string, done: boolean) {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
    const todoToUpdate = { ...newTodos[todoIndex] };
    newTodos[todoIndex] = todoToUpdate;

    todoToUpdate.text = newText;
    todoToUpdate.done = done;

    setTodos(newTodos);
  }

  return (
    <section className="mx-auto w-11/12 md:w-8/12 2xl:w-6/12">
      <div className="flex md:flex-row flex-col justify-center gap-2 mb-4 text-xl">
        <input
          type="text"
          value={addTodoText}
          onChange={(e) => setAddTodoText(e.target.value)}
          className="block flex-grow border-2 border-gray-600 rounded-md text-gray-800 text-center"
          placeholder="Add your task"
        />
        <button
          className={"flex-grow-0 flex-1 bg-green-500 w-full md:w-1/5 " + commonButtonStyles}
          onClick={() => addTodo(addTodoText, false)}
        >
          ＋
        </button>
      </div>
      <ul className="font-orbitron list-none">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onTodoChange={(text, done) => updateTodo(todo.id, text, done)}
            deleteTodo={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
      <div className="flex justify-end mt-2 mb-6">
        <button className={"bg-red-500 w-full md:w-1/3 2xl:w-1/4 " + commonButtonStyles} onClick={clearCompletedTodos}>
          Clear Completed
        </button>
      </div>
    </section>
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
    <li className="flex justify-between items-center gap-2 bg-white p-2 border-2 rounded-lg w-100">
      <input
        type="checkbox"
        disabled={editing}
        checked={todo.done}
        onChange={() => onTodoChange(todo.text, !todo.done)}
        className="w-5 h-5 text-blue-600"
      />
      {editing ? (
        <>
          <form className="flex flex-grow flex-1 gap-2" onSubmit={(e) => onSubmitText(e)}>
            <input
              type="text"
              className="block flex-grow border-2 border-gray-400 rounded-md text-gray-800 text-center"
              value={innerText}
              onChange={(e) => setInnerText(e.target.value)}
            />
            <button className={"bg-green-500 px-2 py-1 " + commonButtonStyles} type="submit">
              ✔
            </button>
          </form>
        </>
      ) : (
        <>
          <span
            className={
              "flex-grow flex-1 text-center break-words break-all " + (todo.done ? " line-through text-gray-400" : "")
            }
          >
            {todo.text}
          </span>
          <button
            className={"bg-yellow-500 px-2 py-1 " + commonButtonStyles}
            onClick={() => {
              setEditing(true);
            }}
          >
            ✎
          </button>
        </>
      )}
      <button className={"flex-grow-0 flex-1 bg-red-500 px-2 py-1 " + commonButtonStyles} onClick={deleteTodo}>
        🗑
      </button>
    </li>
  );
}
