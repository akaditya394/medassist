import styles from "./styles.module.scss";
import TestPrescription from "../../images/test/prescription.jpg";
import Notice from "../notice";

const UnverifiedResult = () => {
  return (
    <>
      <Notice>
        <h3>Not yet verified</h3>
        <p>Your uploaded prescription has not yet been verified.</p>
      </Notice>
      <h1 className="pageHeading">Your unverified Prescription</h1>
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
    </>
  );
};

export default UnverifiedResult;
