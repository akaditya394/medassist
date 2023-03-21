import { StatusBar } from 'expo-status-bar'

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
import { Table, Row, Rows } from 'react-native-table-component'

const ResultScreen = ({ navigation }) => {
    const header = ['#id', 'Drug name', 'Symptoms', 'Alternatives']
    const data = [
        ['1', 'Drug 1', 'Symptom 1', 'Alternative 1'],
        ['2', 'Drug 2', 'Symptom 2', 'Alternative 2'],
        ['3', 'Drug 3', 'Symptom 3', 'Alternative 3']

    ]
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Result
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <SelectImage>
                    <PrescriptionImage resizeMode="cover" source={require('../../images/test/prescription.png')} />
                </SelectImage>
                <TableContainer>
                    <Table
                        borderStyle={{
                            borderWidth: 2,
                            borderColor: '#0F2E53'
                        }}
                    >
                        <Row data={header} />
                        <Rows data={data} />
                    </Table>
                </TableContainer>
                <BottomContainer>
                    <StyledButton onPress={() => navigation.navigate('SideEffects')}>
                        <ButtonText>Add your side effects</ButtonText>
                    </StyledButton>
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default ResultScreen