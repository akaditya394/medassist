import styles from "./styles.module.scss"
import TestPrescription from "../../images/test/prescription.jpg"

const Result = () => {
    return (
        <>
            <h1 className="pageHeading">Drugs and side effects</h1>
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
            <div className={styles.buttonContainer}>
                <button className={styles.button}>
                    Continue
                </button>
            </div>
        </>
    )
}

export default Result