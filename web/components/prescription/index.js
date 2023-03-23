import { useState } from "react"
import SideEffectsTable from "../sideEffectsTable"
import styles from "./styles.module.scss"
import Notice from "../notice"
import Input from "../input"

const drugs = [
    {
        id: "1",
        type: "text",
        label: "Drug 1",
        required: false,
        name: "Drug 1",
        value: "",
    },
    {
        id: "2",
        type: "text",
        label: "Drug 2",
        required: true,
        name: "Drug 2",
        value: "",
    },
]

const Prescription = () => {
    const RESET_NOTICE = { type: "", message: "" };
    const [notice, setNotice] = useState(RESET_NOTICE);
    const [boolean, setBoolean] = useState("Yes")

    const onOptionChange = e => {
        setBoolean(e.target.value)
    }

    const values = {};
    drugs.forEach((input) => (values[input.id] = input.value));
    const [formData, setFormData] = useState(values);

    const handleInputChange = (id, value) => {
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
    }

    return (
        <>
            <h1 className="pageHeading">Analyze the prescription</h1>
            <div className={styles.table}>
                <SideEffectsTable />
            </div>
            <h2>Select no to write a suggestion, yes for approval</h2>
            <div className={styles.formContainer}>
                <form id="prescription" method="post" onSubmit={handleSubmit}>
                    {drugs.map((drug, key) => {
                        return (
                            <>
                                <div className={styles.label}>{drug.name}</div>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="radio"
                                        name="boolean"
                                        value="Yes"
                                        id="Yes"
                                        checked={boolean === "Yes"}
                                        onChange={onOptionChange}
                                    />
                                    <label htmlFor="Yes">Yes</label>

                                    <input
                                        type="radio"
                                        name="boolean"
                                        value="No"
                                        id="No"
                                        checked={boolean === "No"}
                                        onChange={onOptionChange}
                                    />
                                    <label htmlFor="No">No</label>
                                </div>
                                {boolean === "No" && (
                                    <Input
                                        key={key}
                                        formId="prescription"
                                        id={drug.id}
                                        type={drug.type}
                                        required={drug.required}
                                        value={formData[drug.id]}
                                        name={drug.name}
                                        setValue={(value) => handleInputChange(drug.id, value)}
                                    />
                                )}
                            </>
                        );
                    })}
                    {notice.message && (
                        <Notice status={notice.type} mini>
                            {notice.message}
                        </Notice>
                    )}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Prescription