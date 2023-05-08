import React, { useContext } from "react";
import axios from "axios";
import LandingPage from "../components/landingPage";
import UploadPage from "../components/uploadPage";
import PrescriptionsPage from "./prescriptions";

//Context
import StateContext from "../Context/StateContext";

const IndexPage = () => {
  const appState = useContext(StateContext);
  const isAuth = appState.loggedIn;
  const isUserDoctor = appState?.person?.role === "doctor";
  console.log(appState, "Hey");
  let body = null;

  if (isAuth && isUserDoctor) {
    body = <PrescriptionsPage />;
  } else if (isAuth && !isUserDoctor) {
    body = <UploadPage />;
  } else {
    body = <LandingPage />;
  }

  return <>{body}</>;
};

export default IndexPage;
