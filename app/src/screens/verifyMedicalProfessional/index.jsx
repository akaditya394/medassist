import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { connect } from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid, Platform, Alert, ActivityIndicator } from 'react-native'
import DropDownPicker from "react-native-dropdown-picker"

import Notice from '../../components/notice'
import { apiURL } from '../../config/contants'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    Line,
    PageTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    StyledInputLabel,
    StyledTextInput,
    InputContainer,
    DropDownContainer,
    BottomContainer,
    MsgBox
} from './styles'

const data = [
    {
        label: "Andhra Pradesh Medical Council",
        value: "1",
    },
    {
        label: "Arunachal Pradesh Medical Council",
        value: "2",
    },
    { label: "Assam Medical Council", value: "3" },
    { label: "Bhopal Medical Council", value: "28" },
    { label: "Bihar Medical Council", value: "4" },
    { label: "Bombay Medical Council", value: "29" },
    { label: "Chandigarh Medical Council", value: "30" },
    {
        label: "Chattisgarh Medical Council",
        value: "5",
    },
    { label: "Delhi Medical Council", value: "6" },
    { label: "Goa Medical Council", value: "7" },
    { label: "Gujarat Medical Council", value: "8" },
    { label: "Haryana Medical Council", value: "9" },
    {
        label: "Himachal Pradesh Medical Council",
        value: "10",
    },
    { label: "Hyderabad Medical Council", value: "45" },
    {
        label: "Jammu & Kashmir Medical Council",
        value: "11",
    },
    { label: "Jharkhand Medical Council", value: "12" },
    { label: "Karnataka Medical Council", value: "13" },
    {
        label: "Madhya Pradesh Medical Council",
        value: "15",
    },
    { label: "Madras Medical Council", value: "36" },
    { label: "Mahakoshal Medical Council", value: "35" },
    {
        label: "Maharashtra Medical Council",
        value: "16",
    },
    { label: "Manipur Medical Council", value: "26" },
    { label: "Medical Council of India", value: "46" },
    {
        label: "Medical Council of Tanganyika",
        value: "47",
    },
    { label: "Mizroram Medical Council", value: "42" },
    { label: "Mysore Medical Council", value: "37" },
    { label: "Nagaland Medical Council", value: "41" },
    {
        label: "Orissa Council of Medical Registration",
        value: "17",
    },
    {
        label: "Pondicherry Medical Council",
        value: "38",
    },
    { label: "Punjab Medical Council", value: "18" },
    { label: "Rajasthan Medical Council", value: "19" },
    { label: "Sikkim Medical Council", value: "20" },
    { label: "Tamil Nadu Medical Council", value: "21" },
    {
        label: "Telangana State Medical Council",
        value: "43",
    },
    {
        label: "Travancore Cochin Medical Council, Trivandrum",
        value: "50",
    },
    {
        label: "Tripura State Medical Council",
        value: "22",
    },
    {
        label: "Uttar Pradesh Medical Council",
        value: "23",
    },
    {
        label: "Uttarakhand Medical Council",
        value: "24",
    },
    { label: "Vidharba Medical Council", value: "40" },
    {
        label: "West Bengal Medical Council",
        value: "25",
    },
]

const VerifyMedicalProfessionalScreen = ({ navigation }) => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const [name, setName] = useState('')
    const [regNumber, setRegNumber] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [medicalCouncilOpen, setMedicalCouncilOpen] = useState(false)
    const [medicalCouncilValue, setMedicalCouncilValue] = useState(null)
    const [medicalCouncilData, setMedicalCouncilData] = useState(data)
    const [loading, setLoading] = useState(false)

    const showToast = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(
                "You need to fill all the required fields",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        } else if (Platform.OS === 'ios') {
            Alert.alert("You need to fill all the required fields")
        }
    }

    const handleVerify = async () => {
        if (name === '' || regNumber === '' || medicalCouncilValue === null) {
            showToast()
        } else {
            setIsLoading(true)
            setNotice({
                type: "SUCCESS",
                message: "Verification in process. Please wait...",
            })
            setIsLoading(false)
            // http post request to verify
            try {
                const res = await axios.post(`${apiURL}/doctor/verify`, {
                    name, regNumber, medicalCouncilValue
                },
                    {
                        "headers": {
                            "content-type": "application/json",
                        },
                    }
                )
                switch (res?.data?.type) {
                    case "success":
                        if (res.data.verified) {
                            setNotice({
                                type: "SUCCESS",
                                message: "Doctor is verified. Registration is in process...",
                            })

                            const doctorForm = AsyncStorage.getItem("tempSignup")
                            AsyncStorage.removeItem("tempSignup")

                            try {
                                const _res = await axios.post(`${apiURL}/doctor/register`, doctorForm,
                                    {
                                        "headers": {
                                            "content-type": "application/json",
                                        },
                                    }
                                )
                                setIsLoading(false)

                                switch (_res.data.type) {
                                    case "success":
                                        mapDispatch.validate(_res.data.token, "doctor", _res?.data?.doctor)
                                        setTimeout(() => {
                                            navigation.navigate('AllPrescriptions')
                                        }, 3000)
                                        setNotice({ type: "SUCCESS", message: _res.data.message })
                                        break
                                    case "error":
                                        setNotice({ type: "ERROR", message: _res.data.message })
                                        mapDispatch.loginError()
                                        break
                                }
                            } catch (error) {
                                setNotice({ type: "ERROR", message: error.response.data.message })
                                mapDispatch.loginError()
                            }
                        } else {
                            setIsLoading(false)
                            // AsyncStorage.removeItem("tempSignup")
                            setNotice({ type: "ERROR", message: res.data.message })
                            // setTimeout(() => {
                            //   navigation.replace('SignUp')
                            // }, 3000)
                        }
                        break
                    case "error":
                        setNotice({
                            type: "ERROR",
                            message: "Error in verifying doctor.Try again.",
                        })
                        break
                }
            } catch (error) {
                setIsLoading(false)
                setNotice({ type: "ERROR", message: error.response.data.message })
            }
        }
    }

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Verification
                    </PageTitle>
                </UpperContainer>
                <StyledFormArea>
                    <InputContainer>
                        <StyledInputLabel>Doctor Name</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={(name) => setName(name)}
                            value={name}
                            keyboardType="default"
                        />
                    </InputContainer>
                    <InputContainer>
                        <StyledInputLabel>Registration Number</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={(regNumber) => setRegNumber(regNumber)}
                            value={regNumber}
                            keyboardType="decimal-pad"
                        />
                    </InputContainer>
                    <InputContainer>
                        <StyledInputLabel>State Medical Council</StyledInputLabel>
                        <DropDownContainer>
                            <DropDownPicker
                                style={{
                                    borderColor: "#F5F6FB",
                                    backgroundColor: "#F5F6FB"
                                }}
                                open={medicalCouncilOpen}
                                value={medicalCouncilValue}
                                items={medicalCouncilData}
                                setOpen={setMedicalCouncilOpen}
                                setValue={setMedicalCouncilValue}
                                setItems={setMedicalCouncilData}
                                placeholder="Select Medical Council"
                                loading={loading}
                                activityIndicatorColor="#F5F6FB"
                                searchable={true}
                                searchPlaceholder="Search..."
                                onChangeValue={(medicalCouncilValue) => setMedicalCouncilValue(medicalCouncilValue)}
                                zIndex={1000}
                                zIndexInverse={3000}
                            />
                        </DropDownContainer>
                    </InputContainer>
                </StyledFormArea>
                <BottomContainer>
                    <MsgBox>...</MsgBox>
                    {notice.message && (
                        <Notice status={notice.type}>
                            {notice.message}
                        </Notice>
                    )}
                    {!isLoading ? (
                        <StyledButton onPress={handleVerify}>
                            <ButtonText>Verify</ButtonText>
                        </StyledButton>
                    ) : (
                        <StyledButton disable={true}>
                            <ActivityIndicator size="large" color="#fff" />
                        </StyledButton>
                    )}
                    <Line />
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

const mapDispatch = {
    validate: (token, option, about) => ({
        type: "login",
        payload: {
            token: token,
            role: option,
            about: about
        },
    }),
    loginError: () => ({
        type: "error",
    }),
}

const connector = connect(null, mapDispatch)

export default connector(VerifyMedicalProfessionalScreen)