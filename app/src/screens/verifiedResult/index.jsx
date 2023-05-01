import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    Notice,
    StyledText,
    StyledListItem,
    StyledListText,
    ListTitle,
    StyledListReview,
    StyledButton,
    ButtonText,
    Line
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

const drugs = [
    { id: 1, name: 'Microcef CV 200 mg', correct: false, suggestion: '-' },
    { id: 2, name: 'Ventryl D', correct: false, suggestion: 'Avoid cold beverages' },
    { id: 3, name: 'Pantotav DSR', correct: false, suggestion: 'Drink warm water in morning' },
    { id: 4, name: 'BENZ Pearls', correct: false, suggestion: '-' },
    { id: 5, name: 'Montak LC', correct: false, suggestion: 'Avoid sour edibles' },
]

const VerifiedResultScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Result
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <Notice>
                    <StyledText>
                        Your upload prescription has been verified by{' '}
                        <Text style={{ fontWeight: 'bold' }}>Dr. Puneet Sharma</Text>
                        , a trained medical professional.
                    </StyledText>
                </Notice>
                <ListTitle>Drugs' names in prescription</ListTitle>
                {drugs.map((drug, key) => {
                    return (
                        <StyledListItem key={key}>
                            <StyledListText>{`\u2022 ${drug.name}`}</StyledListText>
                            {!drug.correct && (
                                <StyledListReview>{drug.suggestion}</StyledListReview>
                            )}
                        </StyledListItem>
                    )
                })}
                <Line />
                <StyledButton onPress={() => navigation.navigate('UpdatedPrescription')}>
                    <ButtonText>Generate an updated prescription</ButtonText>
                </StyledButton>
            </InnerContainer>
        </StyledContainer>
    )
}

export default VerifiedResultScreen