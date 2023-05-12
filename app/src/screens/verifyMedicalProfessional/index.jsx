import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ToastAndroid, Platform, Alert } from 'react-native'
import DropDownPicker from "react-native-dropdown-picker"

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
    BottomContainer
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
    const [name, setName] = useState('')
    const [regNumber, setRegNumber] = useState('')

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

    const handleVerify = () => {
        if (name === '' || regNumber === '' || medicalCouncilValue === null) {
            showToast()
        } else {
            // console.log(medicalCouncilValue)
            // http post request to verify

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
                    <Line />
                    <StyledButton onPress={handleVerify}>
                        <ButtonText>Verify</ButtonText>
                    </StyledButton>
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default VerifyMedicalProfessionalScreen