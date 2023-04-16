import { useState } from 'react';
import { Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Table, Row, Rows } from 'react-native-table-component'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"

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
    RadioContainer
} from './styles'
import { Colors } from '../../shared/variables'

import SettingsImage from '../../images/icons/settings.svg'

const drugsData = [
    {
        id: "1",
        type: "text",
        label: "Microcef CV 200 mg",
        required: false,
        name: "Microcef CV 200 mg",
        value: "",
        approved: "Yes",
    },
    {
        id: "2",
        type: "text",
        label: "Ventryl D",
        required: true,
        name: "Ventryl D",
        value: "",
        approved: "Yes",
    },
    {
        id: "3",
        type: "text",
        label: "Pantotav DSR",
        required: true,
        name: "Pantotav DSR",
        value: "",
        approved: "Yes",
    },
    {
        id: "4",
        type: "text",
        label: "BENZ Pearls",
        required: true,
        name: "BENZ Pearls",
        value: "",
        approved: "Yes",
    },
    {
        id: "5",
        type: "text",
        label: "Montak LC",
        required: true,
        name: "Montak LC",
        value: "",
        approved: "Yes",
    },
];

const PrescriptionScreen = ({ navigation }) => {
    const [current, setCurrent] = useState("user")
    const [drugApprovals, setDrugApprovals] = useState(
        drugsData.reduce((acc, drug) => {
            acc[drug.id] = { approval: "yes", suggestion: "" };
            return acc;
        }, {})
    );

    const handleApprovalChange = (e, drugId) => {
        const { value } = e.target;
        setDrugApprovals((prevApprovals) => ({
            ...prevApprovals,
            [drugId]: { ...prevApprovals[drugId], approval: value },
        }));
    };

    const handleSuggestionChange = (e, drugId) => {
        const { value } = e.target;
        setDrugApprovals((prevApprovals) => ({
            ...prevApprovals,
            [drugId]: { ...prevApprovals[drugId], suggestion: value },
        }));
    };

    const tableHead = ['Drug name', 'Symptoms', 'Alternatives']
    const tableData = [
        ['Microcef CV 200 mg', 'Throat infections', 'Goodcif CV 200mg'],
        ['Ventryl D', 'Sore throat', 'Chericof'],
        ['Pantotav DSR', 'Acidity', 'Pantin D'],
        ['BENZ Pearls', 'Dry cough', '-'],
        ['Montak LC', 'Runny nose, watery eyes, sneezing', 'Levocet M']
    ]

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
                <TableContainer>
                    <Table borderStyle={{ borderWidth: 1, borderColor: `${Colors.primary}` }}>
                        <Row data={tableHead} style={{
                            height: 50, backgroundColor: `${Colors.tertiary}`
                        }} textStyle={{ margin: 6, fontWeight: 'bold' }} />
                        <Rows data={tableData} textStyle={{ margin: 6 }} />
                    </Table>
                </TableContainer>
                <SuggestionsContainer>
                    {drugsData.map((drug) => (
                        <SuggestionContainer key={drug.id}>
                            <StyledText>Approval for{' '}
                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{drug.name}</Text>:
                            </StyledText>
                            <RadioContainer>
                                <RadioButtonGroup
                                    containerStyle={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                    selected={current}
                                    onSelected={(value) => setCurrent(value)}
                                    radioBackground="#0F2E53"
                                >
                                    <RadioButtonItem
                                        name={`drug${drug.id}Approval`}
                                        value="yes"
                                        checked={drugApprovals[drug.id].approval === "yes"}
                                        onChange={(e) => handleApprovalChange(e, drug.id)}
                                        label={
                                            <StyledText>yes</StyledText>
                                        }
                                    />
                                    <RadioButtonItem
                                        name={`drug${drug.id}Approval`}
                                        value="no"
                                        checked={drugApprovals[drug.id].approval === "no"}
                                        onChange={(e) => handleApprovalChange(e, drug.id)}
                                        label={
                                            <StyledText>No</StyledText>
                                        }
                                    />
                                </RadioButtonGroup>
                            </RadioContainer>
                        </SuggestionContainer>
                    ))}
                </SuggestionsContainer>
                <Line />
                <StyledButton onPress={() => navigation.navigate("AllPrescriptions")}>
                    <ButtonText>Submit</ButtonText>
                </StyledButton>
            </InnerContainer>
        </StyledContainer>
    )
}

export default PrescriptionScreen