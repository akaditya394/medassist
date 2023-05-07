import { useState } from "react";
import styles from "./styles.module.scss";
import Notice from "../notice";
import Input from "../input";
import { useRouter } from "next/router"

import TestPrescription from "../../images/test/prescription.jpg"

const Prescription = () => {
    const router = useRouter()
    const RESET_NOTICE = { type: "", message: "" };
    const [notice, setNotice] = useState(RESET_NOTICE);
    const [alternatives, setAlternatives] = useState('')
    const [suggestions, setSuggesstions] = useState('')

    const drugsData = [
        {
            id: "1",
            type: "text",
            label: "Microcef CV 200 mg",
            required: false,
            name: "Microcef CV 200 mg",
            value: "",
            approved: "Yes",
        },
        {
            id: "2",
            type: "text",
            label: "Ventryl D",
            required: true,
            name: "Ventryl D",
            value: "",
            approved: "Yes",
        },
        {
            id: "3",
            type: "text",
            label: "Pantotav DSR",
            required: true,
            name: "Pantotav DSR",
            value: "",
            approved: "Yes",
        },
        {
            id: "4",
            type: "text",
            label: "BENZ Pearls",
            required: true,
            name: "BENZ Pearls",
            value: "",
            approved: "Yes",
        },
        {
            id: "5",
            type: "text",
            label: "Montak LC",
            required: true,
            name: "Montak LC",
            value: "",
            approved: "Yes",
        },
    ]; // Array of drugs



    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform submission logic with drug approvals data
    };

    return (
        <>
            <h1 className="pageHeading">Analyze the prescription</h1>
            <div className={styles.prescription}>
                <img src={TestPrescription} alt="Prescription" />
            </div>
            <div className={styles.table}>
                <table>
                    <tr>
                        <th>#id</th>
                        <th>Drug name</th>
                        <th>Symptoms</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Microcef CV 200 mg</td>
                        <td>Throat infections</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Ventryl D</td>
                        <td>Sore throat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Pantotav DSR</td>
                        <td>Acidity</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>BENZ Pearls</td>
                        <td>Dry cough</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Montak LC</td>
                        <td>Runny nose, watery eyes, sneezing</td>
                    </tr>
                </table>
            </div>
            <h2>Select no to write a suggestion, yes for approval</h2>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    {drugsData.map((drug) => (
                        <div key={drug.id} style={{ marginBottom: "20px" }}>
                            <text>{`\u2022`}{' '}Approval for{' '}<strong>{drug.name}</strong></text>
                            <div className={styles.inputWrapper}>
                                <label>Suggest alternatives</label>
                                <input
                                    value={alternatives}
                                    onChange={(e) => setAlternatives(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Give suggestions</label>
                                <input
                                    value={suggestions}
                                    onChange={(e) => setSuggesstions(e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                    {notice.message && (
                        <Notice status={notice.type} mini>
                            {notice.message}
                        </Notice>
                    )}
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} type="submit" onClick={() => router.push("/viewMedicalHistory")}>
                            View Patient's medical history
                        </button>
                        <button className={styles.continueButton}>
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Prescription;
