import { useState } from "react"
import NextLink from 'next/link'

import styles from "./styles.module.scss"

const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
]

const AllPrescriptionsPage = () => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)

    return (
        <>
            <h1 className="pageHeading">All your unverified prescriptions</h1>
            <div className={styles.gridContainer}>
                {data.map((data, key) => {
                    return (
                        <NextLink href={`/prescriptions/1`} key={key}>
                            <div className={styles.box}>
                                {data.name}
                            </div>
                        </NextLink>
                    )
                })}
            </div>
        </>
    )
}

export default AllPrescriptionsPage