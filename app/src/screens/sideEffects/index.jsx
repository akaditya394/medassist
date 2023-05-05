import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Checkbox from 'expo-checkbox'

import { Ionicons } from '@expo/vector-icons'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    StyledLabel,
    StyledSideEffects,
    StyledSideEffect,
    RightIcon,
    SideEffectText,
    CheckboxContainer,
    TextInputContainer,
    Close
} from './styles'
import { Colors } from '../../shared/variables'

import SettingsImage from '../../images/icons/settings.svg'
import UploadImage from '../../images/icons/upload.svg'
import CloseImage from '../../images/icons/close.svg'

const data = [
    { id: 1, text: 'Hairfall', isChecked: false },
    { id: 2, text: 'Headache', isChecked: false },
    { id: 3, text: 'Nausea', isChecked: false },
    { id: 4, text: 'Sore throat', isChecked: false },
    { id: 5, text: 'Breathlessness', isChecked: false },
    // { id: 6, text: 'Skin Rashes', isChecked: false },
    // { id: 7, text: 'Swelling', isChecked: false },
    // { id: 8, text: 'Upset Stomach', isChecked: false },
    // { id: 9, text: 'Dry mouth', isChecked: false },
    // { id: 10, text: 'Drowsiness', isChecked: false },
    // { id: 11, text: 'Vomiting', isChecked: false },
    // { id: 12, text: 'Diarrhea', isChecked: false },
    // { id: 13, text: 'Pimples', isChecked: false },
    // { id: 14, text: 'Fatigue', isChecked: false },
]

const SideEffectsScreen = ({ navigation }) => {
    const [sideEffectsData, setSideEffectsData] = useState(data)
    const [sideEffects, setSideEffects] = useState('')
    const [finalSideEffectsArray, setFinalSideEffectsArray] = useState([])

    const handleRemoveItem = (id) => {
        setSideEffectsData(sideEffectsData.filter(item => item.id !== id))
    }

    const addToSideEffects = () => {
        if (sideEffects == '') return
        else {
            setSideEffectsData([...sideEffectsData, {
                id: Date.now(), text: sideEffects
            }])
            setSideEffects('')
        }
    }

    const handleChange = (id) => {
        let temp = sideEffectsData.map((sideEffect) => {
            if (id === sideEffect.id) {
                return { ...sideEffect, isChecked: !sideEffect.isChecked }
            }
            return sideEffect
        })
        setSideEffectsData(temp)
        let selected = temp.filter((sideEffect) => sideEffect.isChecked)
        setFinalSideEffectsArray(selected)
    }

    const handleSubmit = () => {
        console.log(finalSideEffectsArray)
    }

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Side Effects
                    </PageTitle>
                    <IconsContainer>
                        <Icon onPress={() => navigation.navigate('Upload')}>
                            <UploadImage width="26px" height="26px" fill="#fff" />
                        </Icon>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <StyledFormArea>
                    <StyledLabel>Select your side effects or type them out:</StyledLabel>
                    <TextInputContainer>
                        <StyledInputLabel>Write your side effects if not available in dropdown:</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={(sideEffects) => setSideEffects(sideEffects)}
                            value={sideEffects}
                            keyboardType="email-address"
                        />
                        <RightIcon onPress={addToSideEffects}>
                            <Ionicons name='add' size={30} color={Colors.primary} />
                        </RightIcon>
                    </TextInputContainer>
                    <StyledSideEffects>
                        {sideEffectsData.slice(0).reverse().map((item, id) => {
                            if (item.id === 1 || item.id === 2 || item.id === 3 || item.id === 4 || item.id === 5 || item.id === 6 || item.id === 7 || item.id === 8 || item.id === 9 || item.id === 10 || item.id === 11 || item.id === 12 || item.id === 13 || item.id === 14) {
                                return (
                                    <StyledSideEffect key={id}>
                                        <SideEffectText>{item.text}</SideEffectText>
                                        <CheckboxContainer>
                                            <Checkbox
                                                value={item.isChecked}
                                                onValueChange={() => handleChange(item.id)}
                                                color={item.isChecked ? `${Colors.primary}` : undefined}
                                            />
                                        </CheckboxContainer>
                                    </StyledSideEffect>
                                )
                            } else {
                                return (
                                    <StyledSideEffect key={id}>
                                        <SideEffectText>{item.text}</SideEffectText>
                                        <Close onPress={() => handleRemoveItem(item.id)}>
                                            <CloseImage width="20px" height="20px" fill="#0F2E53" />
                                        </Close>
                                    </StyledSideEffect>
                                )
                            }
                        })}
                    </StyledSideEffects>
                </StyledFormArea>
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                    <ButtonText>Submit</ButtonText>
                </StyledButton>
                <Line />
            </InnerContainer>
        </StyledContainer>
    )
}

export default SideEffectsScreen