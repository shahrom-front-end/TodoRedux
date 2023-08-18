import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./store/store";
import { ITodo, addTodo, deleteTodo , completeTodo } from "./reducers/todoSlice";

const App = () => {
  const todos: ITodo[] = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();


  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.todo.value.trim().length=== 0) {
     alert("Text noo");
    }else{
      const text = e.currentTarget.todo.value; 
      const id = Date.now();
      dispatch(addTodo({ id, text }));
      e.currentTarget.todo.value = "";
    }
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input required = {true} name="todo" className="border p-[5px]" type="text" placeholder="Text" />
        <button type="submit" className="p-[5px] bg-[blue] text-white rounded-md">Add</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="flex gap-4">
          <h1 style={{textDecoration:todo.complete?"line-through":"none", color:todo.complete ? "red" :"black"}}>{todo.title}</h1>
          <button onClick={() => dispatch(deleteTodo(todo.id))} className="bg-[red] text-white p-[5px] rounded-md">Delete</button> 
          <input type="checkbox" onClick={()=>dispatch(completeTodo(todo.id))} />
          
        </div>
      ))}
    </div>
  );
};

export default App;
