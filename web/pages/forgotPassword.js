import { useState } from "react";
import { useRouter } from "next/router";

import Notice from "../components/notice";
import Input from "../components/input";
import Loader from "../components/loader";

import BackArrowIcon from "../images/icons/arrow-left.svg";
import ForgotPasswordPageIllustration from "../images/svgs/forgotPassword_page_illustration.svg";
import axios from "axios";

const form = {
  id: "forgotPassword",
  inputs: [
    {
      id: "email",
      type: "email",
      label: "E-Mail Address",
      required: true,
      value: "",
    },
  ],
  submitButton: {
    type: "submit",
    label: "Request Password Reset",
  },
};

const ForgotPasswordPage = () => {
  const RESET_NOTICE = { type: "", message: "" };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const option = router.query.person;

  const values = {};
  form.inputs.forEach((input) => (values[input.id] = input.value));
  const [formData, setFormData] = useState(values);

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // a http post request to send reset password email
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/${option}/forgotPassword`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      switch (res.data.type) {
        case "success":
          setNotice({ type: "SUCCESS", message: res.data.message });
          break;
        case "error":
          setTimeout(() => {
            router.replace({
              pathname: `/forgotPassword`,
              query: { person: option },
            });
          }, 3000);
          setNotice({ type: "ERROR", message: res.data.message });
          break;
      }
    } catch (err) {
      setTimeout(() => {
        router.replace({
          pathname: `/forgotPassword`,
          query: { person: option },
        });
      }, 3000);
      setNotice({ type: "ERROR", message: "Internal Server Error." });
    }
  };

  return (
    <div className="ContentContainer">
      <div className="ContentForm">
        <div className="pageHeadingContainer">
          <div className="backArrow" onClick={() => router.back()}>
            <img src={BackArrowIcon} alt="Back Arrow" />
          </div>
          <h1 className="pageHeading">Forgot Password</h1>
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
          <button type={form.submitButton.type}>
            {!isLoading ? <>{form.submitButton.label}</> : <Loader />}
          </button>
        </form>
      </div>
      <div className="ContentPageIllustration">
        <img src={ForgotPasswordPageIllustration} alt="" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
