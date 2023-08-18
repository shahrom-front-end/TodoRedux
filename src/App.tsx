import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./store/store";
import {
  ITodo,
  addTodo,
  deleteTodo,
  completeTodo,
  editTodo,
} from "./reducers/todoSlice";

const App = () => {
  const todos: ITodo[] = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  // const dispatch = useDispatch()

  const [modal, setModal] = useState<boolean>(false);
  const [txt, setTxt] = useState<string>("");
  const [idx, setIdx] = useState<number>(0);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.todo.value.trim().length === 0) {
      alert("Text noo");
    } else {
      const text = e.currentTarget.todo.value;
      const id = Date.now();
      dispatch(addTodo({ id, text }));
      e.currentTarget.todo.value = "";
    }
  };

  const editTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const txt = event.currentTarget.edit.value;
    // dispatch(editTodo({ idx, txt }));
    // setModal(false);
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          required={true}
          name="todo"
          className="border p-[5px]"
          type="text"
          placeholder="Text"
        />
        <button
          type="submit"
          className="p-[5px] bg-[blue] text-white rounded-md"
        >
          Add
        </button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="flex gap-4">
          <h1
            style={{
              textDecoration: todo.complete ? "line-through" : "none",
              color: todo.complete ? "red" : "black",
            }}
          >
            {todo.title}
          </h1>
          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
            className="bg-[red] text-white p-[5px] rounded-md"
          >
            Delete
          </button>
          <button
            className="bg-[#2edcff] text-white p-[5px] rounded-md"
            onClick={() => setModal(true)}
          >
            Edit
          </button>
          <input
            type="checkbox"
            onClick={() => dispatch(completeTodo(todo.id))}
          />
        </div>
      ))}
      {modal ? (
        <form onSubmit={editTodo}>
          <input
            type="text"
            value={txt}
            name="edit"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTxt(event.target.value)
            }
            className="border p-[5px]"
            placeholder="edit"
          />
          <button type="submit">edit</button>
        </form>
      ) : null}
    </div>
  );
};

export default App;
