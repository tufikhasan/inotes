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
  const [note, setNote] = useState({ etitle: '', edescription: '', etag: '' });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Updated note successfull', note);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
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
        {/*Modals */}
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
                  <label className="p-text" htmlFor="etitle">
                    Update note title
                  </label>
                  <input
                    type="text"
                    name="etitle"
                    minLength={5}
                    id="etitle"
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div>
                  <label className="p-text" htmlFor="edescription">
                    Update note description
                  </label>
                  <textarea
                    name="edescription"
                    minLength={5}
                    id="edescription"
                    rows="5"
                    onChange={onChange}
                    value={note.edescription}
                  ></textarea>
                </div>
                <div>
                  <label className="p-text" htmlFor="etag">
                    Update note tag
                  </label>
                  <input
                    type="text"
                    name="etag"
                    id="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
                <input
                  className="primary_button"
                  type="submit"
                  value="Update note"
                  onClick={handleClick}
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
