import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../../context/notes/noteContext';
import Modal from '../Modal/Modal';
import NoteItem from '../NoteItem/NoteItem';
import './Notes.scss';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null)
  const updateNote = (note)=>{
    ref.current.click()
  }

  return (
    <>
    <div className="app__notes">
      <h2 className="head-text">
        all <span>of Your</span> notes
      </h2>
      <div>
        {notes.map((note, index) => {
          return <NoteItem key={`note-${index}`} note={note} updateNote={updateNote} />;
        })}
      </div>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
        className="primary_button"
        ref={ref} style={{display:'none'}}>
        open
      </button>
    </div>
    {openModal && <Modal closeModal={setOpenModal} />}
    </>
  );
};

export default Notes;
