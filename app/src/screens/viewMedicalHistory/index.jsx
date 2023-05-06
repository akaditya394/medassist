import { StatusBar } from 'expo-status-bar'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    HistoryContainer,
    StyledCondition,
    ConditionText,
    StyledText
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

const data = [
    { id: "1", text: "Diabetes" },
    { id: "2", text: "High Blood pressure" },
    { id: "3", text: "Low Blood pressure" },
    { id: "4", text: "Respiratory Problems" },
    { id: "5", text: "COVID 19" },
    { id: "6", text: "Allergies" },
    { id: "7", text: "Migraine" },
    { id: "8", text: "Gastrointestinal distress" },
    { id: "9", text: "Skin Problems" },
    { id: "10", text: "Mental Health Problems" }
]

const ViewMedicalHistoryScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Patient's medical history
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <StyledText>Here is the patient's medical History:</StyledText>
                <HistoryContainer>
                    {data.map((condition, key) => {
                        return (
                            <StyledCondition key={key}>
                                <ConditionText>{`\u2022 ${condition.text}`}</ConditionText>
                            </StyledCondition>
                        );
                    })}
                </HistoryContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default ViewMedicalHistoryScreen