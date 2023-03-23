import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import { View } from 'react-native'

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
    StyledTextInput
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

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

                            <Line />
                            <StyledButton onPress={() => navigation.navigate('AllResults')}>
                                <ButtonText>Continue</ButtonText>
                            </StyledButton>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    )
}

export default MedicalHistoryScreen