import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const demoNotes = [
    {
      _id: "61da8241a2b31fcab92c5463",
      user: "61d558b7566cd14260623047",
      title: "This is my first note",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,",
      tag: "Tag",
      date: "2022-01-09T06:35:45.421Z",
      __v: 0,
    },
    {
      _id: "61da8258a2b31fcab92c5465",
      user: "61d558b7566cd14260623047",
      title: "This is my second note",
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
      tag: "General",
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
