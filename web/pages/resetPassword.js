import { useState } from "react"
import { useRouter } from "next/router"

import Notice from "../components/notice"
import Input from "../components/input"

import ResetPasswordPageIllustration from "../images/resetPassword_page_illustration.svg"

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
}

const ResetPasswordPage = () => {
  const RESET_NOTICE = { type: "", message: "" }
  const [notice, setNotice] = useState(RESET_NOTICE)
  const router = useRouter()

  const values = {}
  form.inputs.forEach((input) => (values[input.id] = input.value))
  const [formData, setFormData] = useState(values)

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // a http post request to change password
  }

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
            )
          })}
          {notice.message && (
            <Notice status={notice.type} mini>
              {notice.message}
            </Notice>
          )}
          <button type={form.submitButton.type}>{form.submitButton.label}</button>
        </form>
      </div>
      <div className="ContentPageIllustration">
        <img src={ResetPasswordPageIllustration} alt="" />
      </div>
    </div>
  )
}

export default ResetPasswordPage