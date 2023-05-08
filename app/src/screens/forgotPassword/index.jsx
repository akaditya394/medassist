import React, { useState } from 'react'
import { View, ToastAndroid, Platform, AlertIOS } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Spinner from 'react-native-loading-spinner-overlay'

import { Octicons, Ionicons } from '@expo/vector-icons'

import {
    StyledContainer,
    InnerContainer,
    Logo,
    PageTitle,
    Assist,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line
} from './styles'
import { Colors } from '../../shared/variables'

import LogoImage from '../../images/logo/logo.svg'

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('')
    const [isloading, setIsLoading] = useState(false)

    const showToast = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(
                "You need to fill all the required fields",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        } else {
            AlertIOS.alert("You need to fill all the required fields")
        }
    }

    const handleSubmit = () => {
        if (email === '') {
            showToast()
        } else {
            // setIsLoading(true)
            // console.log('email is: ', email)
        }
    }

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <Spinner
                    visible={isloading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                <Logo>
                    <LogoImage width="30px" height="30px" fill="#0F2E53" />
                    <PageTitle>
                        med<Assist>assist</Assist>
                    </PageTitle>
                </Logo>
                <SubTitle>Forgot Password</SubTitle>
                <StyledFormArea>
                    <MyTextInput
                        label="Email Address"
                        icon="mail"
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                        keyboardType="email-address"
                    />
                    <MsgBox>...</MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>Request Password Reset</ButtonText>
                    </StyledButton>
                    <Line />
                </StyledFormArea>
            </InnerContainer>
        </StyledContainer>
    )
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.primary} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.primary} />
                </RightIcon>
            )}
        </View>
    )
}

export default ForgotPasswordScreen