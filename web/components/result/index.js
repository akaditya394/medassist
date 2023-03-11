import styles from "./styles.module.scss"
import TestPrescription from "../../images/test/prescription.png"
import ElaborationForm from "../elaborationForm"
import SideEffectsTable from "../sideEffectsTable"

const Result = () => {
    return (
        <>
            <h1 className="pageHeading">Drugs, side effects and alternatives</h1>
            <div className={styles.prescription}>
                <img src={TestPrescription} alt="Prescription" />
            </div>
            <div className={styles.table}>
                <SideEffectsTable />
            </div>
            <ElaborationForm />
        </>
    )
}

export default Result