import { StatusBar } from 'expo-status-bar'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    SelectImage,
    PrescriptionImage,
    Icon,
    PresriptionTitle,
    StyledButton,
    ButtonText,
    Line
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

const UpdatedPrescriptionScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Updated Prescription
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <PresriptionTitle>Here is your updated prescription</PresriptionTitle>
                <SelectImage>
                    <PrescriptionImage resizeMode="cover" source={require('../../images/test/prescription.jpg')} />
                </SelectImage>
                <Line />
                <StyledButton>
                    <ButtonText>Download</ButtonText>
                </StyledButton>
            </InnerContainer>
        </StyledContainer>
    )
}

export default UpdatedPrescriptionScreen