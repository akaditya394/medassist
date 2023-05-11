import React, { useState } from 'react'
import { connect } from "react-redux"
import { View, ToastAndroid, Platform, Alert, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import { loginUser } from '../../store/actions/auth-actions'
import { apiURL } from '../../config/contants'

import LogoImage from '../../images/logo/logo.svg'
import { store } from '../../store'

const LoginScreen = ({ navigation }) => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const [hidePassword, setHidePassword] = useState(true)
    const [isloading, setIsLoading] = useState(false)
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
            showToast()
        } else {
            setIsLoading(true)
            // a http post request to login
            try {
                const res = await loginUser(`${apiURL}`, identifier)
                switch (res.type) {
                    case "success":
                        console.log('redux store is: ', store)
                        // validate(res.data.token, option, option === "user" ? res?.data?.user : res?.data?.doctor)
                        setTimeout(() => {
                            option === "user" ? navigation.replace("MedicalHistory") : navigation.replace("AllPrescriptions")
                        }, 3000)
                        setNotice({ type: "SUCCESS", message: res.message })
                        break
                    case "error":
                        setNotice({ type: "ERROR", message: res.message })
                        loginError()
                        break
                }
                setIsLoading(false)
            } catch (err) {
                // setNotice({ type: "ERROR", message: err.response.data.message })
                console.log(err)
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
                        {!isloading ? (
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
                        ) : (
                            <StyledButton disable={true}>
                                <ActivityIndicator size="large" color="#fff" />
                            </StyledButton>
                        )}
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