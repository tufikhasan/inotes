import React from "react";
import "./NoteItem.scss";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="app__note">
      <h3 className="bold-text">{note.title}</h3>
      <p className="p-text">
        {`${
          note.description.length > 150
            ? note.description.slice(0, 150)
            : note.description
        }`}
        {note.description.length > 150 ? <Link to="/">... read more</Link> : ""}
      </p>
      <p className="p-text tag">{note.tag}</p>
      <div>
        <AiOutlineEdit />
        <AiOutlineDelete />
      </div>
    </div>
  );
};

export default NoteItem;
