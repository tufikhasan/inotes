import React from "react";
import NoteItem from "../NoteItem/NoteItem";
import "./Notes.scss";

const Notes = () => {
  return (
    <div className="app__notes">
      <h2 className="head-text">
        all <span>of Your</span> notes
      </h2>
      <div>
        <NoteItem
          title="title"
          description="descri ptio ndescr iption jg kgj  kjg nfkg gg f g fng g gfdkg n gfnkg g ng ng descri ptio ndescr iption jg kgj  kjg nfkg gg f g fng g gfdkg n gfnkg g ng ng descri ptio ndescr iption jg kgj  kjg nfkg gg f g fng g gfdkg n gfnkg g ng ng"
          tag="tag"
        />
        <NoteItem
          title="title"
          description="ptio ndescr iption jg kgj  kjg nfkg gg f descri ption"
          tag="tag"
        />
        <NoteItem
          title="title"
          description="lorem ptio ndescr iption jg kgj  kjg nfkg gg f  des cri ption"
          tag="tag"
        />
        <NoteItem
          title="title"
          description="scrip ptio ndescr iption jg kgj  kjg nfkg gg f  tion"
          tag="tag"
        />
      </div>
    </div>
  );
};

export default Notes;
