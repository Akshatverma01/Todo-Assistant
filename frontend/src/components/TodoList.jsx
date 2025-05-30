import React, { useState } from "react";
import TodoItem from "./TodoItem";
import EditTodo from "./Modal";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const TodoList = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [editTodo, setEditTodo] = useState({});

  const [todos, setTodos] = useState([
    {
      id: 11,
      title: "Finish project",
      description: "Complete the API integration",
      status: "pending",
    },
    {
      id: 22,
      title: "Submit report",
      description: "Email the final draft",
      status: "completed",
    },
  ]);

  useEffect(() => {
    handleFetchTodo();
  }, [editTodo]);

  // FETH TODO
  const handleFetchTodo = async (e) => {
    setLoading(true);
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`${BASE_URL}/todo`);

      if (!response.ok) throw new Error("Something went wrong!");
      const { data } = await response.json();
      setTodos([...todos, ...data]);
    } catch (error) {
      console.error("Failed to load:", error);
    } finally {
      setLoading(false);
    }
  };

  // DELET TODO
  const handleDelete = async (todoToDelete) => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`${BASE_URL}/todo/${todoToDelete.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const { data } = await response.json();
      const filtered = todos.filter((todo) => todo.id !== todoToDelete.id);
      setTodos(filtered);
    } catch (error) {
      console.error("Failed to load:", error);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE TODO
  const handleEdit = async (todoToEdit) => {
    if (todoToEdit) {
      setEditTodo(todoToEdit);
      setOpen(true);
      console.log("Edit clicked for:", todoToEdit);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <CircularProgress
          size={50}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        />
      ) : (
        todos &&
        todos.length > 0 &&
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onEdit={handleEdit}
            // onUpdate={handleUpdateTodo}
          />
        ))
      )}
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
