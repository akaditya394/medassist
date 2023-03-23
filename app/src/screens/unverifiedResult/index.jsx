import { StatusBar } from 'expo-status-bar'

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
    Line
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

const drugs = [
    { id: 1, name: 'Drug 1', correct: false, review: 'Review 1' },
    { id: 2, name: 'Drug 2', correct: true },
    { id: 3, name: 'Drug 3', correct: false, review: 'Review 2' },
    { id: 4, name: 'Drug 4', correct: true },
]

const UnverifiedResultScreen = ({ navigation }) => {
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
                        This uploaded prescription is not yet verified
                    </StyledText>
                </Notice>
                <ListTitle>Drugs' names in prescription</ListTitle>
                {drugs.map((drug, key) => {
                    return (
                        <StyledListItem key={key}>
                            <StyledListText>{`\u2022 ${drug.name}`}</StyledListText>
                        </StyledListItem>
                    )
                })}
                <Line />
                <StyledText>
                    Additonal info will be available as soon as your
                    precription gets verified
                </StyledText>
            </InnerContainer>
        </StyledContainer>
    )
}

export default UnverifiedResultScreen