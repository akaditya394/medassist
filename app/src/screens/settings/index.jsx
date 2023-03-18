import { StatusBar } from 'expo-status-bar'

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    StyledList,
    StyledHeader,
    StyledItem,
    StyledText
} from './styles'

const SettingsScreen = () => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageTitle>
                    Settings
                </PageTitle>
                <StyledList
                    sections={[
                        {
                            title: 'Account',
                            data: [
                                'Theme',
                                'Logout'
                            ],
                        },
                        {
                            title: 'Dev team',
                            data: [
                                'Aditya Kumar',
                                'Naman Agrawal',
                                'Nishank Priydarshi',
                                'Vansh Agrawal'
                            ],
                            links: [
                                'https://themillenniumfalcon.github.io',
                                'https://themillenniumfalcon.github.io',
                                'https://themillenniumfalcon.github.io',
                                'https://themillenniumfalcon.github.io'
                            ]
                        },
                    ]}
                    renderItem={({ item }) => (
                        <StyledItem>
                            <StyledText>{item}</StyledText>
                        </StyledItem>
                    )}
                    renderSectionHeader={({ section }) => (
                        <StyledHeader>{section.title}</StyledHeader>
                    )}
                    keyExtractor={item => `basicListEntry-${item}`}
                />
            </InnerContainer>
        </StyledContainer>
    )
}

export default SettingsScreen