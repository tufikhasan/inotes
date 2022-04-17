import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { About, Home } from './container';
import { Login, Navbar, Signup } from './components';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
