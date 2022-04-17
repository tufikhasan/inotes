import React from 'react';
import { Addnote, Notes } from '../../components';
import './Home.scss';

const Home = (props) => {
  const { showAlert } = props;
  return (
    <div className="app__home">
      <Addnote showAlert={showAlert} />
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
