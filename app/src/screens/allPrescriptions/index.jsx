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
                        username
                    </PageTitle>
                    <Settings
                        resizeMode="cover"
                        source={require('../../images/icons/settings.png')}
                        onPress={() => navigation.navigate('Settings')}
                    />
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