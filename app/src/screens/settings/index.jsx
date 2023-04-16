import { StatusBar } from 'expo-status-bar'
import * as WebBrowser from 'expo-web-browser'

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    StyledList,
    StyledListItem,
    StyledListText,
    Link,
    ListTitle
} from './styles'

import LinkImage from '../../images/icons/external_link.svg'

const devTeam = [
    { id: 1, text: 'Aditya Kumar', link: 'https://github.com/akaditya394' },
    { id: 2, text: 'Naman Agrawal', link: 'https://github.com/NamanAgarwal214' },
    { id: 3, text: 'Nishank Priydarshi', link: 'https://themillenniumfalcon.github.io' },
    { id: 4, text: 'Vansh Agrawal', link: 'https://www.linkedin.com/in/vansh-agarwal-94069a202' },
]

const SettingsScreen = () => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageTitle>
                    Settings
                </PageTitle>
                <ListTitle>Misc</ListTitle>
                {/* <StyledListItem onPress={() => { }}>
                    <StyledListText>Change Theme (not working)</StyledListText>
                </StyledListItem> */}
                <StyledListItem onPress={() => { }}>
                    <StyledListText>Logout</StyledListText>
                </StyledListItem>
                <ListTitle>Dev Team</ListTitle>
                <StyledList
                    data={devTeam}
                    renderItem={({ item }) => (
                        <StyledListItem onPress={() => WebBrowser.openBrowserAsync(item.link)}>
                            <StyledListText>{`\u2022 ${item.text}`}</StyledListText>
                            <Link>
                                <LinkImage width="18px" height="18px" fill="#0F2E53" />
                            </Link>
                        </StyledListItem>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </InnerContainer>
        </StyledContainer>
    )
}

export default SettingsScreen