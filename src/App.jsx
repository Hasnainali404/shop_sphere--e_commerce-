import { useEffect } from "react";
import "./index.css";
import AppRouter from "./router/router";

function App() {
  useEffect(() => {
      location.hash = "/";
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppRouter />
    </div>
  );
}

export default App;
