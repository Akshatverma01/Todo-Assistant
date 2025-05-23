import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import TodoList from "./TodoList";

const TodoForm = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [todoData, setTodoData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setLoading(true);
    setSuccessMsg("");

    try {
      const response = await fetch("http://localhost:5000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data, "data");
      setTodoData([...todoData, data]);
      setSuccessMsg("Todo added successfully!");
      setFormData({ title: "", description: "" });
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
   <Grid
  container
  spacing={4}
  direction="column"
  className="w-full max-w-xl mx-auto p-6 rounded-xl shadow-md bg-white"
>
  <Typography
    variant="h5"
    className="text-indigo-600 text-center font-bold mb-4"
  >
    Add a New Todo
  </Typography>
      <form onSubmit={handleSubmit} className="space-y-4 gap-2">
        <TextField
          label="Title"
          name="title"
          fullWidth
          variant="outlined"
          value={formData.title}
          onChange={handleChange}
          style={{margin:"10px 0"}}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={formData.description}
          onChange={handleChange}
          style={{margin:"10px 0"}}
        />

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className="rounded-lg mt-5 "

          >
            {loading ? <CircularProgress size={24} /> : "Add Todo"}
          </Button>
          {successMsg && (
            <Typography variant="body2" color="success.main">
              {successMsg}
            </Typography>
          )}
        </div>
      </form>
    </Grid>
  );
};

export default TodoForm;
