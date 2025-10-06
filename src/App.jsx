import { useState, useEffect } from "react";
import RecipeSubmissionForm from "./components/RecipeSubmissionForm";
import "./index.css";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.classList.toggle("light-mode", theme === "light");
  }, [theme]);

  return (
    <div className="app-container">
      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            background: "none",
            color: theme === "dark" ? "#fff" : "#222",
            border: "1px solid",
            borderRadius: "8px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h1>Recipe Submission Form</h1>
      <RecipeSubmissionForm />
    </div>
  );
}

export default App;
