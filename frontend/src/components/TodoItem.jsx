import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "success";
    case "pending":
    default:
      return "warning";
  }
};

const TodoItem = ({ todo, onEdit, onDelete }) => {
  const { title, description, status = "pending" } = todo;

  return (
    <Card elevation={3} className="mb-4 rounded-xl shadow-md bg-white">
      <CardContent>
        <div className="flex justify-between items-start mb-2">
          <Typography
            variant="h6"
            className="text-indigo-700 font-semibold"
          >
            {title}
          </Typography>
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            color={getStatusColor(status)}
            size="small"
            variant="outlined"
            className="ml-4"
          />
        </div>
        <Typography variant="body2" className="text-gray-700">
          {description}
        </Typography>
      </CardContent>
      <CardActions className="px-4 pb-4">
        <Stack direction="row" spacing={2}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => onEdit(todo)}
            className="rounded-md"
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => onDelete(todo)}
            className="rounded-md"
          >
            Delete
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default TodoItem;
