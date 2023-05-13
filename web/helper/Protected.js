import React from "react";
import { useRouter } from "next/router";

const Protected = ({ isLoggedIn, children }) => {
  const router = useRouter();
  if (!isLoggedIn) {
    router.replace("/login");
  }
  return children;
};

export default Protected;
