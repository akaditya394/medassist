import React, { useState } from 'react'
import styles from "./styles.module.scss"
import { useRouter } from "next/router";

const conditionsArray = [
    {
        id: "1",
        text: "Condition 1",
        value: "",
    },
    {
        id: "2",
        text: "Condition 2",
        value: "",
    },
    {
        id: "3",
        text: "Condition 2",
        value: "",
    },
    {
        id: "4",
        text: "Condition 2",
        value: "",
    },
    {
        id: "5",
        text: "Condition 2",
        value: "",
    },
    {
        id: "6",
        text: "Condition 2",
        value: "",
    },
    {
        id: "7",
        text: "Condition 2",
        value: "",
    },
    {
        id: "8",
        text: "Condition 2",
        value: "",
    },
    {
        id: "9",
        text: "Condition 2",
        value: "",
    },
    {
        id: "10",
        text: "Condition 2",
        value: "",
    },
]

const MedicalHistory = () => {
    const router = useRouter()
    const [checked, setChecked] = useState(false)
    const handleChange = () => {
        setChecked(!checked)
    }

    const handleSubmit = () => { }

    return (
        <>
            <h1 className="pageHeading">Select boxes according to your medical history</h1>
            <div className={styles.gridContainer}>
                {conditionsArray.map((condition, index) => {
                    return (
                        <div className={styles.box}>
                            <Checkbox
                                key={index}
                                label={condition.text}
                                value={checked}
                                onChange={handleChange}
                            />
                        </div>
                    )
                })}
            </div>
            <button className={styles.button} onClick={() => router.push("/prescriptionUpload")}>
                Continue
            </button>
        </>
    )
}

const Checkbox = ({ label, value, onChange }) => {
    return (
        <label>
            <div className={styles.checkboxContainer}>
                <input type="checkbox" checked={value} onChange={onChange} />
                <div className={styles.label}>
                    {label}
                </div>
            </div>
        </label>
    )
}

export default MedicalHistory