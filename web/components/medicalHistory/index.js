import React, { useState } from 'react'
import styles from "./styles.module.scss"
import { useRouter } from "next/router";

const conditionsArray = [
    { id: "1", text: "Diabetes", value: "diabetes", isChecked: false },
    { id: "2", text: "High Blood pressure", value: "high_bp", isChecked: false },
    { id: "3", text: "Low Blood pressure", value: "low_bp", isChecked: false },
    { id: "4", text: "Respiratory Problems", value: "respiratory_problems", isChecked: false },
    { id: "5", text: "COVID 19", value: "covid", isChecked: false },
    { id: "6", text: "Allergies", value: "allergies", isChecked: false },
    { id: "7", text: "Migraine", value: "migraine", isChecked: false },
    { id: "8", text: "Gastrointestinal distress", value: "gastrointestinal_distress", isChecked: false },
    { id: "9", text: "Skin Problems", value: "skin_problems", isChecked: false },
    { id: "10", text: "Mental Health Problems", value: "mental_health_problems", isChecked: false },
    { id: "11", text: "Other", value: "other", isChecked: false }
]

const MedicalHistory = () => {
    const router = useRouter()
    const [conditions, setConditions] = useState(conditionsArray)
    const [finalConditions, setFinalConditions] = useState([])
    const [otherCondition, setOtherCondition] = useState('')

    const handleChange = (id) => {
        let temp = conditions.map((condition) => {
            if (id === condition.id) {
                return { ...condition, isChecked: !condition.isChecked }
            }
            return condition
        })
        setConditions(temp)
        let selected = temp.filter((condition) => condition.isChecked)
        setFinalConditions(selected)
    }

    const otherMedicalHistoryChecker = (item) => {
        return item.text === "Other"
    }

    const handleSubmit = () => {
        console.log('other condition is', otherCondition)
        console.log('final conditions are', finalConditions)
    }

    return (
        <>
            <h1 className="pageHeading">Select boxes according to your medical history</h1>
            <div className={styles.gridContainer}>
                {conditions.map((condition, index) => {
                    return (
                        <div key={index} className={styles.box}>
                            <label>
                                <div className={styles.checkboxContainer}>
                                    <input type="checkbox" value={condition.isChecked} onChange={() => handleChange(condition.id)} />
                                    <div className={styles.label}>
                                        {condition.text}
                                    </div>
                                </div>
                            </label>
                        </div>
                    )
                })}
            </div>
            {conditions.find(otherMedicalHistoryChecker).isChecked && (
                <div className={styles.inputWrapper}>
                    <label>Type your medical history</label>
                    <input
                        value={otherCondition}
                        onChange={(e) => setOtherCondition(e.target.value)}
                    />
                </div>
            )}
            <button className={styles.button} onClick={handleSubmit}>
                Continue
            </button>
        </>
    )
}

export default MedicalHistory