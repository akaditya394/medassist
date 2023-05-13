import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import StateContext from "../../Context/StateContext";
import styles from "./styles.module.scss";
import TestPrescription from "../../images/test/prescription.jpg";
import Notice from "../notice";
import LoaderDarkBig from "../loaderDarkBig";

const doctorData = [
  { id: "1", name: "nishank" },
  { id: "2", name: "rahul" },
  { id: "3", name: "naman" },
  { id: "4", name: "vansh" },
  { id: "3", name: "aditya" },
];

const UnverifiedResult = () => {
  const appState = useContext(StateContext);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [doctorLoading, setDoctorLoading] = useState(false);
  const [doctorData, setDoctorData] = useState([]);

  console.log(data);
  useEffect(() => {
    async function getPrescription() {
      try {
        const token = appState.person.token;
        console.log(router?.query);
        // if (!token) {
        //   router.replace("/login");
        // }
        setIsLoading(true);
        const res = await axios.post(
          "/prescription/getSide",
          JSON.stringify({
            id: router?.query?.id,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        switch (res.data.type) {
          case "success":
            setIsLoading(false);
            setDoctorData(res.data);
            break;
          case "error":
            setIsLoading(false);
            console.log(res);
            break;
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
    async function getDoctors() {
      try {
        const token = appState.person.token;
        console.log(router?.query);
        // if (!token) {
        //   router.replace("/login");
        // }
        setDoctorLoading(true);
        const res = await axios.get({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        switch (res.data.type) {
          case "success":
            setDoctorLoading(false);
            setDoctorData(res.data.prescriptions);
            break;
          case "error":
            setDoctorLoading(false);
            console.log(res);
            break;
        }
      } catch (err) {
        setDoctorLoading(false);
        console.log(err);
      }
    }
    router?.query?.id && getPrescription() && getDoctors();
  }, [router?.query]);
  return (
    <>
      <Notice>
        <h3>Not yet verified</h3>
        <p>Your uploaded prescription has not yet been verified.</p>
      </Notice>

      <h1 className="pageHeading">Your unverified Prescription</h1>
      {!isLoading && !doctorLoading ? (
        <>
          <div className={styles.inputWrapper}>
            <label>Choose a doctor to verify your prescription</label>
            <select
              value={value}
              required={true}
              onChange={(e) => setValue(e.target.value)}
            >
              {doctorData.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.prescription}>
            <img src={data.image} alt="Prescription" />
          </div>
          <div className={styles.table}>
            <table>
              <tr>
                <th>Serial No.</th>
                <th>Drug name</th>
                <th>Side Effects</th>
              </tr>
              {data?.drugs?.map((drug, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{drug}</td>
                  <td>{data?.sideEffects?.[i]}</td>
                </tr>
              ))}
            </table>
          </div>
        </>
      ) : (
        <div className={styles.loader}>
          <LoaderDarkBig />
        </div>
      )}
    </>
  );
};

export default UnverifiedResult;
