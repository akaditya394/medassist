import { useState } from "react"
import NextLink from 'next/link'

import styles from "./styles.module.scss"
import VerifiedIcon from "../../images/icons/verified.svg"
import UnverifiedIcon from "../../images/icons/hourglass.svg"

const data = [
    { id: 1, name: 'my prescription', verified: true },
    // { id: 2, name: 'test prescription', verified: false },
    // { id: 3, name: 'Item 2', verified: false },
    // { id: 4, name: 'Item 3', verified: true },
]

const AllResultsPage = () => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)

    return (
        <>
            <h1 className="pageHeading">All your results</h1>
            <div className={styles.gridContainer}>
                {data.map((data, key) => {
                    return (
                        <NextLink href={data.verified ? `/verifiedResult` : `unverfiedResult`} key={key}>
                            <div className={styles.box}>
                                <div className={styles.name}>
                                    {data.name}
                                </div>
                                {data.verified ? (
                                    <div className={styles.verified}>
                                        <img src={VerifiedIcon} alt="Verified Icon" />
                                    </div>
                                ) : (
                                    <div className={styles.verified}>
                                        <img src={UnverifiedIcon} alt="Unverified Icon" />
                                    </div>
                                )}
                            </div>
                        </NextLink>
                    );
                })}
            </div>
        </>
    )
}

export default AllResultsPage