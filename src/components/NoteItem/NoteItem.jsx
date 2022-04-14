import React from "react";
import "./NoteItem.scss";

const NoteItem = (props) => {
  const { title, description, tag } = props;
  return (
    <div className="app__note">
      <h3 className="bold-text">{title}</h3>
      <p className="p-text">{description}</p>
      <p className="p-text">{tag}</p>
    </div>
  );
};

export default NoteItem;
