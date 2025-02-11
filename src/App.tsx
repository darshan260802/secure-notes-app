import { Route, Routes } from "react-router";
import "./App.css";
// import Note from './pages/note'
import Auth from "./pages/Auth";
import Note from "./pages/Note";
import { message } from "antd";

function App() {
  const [m,  context] = message.useMessage();
  return (
    <div className="app-wrapper">
      {context}
      <Routes>
        <Route path="/auth" element={<Auth messageApi={m} />} />
        <Route path="/" element={<Note messageApi={m} />} />
      </Routes>
    </div>
  );
}

export default App;
