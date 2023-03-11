import { useState } from "react"

import styles from "./styles.module.scss"

const AllPrescriptionsPage = () => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)

    return (
        <>
            <h1 className="pageHeading">All your unverified prescriptions</h1>
            <div className={styles.gridContainer}>
                <div className={styles.box}>
                    hello
                </div>
                <div className={styles.box}>
                    hello
                </div>
                <div className={styles.box}>
                    hello
                </div>
                <div className={styles.box}>
                    hello
                </div>
            </div>
        </>
    )
}

export default AllPrescriptionsPage