import React, { useState, useCallback } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    PageTitle,
    StyledText,
    MsgBox,
    StyledButton,
    ButtonText,
    Line
} from './styles'

const NoInternetScreen = () => {
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, [])

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <InnerContainer>
                    <UpperContainer>
                        <PageTitle>
                            No Internet
                        </PageTitle>
                    </UpperContainer>
                    <StyledText>Couldn't connect to the internet. Please check your network settings.</StyledText>
                    <MsgBox>...</MsgBox>
                    <StyledButton onPress={onRefresh}>
                        <ButtonText>Retry</ButtonText>
                    </StyledButton>
                    <Line />
                </InnerContainer>
            </ScrollView>
        </StyledContainer>
    )
}

export default NoInternetScreen