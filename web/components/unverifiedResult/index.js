import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import StateContext from "../../Context/StateContext";
import styles from "./styles.module.scss";
import TestPrescription from "../../images/test/prescription.jpg";
import Notice from "../notice";

const UnverifiedResult = () => {
  const appState = useContext(StateContext);
  const router = useRouter();

  useEffect(() => {
    async function getPrescription() {
      try {
        const token = appState.person.token;
        // if (!token) {
        //   router.replace("/login");
        // }
        const res = await axios.post(
          "/prescription/getSide",
          {
            body: router?.query?.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        switch (res.data.type) {
          case "success":
            setData(res.data.prescriptions);
            break;
          case "error":
            console.log(res);
            break;
        }
        // console.log(res, "ResPres");
        // setData([
        //   { id: 1, name: "my prescription", verified: true },
        //   { id: 2, name: "test prescription", verified: false },
        //   { id: 3, name: "Item 2", verified: false },
        //   { id: 4, name: "Item 3", verified: true },
        // ]);
      } catch (err) {
        console.log(err);
      }
    }
    getPrescription();
  }, []);
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
