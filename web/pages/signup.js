import { useState } from "react";
import { useRouter } from "next/router";

import Input from "../components/input";
import Notice from "../components/notice";

import BackArrowIcon from "../images/icons/arrow-left.svg";
import SignupPageIllustration from "../images/signup_page_illustration.svg";
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
  const router = useRouter();
  const [option, setOption] = useState("User")

  const onOptionChange = e => {
    setOption(e.target.value)
  }

  const values = {};
  form.inputs.forEach((input) => (values[input.id] = input.value));
  const [formData, setFormData] = useState(values);

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const setRole = () => {
    formData.role = option
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRole()
    // a http post request to signup
    const res = await axios.post(
      "http://localhost:8000/api/auth/register",
      JSON.stringify(formData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    switch (res.data.type) {
      case "success":
        setTimeout(() => {
          router.replace("/");
        }, 3000);
        setNotice({ type: "SUCCESS", message: res.data.message });
        break;
      case "error":
        setNotice({ type: "ERROR", message: res.data.message });
        break;
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
          <div className="inputWrapper">
            <input
              type="radio"
              name="option"
              value="User"
              id="User"
              checked={option === "User"}
              onChange={onOptionChange}
            />
            <label htmlFor="User">User</label>

            <input
              type="radio"
              name="option"
              value="Medical_Professional"
              id="Medical_Professional"
              checked={option === "Medical_Professional"}
              onChange={onOptionChange}
            />
            <label htmlFor="Medical_Professional">Medical Professional</label>
          </div>
          {notice.message && (
            <Notice status={notice.type} mini>
              {notice.message}
            </Notice>
          )}
          <button type={form.submitButton.type} onClick={() => router.push("/medicalHistory")}>
            {form.submitButton.label}
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
