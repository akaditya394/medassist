import React, { useState } from 'react'
import { View, ToastAndroid, Platform, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import axios from "axios"

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

import KeyboardAvoidingWrapper from '../../components/keyboardAvoidingWrapper'
import Notice from '../../components/notice'
import { apiURL } from '../../config/constants'

import LogoImage from '../../images/logo/logo.svg'

const ResetPasswordScreen = ({ navigation, route }) => {
    const option = route.params.query.person
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const [hidePassword, setHidePassword] = useState(true)
    const [isloading, setIsLoading] = useState(false)
    const [identifier, setIdentifier] = useState({
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
        if (identifier.password === '') {
            setNotice({ type: "", message: "" })
            showToast()
        } else {
            setIsLoading(true)
            // a http post request to res password
            try {
                const res = await axios.post(`${apiURL}/${option}/resetPassword`, {
                    password: identifier.password, token: route.params.query.token
                },
                    {
                        "headers": {
                            "content-type": "application/json",
                        },
                    }
                )
                setIsLoading(false)
                switch (res?.data?.type) {
                    case "success":
                        setTimeout(() => {
                            navigation.replace("Login")
                        }, 3000)
                        setNotice({ type: "SUCCESS", message: res.data.message })
                        break
                    case "error":
                        // figure out this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        // setTimeout(() => {
                        //     navigation.replace(`/ForgotPassword?person=${option}`);
                        // }, 3000)
                        setNotice({ type: "ERROR", message: res.data.message })
                        setTimeout(() => {
                            navigation.navigate('ForgotPassword', {
                                query: { person: option }
                            })
                        }, 3000);
                        break
                }
            } catch (error) {
                setIsLoading(false)
                setNotice({ type: "ERROR", message: error.response.data.message })
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
                    <SubTitle>Reset Password</SubTitle>
                    <StyledFormArea>
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
                        <MsgBox>...</MsgBox>
                        {notice.message && (
                            <Notice status={notice.type}>
                                {notice.message}
                            </Notice>
                        )}
                        {!isloading ? (
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Set New Password</ButtonText>
                            </StyledButton>
                        ) : (
                            <StyledButton disable={true}>
                                <ActivityIndicator size="large" color="#fff" />
                            </StyledButton>
                        )}
                        <Line />
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

export default ResetPasswordScreen