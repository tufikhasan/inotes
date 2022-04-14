import React from "react";
import "./Addnote.scss";

const Addnote = () => {
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
          <input type="text" name="title" id="title" />
        </div>
        <div>
          <label className="p-text" htmlFor="description">
            Give a note description
          </label>
          <textarea name="description" id="description" rows="5"></textarea>
        </div>
        <div>
          <label className="p-text" htmlFor="tag">
            Give a note tag
          </label>
          <input type="text" name="tag" id="tag" />
        </div>
        <input
          className="primary_button active"
          type="submit"
          value="Add note"
        />
      </form>
    </div>
  );
};

export default Addnote;
