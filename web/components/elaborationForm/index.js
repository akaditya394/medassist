import { useState } from "react"
import { useRouter } from "next/router"

import styles from "./styles.module.scss"
import Notice from "../notice"
import CloseIcon from "../../images/icons/close.svg"

const data = [
    { id: 1, name: 'Hairfall' },
    { id: 2, name: 'Headache' },
    { id: 3, name: 'Nausea' },
    { id: 4, name: 'Sore throat' },
    { id: 5, name: 'Breathlessness' },
    { id: 6, name: 'Skin Rashes' },
    { id: 7, name: 'Swelling' },
    { id: 8, name: 'Upset Stomach' },
    { id: 9, name: 'Dry mouth' },
    { id: 10, name: 'Drowsiness' },
    { id: 11, name: 'Vomiting' },
    { id: 12, name: 'Diarrhea' },
    { id: 13, name: 'Pimples' },
    { id: 14, name: 'Fatigue' },
]


const ElaborationForm = () => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const router = useRouter()
    const [sideEffectsData, setSideEffectsData] = useState(data)

    const handleRemoveItem = (id) => {
        setSideEffectsData(sideEffectsData.filter(item => item.id !== id))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // a http post request to submit elaboration form
    }

    return (
        <div className={styles.elaborationForm}>
            <h1 className="pageHeading">Futher describe side effects</h1>
            <div className={styles.selectWrapper}>
                <div className={styles.displayWindow}>
                    {sideEffectsData.length === 0 && (
                        <div>Refresh the page to add side effects, if no side effect matches your condition then click submit</div>
                    )}
                    {sideEffectsData.map((d, key) => {
                        return (
                            <div className={styles.sideEffect} key={key}>
                                {d.name}
                                <span
                                    role="button"
                                    tabIndex="0"
                                    className={styles.dismiss}
                                    onClick={() => handleRemoveItem(d.id)}
                                >
                                    <img src={CloseIcon} alt="close icon" />
                                </span>
                            </div>
                        )
                    })}

                </div>
            </div>
            {notice.message && (
                <Notice status={notice.type} mini>
                    {notice.message}
                </Notice>
            )}
            <button className={styles.button} onClick={() => router.push("/results")}>
                Submit
            </button>
        </div>
    )
}

export default ElaborationForm