import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const demoNotes = [
    {
      _id: "61da8241a2b31fcab92c5463",
      user: "61d558b7566cd14260623047",
      title: "towfik",
      description: "jkg j  gtrnkg  gkrn ",
      tag: "r t rt rt rtrt ",
      date: "2022-01-09T06:35:45.421Z",
      __v: 0,
    },
    {
      _id: "61da8258a2b31fcab92c5465",
      user: "61d558b7566cd14260623047",
      title: "hasan",
      description: "jkg j  gtrnkg  gkrn ",
      tag: "r t rt rt rtrt ",
      date: "2022-01-09T06:36:08.127Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(demoNotes);
  //Addnote
  const addNote = (title, description, tag) => {
    //Api call

    //logic for add a new note
    const note = {
      "title": title,
      "description": description,
      "tag": tag
  }
  setNotes(notes.concat(note))
  };
  
  return (
    <NoteContext.Provider value={{ notes, addNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
