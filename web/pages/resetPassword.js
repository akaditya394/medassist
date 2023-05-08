import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Notice from "../components/notice";
import Input from "../components/input";
import Loader from "../components/loader"

import ResetPasswordPageIllustration from "../images/resetPassword_page_illustration.svg";
import axios from "axios";

const form = {
  id: "resetPassword",
  inputs: [
    {
      id: "password",
      type: "password",
      label: "New Password",
      required: true,
      value: "",
    },
  ],
  submitButton: {
    type: "submit",
    label: "Set New Password",
  },
};

const ResetPasswordPage = () => {
  const RESET_NOTICE = { type: "", message: "" };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const values = {};
  form.inputs.forEach((input) => (values[input.id] = input.value));
  const [formData, setFormData] = useState(values);

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password) {
      setNotice({ type: "ERROR", message: "Password cannot be empty" });
    } else {
      // a http post request to change password
      const res = await axios.post(
        "http://localhost:8000/api/auth/resetPassword",
        { formData, token: router.query.token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      switch (res.data.type) {
        case "success":
          setTimeout(() => {
            router.replace("http://localhost:3000/login");
          }, 3000);

          setNotice({ type: "SUCCESS", message: res.data.message });
          break;
        case "error":
          setTimeout(() => {
            router.replace("http://localhost:3000/forgotPassword");
          }, 3000);
          setNotice({ type: "ERROR", message: res.data.message });
          break;
      }
      console.log(res.data);
    }
  };

  return (
    <div className="ContentContainer">
      <div className="ContentForm">
        <h1 className="pageHeading">Reset Password</h1>
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
          <button type={form.submitButton.type}>
            {!isLoading ? (
              <>{form.submitButton.label}</>
            ) : <Loader />}
          </button>
        </form>
      </div>
      <div className="ContentPageIllustration">
        <img src={ResetPasswordPageIllustration} alt="" />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
