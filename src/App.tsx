import { Route, Routes } from "react-router";
import "./App.css";
// import Note from './pages/note'
import Auth from "./pages/Auth";
import Note from "./pages/Note";

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Note />} />
      </Routes>
    </div>
  );
}

export default App;
