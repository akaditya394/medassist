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