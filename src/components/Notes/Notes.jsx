import React from "react";
import NoteItem from "../NoteItem/NoteItem";
import "./Notes.scss";

const Notes = () => {
  return (
    <div className="app__notes">
      <NoteItem />
    </div>
  );
};

export default Notes;
