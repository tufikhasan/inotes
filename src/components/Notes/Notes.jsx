import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../../context/notes/noteContext';
import NoteItem from '../NoteItem/NoteItem';
import { HiOutlineX } from 'react-icons/hi';
import './Notes.scss';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const { showAlert } = props;
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [openModal, setOpenModal] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate({ pathname: '/login' });
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: '',
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert('Note updated successfully', 'success');
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
          {notes.length === 0 && 'No Notes Found'}
          {notes.map((note, index) => {
            return (
              <NoteItem
                key={`note-${index}`}
                note={note}
                updateNote={updateNote}
                showAlert={showAlert}
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
                    required
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
                    minLength={5}
                    required
                    name="edescription"
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
                  disabled={
                    note.etitle.length < 5 || note.edescription.length < 5
                  }
                  className="primary_button"
                  type="submit"
                  value="Update note"
                  onClick={handleClick}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
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
