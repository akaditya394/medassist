import React, { useState } from 'react'
import { View, ToastAndroid, Platform, Alert, ActivityIndicator } from 'react-native'
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
import { apiURL } from '../../config/contants'

import LogoImage from '../../images/logo/logo.svg'

const ForgotPasswordScreen = ({ navigation, route }) => {
    const option = route.params.query.person
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const [isloading, setIsLoading] = useState(false)
    const [identifier, setIdentifier] = useState({
        email: "",
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
        if (identifier.email === '') {
            setNotice({ type: "", message: "" })
            showToast()
        } else {
            setIsLoading(true)
            // a http post request to forgot password
            try {
                const res = await axios.post(`${apiURL}/${option}/forgotPassword`, JSON.stringify(identifier),
                    {
                        "headers": {
                            "content-type": "application/json",
                        },
                    }
                )
                setIsLoading(false)
                switch (res?.data?.type) {
                    case "success":
                        setNotice({ type: "SUCCESS", message: res.data.message })
                        break
                    case "error":
                        setTimeout(() => {
                            navigation.navigate('ForgotPassword', {
                                query: { person: option }
                            })
                        }, 3000)
                        setNotice({ type: "ERROR", message: res.data.message })
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
                    <SubTitle>Forgot Password</SubTitle>
                    <StyledFormArea>
                        <MyTextInput
                            label="Email Address"
                            icon="mail"
                            onChangeText={(text) => setIdentifier({ ...identifier, email: text })}
                            value={identifier.email}
                            keyboardType="email-address"
                        />
                        <MsgBox>...</MsgBox>
                        {notice.message && (
                            <Notice status={notice.type}>
                                {notice.message}
                            </Notice>
                        )}
                        {!isloading ? (
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Request Password Reset</ButtonText>
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

export default ForgotPasswordScreen