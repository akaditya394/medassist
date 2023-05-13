import React, { useState } from 'react'
import { connect } from "react-redux"
import { View, ToastAndroid, Platform, Alert, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"
import axios from 'axios'

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
    TextLinkContent,
    StyledRoleSelector,
    StyledText
} from './styles'
import { Colors } from '../../shared/variables'

import KeyboardAvoidingWrapper from '../../components/keyboardAvoidingWrapper'
import Notice from '../../components/notice'
import { apiURL } from '../../config/constants'

import LogoImage from '../../images/logo/logo.svg'

const LoginScreen = ({ navigation, validate, loginError }) => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const [hidePassword, setHidePassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [option, setOption] = useState("user")
    const [identifier, setIdentifier] = useState({
        email: "",
        password: "",
    })

    const showToast = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(
                "You need to fill all the required fields",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        } else if (Platform.OS === 'ios') {
            Alert.alert("You need to fill all the required fields")
        }
    }

    const handleSubmit = async () => {
        if (identifier.email === '' || identifier.password === '') {
            setNotice({ type: "", message: "" })
            showToast()
        } else {
            setIsLoading(true)
            // a http post request to login
            try {
                const res = await axios.post(`${apiURL}/${option}/login`, JSON.stringify(identifier),
                    {
                        "headers": {
                            "content-type": "application/json",
                        },
                    }
                )
                setIsLoading(false)
                switch (res?.data?.type) {
                    case "success":
                        validate(res.data.token, option, option === "user" ? res?.data?.user : res?.data?.doctor)
                        setTimeout(() => {
                            option === "user" ? navigation.replace("AllResults") : navigation.replace("AllPrescriptions")
                        }, 3000)
                        setNotice({ type: "SUCCESS", message: res.data.message })
                        break
                    case "error":
                        setNotice({ type: "ERROR", message: res.data.message })
                        loginError()
                        break
                }
            } catch (error) {
                setIsLoading(false)
                setNotice({ type: "ERROR", message: error.response.data.message })
                loginError()
            }
        }
    }

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <KeyboardAvoidingWrapper>
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
                            onChangeText={(text) => setIdentifier({ ...identifier, email: text })}
                            value={identifier.email}
                            keyboardType="email-address"
                        />
                        <MyTextInput
                            label="Password"
                            icon="lock"
                            onChangeText={(text) => setIdentifier({ ...identifier, password: text })}
                            value={identifier.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <StyledInputLabel>Select your role</StyledInputLabel>
                        <StyledRoleSelector>
                            <RadioButtonGroup
                                containerStyle={{
                                    marginBottom: 10,
                                    marginTop: 10,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                selected={option}
                                onSelected={(value) => setOption(value)}
                                radioBackground="#0F2E53"
                            >
                                <RadioButtonItem
                                    value="user"
                                    label={
                                        <StyledText>User</StyledText>
                                    }
                                />
                                <RadioButtonItem
                                    value="medical_professional"
                                    label={
                                        <StyledText>Medical Professional</StyledText>
                                    }
                                />
                            </RadioButtonGroup>
                        </StyledRoleSelector>
                        <MsgBox>...</MsgBox>
                        {notice.message && (
                            <Notice status={notice.type}>
                                {notice.message}
                            </Notice>
                        )}
                        {!isLoading ? (
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
                        ) : (
                            <StyledButton disable={true}>
                                <ActivityIndicator size="large" color="#fff" />
                            </StyledButton>
                        )}
                        <StyledButton forgotPassword={true} onPress={() => navigation.navigate('ForgotPassword', {
                            query: { person: option }
                        })}>
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
            </KeyboardAvoidingWrapper>
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

const mapDispatch = {
    validate: (token, option, about) => ({
        type: "login",
        payload: {
            token: token,
            role: option,
            about: about
        },
    }),
    loginError: () => ({
        type: "error",
    }),
}

const connector = connect(null, mapDispatch)

export default connector(LoginScreen)