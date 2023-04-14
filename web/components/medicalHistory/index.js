import React, { useState } from 'react'
import styles from "./styles.module.scss"
import { useRouter } from "next/router";

const conditionsArray = [
    {
        id: "1",
        text: "Diabetes",
    },
    {
        id: "2",
        text: "High Blood pressure",
    },
    {
        id: "3",
        text: "Low Blood pressure",
    },
    {
        id: "4",
        text: "Respiratory Problems",
    },
    {
        id: "5",
        text: "COVID 19",
    },
    {
        id: "6",
        text: "Allergies",
    },
    {
        id: "7",
        text: "Migraine",
    },
    {
        id: "8",
        text: "Gastrointestinal distress",
    },
    {
        id: "9",
        text: "Skin Problems",
    },
    {
        id: "10",
        text: "Mental Health Problems",
    },
]

const MedicalHistory = () => {
    const router = useRouter()
    // const [checked, setChecked] = useState(false)
    // const handleChange = () => {
    //     setChecked(!checked)
    // }

    const [totalSelectedCheckboxes, setTotalSelectedCheckboxes] = useState(0);
    const handleChange = () => {
        setTotalSelectedCheckboxes(document.querySelectorAll('input[type=checkbox]:checked').length);
    }
    // useEffect(() => {
    //     console.log(totalSelectedCheckboxes);
    // }, [totalSelectedCheckboxes]);

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
                                onChange={() => handleChange()}
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

export default MedicalHistory