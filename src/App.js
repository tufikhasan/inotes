import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { About, Home } from './container';
import { Alert, Login, Navbar, Signup } from './components';
import NoteState from './context/notes/NoteState';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
