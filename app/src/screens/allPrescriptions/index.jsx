import { StatusBar } from 'expo-status-bar'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    PageTitle,
    Settings,
    StyledList,
    StyledListItem,
    StyledListText
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

const data = [
    { id: 1, text: 'Prescription 1' },
    { id: 2, text: 'Prescription 2' },
    { id: 3, text: 'Prescription 3' },
]

const AllPrescriptionsScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Home
                    </PageTitle>
                    <Settings onPress={() => navigation.navigate('Settings')}>
                        <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                    </Settings>
                </UpperContainer>
                <StyledList
                    data={data}
                    renderItem={({ item }) => (
                        <StyledListItem onPress={() => navigation.navigate("Prescription")}>
                            <StyledListText>{`${item.text}`}</StyledListText>
                        </StyledListItem>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </InnerContainer>
        </StyledContainer>
    )
}

export default AllPrescriptionsScreen