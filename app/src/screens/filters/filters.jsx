import { StyleSheet, Text, View } from 'react-native';

export const FiltersScreen = () => {
    return (
        <View styles={styles.container}>
            <Text>Filters screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
