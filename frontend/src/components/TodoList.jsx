import React, { useState } from "react";
import TodoItem from "./TodoItem";
import EditTodo from "./Modal";
import { useEffect } from "react";

const TodoList = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [editTodo, setEditTodo] = useState({});

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish project",
      description: "Complete the API integration",
      status: "pending",
    },
    {
      id: 2,
      title: "Submit report",
      description: "Email the final draft",
      status: "completed",
    },
  ]);

  useEffect(() => {
    handleFetchTodo();
  }, [editTodo]);

  const handleFetchTodo = async (e) => {
    setLoading(true);

    try {
         const response = await fetch("http://localhost:5000/");

      if (!response.ok) throw new Error("Something went wrong!");
      const {data} = await response.json();
      console.log(data, "data");

      setTodos([...todos, ...data]);
    } catch (error) {
      console.error("Failed to load:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (todoToDelete) => {
    const filtered = todos.filter((todo) => todo.id !== todoToDelete.id);
    setTodos(filtered);
  };


  const handleEdit = (todoToEdit) => {
    if (todoToEdit) {
      setEditTodo(todoToEdit);
      setOpen(true);
      console.log("Edit clicked for:", todoToEdit);
    }
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onUpdate={handleUpdateTodo}
        />
      ))}
      {open && (
        <EditTodo
          open={open}
          setOpen={setOpen}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
        />
      )}
    </div>
  );
};

export default TodoList;
