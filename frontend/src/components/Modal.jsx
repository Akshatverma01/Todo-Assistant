import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { TextField, FormControlLabel, Checkbox, CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditTodo({
  open,
  setOpen,
  editTodo,
  setEditTodo,
  onUpdate,
}) {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [status, setStatus] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMsg("");
  };

  useEffect(() => {
    if (editTodo) {
      setFormData({
        title: editTodo.title || "",
        description: editTodo.text || "",
      });
    }
  }, [editTodo]);
  console.log(editTodo,"editTodo")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setLoading(true);
    setSuccessMsg("");
    try {
      const response = await fetch(`http://localhost:5000/todo/${editTodo?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status }),
      });

      const data = await response.json();
      console.log(data, "data");
      setSuccessMsg("Todo updated successfully!");
      setFormData({ title: "", description: "" });

      if (onUpdate) onUpdate({ ...editTodo, ...formData });

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit} className="space-y-4 gap-2">
            <TextField
              label="Title"
              name="title"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
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
            />
            <FormControlLabel
              label="completed"
              control={
                <Checkbox
                  value="complete"
                  checked={status}
                  onChange={() => setStatus(!status)}
                  color="primary"
                />
              }
            />
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                className="rounded-lg"
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
        </Box>
      </Modal>
    </div>
  );
}
