import { Route, Routes } from 'react-router'
import './App.css'
import Note from './pages/note'
import Auth from './pages/Auth'

function App() {

  return (
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/" element={<Note/>} />
    </Routes>
  )
}

export default App
