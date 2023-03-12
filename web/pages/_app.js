import { useState, useEffect } from 'react'
import Layout from "../components/layout"

import "typeface-nunito-sans"
import "typeface-roboto"
import "../shared/global.scss"

const MyApp = ({ Component, pageProps }) => {
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }
  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp