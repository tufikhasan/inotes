import React from "react";
import { Addnote, Notes } from "../../components";
import "./Home.scss";

const Home = () => {
  return (
    <div className="app__home">
      <Addnote />
      <Notes />
    </div>
  );
};

export default Home;
