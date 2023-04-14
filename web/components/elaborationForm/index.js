import { useState } from "react"
import { useRouter } from "next/router"

import styles from "./styles.module.scss"
import Notice from "../notice"
import Input from "../input"

const form = {
    id: "elaboration",
    inputs: [
        {
            id: "side_effects",
            type: "side_effects",
            label: "Your side effects",
            required: true,
            value: "",
        },
    ],
    submitButton: {
        type: "submit",
        label: "Submit",
    },
}

const ElaborationForm = () => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const router = useRouter()

    const values = {}
    form.inputs.forEach((input) => (values[input.id] = input.value))
    const [formData, setFormData] = useState(values)

    const handleInputChange = (id, value) => {
        setFormData({ ...formData, [id]: value })
        console.log(formData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // a http post request to submit elaboration form
    }

    return (
        <div className={styles.elaborationForm}>
            <h1 className="pageHeading">Futher describe side effects</h1>
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
                <button type={form.submitButton.type} onClick={() => router.push("/results")}>
                    {form.submitButton.label}
                </button>
            </form>
        </div>
    )
}

export default ElaborationForm