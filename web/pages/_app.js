import { useState, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import axios from "axios";
import Layout from "../components/layout";

import "typeface-nunito-sans";
import "typeface-roboto";
import "../shared/global.scss";

//Context;
import StateContext from "../Context/StateContext";;
import DispatchContext from "../Context/DispatchContext";
axios.defaults.baseURL = "http://localhost:8000/";;
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const MyApp = ({ Component, pageProps }) => {
  const isBrowser = typeof window !== "undefined";
  const initialState = {
    loggedIn:
      isBrowser && Boolean(window.localStorage.getItem("medassistPerson")),
    person: {
      token:
        isBrowser &&
        Boolean(window.localStorage.getItem("medassistPerson")) &&
        JSON.parse(window.localStorage.getItem("medassistPerson")).token,
      role:
        isBrowser &&
        Boolean(window.localStorage.getItem("medassistPerson")) &&
        JSON.parse(window.localStorage.getItem("medassistPerson")).role,
      about:
        isBrowser &&
        Boolean(window.localStorage.getItem("medassistPerson")) &&
        JSON.parse(window.localStorage.getItem("medassistPerson")).about,
    },
  };
  const [showChild, setShowChild] = useState(false);
  console.log(isBrowser, "yo");
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.person = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      default:
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("medassistPerson", JSON.stringify(state.person));
    } else {
      localStorage.removeItem("medassistPerson");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loggedIn]);;
  useEffect(() => {
    setShowChild(true);;
  }, []);;
  // const stripePromise = loadStripe(
  //   ""
  // );

  if (!showChild) {
    return null;;
  }
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Layout>
            {/* <Elements stripe={stripePromise}> */}
            <Component {...pageProps} />
            {/* </Elements> */}
          </Layout>
        </DispatchContext.Provider>
      </StateContext.Provider>
    );;
  }
};

export default MyApp;
