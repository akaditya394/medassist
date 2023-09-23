import { useContext, useState } from "react";
import { useRouter } from "next/router";

import Input from "../components/input";
import Notice from "../components/notice";
import Loader from "../components/loader";

import BackArrowIcon from "../images/icons/arrow-left.svg";
import SignupPageIllustration from "../images/svgs/signup_page_illustration.svg";
import DispatchContext from "../Context/DispatchContext";
import axios from "axios";

const form = {
  id: "signup",
  inputs: [
    {
      id: "name",
      type: "text",
      label: "Name",
      required: true,
      name: "name",
      value: "",
    },
    {
      id: "email",
      type: "email",
      label: "E-Mail Address",
      required: true,
      name: "email",
      value: "",
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      required: true,
      name: "password",
      value: "",
    },
  ],
  submitButton: {
    type: "submit",
    label: "Sign up",
  },
};

const SignupPage = () => {
  const RESET_NOTICE = { type: "", message: "" };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();
  const [option, setOption] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const appDispatch = useContext(DispatchContext);
  const onOptionChange = (e) => {
    console.log(e.target.value);
    setOption(e.target.value);
  };

  const values = {};
  form.inputs.forEach((input) => (values[input.id] = input.value));
  const [formData, setFormData] = useState(values);

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  // const setRole = () => {
  //   formData.role = option;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const personForm = new FormData();
    Object.keys(formData).forEach((key) => {
      personForm.append(key, formData[key]);
    });
    if (option === "user") {
      personForm.append("age", age);
      personForm.append("weight", weight);
      // setRole();
      // a http post request to signup
      setIsLoading(true);
      try {
        const res = await axios.post(`/${option}/register`, personForm, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setIsLoading(false);
        switch (res.data.type) {
          case "success":
            appDispatch({
              type: "login",
              data: {
                token: res.data.token,
                role: option,
                about: option === "user" ? res?.data?.user : res?.data?.doctor,
              },
            });

            setTimeout(() => {
              option === "user"
                ? router.replace("/medicalHistory")
                : router.replace("/prescriptions");
            }, 3000);
            setNotice({ type: "SUCCESS", message: res.data.message });
            break;
          case "error":
            setNotice({ type: "ERROR", message: res.data.message });
            break;
        }
      } catch (err) {
        setIsLoading(false);
        setNotice({ type: "ERROR", message: err.response.data.message });
      }
    } else {
      localStorage.setItem("tempSignup", JSON.stringify(formData));
      router.replace("/verifyMedicalProfessional");
    }
  };

  return (
    <div className="ContentContainer">
      <div className="ContentForm">
        <div className="pageHeadingContainer">
          <div className="backArrow" onClick={() => router.back()}>
            <img src={BackArrowIcon} alt="Back Arrow" />
          </div>
          <h1 className="pageHeading">Signup</h1>
        </div>
        <form id={form.id} method="post" onSubmit={handleSubmit}>
          {form.inputs.map((input, key) => {
            return (
              <Input
                key={key}
                formId={form.id}
                id={input.id}
                type={input.type}
                label={input.label}
                required={input.required}
                value={formData[input.id]}
                name={input.name}
                setValue={(value) => handleInputChange(input.id, value)}
              />
            );
          })}
          <h3>Select your role</h3>
          <div className="radioWrapper">
            <input
              type="radio"
              name="option"
              value="user"
              id="User"
              checked={option === "user"}
              onChange={onOptionChange}
            />
            <label htmlFor="User">User</label>

            <input
              type="radio"
              name="option"
              value="doctor"
              id="Medical_Professional"
              checked={option === "doctor"}
              onChange={onOptionChange}
            />
            <label htmlFor="Medical_Professional">Medical Professional</label>
          </div>
          {option === "user" && (
            <>
              <div className="inputWrapper">
                <label>Weight (in kg)</label>
                <input
                  required={option === "user" ? true : false}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="inputWrapper">
                <label>Age</label>
                <input
                  required={option === "user" ? true : false}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </>
          )}
          {notice.message && (
            <Notice status={notice.type} mini>
              {notice.message}
            </Notice>
          )}
          <button type={form.submitButton.type}>
            {!isLoading ? <>{form.submitButton.label}</> : <Loader />}
          </button>
        </form>
      </div>
      <div className="ContentPageIllustration">
        <img src={SignupPageIllustration} alt="" />
      </div>
    </div>
  );
};

export default SignupPage;
