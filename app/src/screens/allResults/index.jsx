import { StatusBar } from 'expo-status-bar'
import { FlatList, View, Text } from 'react-native'

import {
    StyledContainer,
    InnerContainer
} from './styles'

const DATA = [
    {
        id: '1',
        title: 'First Item',
    },
    {
        id: '2',
        title: 'Second Item',
    },
    {
        id: '3',
        title: 'Third Item',
    },
]

const Item = (title) => (
    <View>
        <Text>{title}</Text>
    </View>
)

const AllResultsScreen = () => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Item title={item.title} />}
                    keyExtractor={item => item.id}
                />
            </InnerContainer>
        </StyledContainer>
    )
}

export default AllResultsScreen