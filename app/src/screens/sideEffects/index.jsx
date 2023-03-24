import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import { FlatList, Text } from 'react-native'
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
    DropDownContainer
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'
import UploadImage from '../../images/icons/upload.svg'
import CloseImage from '../../images/icons/close.svg'

const sideEffectsData = [
    { label: "Side Effect 1", value: "side_effect_1" },
    { label: "Side Effect 2", value: "side_effect_2" },
    { label: "Side Effect 3", value: "side_effect_3" },
]

const items = [
    { id: "1", text: "Hello" },
    { id: "2", text: "Hello" },
    { id: "3", text: "Hello" },
    { id: "4", text: "Hello" },
    { id: "5", text: "Hello" },
    { id: "6", text: "Hello" },
]

const SideEffectsScreen = ({ navigation }) => {
    const [sideEffectsOpen, setSideEffectsOpen] = useState(false)
    const [sideEffectsValue, setSideEffectsValue] = useState(null)
    const [sideEffects, setSideEffects] = useState(sideEffectsData)
    const [loading, setLoading] = useState(false)

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
                            <StyledLabel>Select your side-effects</StyledLabel>
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
                            <StyledSideEffects>
                                <FlatList
                                    data={items}
                                    renderItem={({ item, id }) => (
                                        <StyledSideEffect key={id}>
                                            <SideEffectText>{item.text}</SideEffectText>
                                            <Close onPress={() => navigation.navigate('Upload')}>
                                                <CloseImage width="20px" height="20px" fill="#0F2E53" />
                                            </Close>
                                        </StyledSideEffect>
                                    )}
                                    //Setting the number of column
                                    numColumns={2}
                                    keyExtractor={(item, index) => index}
                                />
                                <Text>Hello</Text>
                            </StyledSideEffects>
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
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

export default SideEffectsScreen