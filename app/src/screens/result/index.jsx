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
import { Colors } from '../../shared/variables'

const ResultScreen = ({ navigation }) => {
    const tableHead = ['Drug name', 'Symptoms', 'Alternatives']
    const tableData = [
        ['Microcef CV 200 mg', 'Throat infections', 'Goodcif CV 200mg'],
        ['Ventryl D', 'Sore throat', 'Chericof'],
        ['Pantotav DSR', 'Acidity', 'Pantin D'],
        ['BENZ Pearls', 'Dry cough', '-'],
        ['Montak LC', 'Runny nose, watery eyes, sneezing', 'Levocet M']
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
                    <PrescriptionImage resizeMode="cover" source={require('../../images/test/prescription.jpg')} />
                </SelectImage>
                <TableContainer>
                    <Table borderStyle={{ borderWidth: 1, borderColor: `${Colors.primary}` }}>
                        <Row data={tableHead} style={{
                            height: 50, backgroundColor: `${Colors.tertiary}`
                        }} textStyle={{ margin: 6, fontWeight: 'bold' }} />
                        <Rows data={tableData} textStyle={{ margin: 6 }} />
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