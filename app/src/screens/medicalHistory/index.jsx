import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import CheckBox from 'expo-checkbox'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    StyledText,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    StyledInputLabel,
    StyledCheckbox,
    ConditionsContainer,
} from './styles'
import { Colors } from '../../shared/variables'

import SettingsImage from '../../images/icons/settings.svg'

const conditionsArray = [
    {
        id: "1",
        text: "Condition 1",
        value: "",
    },
    {
        id: "2",
        text: "Condition 2",
        value: "",
    },
    {
        id: "3",
        text: "Condition 2",
        value: "",
    },
    {
        id: "4",
        text: "Condition 2",
        value: "",
    },
    {
        id: "5",
        text: "Condition 2",
        value: "",
    },
    {
        id: "6",
        text: "Condition 2",
        value: "",
    },
    {
        id: "7",
        text: "Condition 2",
        value: "",
    },
    {
        id: "8",
        text: "Condition 2",
        value: "",
    },
    {
        id: "9",
        text: "Condition 2",
        value: "",
    },
    {
        id: "10",
        text: "Condition 2",
        value: "",
    },
]

const MedicalHistoryScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Medical History
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <StyledText>Please select your medical history</StyledText>
                <Formik
                    initialValues={{
                        conditions: [],
                    }}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                    }}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        values,
                        setFieldValue
                    }) => (
                        <StyledFormArea>
                            <ConditionsContainer>
                                {conditionsArray.map((condition, key) => {
                                    return (
                                        <CheckboxComponent
                                            key={key}
                                            value={condition.value}
                                            onValueChange={nextValue => setFieldValue('financiallyResponsible', nextValue)}
                                            label={condition.text}
                                            name="conditions"
                                        />
                                    );
                                })}
                            </ConditionsContainer>

                            <Line />
                            <StyledButton onPress={() => navigation.navigate('MedicalHistory')}>
                                <ButtonText>Submit</ButtonText>
                            </StyledButton>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    )
}

const CheckboxComponent = ({ label }) => {
    const [isChecked, setIsChecked] = useState(false)

    return (
        <StyledCheckbox>
            <CheckBox
                color={isChecked ? `${Colors.primary}` : undefined}
                disabled={false}
                value={isChecked}
                onValueChange={(newValue) => setIsChecked(newValue)}
            />
            <StyledInputLabel>{label}</StyledInputLabel>
        </StyledCheckbox>
    )
}

export default MedicalHistoryScreen