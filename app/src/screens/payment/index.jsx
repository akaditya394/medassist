import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { CardField, useStripe } from '@stripe/stripe-react-native'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    StyledText,
    InputContainer,
    StyledInputLabel,
    StyledTextInput,
    MsgBox,
    Line,
    StyledButton,
    ButtonText
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

const PaymentScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [cardDetails, setCardDetails] = useState(null)
    const [focusedField, setFocusedField] = useState(null)
    const { confirmPayment } = useStripe()

    const handlePay = () => { }

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Payment
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <StyledText>Choose your plan:</StyledText>
                <InputContainer>
                    <StyledInputLabel>Email</StyledInputLabel>
                    <StyledTextInput
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                        keyboardType="default"
                    />
                </InputContainer>
                <CardField
                    postalCodeEnabled={true}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: '#F5F6FB',
                        textColor: '#0F2E53',
                    }}
                    style={{
                        width: '100%',
                        height: 60,
                        marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => setCardDetails(cardDetails)}
                    onFocus={(focusedField) => setFocusedField(focusedField)}
                />
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handlePay}>
                    <ButtonText>Pay</ButtonText>
                </StyledButton>
                <Line />
            </InnerContainer>
        </StyledContainer>
    )
}

export default PaymentScreen