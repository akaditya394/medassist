import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import StateContext from "../../Context/StateContext";
import styles from "./styles.module.scss";
import TestPrescription from "../../images/test/prescription.jpg";
import Notice from "../notice";
import LoaderDarkBig from "../loaderDarkBig";

const UnverifiedResult = () => {
  const appState = useContext(StateContext);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
            setData(res.data.prescriptions);
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

    router?.query?.id && getPrescription();
  }, [router?.query]);
  return (
    <>
      <Notice>
        <h3>Not yet verified</h3>
        <p>Your uploaded prescription has not yet been verified.</p>
      </Notice>
      <h1 className="pageHeading">Your unverified Prescription</h1>
      {!isLoading ? (
        <>
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
