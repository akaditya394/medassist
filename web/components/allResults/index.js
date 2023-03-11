import { useState } from "react"

import styles from "./styles.module.scss"
import VerifiedIcon from "../../images/icons/verified.svg"

const AllResultsPage = () => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)

    return (
        <>
            <h1 className="pageHeading">All your results</h1>
            <div className={styles.gridContainer}>
                <div className={styles.box}>
                    <div className={styles.name}>
                        Hello
                    </div>
                    <div className={styles.verified}>
                        <img src={VerifiedIcon} alt="Verified Icon" />
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.name}>
                        Hello
                    </div>
                    <div className={styles.verified}>
                        <img src={VerifiedIcon} alt="Verified Icon" />
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.name}>
                        Hello
                    </div>
                    <div className={styles.verified}>
                        <img src={VerifiedIcon} alt="Verified Icon" />
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.name}>
                        Hello
                    </div>
                    <div className={styles.verified}>
                        <img src={VerifiedIcon} alt="Verified Icon" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllResultsPage