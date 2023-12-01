import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Notice from "../notice";
import styles from "./styles.module.scss";
import UploadPageIllustration from "../../images/svgs/upload_page_illustration.svg";
import axios from "axios";
import StateContext from "../../Context/StateContext";
import Loader from "../loader";

const LoginPage = () => {
  const RESET_NOTICE = { type: "", message: "" };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const appState = useContext(StateContext);

  // useEffect(() => {
  //   // checks if the user is authenticated
  //   if (!appState.loggedIn) router.replace("/login");
  // }, []);

  const [state, setState] = useState({
    selectedPdfs: null,
    loaded: 0,
    subName: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    type: "prescription",
  });

  const handleInputChange = (e, property) => {
    setFormData({
      ...formData,
      [property]: e.target.value,
    });
  };

  const maxSelectFile = (e) => {
    let files = e.target.files;
    if (files.length > 1) {
      setNotice({ type: "ERROR", message: "Maximum 1 file is allowed." });
      e.target.value = null;
      return false;
    } else {
      let err = "";
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 5000000) {
          // 5 MB
          err += files[i].name + ", ";
        }
      }
      if (err !== "") {
        // error caught
        e.target.value = null;
        setNotice({
          type: "ERROR",
          message: "file is too large. Please select file size < 5MB.",
        });
      }
    }
    return true;
  };

  const fileChangeHandler = (event) => {
    const files = event.target.files;
    console.log(files[0]);
    if (maxSelectFile(event)) {
      setState({ ...state, selectedPdfs: files[0], loaded: 0 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    state.selectedPdfs && setIsLoading(true);
    const data = new FormData();
    if (!state.selectedPdfs) {
      setNotice({
        type: "ERROR",
        message: "Select atleast one file",
      });
      return;
    }
    console.log(state.selectedPdfs, "Hey");
    data.append("file", state.selectedPdfs);
    const token = appState.person.token;
    try {
      setNotice({
        type: "SUCCESS",
        message: "Wait for few minutes, system is scanning your prescription.",
      });
      // a http post request to upload prescription
      setNotice({
        type: "SUCCESS",
        message: "Wait for few minutes, system is scanning your prescription.",
      });
      const res = await axios.post(
        "/prescription/uploadPrescription",
        { file: state.selectedPdfs, name: formData.name },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      switch (res.data.type) {
        case "success":
          setIsLoading(false);
          setTimeout(() => {
            router.replace("/results");
          }, 3000);
          setNotice({ type: "SUCCESS", message: res.data.message });
          break;
        case "error":
          setIsLoading(false);
          setState({ ...state, selectedPdfs: null });
          setFormData({ ...formData, name: "" });
          setNotice({ type: "ERROR", message: res.data.message });
          break;
      }
    } catch (err) {
      setIsLoading(false);
      setNotice({ type: "ERROR", message: "Error in uploading prescription" });
    }
  };

  return (
    <div className="ContentContainer">
      <div className="ContentForm">
        <h1 className="pageHeading">Upload Prescription</h1>
        <form id="upload" onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <label form="upload" htmlFor="name">
              Name of file
            </label>
            <input
              form="upload"
              id="name"
              name="name"
              type="text"
              required={true}
              value={formData.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label form="upload" htmlFor="name">
              Upload File
            </label>
            <input
              form="upload"
              id="file"
              type="file"
              name="file"
              required={true}
              onChange={(e) => fileChangeHandler(e)}
            />
          </div>
          {notice.message && (
            <Notice status={notice.type} mini>
              {notice.message}
            </Notice>
          )}
          <button type="submit" onClick={handleSubmit}>
            {!isLoading ? "Upload" : <Loader />}
          </button>
        </form>
      </div>
      <div className="ContentPageIllustration">
        <img src={UploadPageIllustration} alt="" />
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  };
}

export default LoginPage;
