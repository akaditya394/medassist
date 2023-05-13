import { useState, useEffect, useContext } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import StateContext from "../../Context/StateContext";
import LoaderDarkBig from "../loaderDarkBig";
import { useRouter } from "next/router";
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
  { id: "10", text: "Mental Health Problems" },
];

const ViewMedicalHistory = () => {
  const [data, setData] = useState([]);
  const appState = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    async function getMedicalHistory() {
      try {
        const token = appState.person.token;
        setIsLoading(true);
        const res = await axios.get(
          `/doctor/medicalHistory?userId=${router?.query?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        switch (res.data.type) {
          case "success":
            setIsLoading(false);
            setData(
              res.data.medicalHistory?.map((hist, i) => ({ id: i, text: hist }))
            );
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
    router?.query?.id && getMedicalHistory();
  }, [router?.query]);
  return (
    <>
      <h1 className="pageHeading">Here is the patient's medical History:</h1>
      {!isLoading ? (
        data.map((condition, key) => {
          return (
            <div className={styles.conditionContainer} key={key}>
              <text>
                <strong>{`\u2022 ${condition.text}`}</strong>
              </text>
            </div>
          );
        })
      ) : (
        <div className={styles.loader}>
          <LoaderDarkBig />
        </div>
      )}
    </>
  );
};

export default ViewMedicalHistory;
