import { StatusBar } from 'expo-status-bar'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    PageTitle,
    Settings,
    StyledList,
    StyledListItem,
    StyledListText,
    Verified
} from './styles'

const data = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
]

const AllResultsScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Home
                    </PageTitle>
                    <Settings
                        resizeMode="cover"
                        source={require('../../images/icons/settings.png')}
                        onPress={() => navigation.navigate('Settings')}
                    />
                </UpperContainer>
                <StyledList
                    data={data}
                    renderItem={({ item }) => (
                        <StyledListItem>
                            <StyledListText>{`${item.text}`}</StyledListText>
                            <Verified resizeMode="cover" source={require('../../images/icons/verified.png')} />
                        </StyledListItem>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </InnerContainer>
        </StyledContainer>
    )
}

export default AllResultsScreen