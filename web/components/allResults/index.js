import { useState } from "react"
import NextLink from 'next/link'

import styles from "./styles.module.scss"
import VerifiedIcon from "../../images/icons/verified.svg"

const AllResultsPage = () => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)

    return (
        <>
            <h1 className="pageHeading">All your results</h1>
            <div className={styles.gridContainer}>
                {/* <NextLink href={`/post/${encodeURIComponent(post.id)}`}> */}
                <NextLink href={`/results/1`}>
                    <div className={styles.box}>
                        <div className={styles.name}>
                            Hello
                        </div>
                        <div className={styles.verified}>
                            <img src={VerifiedIcon} alt="Verified Icon" />
                        </div>
                    </div>
                </NextLink>
                <NextLink href={`/results/1`}>
                    <div className={styles.box}>
                        <div className={styles.name}>
                            Hello
                        </div>
                        <div className={styles.verified}>
                            <img src={VerifiedIcon} alt="Verified Icon" />
                        </div>
                    </div>
                </NextLink>
                <NextLink href={`/results/1`}>
                    <div className={styles.box}>
                        <div className={styles.name}>
                            Hello
                        </div>
                        <div className={styles.verified}>
                            <img src={VerifiedIcon} alt="Verified Icon" />
                        </div>
                    </div>
                </NextLink>
                <NextLink href={`/results/1`}>
                    <div className={styles.box}>
                        <div className={styles.name}>
                            Hello
                        </div>
                        <div className={styles.verified}>
                            <img src={VerifiedIcon} alt="Verified Icon" />
                        </div>
                    </div>
                </NextLink>
                <NextLink href={`/results/1`}>
                    <div className={styles.box}>
                        <div className={styles.name}>
                            Hello
                        </div>
                        <div className={styles.verified}>
                            <img src={VerifiedIcon} alt="Verified Icon" />
                        </div>
                    </div>
                </NextLink>
            </div>
        </>
    )
}

export default AllResultsPage