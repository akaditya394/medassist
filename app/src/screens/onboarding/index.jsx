import { StatusBar } from 'expo-status-bar'
import { API_URL } from '@env'

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    Assist,
    StyledButton,
    ButtonText,
    BottomContainer,
    SubTitle,
    StyledList,
    StyledListItem
} from './styles'

const data = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
]

const OnboardingScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageTitle>
                    med<Assist>assist</Assist> {API_URL}
                </PageTitle>
                <SubTitle>A Simple way to help control your health</SubTitle>
                <StyledList
                    data={data}
                    renderItem={({ item }) => <StyledListItem>{`\u2022 ${item.text}`}</StyledListItem>}
                    keyExtractor={(item) => item.id.toString()}
                />
                <BottomContainer>
                    <StyledButton onPress={() => navigation.navigate('Upload')}>
                        <ButtonText>Get Started</ButtonText>
                    </StyledButton>
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default OnboardingScreen