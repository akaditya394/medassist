import React, { useState } from 'react'
import { View, ToastAndroid, Platform, AlertIOS } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"
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
    StyledRoleSelector,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    StyledText
} from './styles'
import { Colors } from '../../shared/variables'

import LogoImage from '../../images/logo/logo.svg'

const SignUpScreen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [current, setCurrent] = useState("user")
    const [weight, setWeight] = useState('')
    const [age, setAge] = useState('')
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
        if (username === '' || email === '' || password === '' || (current === 'user' && (weight === '' || age === ''))
        ) {
            showToast()
        } else if (current === 'medical_professional') {
            navigateToVerifyScreen()
        } else {
            // setIsLoading(true)
            // console.log('username is: ', username)
            // console.log('email is: ', email)
        }
    }

    const navigateToVerifyScreen = () => {
        navigation.navigate("VerifyMedicalProfessional")
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
                <SubTitle>Account Signup</SubTitle>
                <StyledFormArea>
                    <MyTextInput
                        label="Username"
                        icon="person"
                        onChangeText={(username) => setUsername(username)}
                        value={username}
                        keyboardType="default"
                    />
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
                                    onChangeText={(weight) => setWeight(weight)}
                                    value={weight}
                                    keyboardType="decimal-pad"
                                />
                            </View>
                            <View>
                                <StyledInputLabel>Age</StyledInputLabel>
                                <StyledTextInput
                                    isUser={true}
                                    onChangeText={(age) => setAge(age)}
                                    value={age}
                                    keyboardType="decimal-pad"
                                />
                            </View>
                        </>
                    )}
                    <MsgBox>...</MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>Sign up</ButtonText>
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

export default SignUpScreen