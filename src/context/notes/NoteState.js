import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const demoNotes = [];
  const [notes, setNotes] = useState(demoNotes);

  //Fetch all notes
  const getNotes = async () => {
    //Api call
    const response = await fetch(`${host}/api/notes/fatchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  //Addnote
  const addNote = async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //logic for add new note
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  //Delete note
  const deleteNote = async (id) => {
    //TODO: Api call
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    });
    //logic for delete a note by id
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit note
  const editNote = async (id, title, description, tag) => {
    //api call
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit note in client side
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ getNotes, notes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
