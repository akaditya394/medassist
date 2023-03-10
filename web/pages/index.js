import React from "react"
import LandingPage from "../components/landingPage"
import UploadPage from "../components/uploadPage"

const IndexPage = () => {
  const isAuth = true
  return (
    <>
      {isAuth ? <LandingPage /> : <UploadPage />}
    </>
  )
}

export default IndexPage