import React from "react";
import PropTypes from "prop-types";
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";

function HomePage(props) {
  return <h1>Home Page</h1>;
}

HomePage.propTypes = {
  window: PropTypes.func,
};

export default HomePage;
