import { useState } from "react"
import { useRouter } from "next/router"

import styles from "./styles.module.scss"
import Notice from "../notice"
import AddIcon from "../../images/icons/add.svg"
import CloseIcon from "../../images/icons/closeAlt.svg"

const data = [
    { id: 1, text: 'Hairfall', isChecked: false },
    { id: 2, text: 'Headache', isChecked: false },
    { id: 3, text: 'Nausea', isChecked: false },
    { id: 4, text: 'Sore throat', isChecked: false },
    { id: 5, text: 'Breathlessness', isChecked: false },
    { id: 6, text: 'Skin Rashes', isChecked: false },
    { id: 7, text: 'Swelling', isChecked: false },
    { id: 8, text: 'Upset Stomach', isChecked: false },
    { id: 9, text: 'Dry mouth', isChecked: false },
    { id: 10, text: 'Drowsiness', isChecked: false },
    { id: 11, text: 'Vomiting', isChecked: false },
    { id: 12, text: 'Diarrhea', isChecked: false },
    { id: 13, text: 'Pimples', isChecked: false },
    { id: 14, text: 'Fatigue', isChecked: false },
]

const ElaborationForm = () => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const router = useRouter()
    const [sideEffectsData, setSideEffectsData] = useState(data)
    const [sideEffects, setSideEffects] = useState('')
    const [finalSideEffectsArray, setFinalSideEffectsArray] = useState([])

    const handleRemoveItem = (id) => {
        setSideEffectsData(sideEffectsData.filter(item => item.id !== id))
    }

    const addToSideEffects = () => {
        if (sideEffects == '') return
        else {
            setSideEffectsData([...sideEffectsData, {
                id: Date.now(), text: sideEffects, isChecked: true
            }])
            setSideEffects('')
        }
    }

    const handleChange = (id) => {
        let temp = sideEffectsData.map((sideEffect) => {
            if (id === sideEffect.id) {
                return { ...sideEffect, isChecked: !sideEffect.isChecked }
            }
            return sideEffect
        })
        setSideEffectsData(temp)
        let selected = temp.filter((sideEffect) => sideEffect.isChecked)
        setFinalSideEffectsArray(selected)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(finalSideEffectsArray)
        // a http post request to submit elaboration form
    }

    return (
        <div className={styles.elaborationForm}>
            <h1 className="pageHeading">Futher describe side effects</h1>
            <div className={styles.selectWrapper}>
                <h4>
                    Select your side effects or type them out:
                </h4>
                <div className={styles.displayWindow}>
                    <div className={styles.inputWrapper}>
                        <label>
                            Write your side effects if not available in dropdown:
                        </label>
                        <div className={styles.styledTextInput}>
                            <input
                                value={sideEffects}
                                onChange={(e) => setSideEffects(e.target.value)}
                            />
                            <div className={styles.addIcon} onClick={addToSideEffects}>
                                <img src={AddIcon} alt="add icon" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.gridContainer}>
                        {sideEffectsData.slice(0).reverse().map((item, index) => {
                            if (item.id === 1 || item.id === 2 || item.id === 3 || item.id === 4 || item.id === 5 || item.id === 6 || item.id === 7 || item.id === 8 || item.id === 9 || item.id === 10 || item.id === 11 || item.id === 12 || item.id === 13 || item.id === 14) {
                                return (
                                    <div className={styles.box} key={index}>
                                        <Checkbox
                                            label={item.text}
                                            onChange={() => handleChange(item.id)}
                                        />
                                    </div>
                                )
                            } else {
                                return (
                                    <div className={styles.addFromInputBox} key={index}>
                                        {item.text}
                                        <div
                                            className={styles.close}
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <img src={CloseIcon} alt="close icon" />
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            {notice.message && (
                <Notice status={notice.type} mini>
                    {notice.message}
                </Notice>
            )}
            <button className={styles.button} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    )
}

const Checkbox = ({ label, onChange }) => {
    return (
        <label>
            <div className={styles.checkboxContainer}>
                <input type="checkbox" onChange={onChange} />
                <div className={styles.label}>
                    {label}
                </div>
            </div>
        </label>
    )
}

export default ElaborationForm