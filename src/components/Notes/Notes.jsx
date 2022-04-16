import React, { useContext, useEffect } from "react";
import noteContext from "../../context/notes/noteContext";
import NoteItem from "../NoteItem/NoteItem";
import "./Notes.scss";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [ ])
  return (
    <div className="app__notes">
      <h2 className="head-text">
        all <span>of Your</span> notes
      </h2>
      <div>
        {notes.map((note, index) => {
          return <NoteItem key={`note-${index}`} note={note} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
