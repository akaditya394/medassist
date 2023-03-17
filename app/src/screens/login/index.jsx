import React, { useState } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'

import { Octicons, Ionicons } from '@expo/vector-icons'

import {
    StyledContainer,
    InnnerContainer,
    Logo,
    PageLogo,
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

const LoginScreen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnnerContainer>
                <Logo>
                    <PageLogo resizeMode="cover" source={require('../../images/logo/logo.png')} />
                    <PageTitle>
                        med<Assist>assist</Assist>
                    </PageTitle>
                </Logo>
                <SubTitle>Account login</SubTitle>

                <Formik
                    initialValues={{
                        email: '', password: ''
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
                                label="Email Address"
                                icon="mail"
                                placeholderTextColor={Colors.primary}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput
                                label="Password"
                                icon="lock"
                                placeholderTextColor={Colors.primary}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
                            <StyledButton forgotPassword={true} onPress={handleSubmit}>
                                <ButtonText forgotPassword={true}
                                    onPress={() => navigation.navigate('ForgotPassword')}
                                >Forgot Password ?</ButtonText>
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
                    )}
                </Formik>
            </InnnerContainer>
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