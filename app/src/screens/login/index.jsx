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
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './styles'
import { Colors } from '../../shared/variables'

import LogoImage from '../../images/logo/logo.svg'

const LoginScreen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState('')
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
        if (email === '' || password === '') {
            showToast()
        } else {
            // console.log('email is: ', email)
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
                <SubTitle>Account Login</SubTitle>
                <StyledFormArea>
                    <MyTextInput
                        label="Email Address"
                        icon="mail"
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                        keyboardType="email-address"
                    />
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
                        <ButtonText>Login</ButtonText>
                    </StyledButton>
                    <StyledButton forgotPassword={true} onPress={() => navigation.navigate('ForgotPassword')}>
                        <ButtonText forgotPassword={true}>
                            Forgot Password ?
                        </ButtonText>
                    </StyledButton>
                    <Line />
                    <ExtraView>
                        <ExtraText>Don't have an account yet?</ExtraText>
                        <TextLink>
                            <TextLinkContent
                                onPress={() => navigation.navigate('SignUp')}
                            >{' '}Sign up here.</TextLinkContent>
                        </TextLink>
                    </ExtraView>
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

export default LoginScreen