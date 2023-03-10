import { StyleSheet, Text, View } from 'react-native';

export const UserScreen = () => {
    return (
        <View styles={styles.container}>
            <Text>User screen</Text>
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
