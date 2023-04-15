import React, { useState } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"

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
    const [current, setCurrent] = useState("user")

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
                <SubTitle>Account Signup</SubTitle>

                <Formik
                    initialValues={{
                        username: '', email: '', password: '', role: ''
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                        console.log('role: ', current)
                    }}
                >
                    {({
                        handleChange, handleBlur, handleSubmit, values
                    }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Username"
                                icon="person"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                keyboardType="default"
                            />
                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput
                                label="Password"
                                icon="lock"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
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
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={() => navigation.navigate("MedicalHistory")}>
                                <ButtonText>Sign up</ButtonText>
                            </StyledButton>
                            <Line />
                        </StyledFormArea>
                    )}
                </Formik>
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