import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    SelectImage,
    BottomContainer,
    StyledButton,
    ButtonText,
    PrescriptionImage,
    TableContainer
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'
import UploadImage from '../../images/icons/upload.svg'

const ResultScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Result
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
                <SelectImage>
                    <PrescriptionImage resizeMode="cover" source={require('../../images/test/prescription.png')} />
                </SelectImage>
                <TableContainer>
                    <Text>
                        Hello
                    </Text>
                </TableContainer>
                <BottomContainer>
                    <StyledButton>
                        <ButtonText>Add your side effects</ButtonText>
                    </StyledButton>
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default ResultScreen