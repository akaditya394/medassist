import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Table, Row, Rows } from 'react-native-table-component'

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

const drugsData = [
    {
        id: "1",
        type: "text",
        label: "Microcef CV 200 mg",
        name: "Microcef CV 200 mg",
        value: "",
        approved: "Yes",
    },
    {
        id: "2",
        type: "text",
        label: "Ventryl D",
        name: "Ventryl D",
        value: "",
        approved: "Yes",
    },
    {
        id: "3",
        type: "text",
        label: "Pantotav DSR",
        name: "Pantotav DSR",
        value: "",
        approved: "Yes",
    },
    {
        id: "4",
        type: "text",
        label: "BENZ Pearls",
        name: "BENZ Pearls",
        value: "",
        approved: "Yes",
    },
    {
        id: "5",
        type: "text",
        label: "Montak LC",
        name: "Montak LC",
        value: "",
        approved: "Yes",
    },
];

const PrescriptionScreen = ({ navigation }) => {
    const [alternatives, setAlternatives] = useState('')
    const [suggestions, setSuggesstions] = useState('')
    const tableHead = ['Drug name', 'Symptoms']
    const tableData = [
        ['Microcef CV 200 mg', 'Throat infections'],
        ['Ventryl D', 'Sore throat'],
        ['Pantotav DSR', 'Acidity'],
        ['BENZ Pearls', 'Dry cough'],
        ['Montak LC', 'Runny nose, watery eyes, sneezing']
    ]

    const handleSubmit = () => { }

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
                        <Table borderStyle={{ borderWidth: 1, borderColor: `${Colors.primary}` }}>
                            <Row data={tableHead} style={{
                                height: 50, backgroundColor: `${Colors.tertiary}`
                            }} textStyle={{ margin: 6, fontWeight: 'bold' }} />
                            <Rows data={tableData} textStyle={{ margin: 6 }} />
                        </Table>
                    </TableContainer>
                    <SuggestionsContainer>
                        <StyledText>Suggest alternatives and give suggestions:</StyledText>
                        {drugsData.map((drug) => (
                            <SuggestionContainer key={drug.id}>
                                <StyledLabel>Approval for{' '}
                                    <DrugName>"{drug.name}"</DrugName>:
                                </StyledLabel>
                                <InputContainer>
                                    <TextInputContainer>
                                        <StyledInputLabel>Suggest alternatives</StyledInputLabel>
                                        <StyledTextInput
                                            onChangeText={(alternatives) => setAlternatives(alternatives)}
                                            value={alternatives}
                                            keyboardType="email-address"
                                        />
                                    </TextInputContainer>
                                    <TextInputContainer>
                                        <StyledInputLabel>Give suggestions</StyledInputLabel>
                                        <StyledTextInput
                                            onChangeText={(suggestions) => setSuggesstions(suggestions)}
                                            value={suggestions}
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