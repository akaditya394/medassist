import React from "react"
import LandingPage from "../components/landingPage"
import UploadPage from "../components/uploadPage"
import PrescriptionsPage from "./prescriptions"

const IndexPage = () => {
  const isAuth = true
  const isUserDoctor = true

  let body = null

  if (isAuth && isUserDoctor) {
    body = (
      <PrescriptionsPage />
    )
  } else if (isAuth && !isUserDoctor) {
    body = (
      <UploadPage />
    )
  } else {
    body = (
      <LandingPage />
    )
  }

  return (
    <>
      {body}
    </>
  )
}

export default IndexPage