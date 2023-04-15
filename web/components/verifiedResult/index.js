import styles from "./styles.module.scss"
import TestPrescription from "../../images/test/prescription.jpg"
import Notice from "../notice"

const VerifiedResult = () => {
    return (
        <>
            <Notice>
                <h3>Prescription verified</h3>
                <p>Your upload prescription has been verified by{' '}
                    <strong>Dr. Puneet Sharma</strong>
                    , a trained medical professional.</p>
            </Notice>
            <h1 className="pageHeading">Your verified Prescription</h1>
            <div className={styles.prescription}>
                <img src={TestPrescription} alt="Prescription" />
            </div>
            <div className={styles.table}>
                <table>
                    <tr>
                        <th>#id</th>
                        <th>Drug name</th>
                        <th>Symptoms</th>
                        <th>Alternatives</th>
                        <th>Suggestions</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Microcef CV 200 mg</td>
                        <td>Throat infections</td>
                        <td>Goodcif CV 200mg</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Ventryl D</td>
                        <td>Sore throat</td>
                        <td>Chericof</td>
                        <td>Avoid cold beverages</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Pantotav DSR</td>
                        <td>Acidity</td>
                        <td>Pantin D</td>
                        <td>Drink warm water in morning</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>BENZ Pearls</td>
                        <td>Dry cough</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Montak LC</td>
                        <td>Runny nose, watery eyes, sneezing</td>
                        <td>Levocet M</td>
                        <td>Avoid sour edibles</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default VerifiedResult