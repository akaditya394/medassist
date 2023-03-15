import { useState } from "react"
import { Text, View } from 'react-native'

import Notice from "../../components/notice"
import Input from "../../components/input"

import styles from "./styles.module.scss"

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
}

const SignUpScreen = () => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)

    const values = {}
    // form.inputs.forEach((input) => (values[input.id] = input.value))
    const [formData, setFormData] = useState(values)

    const handleInputChange = (id: string, value: string) => {
        setFormData({ ...formData, [id]: value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        // a http post request to login
    }

    const handlePasswordReset = (e: any) => {
        e.preventDefault()
    }

    return (
        <View className={styles.loginForm}>
            <Text className={styles.pageHeading}>Sign Up</Text>
        </View>
    )
}

export default SignUpScreen