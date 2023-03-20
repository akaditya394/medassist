import React, { useState } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'

import { Octicons, Ionicons } from '@expo/vector-icons'

import {
    StyledContainer,
    InnerContainer,
    Logo,
    PageLogo,
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
    Line
} from './styles'
import { Colors } from '../../shared/variables'

const SignUpScreen = () => {
    const [hidePassword, setHidePassword] = useState(true)
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <Logo>
                    <PageLogo resizeMode="cover" source={require('../../images/logo/logo.png')} />
                    <PageTitle>
                        med<Assist>assist</Assist>
                    </PageTitle>
                </Logo>
                <SubTitle>Account Signup</SubTitle>

                <Formik
                    initialValues={{
                        username: '', email: '', password: ''
                    }}
                    onSubmit={(values) => {
                        console.log(values)
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
                                <RadioButton />
                            </StyledRoleSelector>
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
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

const RadioButton = (props) => {
    return (
        <View style={[{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
        }, props.style]}>
            {
                props.selected ?
                    <View style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000',
                    }} />
                    : null
            }
        </View>
    );
}

export default SignUpScreen