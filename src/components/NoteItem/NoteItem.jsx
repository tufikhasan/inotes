import React from "react";
import "./NoteItem.scss";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const NoteItem = (props) => {
  const { title, description, tag } = props;
  return (
    <div className="app__note">
      <h3 className="bold-text">{title}</h3>
      <p className="p-text">
        {`${
          description.length > 150 ? description.slice(0, 150) : description
        }`}
        {description.length > 150 ? <Link to="/">... read more</Link> : ""}
      </p>
      <p className="p-text tag">{tag}</p>
      <div>
        <AiOutlineEdit />
        <AiOutlineDelete />
      </div>
    </div>
  );
};

export default NoteItem;
