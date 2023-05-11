import React, { useState } from 'react'
import { connect } from "react-redux"
import { View, ToastAndroid, Platform, Alert, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"
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
    StyledRoleSelector,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    StyledText
} from './styles'
import { Colors } from '../../shared/variables'

import KeyboardAvoidingWrapper from '../../components/keyboardAvoidingWrapper'
import Notice from '../../components/notice'
import { apiURL } from '../../config/contants'

import LogoImage from '../../images/logo/logo.svg'

const SignUpScreen = ({ navigation }) => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const [hidePassword, setHidePassword] = useState(true)
    const [current, setCurrent] = useState("user")
    const [isloading, setIsLoading] = useState(false)
    const [identifier, setIdentifier] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        weight: ""
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
        if (username === '' || email === '' || password === '' || (current === 'user' && (weight === '' || age === ''))
        ) {
            showToast()
        } else if (current === 'medical_professional') {
            navigateToVerifyScreen()
        } else {
            setIsLoading(true)
            // a http post request to signup
            try {
                // const res = await axios.post(`${apiURL}/${current}/register`,
                const res = await axios.post(`https://test-server-mcnj.onrender.com`,
                    {
                        // username,
                        // email,
                        // password,
                        // current,
                        // weight,
                        // age
                        name: "nishank",
                        password: "password"
                    }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                // delete this line
                console.log('Data is: ', res.data)
                setIsLoading(false)
                switch (res.data.type) {
                    case "success":
                        createUser(res.data.token, option, option === "user" ? res?.data?.user : res?.data?.doctor)
                        // setTimeout(() => {
                        //     option === "user"
                        //         ? router.replace("/medicalHistory")
                        //         : router.replace("/prescriptions")
                        // }, 3000)
                        break
                    case "error":
                        setNotice({ type: "ERROR", message: res.data.message })
                        break
                }
            } catch (err) {
                // setNotice({ type: "ERROR", message: err.response.data.message })
                console.log(err)
            }
        }
    }

    const navigateToVerifyScreen = () => {
        navigation.navigate("VerifyMedicalProfessional")
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
                    <SubTitle>Account Signup</SubTitle>
                    <StyledFormArea>
                        <MyTextInput
                            label="Name"
                            icon="person"
                            onChangeText={(text) => setIdentifier({ ...identifier, name: text })}
                            value={identifier.name}
                            keyboardType="default"
                        />
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
                                selected={current}
                                onSelected={(value) => setCurrent(value)}
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
                        {current === "user" && (
                            <>
                                <View>
                                    <StyledInputLabel>Weight in kg</StyledInputLabel>
                                    <StyledTextInput
                                        isUser={true}
                                        onChangeText={(text) => setIdentifier({ ...identifier, weight: text })}
                                        value={identifier.weight}
                                        keyboardType="decimal-pad"
                                    />
                                </View>
                                <View>
                                    <StyledInputLabel>Age</StyledInputLabel>
                                    <StyledTextInput
                                        isUser={true}
                                        onChangeText={(text) => setIdentifier({ ...identifier, age: text })}
                                        value={identifier.age}
                                        keyboardType="decimal-pad"
                                    />
                                </View>
                            </>
                        )}
                        <MsgBox>...</MsgBox>
                        {notice.message && (
                            <Notice status={notice.type}>
                                {notice.message}
                            </Notice>
                        )}
                        {!isloading ? (
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Sign up</ButtonText>
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

const mapDispatch = {
    createUser: (token, option, about) => ({
        type: "signup",
        payload: {
            token: token,
            role: option,
            about: about
        },
    }),

    signupError: () => ({
        type: "error",
    }),
}

const connector = connect(null, mapDispatch)

export default connector(SignUpScreen)