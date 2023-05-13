import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import { DataTable } from 'react-native-paper'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    TableContainer,
    Line,
    StyledButton,
    ButtonText,
    SuggestionsContainer,
    SuggestionContainer,
    StyledText,
    InputContainer,
    TextInputContainer,
    StyledTextInput,
    StyledLabel,
    BottomContainer,
    DrugName,
    SelectImage,
    PrescriptionImage,
    ScrollableContainer,
    StyledInputLabel
} from './styles'
import { Colors } from '../../shared/variables'

import SettingsImage from '../../images/icons/settings.svg'

const PrescriptionScreen = ({ navigation }) => {
    const [data, setData] = useState([])
    const [drugsData, setDrugsData] = useState([
        {
            id: "1",
            type: "text",
            label: "Microcef CV 200 mg",
            required: false,
            name: "Microcef CV 200 mg",
            value: "",
            approved: "Yes",
            alternatives: "",
            suggestions: "",
        },
        {
            id: "2",
            type: "text",
            label: "Ventryl D",
            required: true,
            name: "Ventryl D",
            value: "",
            approved: "Yes",
            alternatives: "",
            suggestions: "",
        },
        {
            id: "3",
            type: "text",
            label: "Pantotav DSR",
            required: true,
            name: "Pantotav DSR",
            value: "",
            approved: "Yes",
            alternatives: "",
            suggestions: "",
        },
        {
            id: "4",
            type: "text",
            label: "BENZ Pearls",
            required: true,
            name: "BENZ Pearls",
            value: "",
            approved: "Yes",
            alternatives: "",
            suggestions: "",
        },
        {
            id: "5",
            type: "text",
            label: "Montak LC",
            required: true,
            name: "Montak LC",
            value: "",
            approved: "Yes",
            alternatives: "",
            suggestions: "",
        },
    ])

    useEffect(() => {
        setData({
            "_id": "645fa16ef5027e9d7f606bb6",
            "name": "Vansh pres2",
            "isVerified": false,
            "image": "https://res.cloudinary.com/ddr0jey9k/image/upload/v1683988845/prescriptions/1683988829935.jpg",
            "drugs": [
                "STALOPAM",
                "STALOPAM",
                "STALOPAM",
                "STALOPAM"
            ],
            "alternatives": [],
            "suggestions": [],
            "sideEffects": [
                "Increased appetite",
                "Increased appetite",
                "Increased appetite",
                "Increased appetite"
            ],
            "user": "645f8be38438b15c858a618b",
            "doctor": [
                "645fce8b82b88074925c7ac7"
            ],
            "createdAt": "2023-05-13T14:40:46.208Z",
            "updatedAt": "2023-05-13T18:15:33.502Z",
            "__v": 0
        })
    }, [])

    const handleDrugChange = (index, key, value) => {
        setDrugsData((prevDrugs) => {
            const newDrugs = [...prevDrugs]
            newDrugs[index][key] = value
            return newDrugs
        })
    }

    const handleSubmit = () => {
        console.log(drugsData)
    }

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Prescription
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <ScrollableContainer>
                    <SelectImage>
                        <PrescriptionImage resizeMode="cover" source={require('../../images/test/prescription.jpg')} />
                    </SelectImage>
                    <TableContainer>
                        <DataTable>
                            <DataTable.Header style={{
                                height: 50, backgroundColor: `${Colors.tertiary}`
                            }}>
                                <DataTable.Title>Drug name</DataTable.Title>
                                <DataTable.Title>Side Effects</DataTable.Title>
                            </DataTable.Header>
                            {data?.drugs?.map((drug, index) => {
                                return (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{drug}</DataTable.Cell>
                                        <DataTable.Cell>
                                            <View style={{ width: 100, flexShrink: 1 }}>
                                                <Text style={{ textAlign: 'left' }}>{data?.sideEffects?.[index]}</Text>
                                            </View>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                    </TableContainer>
                    <SuggestionsContainer>
                        <StyledText>Suggest alternatives and give suggestions:</StyledText>
                        {drugsData.map((drug, index) => (
                            <SuggestionContainer key={drug.id}>
                                <StyledLabel>Suggestions & Alternative for{' '}
                                    <DrugName>"{drug.name}"</DrugName>:
                                </StyledLabel>
                                <InputContainer>
                                    <TextInputContainer>
                                        <StyledInputLabel>Suggest alternatives</StyledInputLabel>
                                        <StyledTextInput
                                            onChangeText={(alternatives) => handleDrugChange(index, "alternatives", alternatives)}
                                            value={drug.alternatives}
                                            keyboardType="email-address"
                                        />
                                    </TextInputContainer>
                                    <TextInputContainer>
                                        <StyledInputLabel>Give suggestions</StyledInputLabel>
                                        <StyledTextInput
                                            onChangeText={(suggestions) => handleDrugChange(index, "suggestions", suggestions)}
                                            value={drug.suggestions}
                                            keyboardType="email-address"
                                        />
                                    </TextInputContainer>
                                </InputContainer>
                            </SuggestionContainer>
                        ))}
                    </SuggestionsContainer>
                </ScrollableContainer>
                <Line />
                <BottomContainer>
                    <StyledButton onPress={() => navigation.navigate("ViewMedicalHistory")}>
                        <ButtonText>View Patient's medical history</ButtonText>
                    </StyledButton>
                    <StyledButton submit={true} onPress={handleSubmit}>
                        <ButtonText submit={true}>Submit</ButtonText>
                    </StyledButton>
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default PrescriptionScreen