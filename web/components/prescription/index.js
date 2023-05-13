import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import StateContext from "../../Context/StateContext";
import styles from "./styles.module.scss";
import Notice from "../notice";
import Input from "../input";
import LoaderDarkBig from "../loaderDarkBig";

import TestPrescription from "../../images/test/prescription.jpg";
import Loader from "../loader";

const Prescription = () => {
  //   const drugsData = [
  //     {
  //       id: "1",
  //       type: "text",
  //       label: "Microcef CV 200 mg",
  //       required: false,
  //       name: "Microcef CV 200 mg",
  //       value: "",
  //       approved: "Yes",
  //       alternatives:"",
  //       suggestions:""
  //     },
  //     {
  //       id: "2",
  //       type: "text",
  //       label: "Ventryl D",
  //       required: true,
  //       name: "Ventryl D",
  //       value: "",
  //       approved: "Yes",
  //       alternatives:"",
  //       suggestions:""
  //     },
  //     {
  //       id: "3",
  //       type: "text",
  //       label: "Pantotav DSR",
  //       required: true,
  //       name: "Pantotav DSR",
  //       value: "",
  //       approved: "Yes",
  //       alternatives:"",
  //       suggestions:""
  //     },
  //     {
  //       id: "4",
  //       type: "text",
  //       label: "BENZ Pearls",
  //       required: true,
  //       name: "BENZ Pearls",
  //       value: "",
  //       approved: "Yes",
  //       alternatives:"",
  //       suggestions:""
  //     },
  //     {
  //       id: "5",
  //       type: "text",
  //       label: "Montak LC",
  //       required: true,
  //       name: "Montak LC",
  //       value: "",
  //       approved: "Yes",
  //       alternatives:"",
  //       suggestions:""
  //     },
  //   ]; // Array of drugs

  const [drugsData, setDrugsData] = useState([]);
  const appState = useContext(StateContext);
  const router = useRouter();
  const RESET_NOTICE = { type: "", message: "" };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState("");
  //   const [alternatives, setAlternatives] = useState(
  //     new Array(drugsData.length).fill("")
  //   );
  //   const [suggestions, setSuggesstions] = useState(
  //     new Array(drugsData.length).fill("")
  //   );
  useEffect(() => {
    async function getPrescription() {
      try {
        const token = appState.person.token;
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
            setDrugsData(
              res.data.prescriptions.drugs.map((drug, i) => ({
                id: i,
                drug,
                sideEffect: res.data.prescriptions?.sideEffects[i],
                alternatives: "",
                suggestions: "",
              }))
            );
            setImageUrl(res.data.prescriptions?.image);
            setUser(res.data.prescriptions?.user);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = appState.person.token;
      const res = await axios.post(
        `/prescription/addAlternativeAndSuggestion?id=${router?.query?.id}`,
        {
          suggestions: drugsData?.map((drug) => drug?.suggestions),
          alternatives: drugsData?.map((drug) => drug?.alternatives),
        },
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
          router.replace("/prescriptions");
          setNotice({ type: "SUCCESS", message: res.data.message });
          break;
        case "error":
          setIsLoading(false);
          setNotice({ type: "ERROR", message: res.data.message });
          break;
      }
    } catch (err) {
      setIsLoading(false);
      setNotice({ type: "ERROR", message: "Error in adding alternatives" });
    }
    // Perform submission logic with drug approvals data
  };

  const handleDrugChange = (index, key, value) => {
    setDrugsData((prevDrugs) => {
      const newDrugs = [...prevDrugs];
      newDrugs[index][key] = value;
      return newDrugs;
    });
  };

  console.log(drugsData);

  return (
    <>
      <h1 className="pageHeading">Analyze the prescription</h1>
      {!isLoading ? (
        <>
          <div className={styles.prescription}>
            <img src={imageUrl} alt="Prescription" />
          </div>
          <div className={styles.table}>
            <table>
              <tr>
                <th>Serial No.</th>
                <th>Drug name</th>
                <th>Side Effects</th>
              </tr>
              {drugsData?.map((drug, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{drug.drug}</td>
                  <td>{drug.sideEffect}</td>
                </tr>
              ))}
            </table>
          </div>
          <h2>Suggest alternatives and give suggestions.</h2>
          <div className={styles.formContainer}>
            <form>
              {drugsData.map((drug, index) => (
                <div key={drug.id} style={{ marginBottom: "20px" }}>
                  <text>
                    {`\u2022`} Approval for <strong>{drug.drug}</strong>
                  </text>
                  <div className={styles.inputWrapper}>
                    <label>Suggest alternatives</label>
                    <input
                      value={drug.alternatives}
                      onChange={(e) =>
                        handleDrugChange(index, "alternatives", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label>Give suggestions</label>
                    <input
                      value={drug.suggestions}
                      onChange={(e) =>
                        handleDrugChange(index, "suggestions", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
              {notice.message && (
                <Notice status={notice.type} mini>
                  {notice.message}
                </Notice>
              )}
              <div className={styles.buttonContainer}>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/viewMedicalHistory?id=${user}`);
                  }}
                >
                  View Patient's medical history
                </button>
                <button
                  className={styles.continueButton}
                  onClick={handleSubmit}
                >
                  {!submitLoading ? "Submit" : <Loader />}
                </button>
              </div>
            </form>
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

export default Prescription;
