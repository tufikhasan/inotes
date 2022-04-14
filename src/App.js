import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { About, Home } from "./container";
import { Navbar } from "./components";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
