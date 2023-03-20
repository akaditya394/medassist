import { StatusBar } from 'expo-status-bar'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    PageTitle,
    Settings,
    StyledList,
    StyledListItem
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

const data = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
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
                    renderItem={({ item }) => <StyledListItem>{`${item.text}`}</StyledListItem>}
                    keyExtractor={(item) => item.id.toString()}
                />
            </InnerContainer>
        </StyledContainer>
    )
}

export default AllPrescriptionsScreen