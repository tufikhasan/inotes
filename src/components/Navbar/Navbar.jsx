import React, { useState } from 'react';
import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { BiAlignLeft } from 'react-icons/bi';
import { HiX } from 'react-icons/hi';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate({ pathname: '/login' });
    setToggle(false);
  };
  return (
    <>
      <div className="app__navbar">
        <div className="app__navbar-logo">
          <h2>
            <Link to={'/'}>iNotes</Link>
          </h2>
        </div>
        <div className="app__navbar-navigation">
          <ul className="app__navbar-links">
            {['home', 'about'].map((item) => (
              <li className="app__flex" key={`link-${item}`}>
                <div />
                <Link to={`/${item === 'home' ? '' : item}`}>{item}</Link>
              </li>
            ))}
          </ul>
          <div>
            {!localStorage.getItem('token') ? (
              <Link to="/login" className="primary_button">
                Log in
              </Link>
            ) : (
              <Link
                onClick={handleLogout}
                to="/login"
                className="primary_button"
              >
                Log out
              </Link>
            )}
            {!localStorage.getItem('token') ? (
              <Link to="/signup" className="primary_button">
                Sign up
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="app__navbar-menu">
          <BiAlignLeft
            onClick={() => {
              setToggle(true);
            }}
          />
          {toggle && (
            <div>
              <HiX
                onClick={() => {
                  setToggle(false);
                }}
              />
              <ul>
                {['home', 'about', 'login', 'signup'].map((item) => (
                  <li key={`link-${item}`}>
                    <Link
                      to={`/${item === 'home' ? '' : item}`}
                      onClick={() => {
                        setToggle(false);
                      }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <span>
                {!localStorage.getItem('token') ? (
                  <Link
                    to="/login"
                    onClick={() => {
                      setToggle(false);
                    }}
                    className="primary_button active"
                  >
                    Log in
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={handleLogout}
                    className="primary_button active"
                  >
                    Log out
                  </Link>
                )}
                {!localStorage.getItem('token') ? (
                  <Link
                    to="/signup"
                    onClick={() => {
                      setToggle(false);
                    }}
                    className="primary_button active"
                  >
                    Sign up
                  </Link>
                ) : (
                  ''
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
