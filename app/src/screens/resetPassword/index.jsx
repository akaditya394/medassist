import React, { useState } from 'react'
import { View, ToastAndroid, Platform, AlertIOS } from 'react-native'
import { StatusBar } from 'expo-status-bar'

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

const ResetPasswordScreen = () => {
    const [hidePassword, setHidePassword] = useState(true)
    const [password, setPassword] = useState('')

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
        if (password === '') {
            showToast()
        } else {
            // console.log('password is: ', password)
        }
    }

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <Logo>
                    <LogoImage width="30px" height="30px" fill="#0F2E53" />
                    <PageTitle>
                        med<Assist>assist</Assist>
                    </PageTitle>
                </Logo>
                <SubTitle>Reset Password</SubTitle>
                <StyledFormArea>
                    <MyTextInput
                        label="Password"
                        icon="lock"
                        onChangeText={(password) => setPassword(password)}
                        value={password}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />
                    <MsgBox>...</MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>Set New Password</ButtonText>
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

export default ResetPasswordScreen