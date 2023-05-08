import styles from "./styles.module.scss";

const data = [
    { id: "1", text: "Diabetes" },
    { id: "2", text: "High Blood pressure" },
    { id: "3", text: "Low Blood pressure" },
    { id: "4", text: "Respiratory Problems" },
    { id: "5", text: "COVID 19" },
    { id: "6", text: "Allergies" },
    { id: "7", text: "Migraine" },
    { id: "8", text: "Gastrointestinal distress" },
    { id: "9", text: "Skin Problems" },
    { id: "10", text: "Mental Health Problems" }
]

const ViewMedicalHistory = () => {
    return (
        <>
            <h1 className="pageHeading">Here is the patient's medical History:</h1>
            {data.map((condition, key) => {
                return (
                    <div className={styles.conditionContainer} key={key}>
                        <text><strong>{`\u2022 ${condition.text}`}</strong></text>
                    </div>
                );
            })}
        </>
    );
};

export default ViewMedicalHistory;
