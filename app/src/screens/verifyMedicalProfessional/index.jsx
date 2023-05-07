import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ToastAndroid, Platform, AlertIOS } from 'react-native'
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
    { label: 'Hairfall', value: "hairfall" },
    { label: 'Headache', value: "headache" },
    { label: 'Nausea', value: "nausea" },
    { label: 'Sore throat', value: "sore_throat" },
    { label: 'Breathlessness', value: "breathlessness" },
    { label: 'Skin Rashes', value: "skin_rashes" },
    { label: 'Swelling', value: "swelling" },
    { label: 'Upset Stomach', value: "upset_stomach" },
    { label: 'Dry mouth', value: "dry_mouth" },
    { label: 'Drowsiness', value: "drowsiness" },
    { label: 'Vomiting', value: "vomiting" },
    { label: 'Diarrhea', value: "diarrhea" },
    { label: 'Pimples', value: "pimples" },
    { label: 'Fatigue', value: "fatigue" },
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
        } else {
            AlertIOS.alert("You need to fill all the required fields")
        }
    }

    const handleVerify = () => {
        if (name === '' || regNumber === '' || medicalCouncilValue === null) {
            showToast()
        } else {
            console.log(medicalCouncilValue)
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
                    <StyledButton onPress={
                        handleVerify
                        // () => navigation.navigate("VerifyMedicalProfessional")
                    }>
                        <ButtonText>Verify</ButtonText>
                    </StyledButton>
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default VerifyMedicalProfessionalScreen