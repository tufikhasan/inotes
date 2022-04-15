import React, { useContext, useState } from "react";
import noteContext from "../../context/notes/noteContext";
import "./Addnote.scss";

const Addnote = () => {

  const context = useContext(noteContext)
  const {addNote} = context


  const [note, setNotes] = useState({title: "", description: "", tag: "Default"})
  //Handle add note function
  const handleAddNote = (e)=>{
    //ignore page load
    e.preventDefault();
    addNote(note.title,note.description,note.tag)

  }
  //input on change
  const handleOnChange = (e)=>{
    setNotes({...note, [e.target.name]:[e.target.value]})
  }
  return (
    <div className="app__addnote">
      <h2 className="head-text">
        Add <span>new</span> Note
      </h2>
      <form action="">
        <div>
          <label className="p-text" htmlFor="title">
            Give a note title
          </label>
          <input type="text" name="title" onChange={handleOnChange} id="title" />
        </div>
        <div>
          <label className="p-text" htmlFor="description">
            Give a note description
          </label>
          <textarea name="description" onChange={handleOnChange} id="description" rows="5"></textarea>
        </div>
        <div>
          <label className="p-text" htmlFor="tag">
            Give a note tag
          </label>
          <input type="text" name="tag" onChange={handleOnChange} id="tag" />
        </div>
        <input
          className="primary_button active"
          type="submit"
          value="Add note" onClick={handleAddNote}
        />
      </form>
    </div>
  );
};

export default Addnote;
