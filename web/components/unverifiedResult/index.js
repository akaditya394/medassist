import styles from "./styles.module.scss"
import TestPrescription from "../../images/test/prescription.png"
import Notice from "../notice"

const UnverifiedResult = () => {
    return (
        <>
            <Notice>
                <h3>Not yet verified</h3>
                <p>Your upload prescription has not yet been verified.</p>
            </Notice>
            <h1 className="pageHeading">Your unverified Prescription</h1>
            <div className={styles.prescription}>
                <img src={TestPrescription} alt="Prescription" />
            </div>
        </>
    )
}

export default UnverifiedResult