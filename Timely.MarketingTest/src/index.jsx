import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Hello from React + Tailwindssss </h1>
      <p className="mt-2 text-slate-600">Mounted inside a Razor view.</p>
    </div>
  );
}

const el = document.getElementById("react-root");
if (el) createRoot(el).render(<App />);
