import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../../context/notes/noteContext';
import NoteItem from '../NoteItem/NoteItem';
import { HiOutlineX } from 'react-icons/hi';
import './Notes.scss';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const updateNote = (note) => {
    ref.current.click();
  };

  return (
    <>
      <div className="app__notes">
        <h2 className="head-text">
          all <span>of Your</span> notes
        </h2>
        <div>
          {notes.map((note, index) => {
            return (
              <NoteItem
                key={`note-${index}`}
                note={note}
                updateNote={updateNote}
              />
            );
          })}
        </div>
        <button
          onClick={() => {
            setOpenModal(true);
          }}
          className="primary_button"
          ref={ref}
          style={{ display: 'none' }}
        >
          open
        </button>
      </div>
      {openModal && (
        <div className="app__modal-bg">
          <div className="app__modal">
            <HiOutlineX
              onClick={() => {
                setOpenModal(false);
              }}
            />
            <div className="modal-title">
              <h6 className="head-text">
                Update <span>your</span> note
              </h6>
            </div>
            <div className="modal-body">
              <form>
                <div>
                  <label className="p-text" htmlFor="title">
                    Update note title
                  </label>
                  <input type="text" name="title" minLength={5} id="title" />
                </div>
                <div>
                  <label className="p-text" htmlFor="description">
                    Update note description
                  </label>
                  <textarea
                    name="description"
                    minLength={5}
                    id="description"
                    rows="5"
                  ></textarea>
                </div>
                <div>
                  <label className="p-text" htmlFor="tag">
                    Update note tag
                  </label>
                  <input type="text" name="tag" id="tag" />
                </div>
                <input
                  className="primary_button"
                  type="submit"
                  value="Update note"
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="primary_button active"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
