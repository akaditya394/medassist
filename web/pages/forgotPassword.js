import { useState } from "react"
import { useRouter } from 'next/router'

import Notice from "../components/notice"
import Input from "../components/input"

import BackArrowIcon from "../images/icons/arrow-left.svg"
import ForgotPasswordPageIllustration from "../images/forgotPassword_page_illustration.svg"

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
}

const ForgotPasswordPage = () => {
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
        // a http post request to send reset password email
    }

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
                <img src={ForgotPasswordPageIllustration} alt="" />
            </div>
        </div>
    )
}

export default ForgotPasswordPage