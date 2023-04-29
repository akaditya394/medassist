import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import DropDownPicker from "react-native-dropdown-picker"

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
    Close,
    SideEffectText,
    DropDownContainer,
    TextInputContainer
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'
import UploadImage from '../../images/icons/upload.svg'
import CloseImage from '../../images/icons/close.svg'

const sideEffectsDropDownData = [
    { label: 'Hairfall', value: "hairfall" },
    { label: 'Headache', value: "headache" },
    { label: 'Nausea', value: "nausea" },
    { label: 'Sore throat', value: "sore_throat" },
    { label: 'Breathlessness', value: "breathlessness" },
    { label: 'Skin Rashes', value: "skin_rashes" },
    { label: 'Swelling', value: "swelling" },
    { label: 'Upset Stomach', value: "upset_stomach" },
    { label: 'Dry mouth', value: "dry_mouth" },
    { label: 'Drowsiness', value: "drowsiness" },
    { label: 'Vomiting', value: "vomiting" },
    { label: 'Diarrhea', value: "diarrhea" },
    { label: 'Pimples', value: "pimples" },
    { label: 'Fatigue', value: "fatigue" },
]

const data = [
    { id: 1, text: 'Hairfall' },
    { id: 2, text: 'Headache' },
    { id: 3, text: 'Nausea' },
    { id: 4, text: 'Sore throat' },
    { id: 5, text: 'Breathlessness' },
    { id: 6, text: 'Skin Rashes' },
    { id: 7, text: 'Swelling' },
    { id: 8, text: 'Upset Stomach' },
    { id: 9, text: 'Dry mouth' },
    { id: 10, text: 'Drowsiness' },
    { id: 11, text: 'Vomiting' },
    { id: 12, text: 'Diarrhea' },
    { id: 13, text: 'Pimples' },
    { id: 14, text: 'Fatigue' },
]

const SideEffectsScreen = ({ navigation }) => {
    const [sideEffectsOpen, setSideEffectsOpen] = useState(false)
    const [sideEffectsValue, setSideEffectsValue] = useState(null)
    const [sideEffects, setSideEffects] = useState(sideEffectsDropDownData)
    const [loading, setLoading] = useState(false)
    const [sideEffectsData, setSideEffectsData] = useState(data)

    const handleRemoveItem = (id) => {
        setSideEffectsData(sideEffectsData.filter(item => item.id !== id))
    }

    // const { handleSubmit, control } = useForm();
    // const onSubmit = (data) => {
    //     console.log(data, "data")
    // }

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
                <Formik
                    initialValues={{
                        sideEffects: ''
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {({
                        handleChange, handleBlur, handleSubmit, values
                    }) => (
                        <StyledFormArea>
                            <StyledLabel>Select your side effects or type them out:</StyledLabel>
                            <DropDownContainer>
                                <DropDownPicker
                                    // style={styles.dropdown}
                                    open={sideEffectsOpen}
                                    value={sideEffectsValue}
                                    items={sideEffects}
                                    setOpen={setSideEffectsOpen}
                                    setValue={setSideEffectsValue}
                                    setItems={setSideEffects}
                                    placeholder="Select Side Effects"
                                    // placeholderStyle={styles.placeholderStyles}
                                    // onOpen={onGenderOpen}
                                    // onChangeValue={onChange}
                                    zIndex={3000}
                                />
                            </DropDownContainer>
                            <MyTextInput
                                label="Write your side effects if not available in dropdown:"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <StyledSideEffects>
                                {sideEffectsData.map((item, id) => {
                                    return (
                                        <StyledSideEffect key={id}>
                                            <SideEffectText>{item.text}</SideEffectText>
                                            <Close onPress={() => handleRemoveItem(item.id)}>
                                                <CloseImage width="20px" height="20px" fill="#0F2E53" />
                                            </Close>
                                        </StyledSideEffect>
                                    )
                                })}
                            </StyledSideEffects>
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={() => navigation.navigate("AllResults")}>
                                <ButtonText>Submit</ButtonText>
                            </StyledButton>
                            <Line />
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    )
}

const MyTextInput = ({ label, ...props }) => {
    return (
        <TextInputContainer>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
        </TextInputContainer>
    )
}

export default SideEffectsScreen