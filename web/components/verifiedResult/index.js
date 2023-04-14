import styles from "./styles.module.scss"
import TestPrescription from "../../images/test/prescription.png"
import SideEffectsTable from "../sideEffectsTable"
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
                <SideEffectsTable />
            </div>
        </>
    )
}

export default VerifiedResult