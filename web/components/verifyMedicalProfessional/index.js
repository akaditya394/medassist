import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import DispatchContext from "../../Context/DispatchContext";
import Notice from "../notice";
import styles from "./styles.module.scss";
import UploadPageIllustration from "../../images/upload_page_illustration.svg";
import { useRouter } from "next/router";

const data = [
  { label: "None", value: "0" },
  {
    label: "Andhra Pradesh Medical Council",
    value: "1",
  },
  {
    label: "Arunachal Pradesh Medical Council",
    value: "2",
  },
  { label: "Assam Medical Council", value: "3" },
  { label: "Bhopal Medical Council", value: "28" },
  { label: "Bihar Medical Council", value: "4" },
  { label: "Bombay Medical Council", value: "29" },
  { label: "Chandigarh Medical Council", value: "30" },
  {
    label: "Chattisgarh Medical Council",
    value: "5",
  },
  { label: "Delhi Medical Council", value: "6" },
  { label: "Goa Medical Council", value: "7" },
  { label: "Gujarat Medical Council", value: "8" },
  { label: "Haryana Medical Council", value: "9" },
  {
    label: "Himachal Pradesh Medical Council",
    value: "10",
  },
  { label: "Hyderabad Medical Council", value: "45" },
  {
    label: "Jammu & Kashmir Medical Council",
    value: "11",
  },
  { label: "Jharkhand Medical Council", value: "12" },
  { label: "Karnataka Medical Council", value: "13" },
  {
    label: "Madhya Pradesh Medical Council",
    value: "15",
  },
  { label: "Madras Medical Council", value: "36" },
  { label: "Mahakoshal Medical Council", value: "35" },
  {
    label: "Maharashtra Medical Council",
    value: "16",
  },
  { label: "Manipur Medical Council", value: "26" },
  { label: "Medical Council of India", value: "46" },
  {
    label: "Medical Council of Tanganyika",
    value: "47",
  },
  { label: "Mizroram Medical Council", value: "42" },
  { label: "Mysore Medical Council", value: "37" },
  { label: "Nagaland Medical Council", value: "41" },
  {
    label: "Orissa Council of Medical Registration",
    value: "17",
  },
  {
    label: "Pondicherry Medical Council",
    value: "38",
  },
  { label: "Punjab Medical Council", value: "18" },
  { label: "Rajasthan Medical Council", value: "19" },
  { label: "Sikkim Medical Council", value: "20" },
  { label: "Tamil Nadu Medical Council", value: "21" },
  {
    label: "Telangana State Medical Council",
    value: "43",
  },
  {
    label: "Travancore Cochin Medical Council, Trivandrum",
    value: "50",
  },
  {
    label: "Tripura State Medical Council",
    value: "22",
  },
  {
    label: "Uttar Pradesh Medical Council",
    value: "23",
  },
  {
    label: "Uttarakhand Medical Council",
    value: "24",
  },
  { label: "Vidharba Medical Council", value: "40" },
  {
    label: "West Bengal Medical Council",
    value: "25",
  },
];

const VerifyMedicalProfessional = () => {
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const RESET_NOTICE = { type: "", message: "" };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const [value, setValue] = useState("");
  const router = useRouter();
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    !Boolean(localStorage.getItem("tempSignup")) && router.replace("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `/doctor/verify`,
      {
        name,
        regNumber,
        value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.verified) {
      const doctorForm = localStorage.getItem("tempSignup");
      localStorage.removeItem("tempSignup");
      const res = await axios.post(`/doctor/register`, doctorForm, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      switch (res.data.type) {
        case "success":
          appDispatch({
            type: "login",
            data: {
              token: res.data.token,
              role: "doctor",
              about: res?.data?.doctor,
            },
          });

          setTimeout(() => {
            router.replace("/prescriptions");
          }, 3000);
          setNotice({ type: "SUCCESS", message: res.data.message });
          break;
        case "error":
          setNotice({ type: "ERROR", message: res.data.message });
          break;
      }
    } else {
      localStorage.removeItem("tempSignup");
      setNotice({ type: "ERROR", message: res.data.message });
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    }
  };
  return (
    <div className="ContentContainer">
      <div className="ContentForm">
        <h1 className="pageHeading">Verification</h1>
        <form id="upload" onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.inputWrapper}>
            <label>Doctor Name</label>
            <input
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label>Registration Number</label>
            <input
              required={true}
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label>State Medical Council</label>
            <select
              value={value}
              required={true}
              onChange={(e) => setValue(e.target.value)}
            >
              {data.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
          {notice.message && (
            <Notice status={notice.type} mini>
              {notice.message}
            </Notice>
          )}
          <button type="submit">Verify</button>
        </form>
      </div>
      <div className="ContentPageIllustration">
        <img src={UploadPageIllustration} alt="" />
      </div>
    </div>
  );
};

export default VerifyMedicalProfessional;
