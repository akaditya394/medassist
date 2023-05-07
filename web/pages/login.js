import { useState } from "react";
import { useRouter } from "next/router";

import Notice from "../components/notice";
import Input from "../components/input";

import BackArrowIcon from "../images/icons/arrow-left.svg";
import LoginPageIllustration from "../images/login_page_illustration.svg";
import axios from "axios";

const form = {
  id: "login",
  inputs: [
    {
      id: "email",
      type: "email",
      label: "E-Mail Address",
      required: true,
      value: "",
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      required: true,
      value: "",
    },
  ],
  submitButton: {
    type: "submit",
    label: "Login",
  },
  button: {
    type: "button",
    label: "Forgot password ?",
  },
};

const LoginPage = () => {
  const RESET_NOTICE = { type: "", message: "" };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const router = useRouter();

  const values = {};
  form.inputs.forEach((input) => (values[input.id] = input.value));
  const [formData, setFormData] = useState(values);

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // a http post request to login
    const res = await axios.post(
      "http://localhost:8000/user/login",
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

  const handlePasswordReset = (e) => {
    e.preventDefault();
    router.push("/forgotPassword");
  };

  return (
    <div className="ContentContainer">
      <div className="ContentForm">
        <div className="pageHeadingContainer">
          <div className="backArrow" onClick={() => router.back()}>
            <img src={BackArrowIcon} alt="Back Arrow" />
          </div>
          <h1 className="pageHeading">Login</h1>
        </div>
        <form id={form.id} onSubmit={handleSubmit}>
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
                setValue={(value) => handleInputChange(input.id, value)}
              />
            );
          })}
          {notice.message && (
            <Notice status={notice.type} mini>
              {notice.message}
            </Notice>
          )}
          <button
            type={form.submitButton.type}
            onClick={() => router.push("/results")}
          >
            {form.submitButton.label}
          </button>
          <button type={form.button.type} onClick={handlePasswordReset}>
            {form.button.label}
          </button>
        </form>
        <p>
          Don't have an account yet?{" "}
          <a href="/signup" rel="noreferrer noopener">
            <strong>Sign up here.</strong>
          </a>
        </p>
      </div>
      <div className="ContentPageIllustration">
        <img src={LoginPageIllustration} alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
