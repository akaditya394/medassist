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

  const values = {};
  form.inputs.forEach((input) => (values[input.id] = input.value));
  const [formData, setFormData] = useState(values);

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // a http post request to signup
    await axios.post(
      "http://localhost:8000/api/auth/register",
      JSON.stringify(formData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    router.push("/");
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
          {notice.message && (
            <Notice status={notice.type} mini>
              {notice.message}
            </Notice>
          )}
          <button type={form.submitButton.type}>
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
