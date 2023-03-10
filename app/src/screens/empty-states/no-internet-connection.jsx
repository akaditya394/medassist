import { StyleSheet, Text, View } from 'react-native';

export const NoInternetScreen = () => {
    return (
        <View styles={styles.container}>
            <Text>No Internet screen</Text>
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
