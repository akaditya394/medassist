import { StatusBar } from 'expo-status-bar'
import * as WebBrowser from 'expo-web-browser'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    Line,
    PageTitle,
    StyledListItem,
    StyledListText,
    RenewalDate,
    Link,
    StyledDevTeamListItem,
    StyledDevTeamListText,
    StyledDevListText
} from './styles'

import LinkImage from '../../images/icons/external_link.svg'

const devTeam = [
    { id: 1, text: 'Aditya Kumar', link: 'https://github.com/akaditya394' },
    { id: 2, text: 'Naman Agrawal', link: 'https://github.com/NamanAgarwal214' },
    { id: 3, text: 'Nishank Priydarshi', link: 'https://themillenniumfalcon.github.io' },
    { id: 4, text: 'Vansh Agrawal', link: 'https://www.linkedin.com/in/vansh-agarwal-94069a202' },
]

const handleLogout = () => { }

let isPaidUser = false

const SettingsScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Settings
                    </PageTitle>
                </UpperContainer>
                {isPaidUser ? (
                    <StyledListItem onPress={handleLogout}>
                        <StyledListText>Manage Subscription</StyledListText>
                        <RenewalDate>Your plan renews on June 7, 2023.</RenewalDate>
                    </StyledListItem>
                ) : (
                    <StyledListItem onPress={() => navigation.navigate("UpgradePlan")}>
                        <StyledListText>Upgrade Plan</StyledListText>
                    </StyledListItem>
                )}
                <Line />
                <StyledListItem onPress={handleLogout}>
                    <StyledListText>Logout</StyledListText>
                </StyledListItem>
                <Line />
                <StyledDevListText>Dev Team:</StyledDevListText>
                {devTeam.map((item, index) => {
                    return (
                        <StyledDevTeamListItem key={index} onPress={() => WebBrowser.openBrowserAsync(item.link)}>
                            <StyledDevTeamListText>{`\u2022 ${item.text}`}</StyledDevTeamListText>
                            <Link>
                                <LinkImage width="18px" height="18px" fill="#0F2E53" />
                            </Link>
                        </StyledDevTeamListItem>
                    )
                })}
                <Line />
            </InnerContainer>
        </StyledContainer>
    )
}

export default SettingsScreen