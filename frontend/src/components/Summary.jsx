import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import Markdown from "react-markdown";

function Summary() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    handleFetchTodo();
  }, []);

  const handleFetchTodo = async (e) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/todo");

      if (!response.ok) throw new Error("Something went wrong!");
      const { data } = await response.json();

      const filtered = data.filter((todo) => todo.completed === false);
      handleSummary(filtered);
    } catch (error) {
      console.error("Failed to load:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSummary = async (filteredTodo) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incompleteTodo: filteredTodo }),
      });

      if (!response.ok) {
        throw new Error("Error in generating summary.");
      }
      const { data } = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Failed to load:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading || !summary ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: "8px",
          }}
        >
          <CircularProgress size={24} />
          <Typography variant="h6" color="initial">
            Generating Summary....
          </Typography>
        </div>
      ) : (
        <div>
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {summary
              .toString()
              .trim()
              .replace(/^[-,\s]+/, "")}
          </Markdown>
        </div>
      )}
    </div>
  );
}

export default Summary;
