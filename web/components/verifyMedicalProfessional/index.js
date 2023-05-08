import React, { useState } from "react"

import Notice from "../notice";
import styles from "./styles.module.scss"
import UploadPageIllustration from "../../images/upload_page_illustration.svg";

const data = [
    { label: "None", value: "" },
    { label: "Andhra Pradesh Medical Council", value: "andhra_pradesh_medical_council" },
    { label: "Arunachal Pradesh Medical Council", value: "arunachal_pradesh_medical_council" },
    { label: "Assam Medical Council", value: "assam_medical_council" },
    { label: "Bhopal Medical Council", value: "bhopal_medical_council" },
    { label: "Bihar Medical Council", value: "bihar_medical_council" },
    { label: "Bombay Medical Council", value: "bombay_medical_council" },
    { label: "Chandigarh Medical Council", value: "chandigarh_medical_council" },
    { label: "Chattisgarh Medical Council", value: "chattisgarh_medical_council" },
    { label: "Delhi Medical Council", value: "delhi_medical_council" },
    { label: "Goa Medical Council", value: "goa_medical_council" },
    { label: "Gujarat Medical Council", value: "gujarat_medical_council" },
    { label: "Haryana Medical Council", value: "haryana_medical_council" },
    { label: "Himachal Pradesh Medical Council", value: "himachal_pradesh_medical_council" },
    { label: "Hyderabad Medical Council", value: "hyderabad_medical_council" },
    { label: "Jammu & Kashmir Medical Council", value: "jammu_&_kashmir_medical_council" },
    { label: "Jharkhand Medical Council", value: "jharkhand_medical_council" },
    { label: "Karnataka Medical Council", value: "karnataka_medical_council" },
    { label: "Madhya Pradesh Medical Council", value: "madhya_pradesh_medical_council" },
    { label: "Madras Medical Council", value: "madras_medical_council" },
    { label: "Mahakoshal Medical Council", value: "mahakoshal_medical_council" },
    { label: "Maharashtra Medical Council", value: "maharashtra_medical_council" },
    { label: "Manipur Medical Council", value: "manipur_medical_council" },
    { label: "Medical Council of India", value: "medical_council_of_india" },
    { label: "Medical Council of Tanganyika", value: "medical_council_of_tanganyika" },
    { label: "Mizroram Medical Council", value: "mizroram_medical_council" },
    { label: "Mysore Medical Council", value: "mysore_medical_council" },
    { label: "Nagaland Medical Council", value: "nagaland_medical_council" },
    { label: "Orissa Council of Medical Registration", value: "orissa_council_of_medical_registration" },
    { label: "Pondicherry Medical Council", value: "pondicherry_medical_council" },
    { label: "Punjab Medical Council", value: "punjab_medical_council" },
    { label: "Rajasthan Medical Council", value: "rajasthan_medical_council" },
    { label: "Sikkim Medical Council", value: "sikkim_medical_council" },
    { label: "Tamil Nadu Medical Council", value: "tamil_nadu_medical_council" },
    { label: "Telangana State Medical Council", value: "telangana_state_medical_council" },
    { label: "Travancore Cochin Medical Council, Trivandrum", value: "travancore_cochin_medical_council" },
    { label: "Tripura State Medical Council", value: "tripura_state_medical_council" },
    { label: "Uttar Pradesh Medical Council", value: "uttar_pradesh_medical_council" },
    { label: "Uttarakhand Medical Council", value: "uttarakhand_medical_council" },
    { label: "Vidharba Medical Council", value: "vidharba_medical_council" },
    { label: "West Bengal Medical Council", value: "west_bengal_medical_council" },
]

const VerifyMedicalProfessional = () => {
    const [name, setName] = useState('')
    const [regNumber, setRegNumber] = useState('')
    const RESET_NOTICE = { type: '', message: '' };
    const [notice, setNotice] = useState(RESET_NOTICE);
    const [value, setValue] = useState('')

    const handleSubmit = () => { }
    return (
        <div className="ContentContainer">
            <div className="ContentForm">
                <h1 className="pageHeading">Verification</h1>
                <form id="upload" onSubmit={handleSubmit}>
                    <div className={styles.inputWrapper}>
                        <label>Doctor Name</label>
                        <input
                            required={true}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>Registration Number</label>
                        <input
                            required={true}
                            value={regNumber}
                            onChange={(e) => setRegNumber(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>State Medical Council</label>
                        <select
                            value={value}
                            required={true}
                            onChange={(e) => setValue(e.target.value)}
                        >
                            {data.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    {notice.message && (
                        <Notice status={notice.type} mini>
                            {notice.message}
                        </Notice>
                    )}
                    <button type="submit" onClick={handleSubmit}>
                        Verify
                    </button>
                </form>
            </div>
            <div className="ContentPageIllustration">
                <img src={UploadPageIllustration} alt="" />
            </div>
        </div>
    )
}

export default VerifyMedicalProfessional