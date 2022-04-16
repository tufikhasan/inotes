import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const demoNotes = [];
  const [notes, setNotes] = useState(demoNotes);

  //Fetch all notes
  const getNotes = async ()=>{
    //Api call
    const response = await fetch(`${host}/api/notes/fatchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1M2YzNmIwNzJkZTkzZWQ2ZDgxOGY5In0sImlhdCI6MTY0OTY2ODk3NX0.DYxSFmuP7Y3SES68ldhwQJZl002DqhjlvOSD48LupGo"
      }
    })
    const json = await response.json()
    setNotes(json);

  }
  //Addnote
  const addNote = async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1M2YzNmIwNzJkZTkzZWQ2ZDgxOGY5In0sImlhdCI6MTY0OTY2ODk3NX0.DYxSFmuP7Y3SES68ldhwQJZl002DqhjlvOSD48LupGo"
      },
      body: JSON.stringify({title, description, tag})
    });
     //logic for add new note
     const note = await response.json()
     setNotes(notes.concat(note))
  };
  //Delete note
  const deleteNote = async (id)=>{
    //TODO: Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method: "DELETE",
      headers:{
        'Content-Type': 'application/json',
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1M2YzNmIwNzJkZTkzZWQ2ZDgxOGY5In0sImlhdCI6MTY0OTY2ODk3NX0.DYxSFmuP7Y3SES68ldhwQJZl002DqhjlvOSD48LupGo"
      }
    });
    const json = await response.json();
    console.log(json)
    //logic for delete a note by id
    const newNotes = notes.filter((note)=>{ return note._id !== id})
    setNotes(newNotes)

  }
  return (
    <NoteContext.Provider value={{ getNotes, notes, addNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
