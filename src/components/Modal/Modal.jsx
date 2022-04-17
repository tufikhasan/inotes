import React from 'react';
import './Modal.scss';
import { HiOutlineX } from 'react-icons/hi';

const Modal = ({ closeModal }) => {
  return (
    <div className="app__modal-bg">
      <div className="app__modal">
        <HiOutlineX
          onClick={() => {
            closeModal(false);
          }}
        />
        <div className="modal-title"><h6 className="head-text">Update <span>your</span> note</h6></div>
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
            <input className="primary_button" type="submit" value="Update note" />
          </form>
        </div>
        <div className="modal-footer">
          <button className='primary_button active'
            onClick={() => {
              closeModal(false);
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
