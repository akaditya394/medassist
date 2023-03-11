import { useState } from "react"

const PrescriptionPage = () => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)

    return (
        <div className="ContentContainer">
            On this page the doctor can verify individual prescriptions
        </div>
    )
}

export default PrescriptionPage