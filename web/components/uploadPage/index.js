import { useState } from "react"
import { useRouter } from "next/router"

import Notice from "../notice"
import Input from "../input"

const form = {
    id: "upload",
    inputs: [
        {
            id: "file_name",
            type: "file_name",
            label: "Name of file",
            required: true,
            value: "",
        },
        {
            id: "file",
            type: "file",
            label: "",
            required: true,
            value: "",
        },
    ],
    submitButton: {
        type: "submit",
        label: "Upload",
    },
}

const LoginPage = () => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const router = useRouter()

    const values = {}
    form.inputs.forEach((input) => (values[input.id] = input.value))
    const [formData, setFormData] = useState(values)

    const handleInputChange = (id, value) => {
        setFormData({ ...formData, [id]: value })
    }

    const maxSelectFile = (e) => {
        let files = e.target.files
        if (files.length > 1) {
            setNotice({ type: "ERROR", message: "Maximum 1 file is allowed." })
            e.target.value = null
            return false
        } else {
            let err = ""
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > 5000000) {
                    // 5 MB
                    err += files[i].name + ", "
                }
            }
            if (err !== "") {
                // error caught
                e.target.value = null
                setNotice({ type: "ERROR", message: "file is too large. Please select file size < 5MB." })
            }
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // a http post request to login
    }

    return (
        <>
            <h1 className="pageHeading">Upload Prescription</h1>
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
        </>
    )
}

export default LoginPage