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
        'token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1M2YzNmIwNzJkZTkzZWQ2ZDgxOGY5In0sImlhdCI6MTY0OTY2ODk3NX0.DYxSFmuP7Y3SES68ldhwQJZl002DqhjlvOSD48LupGo',
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
        'token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1M2YzNmIwNzJkZTkzZWQ2ZDgxOGY5In0sImlhdCI6MTY0OTY2ODk3NX0.DYxSFmuP7Y3SES68ldhwQJZl002DqhjlvOSD48LupGo',
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
        'token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1M2YzNmIwNzJkZTkzZWQ2ZDgxOGY5In0sImlhdCI6MTY0OTY2ODk3NX0.DYxSFmuP7Y3SES68ldhwQJZl002DqhjlvOSD48LupGo',
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
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1M2YzNmIwNzJkZTkzZWQ2ZDgxOGY5In0sImlhdCI6MTY0OTY2ODk3NX0.DYxSFmuP7Y3SES68ldhwQJZl002DqhjlvOSD48LupGo',
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)

    //logic for add edit a note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
