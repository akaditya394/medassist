import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, ActivityIndicator } from 'react-native'
import { DataTable } from 'react-native-paper'
import axios from 'axios'

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

import { store } from '../../store'
import Notice from '../../components/notice'
import { apiURL } from '../../config/constants'

import SettingsImage from '../../images/icons/settings.svg'

const PrescriptionScreen = ({ navigation, route }) => {
    const [drugsData, setDrugsData] = useState([])
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const [isLoading, setIsLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [user, setUser] = useState("")

    useEffect(() => {
        async function getPrescription() {
            try {
                const token = store.getState().auth.token
                setIsLoading(true)
                const res = await axios.post(`${apiURL}/prescription/getSide`,
                    JSON.stringify({
                        id: route.params.query.id,
                    }),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                switch (res.data.type) {
                    case "success":
                        setIsLoading(false);
                        setDrugsData(
                            res.data.prescriptions.drugs.map((drug, i) => ({
                                id: i,
                                drug,
                                sideEffect: res.data.prescriptions?.sideEffects[i],
                                alternatives: "",
                                suggestions: "",
                            }))
                        );
                        setImageUrl(res.data.prescriptions?.image);
                        setUser(res.data.prescriptions?.user);
                        break;
                    case "error":
                        setIsLoading(false);
                        setNotice({ type: "ERROR", message: res.data.message })
                        break;
                }
            } catch (error) {
                setIsLoading(false);
                setNotice({ type: "ERROR", message: error.response.data.message })
            }
        }
        route.params.query && getPrescription();
    }, [route.params.query]);

    const handleDrugChange = (index, key, value) => {
        setDrugsData((prevDrugs) => {
            const newDrugs = [...prevDrugs]
            newDrugs[index][key] = value
            return newDrugs
        })
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const token = store.getState().auth.token
            const res = await axios.post(
                `${apiURL}/prescription/addAlternativeAndSuggestion?id=${route?.params?.query?.id}`,
                {
                    suggestions: drugsData?.map((drug) => drug?.suggestions),
                    alternatives: drugsData?.map((drug) => drug?.alternatives),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            switch (res.data.type) {
                case "success":
                    setIsLoading(false);
                    navigation.replace("Prescriptions");
                    setNotice({ type: "SUCCESS", message: res.data.message });
                    break;
                case "error":
                    setIsLoading(false);
                    setNotice({ type: "ERROR", message: res.data.message });
                    break;
            }
        } catch (err) {
            setIsLoading(false);
            setNotice({ type: "ERROR", message: "Error in adding alternatives" });
        }
        // Perform submission logic with drug approvals data
    };

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
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0F2E53" />
                ) : (
                    <>
                        {notice.message && (
                            <Notice status={notice.type}>
                                {notice.message}
                            </Notice>
                        )}
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
                                    {drugsData?.map((drug, index) => {
                                        return (
                                            <DataTable.Row key={index}>
                                                <DataTable.Cell>{drug.drug}</DataTable.Cell>
                                                <DataTable.Cell>
                                                    <View style={{ width: 100, flexShrink: 1 }}>
                                                        <Text style={{ textAlign: 'left' }}>{drug.sideEffect}</Text>
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
                                            <DrugName>"{drug.drug}"</DrugName>:
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
                    </>
                )}
            </InnerContainer>
        </StyledContainer>
    )
}

export default PrescriptionScreen